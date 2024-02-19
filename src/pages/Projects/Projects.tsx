import * as React from 'react';

import styles from './Projects.module.scss';

import ListView from './ListView';
import { ViewType } from '../../types/ViewType';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProject } from '../../interfaces/IProject';
import PointsView from './PointsView';
import ProjectStripe from '../../components/ProjectStripe/ProjectStripe';

const Projects: React.FC = () => {

  const { t } = useTranslation()
  const projects = t("projects", { returnObjects: true }) as IProject[];

  const [currentView, setCurrentView] = useState("points")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleViewToggle = () => {
    if(currentView === "list") {
      setCurrentView("points")
    } else {
      setCurrentView("list")
    }
  }

  const handleExpandedToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const viewTypes: ViewType[] = [
    {
      id: "points",
      label: "Punti",
      element: <PointsView projects={projects} />
    },
    {
      id: "list",
      label: "Lista",
      element: projects.map((project: IProject) => <ProjectStripe key={project.id} project={project} increase={isExpanded} />)
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  return (
    <div className={styles.Projects}>

      <div className={styles.menu}>
        <button className={styles.tab} onClick={handleExpandedToggle}>
          <i>{isExpanded ? "↖︎" : "↘︎" }</i>
        </button>
        <button className={styles.tab} onClick={handleViewToggle}>
          <i>↩︎</i>
          view
        </button>
        <button className={styles.tab}>
          <i>↓</i>
          a-z
        </button>
        <button className={styles.tab}>
          <i>→</i>
          category
        </button>
        {/* {viewTypes.map((view) => {
          const activeView = currentView === view.id;
          return (
            <div
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`${styles.link} ${activeView ? styles.current : ''}`}
            >
              {view.label}
            </div>
          );
        })} */}
      </div>

      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
};

export default Projects;
