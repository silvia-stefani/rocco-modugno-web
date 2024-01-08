import { IProject } from '../../interfaces/IProject';
import { useEffect, useRef, useState } from 'react';

import styles from './Projects.module.scss';
import { Image } from '../../components/Image';

const SlideView = ({ projects }: { projects: IProject[] }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const nextProject = () => {
    if (!isAnimating.current) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      disableScrollTemporarily();
    }
  };

  const prevProject = () => {
    if (!isAnimating.current) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
      disableScrollTemporarily();
    }
  };

  const disableScrollTemporarily = () => {
    document.body.style.overflow = "hidden"
    isAnimating.current = true;
    setTimeout(() => {
      isAnimating.current = false;
      document.body.style.overflow = "unset"
    }, 1000); // Tiempo de duración de la animación en milisegundos
  };

  const handleScroll = (event: WheelEvent) => {
    if (carouselRef.current && !isAnimating.current) {
      if (event.deltaY > 0) {
        // Scrolling down
        nextProject()
      } else {
        // Scrolling up
        prevProject();
      }
      disableScrollTemporarily();
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return <>
    <div ref={carouselRef} className={styles.Slider} style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
      {projects.map((project, index) => {
        const img = `/${project.id}/${project.images.cover}`;
        return <div key={index} className={styles.project}>
          <div className={styles.img}>
            <Image src={img} />
          </div>
          <div className={styles.info}>
            {project.title}
          </div>
        </div>
      })}
    </div>
    {/* <button className="prev-btn" onClick={prevProject}>❮</button> */}
    {/* <button className="next-btn" onClick={nextProject}>❯</button> */}
  </>
};

export default SlideView;
