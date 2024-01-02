import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IProject } from '../../interfaces/IProject';
import { useTranslation } from 'react-i18next';

import styles from './ProjectPage.module.scss'
import { ViewType } from '../../types/ViewType';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import GridView from './GridView';
import SlidesView from './SlidesView';

const ProjectPage = () => {

  const { id } = useParams();

  const { t } = useTranslation()
  const projects = t("projects", { returnObjects: true }) as IProject[];
  const project = projects.find(item => item.id === id) as IProject;

  const [currentView, setCurrentView] = React.useState("grid")
  const viewTypes: ViewType[] = [
    {
      id: "grid",
      label: "Griglia",
      element: <GridView project={project} />
      
    },
    {
      id: "slides",
      label: "Slides",
      element: <SlidesView project={project} />
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element
  
  if (!project) return null;

  return <div className={styles.ProjectPage}>

    <ViewContainer options={viewTypes} onSelect={setCurrentView}  />

    <div className={styles.container}>
      <div className={styles.images}>
        {currentElement}
      </div>
      <div className={styles.info}>
        <div>
          <div>{project.cat}</div>
          <div>{project.date}</div>
        </div>
        <h6>{project.title}</h6>
      </div>
    </div>
  </div>;
};

export default ProjectPage;
