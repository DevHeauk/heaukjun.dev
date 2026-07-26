import type { Metadata } from "next";
import Nav from "./nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HeaukJun Yoo",
    template: "%s · HeaukJun Yoo",
  },
  description:
    "Product engineer in Seoul. Four years on backend and infrastructure, then four years building products full-stack.",
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
