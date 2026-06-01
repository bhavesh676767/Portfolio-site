import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bhavesh. — designer & developer",
  description:
    "Portfolio of Bhavesh Raud — a 17 year old designer, developer & builder from Gurgaon, India.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

