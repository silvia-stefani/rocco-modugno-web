import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Root from "./root";
import Projects from "../pages/Projects/Projects";
import Coding from "../pages/Coding";
import Memoires from "../pages/Memoires/Memoires";
import MemoireProject from "../pages/Memoires/MemoireProject";
import ProjectPage from "../pages/ProjectPage/ProjectPage";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "projects/:id",
        element: <ProjectPage />
      },
      {
        path: "coding",
        element: <Coding />
      },
      {
        path: "memoires",
        element: <Memoires />
      },
      {
        path: "memoires/:id",
        element: <MemoireProject />
      }
    ]
  }
])