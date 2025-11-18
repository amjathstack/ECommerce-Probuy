'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer/>
        <AuthProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
