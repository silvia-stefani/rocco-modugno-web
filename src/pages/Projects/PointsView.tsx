import { IProject } from '../../interfaces/IProject';
import { useEffect, useState } from 'react';

import styles from './PointsView.module.scss';

const PointsView = ({ projects }: { projects: IProject[] }) => {
  
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)

  const handleMouseEnter = (p: IProject) => {
    setSelectedProject(p)
  }
  


  return <div className={styles.DotsView} id='container'>

    {selectedProject && (
      <div className={styles.cover_image}>
        <img src={`/${selectedProject.id}/${selectedProject.images.cover}`} alt={selectedProject.title} />
      </div>
    )} 

    {/* Generar puntos */}
    {projects.map((project) => {

      return <div
        key={project.id}
        className={styles.project_flying}
        style={{
          
        }}
        /* onMouseEnter={() => { handleMouseEnter(project) }} */
        /* onMouseLeave={handleMouseLeave} */
      >
        <div className={styles.dot}></div>
        <h6 className={styles.title}>{project.id}</h6>
      </div>
      })}

  </div>
};

export default PointsView;
