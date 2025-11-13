import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cards: Your Digital Card Case",
  description: "A simple app to manage your cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.className}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
