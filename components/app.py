"""
am_i_handsome.py  –  Live webcam attractiveness scorer
=======================================================
Based on: Ahmadimehr & Karimi Moridani, Traitement du Signal 2021

Requirements (no model files needed):
    pip install opencv-python scikit-learn numpy

Optional (better landmark accuracy):
    pip install mediapipe==0.10.9   # legacy API version

Run:
    python am_i_handsome.py
Controls: Q / ESC to quit
"""

import math, sys, warnings
import numpy as np
import cv2
from sklearn.neural_network import MLPClassifier
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────────────────────
#  LANDMARK DETECTION  (tries MediaPipe legacy → OpenCV fallback)
# ─────────────────────────────────────────────────────────────

# MediaPipe mesh indices for the 13 paper landmarks
_MP_IDX = [10, 9, 234, 33, 133, 6, 263, 362, 454, 2, 61, 291, 152]

def _init_mediapipe():
    """Try to load the OLD mediapipe (0.9.x / legacy solutions API)."""
    try:
        import mediapipe as mp
        fm = mp.solutions.face_mesh          # raises AttributeError on ≥0.10
        mesh = fm.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )
        print("Landmark backend: MediaPipe Face Mesh (legacy API)")
        return mesh
    except Exception:
        return None

_mp_mesh = _init_mediapipe()

def _landmarks_mediapipe(rgb_frame):
    """Returns (13,2) float32 array or None."""
    h, w = rgb_frame.shape[:2]
    res = _mp_mesh.process(rgb_frame)
    if not res.multi_face_landmarks:
        return None
    lm = res.multi_face_landmarks[0].landmark
    return np.array([[lm[i].x * w, lm[i].y * h] for i in _MP_IDX], np.float32)

# Haar cascade for fallback
_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +
                                 "haarcascade_frontalface_default.xml")
_eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +
                                     "haarcascade_eye.xml")

