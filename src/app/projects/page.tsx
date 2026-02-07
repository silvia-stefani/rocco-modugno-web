'use client'
import * as React from 'react';

import styles from './Projects.module.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon/Icon';
import PointsView from 'components/PointsView/PointsView';
import ProjectStripe from 'components/ProjectStripe/ProjectStripe';
import Select from 'components/Select/Select';
import { useGlobalContext } from 'contexts/GlobalContext';
import useBreakpoints from 'hooks/useBreakpoints';
import { IProject, ProjectsCatsIds } from 'interfaces/IProject';
import { ViewType } from 'types/ViewType';
import { orderByAlphabet } from 'utils/orderByAlphabet';
import { Option } from 'types/Option';
import Range from 'components/Range/Range';

/**
 * Projects Page Component.
 * Acts as the main controller for displaying the portfolio of projects.
 * Supports two main view modes: 'list' (structured) and 'points' (generative/dynamic).
 * Handles filtering by category, sorting, and view-specific settings.
 */
export default function Projects() {

  const { t } = useTranslation()
  const { filters, setFilters, scrollPosition, currentView, setCurrentView } = useGlobalContext()
  const { smallDevice } = useBreakpoints();

  // Load raw project data and category labels from translation files
  const projectsObject = t("projects", { returnObjects: true }) as IProject[];
  const projectsCats = t("projectsCats", { returnObjects: true }) as Option[];

  // Derived state for sorting and styling
  const alphabeticDescendent = filters.listView.order === "alph-desc";
  const isCurrentStyleImages = filters.dynamicView.style === "images";

  // Process projects: Apply sorting and category filtering
  const projects = orderByAlphabet(projectsObject, "date", alphabeticDescendent);
  const filteredCatsProjects = projects.filter(val => val.cat.includes(filters.category));
  const finalProjects = filters.category !== "all" ? filteredCatsProjects : projects;

  /**
   * Toggles between 'list' and 'points' view modes.
   */
  const handleViewToggle = () => {
    if (currentView === "list") {
      setCurrentView("points")
    } else {
      setCurrentView("list")
    }
  }

  /**
   * Defines the configuration for each view mode.
   * 'points': Responsive generative view where projects float.
   * 'list': Structured list of projects using ProjectStripe rows.
   */
  const viewTypes: ViewType[] = [
    {
      id: "points",
      label: "Punti",
      element: <PointsView projects={projects} />
    },
    {
      id: "list",
      label: "Lista",
      element: finalProjects.map((project: IProject) => <ProjectStripe smallDevice={smallDevice} key={project.id} project={project} />)
    }
  ]

  // Find the element to render based on the current context view
  const currentElement = viewTypes.find((view) => view.id === currentView)?.element

  /* Filter Toggle Functions */

  /**
   * Updates the active project category filter.
   */
  function handleChangeCat(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      category: value as ProjectsCatsIds
    }))
  }

  /**
   * Toggles the alphabetical sort order (A-Z / Z-A).
   */
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

  /**
   * Points View Only: Toggles between 'images' and 'titles' visualization style.
   */
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
  /**
   * Updates any numeric filter in the dynamicView.
   */
  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      dynamicView: {
        ...prev.dynamicView,
        [key]: Number(value)
      }
    }));
  };



  /**
   * List View Only: Toggles expanded state to show/hide project details in the list.
   */
  const handleExpandedToggle = () => {
    setFilters((prevState) => ({
      ...prevState,
      listView: {
        ...prevState.listView,
        isExpanded: !prevState.listView.isExpanded
      }
    }))
  }

  // Preserve scroll position when navigating within the projects context
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  if (!currentView) return null;

  return (
    <div className={styles.Projects}>

      {/* Control Menu: Switches icons and buttons based on the current view mode */}
      <div className={`${styles.menu} ${styles[currentView]} ${filters.listView.isExpanded ? styles.increase : ''}`}>

        {/* Column 1: Switch View AND Expand Arrow (List only) */}
        <div className={styles.col1}>
          <button className={styles.tab} onClick={handleViewToggle}>
            <Icon size={14} name={"Return"} />
            <div className={styles.tab_label}>{t('ui.view')}</div>
          </button>

          {currentView === "list" && !smallDevice && (
            <button className={`${styles.tab} ${styles.expandArrow}`} onClick={handleExpandedToggle}>
              <Icon size={14} name={filters.listView.isExpanded ? "ArrowTL" : "ArrowDR"} />
            </button>
          )}

          {/* Points view specific: Toggle Style (Images/Titles) - REMOVED MOMENTARILY */}
          {/* {currentView === "points" && (
            <button className={styles.tab} onClick={handleToggleStyle}>
              <span>{isCurrentStyleImages ? "／" : "＼"}</span>
              {isCurrentStyleImages ? t('ui.titles') : t('ui.images')}
            </button>
          )} */}
        </div>

        {/* Column 2: Category Filter Dropdown (Aligned with Project Titles) */}
        <div className={styles.col2}>
          <Select
            defaultValue={filters.category}
            options={projectsCats}
            getCurrentValue={handleChangeCat}
          />
        </div>

        {/* Column 3: Speed & Alignment (Points view) / Spacer (List view) */}
        <div className={styles.col3}>
          {currentView === "points" ? (
            <div className={styles.flockingGroup}>
              <Range
                id="v-velocity"
                label={t('ui.velocity') || 'Velocity'}
                defaultValue={filters.dynamicView.velocity}
                min={0}
                max={3}
                step={0.01}
                onChange={(v) => updateFilter('velocity', v)}
              />
              <Range
                id="v-alignment"
                label={t('ui.alignment') || 'Alignment'}
                defaultValue={filters.dynamicView.alignment}
                min={-1}
                max={1}
                step={0.01}
                onChange={(v) => updateFilter('alignment', v)}
              />
            </div>
          ) : (
            <button className={styles.tab} onClick={handleChangeOrder}>
              <Icon size={14} name={alphabeticDescendent ? "ArrowDown" : "ArrowUp"} />
              {t('ui.sort')}
            </button>
          )}
        </div>

        {/* Column 4: Cohesion & Separation (Points view) / Sorting (List view) */}
        <div className={styles.col4}>
          {currentView === "points" && (
            <div className={styles.flockingGroup}>
              <Range
                id="v-cohesion"
                label={t('ui.cohesion') || 'Cohesion'}
                defaultValue={filters.dynamicView.cohesion}
                min={-1}
                max={1}
                step={0.01}
                onChange={(v) => updateFilter('cohesion', v)}
              />
              <Range
                id="v-separation"
                label={t('ui.separation') || 'Separation'}
                defaultValue={filters.dynamicView.separation}
                min={-1}
                max={1}
                step={0.01}
                onChange={(v) => updateFilter('separation', v)}
              />
            </div>
          )}
        </div>

      </div>

      {/* The main viewport area which renders either the floating points or the structured list */}
      <div className={styles.view}>
        {currentElement}
      </div>

    </div>
  )
}

