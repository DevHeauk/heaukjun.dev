import type { Metadata } from "next";
import Nav from "./nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://heaukjun.com"),
  title: {
    default: "HeaukJun Yoo",
    template: "%s · HeaukJun Yoo",
  },
  description:
    "Full-stack engineer in Seoul. Network security in C, then backend and infrastructure, and now product work.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ko: "/ko" },
  },
  openGraph: {
    type: "website",
    siteName: "HeaukJun Yoo",
    url: "https://heaukjun.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer className="site">
          <a href="https://github.com/DevHeauk">GitHub</a>
          <a href="https://www.linkedin.com/in/heaukjun-yoo">LinkedIn</a>
          <a href="mailto:tianfla24@gmail.com">Email</a>
        </footer>
      </body>
    </html>
  );
}
