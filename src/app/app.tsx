'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { GlobalProvider } from "../contexts/GlobalContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { splashTime } from "../models/splashTime";
import Splash from "../components/Splash/Splash";

/**
 * Main Application Wrapper.
 * Handles the initial splash screen logic, URL normalization, 
 * and provides global contexts (Global and Theme).
 */
export default function App({
  children,
}: {
  children: React.ReactNode
}) {

  // State to control visibility of the splash screen
  const [showSplashscreen, setShowSplashscreen] = useState<boolean>(true);
  // State to ensure the app has initialized on the client side
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    // Normalize URL by adding a trailing slash if missing
    if (!window.location.pathname.endsWith("/")) {
      window.location.pathname += "/";
    }

    // Check session storage to see if the user has already seen the splash screen in this session
    const splashLocalStorage = !JSON.parse(window.sessionStorage.getItem("showedSplashscreen") as string);
    setShowSplashscreen(splashLocalStorage)
    setTrigger(true)

    // Automatically hide splash screen after a set duration
    setTimeout(() => {
      setShowSplashscreen(false);
      window.sessionStorage.setItem("showedSplashscreen", JSON.stringify(true));
    }, splashTime)
  }, []);

  // Prevent rendering anything until initialization is complete
  if (!trigger) return;

  // Show Splash screen if it hasn't been shown yet, otherwise render the main application
  const isCompiler = typeof window !== 'undefined' && window.location.pathname.includes('/compiler');

  if (isCompiler) {
    return (
      <GlobalProvider>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </GlobalProvider>
    );
  }

  return showSplashscreen === true ? <Splash />
    : <GlobalProvider>
      <ThemeProvider>
        <Header />
        <main>{children}</main>
      </ThemeProvider>
    </GlobalProvider>
}