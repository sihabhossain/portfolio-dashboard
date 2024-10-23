"use client";

import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";

import { Toaster } from "react-hot-toast";
import ApiProvider from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <ApiProvider>{children}</ApiProvider>
          <Toaster></Toaster>
        </div>
      </body>
    </html>
  );
}
