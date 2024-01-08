import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IProject } from '../../interfaces/IProject';
import { useTranslation } from 'react-i18next';

import styles from './ProjectPage.module.scss'
import { ViewType } from '../../types/ViewType';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import GridView from './GridView';
import { TagGroup } from '../../components/Tag/Tag';
import Paragraph from '../../components/Paragraph/Paragraph';
import ImagesCarousel from './ImagesCarousel';

const ProjectPage = () => {

  const { id } = useParams();

  const { t } = useTranslation()
  const projects = t("projects", { returnObjects: true }) as IProject[];
  const project = projects.find(item => item.id === id) as IProject;

  const [currentView, setCurrentView] = React.useState("grid")
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

    <ViewContainer options={viewTypes} onSelect={setCurrentView}  />

    <div className={styles.container}>
      <div className={styles.images}>
        {currentElement}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{project.title}</h3>
        <div>
          <TagGroup tags={project.cat} />
          <div>{project.place}, {project.date}</div>
        </div>
        <div>
          <p>{project.subtitle}</p>
          {project.description && <><br></br>{<Paragraph text={project.description} />}</> }
        </div>
        {project.collab && <div>
          <h6>Collaborazioni</h6>
          {project.collab.map((collab, i) => <div key={i}>{collab}</div>)}
        </div>}
      </div>
    </div>
  </div>;
};

export default ProjectPage;
