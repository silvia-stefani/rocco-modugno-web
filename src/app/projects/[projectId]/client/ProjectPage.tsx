'use client'
import ImagesCarousel from "components/ImagesCarousel/ImagesCarousel";
import Paragraph from "components/Paragraph/Paragraph";
import { IProject } from "interfaces/IProject";
import { useTranslation } from "react-i18next";

import styles from './ProjectPage.module.scss';

const ProjectPage = ({ projectId }: { projectId: string } ) => {

    const id = projectId;
    const { t } = useTranslation()
    const projects = t("projects", { returnObjects: true }) as IProject[];
    const project = projects.find(item => item.id === id) as IProject;
  
    if (!project) return null;
  
    return <div className={styles.ProjectPage}>
  
      <div className={styles.container}>
        <div className={styles.images}>
          <ImagesCarousel path={`/${project.id}/`} gallery={project.images.gallery} />
        </div>
        <div className={styles.info}>
  
          <div className={styles.head}>
            <h3 className={styles.title}>{project.title}</h3>
          </div>
  
          <p>{project.subtitle}</p>
          {project.description && <Paragraph text={project.description} />}
  
          {project.details && <div className={styles.collab}>
            <ul className={styles.details}>
              <li>{project.place} {project.date}</li>
              {project.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>}
  
        </div>
      </div>
    </div>;
  };
  
  export default ProjectPage;