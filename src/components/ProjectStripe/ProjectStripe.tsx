import * as React from 'react';
import { IProject } from '../../interfaces/IProject';

import styles from './ProjectStripe.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from '../Image';
import Tag from '../Tag/Tag';
import Paragraph from '../Paragraph/Paragraph';

interface IProjectStripeProps {
    project: IProject,
    increase: boolean
}

const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({project, increase}) => {

    const cover = `/${project.id}/${project.images.cover}`;

    const [hovering, setHovering] = useState(false);    

    return <Link key={project.id} 
      className={`${styles.ProjectStripe} ${hovering ? styles.expanded : ''} ${increase ? styles.increase : ''}`} 
      to={`/projects/${project.id}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className={styles.image}>
          <Image src={cover} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{project.title}</h4>
        { project.subtitle && <Paragraph text={project.subtitle} /> }
        { project.description && <Paragraph text={project.description} /> }
      </div>
      <div className={styles.details}>
        <div>{project.place}</div>
        <div>{project.client}</div>
        <div>{project.collab}</div>
      </div>
      <div className={styles.cats}>
        {project.cat.map((c, i) => (
          <div key={i} className={styles.cat}>{c}</div>
        ))}
      </div>
      <div>{project.date}</div>
    </Link>
};

export default ProjectStripe;