def _landmarks_opencv(bgr_frame):
    """
    Detect face with Haar cascade, then place 13 landmarks using
    golden-ratio / neoclassical canon proportions.
    Returns (13,2) float32 or None.
    """
    gray  = cv2.cvtColor(bgr_frame, cv2.COLOR_BGR2GRAY)
    faces = _cascade.detectMultiScale(gray, 1.1, 5, minSize=(80, 80))
    if len(faces) == 0:
        return None

    # pick largest face
    x, y, w, h = max(faces, key=lambda r: r[2]*r[3])

    # Try to refine eye positions
    roi_gray = gray[y:y+h, x:x+w]
    eyes = _eye_cascade.detectMultiScale(roi_gray, 1.1, 5)

    # Proportional landmark positions (fraction of bounding box)
    props = [
        (0.50, 0.04),   # hairline
        (0.50, 0.30),   # glabella
        (0.04, 0.40),   # top_ear_L
        (0.25, 0.38),   # outer_canthus_L
        (0.38, 0.38),   # inner_canthus_L
        (0.50, 0.40),   # selion
        (0.62, 0.38),   # outer_canthus_R   (mirrored)
        (0.75, 0.38),   # inner_canthus_R
        (0.96, 0.40),   # top_ear_R
        (0.50, 0.62),   # subnasale
        (0.36, 0.74),   # outer_commissure_L
        (0.64, 0.74),   # outer_commissure_R
        (0.50, 0.96),   # menton
    ]

    # Refine eye y-position if eyes were detected
    if len(eyes) >= 2:
        ey_list = [(ey + eh//2) / h for (ex,ey,ew,eh) in eyes]
        ey_mean = float(np.mean(ey_list[:2]))
        for i in [3,4,5,6,7]:      # canthus + selion rows
            props[i] = (props[i][0], ey_mean)

    pts = np.array([[x + px*w, y + py*h] for (px,py) in props], np.float32)
    return pts


def get_landmarks(bgr_frame):
    """Returns (13,2) float32 array or None."""
    if _mp_mesh is not None:
        rgb = cv2.cvtColor(bgr_frame, cv2.COLOR_BGR2RGB)
        pts = _landmarks_mediapipe(rgb)
        if pts is not None:
            return pts
    return _landmarks_opencv(bgr_frame)

# ─────────────────────────────────────────────────────────────
#  GEOMETRY HELPERS
# ─────────────────────────────────────────────────────────────

def _d(a, b):
    return math.hypot(a[0]-b[0], a[1]-b[1])

def _ang(A, B, C):
    v1 = (A[0]-B[0], A[1]-B[1])
    v2 = (C[0]-B[0], C[1]-B[1])
    d  = v1[0]*v2[0] + v1[1]*v2[1]
    m  = math.hypot(*v1) * math.hypot(*v2)
    return math.degrees(math.acos(max(-1., min(1., d/m)))) if m > 1e-9 else 0.

def extract_features(pts):
    (hairline, glabella, tear_L, ocL, icL,
     selion, ocR, icR, tear_R,
     subnasale, commL, commR, menton) = pts

    pL = ((ocL[0]+icL[0])/2, (ocL[1]+icL[1])/2)
    pR = ((ocR[0]+icR[0])/2, (ocR[1]+icR[1])/2)
    mc = ((commL[0]+commR[0])/2, (commL[1]+commR[1])/2)
    f8 = _d(subnasale, menton)

    return np.array([
        _d(tear_L, ocL), _d(ocL, icL), _d(icL, icR), _d(icR, ocR), _d(ocR, tear_R),
        _d(hairline, glabella), _d(glabella, subnasale), f8,
        _d(commL, commR), f8/3.,
        _d(ocL, commL), _d(ocR, commR), _d(pL, pR), _d(commL, commR),
        abs(_d(pL,pR) - _d(commL,commR)),
        _d(commL, commR), _d(ocL, ocR), _d(glabella, subnasale),
        _d(tear_L, menton), _d(tear_R, menton),
        _ang(glabella, selion, subnasale), _ang(selion, subnasale, menton),
        _ang(selion, subnasale, mc),       _ang(glabella, subnasale, mc),
    ], dtype=np.float64)

# ─────────────────────────────────────────────────────────────
#  MODEL  (trained on paper's Table-4 synthetic statistics)
# ─────────────────────────────────────────────────────────────

def build_model(n=300, seed=42):
    rng = np.random.default_rng(seed)
    a_mu = [3.28]*5+[6.86]*5+[6.82]*5+[5.98]*5+[124.76]*2+[83.02]*2
    u_mu = [3.10]*5+[5.98]*5+[6.94]*5+[6.31]*5+[132.64]*2+[97.74]*2
    X = np.vstack([
        rng.normal(a_mu, [m*.10 for m in a_mu], (n, 24)),
        rng.normal(u_mu, [m*.10 for m in u_mu], (n, 24)),
    ])
    y = np.array([1]*n + [0]*n)
    sc  = StandardScaler().fit(X)
    pca = PCA(n_components=12, random_state=seed).fit(sc.transform(X))
    clf = MLPClassifier((15,10), activation="logistic", solver="lbfgs",
                        max_iter=2000, random_state=seed)
    clf.fit(pca.transform(sc.transform(X)), y)
    return sc, pca, clf

# ─────────────────────────────────────────────────────────────
#  SCORE → VERDICT
# ─────────────────────────────────────────────────────────────

TIERS = [
    (0.85, "Handsome!",      (0, 220,  80)),
    (0.65, "Good looking",   (50, 200, 255)),
    (0.50, "Average",        (255, 200,   0)),
    (0.00, "Below average",  (60,  60, 255)),
]

def verdict(score):
    for t, label, col in TIERS:
        if score >= t:
            return label, col
    return TIERS[-1][1], TIERS[-1][2]

# ─────────────────────────────────────────────────────────────
#  DRAWING HELPERS
# ─────────────────────────────────────────────────────────────

FONT = cv2.FONT_HERSHEY_DUPLEX

def put(img, text, pos, scale=0.7, col=(255,255,255), thick=1):
    cv2.putText(img, text, pos, FONT, scale, (0,0,0),   thick+2, cv2.LINE_AA)
    cv2.putText(img, text, pos, FONT, scale, col,       thick,   cv2.LINE_AA)

def bar(img, x, y, w, h, val, col):
    cv2.rectangle(img, (x,y), (x+w, y+h), (40,40,40), -1)
    cv2.rectangle(img, (x,y), (x+int(w*val), y+h), col, -1)
    cv2.rectangle(img, (x,y), (x+w, y+h), (120,120,120), 1)

# ─────────────────────────────────────────────────────────────
#  MAIN LOOP
# ─────────────────────────────────────────────────────────────

def main():
    print("Training model … ", end="", flush=True)
    sc, pca, clf = build_model()
    print("done.")

    if _mp_mesh is None:
        print("MediaPipe not found – using OpenCV Haar cascade (less precise).")
    print("Opening webcam … press Q or ESC to quit.\n")

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("ERROR: cannot open webcam.")
        sys.exit(1)

    cap.set(cv2.CAP_PROP_FRAME_WIDTH,  1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT,  720)

    history = []
    SMOOTH  = 12

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frame = cv2.flip(frame, 1)
        h, w  = frame.shape[:2]

        pts = get_landmarks(frame)
        ol  = frame.copy()

        if pts is not None:
            # Score
            feats = extract_features(pts).reshape(1,-1)
            prob  = float(clf.predict_proba(pca.transform(sc.transform(feats)))[0][1])
            history.append(prob)
            if len(history) > SMOOTH: history.pop(0)
            score = float(np.mean(history))
            label, col = verdict(score)

            # Landmarks
            for px, py in pts:
                cv2.circle(ol, (int(px), int(py)), 4, col,      -1)
                cv2.circle(ol, (int(px), int(py)), 4, (0,0,0),   1)

            # ── Left panel ─────────────────────────────────────
            cv2.rectangle(ol, (10,10), (360,145), (15,15,15), -1)
            cv2.rectangle(ol, (10,10), (360,145), (80,80,80),  1)

            pct = f"{score*100:.0f}%"
            put(ol, pct,   (22, 80),  scale=2.6, col=col,          thick=2)
            put(ol, label, (22,108),  scale=0.9, col=col,          thick=1)
            bar(ol, 22, 118, 320, 16, score, col)

            # ── Right breakdown panel ───────────────────────────
            feats_raw = extract_features(pts)
            groups = [
                ("Symmetry",     feats_raw[0:5]),
                ("Proportions",  feats_raw[5:10]),
                ("Eye / Mouth",  feats_raw[10:15]),
                ("Lip / Nose",   feats_raw[15:20]),
                ("Nose angles",  feats_raw[20:24]),
            ]
            px0 = w - 230
            panel_h = len(groups)*34 + 14
            cv2.rectangle(ol, (px0-8, 10), (w-10, 10+panel_h), (15,15,15), -1)
            cv2.rectangle(ol, (px0-8, 10), (w-10, 10+panel_h), (80,80,80),  1)

            for i, (gname, vals) in enumerate(groups):
                gy   = 34 + i*34
                gval = float(vals.mean())
                norm = min(1., max(0., gval / (gval + 5.)))
                put(ol, gname, (px0, gy), scale=0.52, col=(200,200,200))
                bar(ol, px0, gy+5, 200, 13, norm, (100, 210, 255))

            put(ol, "Face detected ✓", (12, h-14), scale=0.55, col=(0,230,100))

        else:
            history.clear()
            # placeholder panel
            cv2.rectangle(ol, (10,10), (360,145), (15,15,15), -1)
            put(ol, "No face detected", (22, 85), scale=0.85, col=(100,100,100))
            put(ol, "Look at the camera", (12, h-14), scale=0.55, col=(80,80,255))

        cv2.addWeighted(ol, 0.88, frame, 0.12, 0, frame)
        put(frame, "Facial Attractiveness Scorer  |  Q to quit",
            (10, h-40), scale=0.48, col=(160,160,160))
        cv2.imshow("Am I Handsome?", frame)

        if cv2.waitKey(1) & 0xFF in (ord('q'), ord('Q'), 27):
            break

    cap.release()
    cv2.destroyAllWindows()
    if _mp_mesh is not None:
        _mp_mesh.close()
    print("Bye!")

if __name__ == "__main__":
    main()