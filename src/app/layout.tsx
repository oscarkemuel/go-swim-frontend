import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Swim",
  description: "A platform to track and manage your swimming workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body
          className={`${roboto.variable} ${robotoMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
