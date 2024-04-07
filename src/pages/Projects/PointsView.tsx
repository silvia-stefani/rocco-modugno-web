import { IProject } from '../../interfaces/IProject';
import { useEffect, useRef, useState } from 'react';

import styles from './PointsView.module.scss';
import { Link } from 'react-router-dom';
import { Image } from '../../components/Image/Image';
import { useGlobalContext } from '../../contexts/GlobalContext';
import useMousePosition from '../../hooks/useMousePosition';

interface Position {
  dx: number;
  dy: number;
  margin: number;
  x: number;
  y: number;
}

const PointsView = ({ projects }: { projects: IProject[] }) => {

  const { filters } = useGlobalContext()
  const { x, y } = useMousePosition()

  const refContainer = useRef<HTMLDivElement>(null);
  
  const initialArrayPos = projects.map(() => { 
    let x = Math.floor(Math.random() * (window.innerWidth / 2)); // Valore iniziale x
    let y = Math.floor(Math.random() * (window.innerHeight / 2)); // Valore iniziale y
    const dx = Math.random() * 1 + 0.25; // Valore iniziale delta X
    const dy = Math.random() * 1 + 0.25; // Valore iniziale delta Y
    return { dx, dy, margin: 40, x, y };
  })
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    // Inicializa las referencias al tamaño adecuado
    itemRefs.current = itemRefs.current.slice(0, projects.length);
  }, [projects]);

  const [isRunning, setIsRunning] = useState(true)

  const [positions, setPositions] = useState<Array<Position>>(initialArrayPos);

  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const stop = (id: string) => {
    setSelectedProject(id);
    setIsRunning(false);
  };

  const resume = () => {
    setSelectedProject(null);
    setIsRunning(true);
  };

  if(!projects) return null;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const moveElements = () => {
      interval = setInterval(() => {
        setPositions(prevPositions => {
          return prevPositions.map((pos, i) => {
            if (!isRunning) {
              clearInterval(interval);
              return pos;
            }

            let newdx = pos.dx;
            let newdy = pos.dy;

            if (refContainer.current && itemRefs.current[i]) {
              const containerWidth = refContainer.current?.clientWidth;
              const containerHeight = refContainer.current?.clientHeight;

              const elementWidth = itemRefs.current[i]?.clientWidth;
              const elementHeight = itemRefs.current[i]?.clientHeight;
  
              // Utiliza el ancho y alto del elemento para calcular el margen
              const marginX = elementWidth ? containerWidth - elementWidth : 0;
              const marginY = elementHeight ? containerHeight - elementHeight : 0;

              if (pos.x + pos.dx > marginX || pos.x + pos.dx < 0) {
                newdx = -(pos.dx);
              }
              if (pos.y + pos.dy > marginY || pos.y + pos.dy < 0) {
                newdy = -(pos.dy);
              }
            }
            
            const newPosX = pos.x + newdx;
            const newPosY = pos.y + newdy;

            return { dx: newdx, dy: newdy, margin: pos.margin, x: newPosX, y: newPosY };
          });
        });
      }, 1);
    };

    if (isRunning) {
      moveElements();
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const sp = projects.find((p) => p.id === selectedProject);

  return (
    <div className={styles.DotsView} ref={refContainer} id='container'>
      {/* Generar puntos random */}
      {refContainer && projects.map((project, i) => {
        const filteredCats = !(project.cat.includes(filters.category));
        const notCat = filters.category === "all" ? false : filteredCats;
        return (
          <Link
            key={project.id}
            ref={el => itemRefs.current[i] = el}
            to={`/projects/${project.id}`}
            className={`${styles.project_flying} ${notCat ? styles.unable : ''}`}
            style={{
              left: positions[i].x,
              top: positions[i].y
            }}
            onMouseEnter={() => stop(project.id)}
            onMouseLeave={resume}
          >
            {/* Renderiza la imagen del proyecto en hover */}
            {sp?.id === project.id && <div className={styles.selectedProject} style={{ left: x, top: y }}>
              <Image src={`/${sp.id}/${sp.images.cover}`} />
            </div>}
            {/* <div className={styles.dot}></div> */}
            {/* <h6 className={styles.title}>{project.title}</h6> */}
            <Image src={`/${project.id}/${project.images.cover}`} />
          </Link>
        );
      })}
    </div>
  )
}

export default PointsView;
