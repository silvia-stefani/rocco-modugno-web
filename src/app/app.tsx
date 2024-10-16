'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { GlobalProvider } from "../contexts/GlobalContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { splashTime } from "../models/splashTime";
import Splash from "../components/Splash/Splash";

export default function App({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [showSplashscreen, setShowSplashscreen] = useState<boolean >(true);
    const [trigger, setTrigger] = useState<boolean>(false);
    
    useEffect(() => {
      const splashLocalStorage = !JSON.parse(window.sessionStorage.getItem("showedSplashscreen") as string);
      setShowSplashscreen(splashLocalStorage)
      setTrigger(true)
      setTimeout(() => {
        setShowSplashscreen(false);
        window.sessionStorage.setItem("showedSplashscreen", JSON.stringify(true));
      }, splashTime)
    }, []);

    if(!trigger) return;
  
    return showSplashscreen === true ? <Splash />
    : <GlobalProvider>
    <ThemeProvider>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  </GlobalProvider>
  
}