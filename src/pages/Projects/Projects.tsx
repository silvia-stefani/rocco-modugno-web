import * as React from 'react';

import styles from './Projects.module.scss';

import ListView from './ListView';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import { ViewType } from '../../types/ViewType';
import { useState } from 'react';

const Projects: React.FC = () => {

  const [currentView, setCurrentView] = useState("list")
  
  const viewTypes: ViewType[] = [
    {
      id: "list",
      label: "Lista",
      element: <ListView />
    },
    {
      id: "images",
      label: "Immagini",
      element: <div>images</div>
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  return (
    <div className={styles.Projects}>

      <ViewContainer options={viewTypes} onSelect={setCurrentView}/>

      <div>
      {currentElement}
      </div>

    </div>
  )
};

export default Projects;
