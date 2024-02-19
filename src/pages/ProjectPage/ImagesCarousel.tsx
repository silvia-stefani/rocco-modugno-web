import * as React from 'react';

import styles from './ImagesCarousel.module.scss';
import { MouseEventHandler, useState } from 'react';

import { Image } from '../../components/Image';

interface IImagesCarouselProps {
  path: string;
  gallery: string[]
}

const ImagesCarousel: React.FunctionComponent<IImagesCarouselProps> = ({path, gallery}) => {

  const [currentImage, setCurrentImage] = useState(0)
  const [controls, setControls] = useState({x: 0, y: 0, label: 'Next', cursor: "e-resize"})
  
  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    /* const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX; */
    if(controls.label === "Left") {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
    } else {
      setCurrentImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
    }
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX;

    if (mousePosition >= elW / 2) {
      setControls({x: e.clientX, y: e.clientY, label: "Next", cursor: "e-resize"})
    } else {
      setControls({x: e.clientX, y: e.clientY, label: "Prev", cursor: "w-resize"})
    }
  };

  const currentImageSrc = path + gallery[currentImage];

  console.log(controls);
  

  return (
  <div className={styles.ImagesCarousel}>
    <div className={styles.nav_item} style={{left: controls.x, top: controls.y}}>
      {controls.label}
    </div>
    <div className={styles.image} onClick={handleClick} onMouseMove={handleMouseMove}>
      <Image src={currentImageSrc} />
    </div>
  </div>
  )
};

export default ImagesCarousel;
