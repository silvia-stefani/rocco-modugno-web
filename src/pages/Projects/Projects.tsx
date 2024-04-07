import * as React from 'react';

import styles from './Projects.module.scss';

import { ViewType } from '../../types/ViewType';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProject, ProjectsCatsIds } from '../../interfaces/IProject';
import PointsView from './PointsView';
import ProjectStripe from '../../components/ProjectStripe/ProjectStripe';
import { orderByAlphabet } from '../../utils/orderByAlphabet';
import Select from '../../components/Select/Select';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Option } from '../../components/Select/Select';

const Projects: React.FC = () => {

  const { t } = useTranslation()
  const { filters, setFilters } = useGlobalContext()
  const projectsObject = t("projects", { returnObjects: true }) as IProject[];
  const projectsCats = t("projectsCats", { returnObjects: true }) as Option[];
  const [currentView, setCurrentView] = useState("points")
  const [isExpanded, setIsExpanded] = useState(false)
  const [alphabeticDescendent, setAlphabeticDescendent] = useState(true);

  const projects = orderByAlphabet(projectsObject, "title", alphabeticDescendent);
  const filteredCatsProjects = projects.filter(val => val.cat.includes(filters.category));
  const finalProjects = filters.category !== "all" ? filteredCatsProjects : projects;

  const handleViewToggle = () => {
    if(currentView === "list") {
      setCurrentView("points")
    } else {
      setCurrentView("list")
    }
  }

  const handleExpandedToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const viewTypes: ViewType[] = [
    {
      id: "points",
      label: "Punti",
      element: <PointsView projects={projects} />
    },
    {
      id: "list",
      label: "Lista",
      element: finalProjects.map((project: IProject) => <ProjectStripe key={project.id} project={project} increase={isExpanded} />)
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  function handleChange(option: Option) {
    setFilters({category: option.value as ProjectsCatsIds})
  }

  return (
    <div className={styles.Projects}>

      <div className={`${styles.menu} ${isExpanded ? styles.increase : ''}`}>
        <button className={styles.tab} onClick={handleViewToggle}>
          <i>↩︎</i>
          <div className={styles.tab_label}>view</div>
        </button>
        <button disabled={currentView === "points" } className={styles.tab} onClick={handleExpandedToggle}>
          <i>{isExpanded ? "↖︎" : "↘︎" }</i>
        </button>
        <button disabled={currentView === "points" } className={styles.tab} onClick={() => setAlphabeticDescendent(!alphabeticDescendent)}>
          <i>{alphabeticDescendent ? "↓" : "↑" }</i>
          {alphabeticDescendent ? "a-z" : "z-a" }
        </button>
        <Select 
          defaultValue={projectsCats[0]}
          options={projectsCats} 
          getCurrentValue={handleChange} 
        />
      </div>

      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
};

export default Projects;
