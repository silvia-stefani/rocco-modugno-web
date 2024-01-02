import * as React from 'react';

import styles from './SlidesView.module.scss';
import { IProject } from '../../interfaces/IProject';
import { MouseEventHandler, useState } from 'react';

import arrowL from '../../assets/cursors/arrow_left.svg';
import arrowR from '../../assets/cursors/arrow_right.svg';

interface ISlidesViewProps {
    project: IProject
}

const SlidesView: React.FunctionComponent<ISlidesViewProps> = ({project}) => {

  const projectID = project.id;
  const gallery = [project.images.cover, ...project.images.gallery];

  const [currentImage, setCurrentImage] = useState(0)
  const [hoveredSide, setHoveredSide] = useState<string | null>(null)
  
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    /* const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX; */
    if(hoveredSide === "left") {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
    } else {
      setCurrentImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
    }
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX;

    if (mousePosition >= elW / 2) {
      console.log('right side');
      setHoveredSide("right")
      // Right side arrow
      // Perform any additional logic or UI changes for the right arrow
    } else {
      console.log('left side');
      setHoveredSide("left")
      // Left side arrow
      // Perform any additional logic or UI changes for the left arrow
    }
  };

  const isVideo = gallery[currentImage].includes("vid")
  const cursor = () => {
    let cursor;
    switch (hoveredSide) {
      case "left":
        cursor = arrowL;
        break;
      case "right":
        cursor = arrowR;
        break;
      default:
        cursor = "pointer";
        break;
    }
    return cursor
  }

  console.log(cursor());
  

  return <div className={styles.SlidesView} style={{cursor: `url('${cursor()}') 16 16, auto`}}>
    <div className={styles.image} onClick={handleClick} onMouseMove={handleMouseMove}>
      {(!isVideo) ?
        <img src={`/${projectID}/${gallery[currentImage]}`} /> :
        <video autoPlay muted>
          <source src={`/${projectID}/${gallery[currentImage]}`} type="video/mp4" />
          <source src={`/${projectID}/${gallery[currentImage]}`} type="video/ogg" />
          Questo video non è compatibile con HTML
        </video>}
    </div>
  </div>
};

export default SlidesView;
