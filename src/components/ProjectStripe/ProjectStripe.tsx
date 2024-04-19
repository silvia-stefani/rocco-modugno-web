import * as React from 'react';
import { IProject } from '../../interfaces/IProject';

import styles from './ProjectStripe.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from '../Image/Image';
import Paragraph from '../Paragraph/Paragraph';
import { TagGroup } from '../Tag/Tag';
import { getProjectCats } from '../../utils/getProjectCat';
import { useGlobalContext } from '../../contexts/GlobalContext';

interface IProjectStripeProps {
    project: IProject
}

const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({project}) => {

    const {filters} = useGlobalContext()
    const cover = `/${project.id}/${project.images.cover}`;
    const increase = filters.listView.isExpanded;

    const [hovering, setHovering] = useState(false);    

    return <Link key={project.id} 
      className={`${styles.ProjectStripe} ${hovering ? styles.expanded : ''} ${increase ? styles.increase : ''}`} 
      to={`/projects/${project.id}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className={styles.details}>
        {project.place && <div>{project.place}</div>}
        {project.client && <div>{project.client}</div>}
        {project.details && project.details.map((detail, i) => (
          <div key={i}>{detail}</div>
        ))}
      </div>
      <div className={styles.image}>
          <Image src={cover} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{project.title}</h4>
        { project.subtitle && <Paragraph text={project.subtitle} /> }
        { project.description && <Paragraph text={project.description} /> }
      </div>
      <div className={styles.cats}>
        <TagGroup tags={getProjectCats(project.cat)} />
      </div>
      <div>{project.date}</div>
    </Link>
};

export default ProjectStripe;
