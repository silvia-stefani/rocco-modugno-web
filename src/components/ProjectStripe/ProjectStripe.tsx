import * as React from 'react';
import { IProject } from '../../interfaces/IProject';

import styles from './ProjectStripe.module.scss';
import { Link } from 'react-router-dom';

interface IProjectStripeProps {
    project: IProject
}

const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({project}) => {

    const cover = `/${project.id}/${project.images.cover}`;
    const isVideo = project.images.cover.includes("vid");

    return <Link key={project.id} className={styles.ProjectStripe} to={`/projects/${project.id}`}>
      <div className={styles.details}>
        <div className={styles.cat}>{project.cat}</div>
      </div>
      <div className={styles.image}>
        {(!isVideo) ?
        <img src={cover} /> :
        <video autoPlay muted>
          <source src={cover} type="video/mp4" />
          <source src={cover} type="video/ogg" />
          Questo video non è compatibile con HTML
        </video>}
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{project.title}</h4>
        <div className={styles.sub}>{project.subtitle}</div>
      </div>
    </Link>
};

export default ProjectStripe;
