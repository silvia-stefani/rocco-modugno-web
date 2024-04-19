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
    if (currentView === "list") {
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
      element: finalProjects.map((project: IProject) => <ProjectStripe key={project.id} project={project} />)
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
          <span>{isCurrentStyleImages ? "／" : "＼"}</span>
          {isCurrentStyleImages ? "Titles" : "Images"}
        </button> :
          <button disabled={currentView === "points"} className={styles.tab} onClick={handleExpandedToggle}>
            <span>{filters.listView.isExpanded ? "↖︎" : "↘︎"}</span>
          </button>}
        {currentView === "list" && <button className={styles.tab} onClick={handleChangeOrder}>
          <span>{alphabeticDescendent ? 
          <span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
          {filters.listView.isExpanded ? <polygon className="cls-1" points="20.85 26.6 63.05 68.9 28.45 69.3 23.75 73.9 28.45 78.4 79.15 78.4 79.15 27.7 74.65 23 70.05 27.7 69.65 62.3 27.35 20.1 20.85 26.6"/>
          : <polygon className="cls-1" points="44.72 10.2 44.72 71.5 18.62 47 12.12 47 12.12 54.1 49.72 90.4 87.32 54.1 87.32 47 80.82 47 54.72 71.5 54.72 10.2 44.72 10.2"/>
        }
        </svg>
          </span> : "↑"}</span>
          {alphabeticDescendent ? "a-z" : "z-a"}
        </button>}
        <Select
          defaultValue={filters.category}
          options={projectsCats}
          getCurrentValue={handleChangeCat}
        />
        {currentView === "points" && <div className="range">
          <input type="range" name="" id="" min={0.25} max={10} step={0.1} onChange={handleVelocityChange} />
        </div>}
      </div>

      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
};

export default Projects;
