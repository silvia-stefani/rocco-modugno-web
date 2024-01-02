import * as React from 'react';

import styles from './GridView.module.scss';
import { IProject } from '../../interfaces/IProject';

interface IGridViewProps {
    project: IProject
}

const GridView: React.FunctionComponent<IGridViewProps> = ({project}) => {

  const projectID = project.id;
  const gallery = project.images.gallery;

  return <div className={styles.GridView}>
    <div>{gallery.length}</div>
    <div className={styles.grid}>
    {gallery.map((img) => {
      const isVideo = img.includes("vid");
      return <div key={img} className={styles.item}>
        {(!isVideo) ?
          <img src={`/${projectID}/${img}`} /> :
          <video autoPlay muted>
            <source src={`/${projectID}/${img}`} type="video/mp4" />
            <source src={`/${projectID}/${img}`} type="video/ogg" />
            Questo video non è compatibile con HTML
          </video>}
      </div>
    })}
    </div>
  </div>
};

export default GridView;
