import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Root() {
  
    return (
      <ThemeProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    );
  }