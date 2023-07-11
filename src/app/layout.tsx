import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import brandIcon from "./favicon.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ManageX",
  description:
    "ManageX is a task management app to help stay organized and manage day-to-day.",
  icons: {
    shortcut: `${brandIcon.src}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-[rgb(237,_241,_214)]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
