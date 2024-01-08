import * as React from 'react';

import styles from './Projects.module.scss';

import ListView from './ListView';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import { ViewType } from '../../types/ViewType';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProject } from '../../interfaces/IProject';
import SlideView from './SlideView';

const Projects: React.FC = () => {

  const {t} = useTranslation()
  const projects = t("projects", {returnObjects: true}) as IProject[];
  
  const [currentView, setCurrentView] = useState("list")
  
  const viewTypes: ViewType[] = [
    {
      id: "list",
      label: "Lista",
      element: <ListView projects={projects} />
    },
    {
      id: "images",
      label: "Immagini",
      element: <SlideView projects={projects} />
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  return (
    <div className={styles.Projects}>

      <ViewContainer options={viewTypes} onSelect={setCurrentView}/>

      <div style={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
        {currentElement}
      </div>

    </div>
  )
};

export default Projects;
