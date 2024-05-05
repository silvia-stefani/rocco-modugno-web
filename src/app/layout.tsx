'use client'
import React, { useEffect, useState } from "react"
import '../assets/sass/main.scss'

import Header from "../components/Header/Header";
import { GlobalProvider } from "../contexts/GlobalContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { splashTime } from "../models/splashTime";
import Splash from "../components/Splash/Splash";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

      // Initialize from localStorage
      const [showSplashscreen, setShowSplashscreen] = useState<boolean>(
        () => !JSON.parse(localStorage.getItem("showedSplashscreen") as string)
      );
    
      useEffect(() => {
        setTimeout(() => {
          // Update local state to trigger component rerender
          setShowSplashscreen(false);
          // Update localStorage for next time app is mounted
          localStorage.setItem("showedSplashscreen", JSON.stringify(true));
        }, splashTime);
      }, []);
      console.log(splashTime);
      
      
  console.log(`
    Website Development by Silvia Stefani: https://silviastefani.com
    · Web Design: Rocco Modugno + Silvia Stefani
    · Code: Silvia Stefani
    · Date: January 2024
    · Language: Typescript
    · Tools: Vite & React
    `);
  return (
    <html lang="en">
      <body>
      {showSplashscreen ? <Splash />
      : <GlobalProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </GlobalProvider>}
      </body>
    </html>
  )
}