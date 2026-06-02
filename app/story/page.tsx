import fs from "node:fs";
import path from "node:path";

// Injects the raw Framer HTML from app/story/story.html.
// This keeps Framer's own runtime/scripts intact.
export default function StoryPage() {
  const htmlPath = path.join(process.cwd(), "app", "story", "story.html");
  const raw = fs.readFileSync(htmlPath, "utf8");

  // Strip the outer html/head/body wrappers so we don't nest <html> tags inside Next's DOM.
  const bodyMatch = raw.match(/<body[^>]*>[\s\S]*?<\/body>/i);
  const body = bodyMatch ? bodyMatch[0] : raw;

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: body,
      }}
    />
  );
}




