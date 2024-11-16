'use client'
import * as React from 'react';

import styles from './ImagesCarousel.module.scss';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Icon from 'components/Icon/Icon';
import Image from 'components/Image/Image';

interface IImagesCarouselProps {
  path: string;
  gallery: string[]
}

const ImagesCarousel: React.FunctionComponent<IImagesCarouselProps> = ({path, gallery}) => {

  const [topPosition, setTopPosition] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0)
  const [controls, setControls] = useState({direction: 'left', x: 0, y: 0, icon: 'ArrowRight'})
  const relativeEl = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (relativeEl.current) {
      const rect = relativeEl.current.getBoundingClientRect();
      setTopPosition(rect.top);
    }
  }, [controls]);

  
  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    /* const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX; */
    if(controls.direction === "left") {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
    } else {
      setCurrentImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
    }
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const elW = e.currentTarget.getBoundingClientRect().width;
    const mousePosition = e.clientX;

    if(topPosition) {
      if (mousePosition >= elW / 2) {
        setControls({x: e.clientX, y: e.clientY - topPosition, direction: "right", icon: "ArrowRight"})
      } else {
        setControls({x: e.clientX, y: e.clientY - topPosition, direction: "left", icon: "ArrowLeft"})
      }
    }
  };

  const currentImageSrc = path + gallery[currentImage];

  return (
  <div className={styles.ImagesCarousel} ref={relativeEl} style={{cursor: gallery.length > 1 ? 'none' : 'default'}}>
    {gallery.length > 1 && <div className={styles.nav_item} style={{left: controls.x, top: controls.y}}>
      <Icon size={48} name={controls.icon} />
    </div>}
    <div className={styles.image} onClick={handleClick} onMouseMove={handleMouseMove}>
      <Image src={currentImageSrc} />
    </div>
  </div>
  )
};

export default ImagesCarousel;
