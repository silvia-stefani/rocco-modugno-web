import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { ThemeProvider } from "../contexts/ThemeContext";
import Splash from "../pages/Splash";
import { useEffect, useState } from "react";
import { GlobalProvider } from "../contexts/GlobalContext";

export default function Root() {

    const runSplash = localStorage.getItem("pageloaded");
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
      if(runSplash === "true") {
        setTrigger(true)
      }
    }, [runSplash])
    
    return <GlobalProvider>
      <ThemeProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
      </GlobalProvider>
  }