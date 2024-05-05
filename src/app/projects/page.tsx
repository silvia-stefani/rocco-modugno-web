'use client'
import * as React from 'react';

import styles from './Projects.module.scss';

import { ViewType } from '../../types/ViewType';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProject, ProjectsCatsIds } from '../../interfaces/IProject';
import PointsView from './PointsView';
import ProjectStripe from '../../components/ProjectStripe/ProjectStripe';
import { orderByAlphabet } from '../../utils/orderByAlphabet';
import Select from '../../components/Select/Select';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Option } from '../../components/Select/Select';
import Icon from '../../components/Icon/Icon';
import Range from '../../components/Range/Range';

export default function Projects() {

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

  const handleVelocityChange = (n: string) => {
    const rangeVvalue = Number(n);
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

      <div className={`${styles.menu} ${styles[currentView]} ${filters.listView.isExpanded ? styles.increase : ''}`}>
        <button className={styles.tab} onClick={handleViewToggle}>
          <span>↩</span>
          <div className={styles.tab_label}>view</div>
        </button>
        {currentView === "points" ? <button className={styles.tab} onClick={handleToggleStyle}>
          <span>{isCurrentStyleImages ? "／" : "＼"}</span>
          {isCurrentStyleImages ? "Titles" : "Images"}
        </button> :
          <button disabled={currentView === "points"} className={styles.tab} onClick={handleExpandedToggle}>
            <Icon size={14} name={filters.listView.isExpanded ? "ArrowTL" : "ArrowDR"} />
          </button>}
        {currentView === "list" && <button className={styles.tab} onClick={handleChangeOrder}>
          <Icon size={14} name={alphabeticDescendent ? "ArrowDown" : "ArrowUp"} />
          {alphabeticDescendent ? "a-z" : "z-a"}
        </button>}
        <Select
          defaultValue={filters.category}
          options={projectsCats}
          getCurrentValue={handleChangeCat}
        />
        {currentView === "points" && <Range defaultValue={filters.dynamicView.velocity} id='pr-dotv' onChange={handleVelocityChange} />}
      </div>

      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
};
