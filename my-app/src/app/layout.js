'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SessionProvider} from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {



  return (

    <html lang="en">
      <SessionProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ToastContainer position="bottom-right" />
          <Provider store={store}>
            {children}
          </Provider>
        </body>
      </SessionProvider>
    </html>

  );
}
