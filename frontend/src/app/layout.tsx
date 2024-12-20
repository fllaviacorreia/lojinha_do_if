import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { NextUIProvider } from "@nextui-org/react";
import { ToastProvider } from "./components/toast";


export const metadata: Metadata = {
  title: "Lojinha do IF",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-0 p-0 box-border overflow-x-hidden`}
      >
        <NextUIProvider>
          <ToastProvider>
          {children}
          </ToastProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
