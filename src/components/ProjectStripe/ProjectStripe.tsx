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
  project: IProject; // The project data object
  smallDevice: boolean; // Whether the current viewport is a small device
}

/**
 * ProjectStripe component displays a single project as a row in the project list.
 * It includes a cover image, title, subtitle, and detailed metadata (client, date, tags).
 * Features hover effects to reveal more information.
 */
const ProjectStripe: React.FunctionComponent<IProjectStripeProps> = ({ project, smallDevice }) => {

  const { t } = useTranslation()
  const projectsCats = t("projectsCats", { returnObjects: true }) as ProjectsCatsType[];
  const { filters } = useGlobalContext()

  // Construct the path for the project cover image
  const cover = project.images.coverList
    ? `/${project.id}/${project.images.coverList}`
    : `/${project.id}/${project.images.cover}`;

  // Check if the global list view is expanded
  const increase = filters.listView.isExpanded;

  const [hovering, setHovering] = useState(false);

  /**
   * Maps the project's category IDs to their translated human-readable labels.
   * Only returns the first category.
   */
  const projectCats = () => {
    const cats: string[] = [];
    if (project.cat.length > 0) {
      const firstCatId = project.cat[0];
      const catLabel = projectsCats.find(c => c.value === firstCatId)?.label;
      if (catLabel) cats.push(catLabel);
    }
    return cats;
  }

  return <Link key={project.id}
    className={`${styles.ProjectStripe} ${hovering ? styles.expanded : ''} ${increase ? styles.increase : ''}`}
    href={`/projects/${project.id}`}
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}>

    {/* Project image container */}
    <div className={styles.image}>
      <Image src={cover} />
    </div>

    {/* Basic project information (Title, description) */}
    <div className={styles.info}>
      <h4 className={styles.title}>{project.title}</h4>
      {project.subtitle && <Paragraph text={project.subtitle} />}
      {project.description && <Paragraph text={project.description} />}
    </div>

    {/* Detailed metadata, visible only on larger devices */}
    {!smallDevice && <>
      {/* Column 3: Place, Client, Details, Links */}
      <div className={styles.details} onClick={(e) => e.stopPropagation()}>
        {project.place && <div className={styles.place}>{project.place}</div>}
        {project.client && <div className={styles.client}>{project.client}</div>}
        {project.details && project.details.map((detail, i) => (
          <div key={i}>{detail}</div>
        ))}
        {project.link && project.link.map((link, i) => (
          <Link key={i} href={link.url} target='_blank'>{link.name}</Link>
        ))}
      </div>

      {/* Column 4: Date and Categories */}
      <div className={styles.meta_column}>
        {/* Project date */}
        <div className={styles.date}>{project.date}</div>

        {/* Category tags */}
        <div className={styles.cats}>
          <TagGroup tags={projectCats()} />
        </div>
      </div>
    </>}
  </Link>
};

export default ProjectStripe;
