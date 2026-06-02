import fs from "node:fs";
import path from "node:path";

export default function StoryPage() {
  const htmlPath = path.join(process.cwd(), "app", "story", "story.html");
  const raw = fs.readFileSync(htmlPath, "utf8");

  // Extract only the body innerHTML so we don't render an extra <body> tag inside Next.
  const bodyInnerMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyInner = bodyInnerMatch ? bodyInnerMatch[1] : raw;

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: bodyInner,
      }}
    />
  );
}






