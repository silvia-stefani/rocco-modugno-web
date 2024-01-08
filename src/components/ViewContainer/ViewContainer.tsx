import * as React from 'react';

import styles from './ViewContainer.module.scss';
import { useState } from 'react';
import { ViewType } from '../../types/ViewType';

interface IViewContainerProps {
  options: ViewType[];
  onSelect: (id:string) => void;
}

const ViewContainer: React.FunctionComponent<IViewContainerProps> = ({
  options,
  onSelect
}) => {

  const [currentView, setCurrentView] = useState(options[0].id);

  const handleOptionClick = (option: string) => {
    setCurrentView(option);
    onSelect(option);
  };

  /* const currentViewObject = options.find((option) => option.id === currentView); */

  return <div className={styles.ViewContainer}>
    <div className={styles.menu}>
      <div>Visualizzazione:</div>
      {options.map((view) => {
        const activeView = currentView === view.id;
        return (
          <div
            key={view.id}
            onClick={() => handleOptionClick(view.id)}
            className={`${styles.link} ${activeView ? styles.current : ''}`}
          >
            {view.label}
          </div>
        );
      })}
    </div>
    {/* { currentViewObject && currentViewObject.element && <div>
      {currentViewObject.element}
    </div> } */}
    </div>
};

export default ViewContainer;

