import * as React from 'react';

import styles from './Projects.module.scss';

import { ViewType } from '../../types/ViewType';
import { ChangeEventHandler, useState } from 'react';
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

  const alphabeticDescendent = filters.listView.order === "alph-desc";
  const isCurrentStyleImages = filters.dynamicView.style === "images";

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

  const viewTypes: ViewType[] = [
    {
      id: "points",
      label: "Punti",
      element: <PointsView projects={projects} />
    },
    {
      id: "list",
      label: "Lista",
      element: finalProjects.map((project: IProject) => <ProjectStripe key={project.id} project={project}/>)
    }
  ]

  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  /* Filters tooglers functions */
  function handleChangeCat(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      category: value as ProjectsCatsIds
    }))
  }

  function handleChangeOrder() {
    const valueChanged = alphabeticDescendent ? "alph-asc" : "alph-desc";
    setFilters((prevState) => ({
      ...prevState,
      listView: {
        ...prevState.listView,
        order: valueChanged
      }
    }))
  }

  function handleToggleStyle() {
    const valueChanged = isCurrentStyleImages ? "titles" : "images";
    setFilters((prevState) => ({
      ...prevState,
      dynamicView: {
        ...prevState.dynamicView,
        style: valueChanged
      }
    }))
  }

  const handleVelocityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const rangeVvalue = Number(e.currentTarget.value);
    setFilters((prevState) => ({
      ...prevState,
      dynamicView: {
        ...prevState.dynamicView,
        velocity: rangeVvalue
      }
    }))
  }

  const handleExpandedToggle = () => {
    setFilters((prevState) => ({
      ...prevState,
      listView: {
        ...prevState.listView,
        isExpanded: !prevState.listView.isExpanded
      }
    }))
  }

  return (
    <div className={styles.Projects}>

      <div className={`${styles.menu} ${filters.listView.isExpanded ? styles.increase : ''}`}>
        <button className={styles.tab} onClick={handleViewToggle}>
          <span>↩︎</span>
          <div className={styles.tab_label}>view</div>
        </button>
        {currentView === "points" ? <button className={styles.tab} onClick={handleToggleStyle}>
          <span>{isCurrentStyleImages ? "／" : "＼" }</span>
          {isCurrentStyleImages ? "Titles" : "Images"}
        </button> :
        <button disabled={currentView === "points" } className={styles.tab} onClick={handleExpandedToggle}>
          <span>{filters.listView.isExpanded ? "↖︎" : "↘︎" }</span>
        </button> }
        {currentView === "points" ? 
          <div className="range">  
            <input type="range" name="" id="" min={1} max={4} step={1} onChange={handleVelocityChange} />
          </div>
        : <button disabled={currentView === "points" } className={styles.tab} onClick={handleChangeOrder}>
          <span>{alphabeticDescendent ? "↓" : "↑" }</span>
          {alphabeticDescendent ? "a-z" : "z-a" }
        </button> }
        <Select 
          defaultValue={filters.category}
          options={projectsCats} 
          getCurrentValue={handleChangeCat} 
        />
      </div>

      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
};

export default Projects;
