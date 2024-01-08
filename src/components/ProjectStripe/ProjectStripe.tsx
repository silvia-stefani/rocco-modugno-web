import * as React from 'react';
import { IProject } from '../../interfaces/IProject';

import styles from './ProjectStripe.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from '../Image';
import Tag from '../Tag/Tag';

interface IProjectStripeProps {
    project: IProject
}

const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({project}) => {

    const cover = `/${project.id}/${project.images.cover}`;

    const [hovering, setHovering] = useState(false);    

    return <Link key={project.id} 
      className={`${styles.ProjectStripe} ${hovering ? styles.expanded : styles.shrinked}`} 
      to={`/projects/${project.id}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className={styles.image}>
          <Image src={cover} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{project.title}</h4>
        <div className={styles.sub}>{project.subtitle}</div>
      </div>
      <div className={styles.cats}>
        {project.cat.map((c) => (
          <Tag label={c} />
        ))}
      </div>
    </Link>
};

export default ProjectStripe;
