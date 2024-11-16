import * as React from 'react';
import { IProject } from '../../interfaces/IProject';

import styles from './ProjectStripe.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'components/Image/Image';
import Paragraph from '../Paragraph/Paragraph';
import { TagGroup } from '../Tag/Tag';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useTranslation } from 'react-i18next';
import { ProjectsCatsType } from '../../types/ProjectsTypes';

interface IProjectStripeProps {
    project: IProject;
    smallDevice: boolean;
}

const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({project, smallDevice}) => {

    const { t } = useTranslation()
    const projectsCats = t("projectsCats", { returnObjects: true }) as ProjectsCatsType[];
    const {filters} = useGlobalContext()
    const cover = `/${project.id}/${project.images.cover}`;
    const increase = filters.listView.isExpanded;

    const [hovering, setHovering] = useState(false);    

    const projectCats = () => {
      const cats: string[] = [];
      project.cat.forEach(value => {
        const catsList = projectsCats.find(project => project.value === value)?.label;
        if (catsList) {
          cats.push(catsList);
        }
    });

      return cats;

    }

    return <Link key={project.id} 
      className={`${styles.ProjectStripe} ${hovering ? styles.expanded : ''} ${increase ? styles.increase : ''}`} 
      href={`/projects/${project.id}`}
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
      {!smallDevice && <>
      <div className={styles.details}>
        {project.place && <div>{project.place}</div>}
        {project.client && <div>{project.client}</div>}
        {project.details && project.details.map((detail, i) => (
          <div key={i}>{detail}</div>
        ))}
      </div>
      <div className={styles.cats}>
        <TagGroup tags={projectCats()} />
      </div>
      <div className={styles.date}>{project.date}</div>
      </>}
    </Link>
};

export default ProjectStripe;
