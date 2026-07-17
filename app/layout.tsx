import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "./components/background_wrapper";

const roboto = Roboto_Mono({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSPC - VIT Chennai",
  description: "Open Source Programming Club at VIT Chennai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <body className="bg-background text-light">
        <BackgroundWrapper>{children}</BackgroundWrapper>
      </body>
    </html>
  );
}
