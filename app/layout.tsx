"use client";

import { Josefin_Sans, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./utils/Theme-Provider";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import SocketServerProvider from "./hooks/SocketServerProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable}  bg-white! dark:bg-gradient-to-b dark:to-black duration-300 dark:from-gray-900 bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
            {" "}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SocketServerProvider>
                {" "}
                <Loader>{children}</Loader>
              </SocketServerProvider>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
