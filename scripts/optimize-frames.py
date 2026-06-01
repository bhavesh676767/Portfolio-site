import os
import glob
from PIL import Image

def optimize_frames():
    directory = "../public/me_frames"
    if not os.path.exists(directory):
        directory = "public/me_frames" # try relative from project root

    patterns = ["*.png", "*.PNG", "*.webp", "*.WEBP"]
    files = []
    for p in patterns:
        files.extend(glob.glob(os.path.join(directory, p)))

    total_saved_bytes = 0

    for filepath in files:
        if not os.path.exists(filepath):
            continue
            
        original_size = os.path.getsize(filepath)
        filename = os.path.basename(filepath)
        name, ext = os.path.splitext(filename)
        
        # New filename is always lowercase .webp
        new_filename = name + ".webp"
        new_filepath = os.path.join(directory, new_filename)

        # Open image
        try:
            with Image.open(filepath) as img:
                # Resize if width > 1000px
                if img.width > 1000:
                    ratio = 1000 / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((1000, new_height), Image.Resampling.LANCZOS)
                
                # Convert and save as WebP
                # Preserve transparency if any: WebP supports alpha natively, RGBA mode is fine
                if img.mode != 'RGBA' and img.mode != 'RGB':
                    img = img.convert('RGBA')

                img.save(new_filepath, 'webp', quality=82, method=6)
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            continue

        new_size = os.path.getsize(new_filepath)
        saved = original_size - new_size
        
        # Only add to total saved if we actually saved space, or if it was a different file
        if filepath != new_filepath or saved > 0:
            total_saved_bytes += saved

        print(f"{filename}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB")

        # Delete original if it was .png after successful conversion
        if ext.lower() == '.png' and os.path.exists(filepath) and filepath != new_filepath:
            os.remove(filepath)

    print(f"Total saved: {total_saved_bytes / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    optimize_frames()
