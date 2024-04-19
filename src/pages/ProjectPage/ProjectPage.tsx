import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IProject } from '../../interfaces/IProject';
import { useTranslation } from 'react-i18next';

import styles from './ProjectPage.module.scss'
import { ViewType } from '../../types/ViewType';
import GridView from './GridView';
import { TagGroup } from '../../components/Tag/Tag';
import Paragraph from '../../components/Paragraph/Paragraph';
import ImagesCarousel from './ImagesCarousel';
import { getProjectCats } from '../../utils/getProjectCat';

const ProjectPage = () => {

  const { id } = useParams();
  const { t } = useTranslation()
  const projects = t("projects", { returnObjects: true }) as IProject[];
  const project = projects.find(item => item.id === id) as IProject;

  const [currentView, setCurrentView] = React.useState("slides")
  const viewTypes: ViewType[] = [
    {
      id: "grid",
      label: "Griglia",
      element: <GridView project={project} />

    },
    {
      id: "slides",
      label: "Slides",
      element: <ImagesCarousel path={`/${project.id}/`} gallery={project.images.gallery} />
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  if (!project) return null;

  return <div className={styles.ProjectPage}>

    {/* <div className={styles.nav}>{viewTypes.map((view) => {
      const activeView = currentView === view.id;
      return (
        <div
          key={view.id}
          onClick={() => setCurrentView(view.id)}
          className={`${styles.link} ${activeView ? styles.current : ''}`}
        >
          {view.label}
        </div>
      );
    })}</div> */}

    <div className={styles.container}>
      <div className={styles.images}>
        {currentElement}
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
