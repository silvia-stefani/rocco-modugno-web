import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Root from "./root";
import Projects from "../pages/Projects/Projects";
import Coding from "../pages/Coding/Coding";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import Articles from "../pages/Articles/Articles";
import ArticlePage from "../pages/Articles/ArticlePage";

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
        path: "scripts",
        element: <Coding />
      },
      {
        path: "articles",
        element: <Articles />
      },
      {
        path: "article/:id",
        element: <ArticlePage />
      }
    ]
  }
])