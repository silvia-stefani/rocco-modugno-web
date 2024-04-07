import * as React from 'react';

import styles from './GridView.module.scss';
import { IProject } from '../../interfaces/IProject';
import { Image } from '../../components/Image/Image';

interface IGridViewProps {
    project: IProject
}

const GridView: React.FunctionComponent<IGridViewProps> = ({project}) => {

  const projectID = project.id;
  const gallery = project.images.gallery;

  return <div className={styles.GridView}>
    
    <div className={styles.grid}>
    {gallery.map((img) => {
      return <div key={img} className={styles.item}>
        <Image src={`/${projectID}/${img}`} />
      </div>
    })}
    </div>
  </div>
};

export default GridView;
