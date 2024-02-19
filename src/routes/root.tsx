import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { ThemeProvider } from "../contexts/ThemeContext";
import Splash from "../pages/Splash";
import { useEffect, useState } from "react";

export default function Root() {

    const runSplash = localStorage.getItem("pageloaded");
    const [trigger, setTrigger] = useState(false)

    console.log(runSplash);

    useEffect(() => {
      if(runSplash === "true") {
        setTrigger(true)
      }
    }, [runSplash])
    
    return /* !trigger ? <Splash /> : */ <ThemeProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
  }