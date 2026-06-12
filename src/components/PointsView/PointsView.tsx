import { IProject } from '../../interfaces/IProject';
import { useEffect, useRef, useState } from 'react';
import styles from './PointsView.module.scss';
import Image from 'components/Image/Image';
import { useGlobalContext } from '../../contexts/GlobalContext';
import useMousePosition from '../../hooks/useMousePosition';
import Link from 'next/link';

interface PointPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PointsView = ({ projects }: { projects: IProject[] }) => {
  const { filters } = useGlobalContext();
  const { x: mouseX, y: mouseY } = useMousePosition();
  const { velocity, cohesion, alignment, separation, style } = filters.dynamicView;
  const activeCategory = filters.category;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const requestRef = useRef<number>();

  // Store physics data in a ref to avoid re-renders at 60fps
  const pointsRef = useRef<PointPhysics[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Initialize points if needed
  useEffect(() => {
    if (pointsRef.current.length !== projects.length) {
      pointsRef.current = projects.map(() => ({
        x: Math.random() * window.innerWidth * 0.8,
        y: Math.random() * window.innerHeight * 0.8,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      }));
    }
  }, [projects]);

  const animate = () => {
    if (!containerRef.current) return;

    const containerW = containerRef.current.clientWidth;
    const containerH = containerRef.current.clientHeight;

    const perceptionRadius = 200;
    const minSpeed = velocity * 1.5; // Increased min speed to keep it lively
    const maxSpeed = velocity * 3.5;

    // Clone current states for calculations
    const nextPoints = pointsRef.current.map((p, i) => {
      const project = projects[i];
      const isGhost = activeCategory !== "all" && !project.cat.includes(activeCategory);

      if (isGhost || selectedProjectId === project.id) {
        return { ...p, vx: p.vx * 0.9, vy: p.vy * 0.9 };
      }

      const steeringAlignment = { x: 0, y: 0 };
      const steeringCohesion = { x: 0, y: 0 };
      const steeringSeparation = { x: 0, y: 0 };
      let totalNeighbors = 0;

      pointsRef.current.forEach((other, j) => {
        if (i === j) return;

        const otherProject = projects[j];
        const otherIsGhost = activeCategory !== "all" && !otherProject.cat.includes(activeCategory);
        if (otherIsGhost) return;

        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < perceptionRadius) {
          steeringAlignment.x += other.vx;
          steeringAlignment.y += other.vy;

          steeringCohesion.x += other.x;
          steeringCohesion.y += other.y;

          steeringSeparation.x += (p.x - other.x) / distance;
          steeringSeparation.y += (p.y - other.y) / distance;

          totalNeighbors++;
        }
      });

      if (totalNeighbors > 0) {
        steeringAlignment.x /= totalNeighbors;
        steeringAlignment.y /= totalNeighbors;
        steeringAlignment.x = (steeringAlignment.x - p.vx) * alignment * 0.1;
        steeringAlignment.y = (steeringAlignment.y - p.vy) * alignment * 0.1;

        steeringCohesion.x /= totalNeighbors;
        steeringCohesion.y /= totalNeighbors;
        steeringCohesion.x = (steeringCohesion.x - p.x) * cohesion * 0.005;
        steeringCohesion.y = (steeringCohesion.y - p.y) * cohesion * 0.005;

        steeringSeparation.x /= totalNeighbors;
        steeringSeparation.y /= totalNeighbors;
        steeringSeparation.x *= separation * 0.5;
        steeringSeparation.y *= separation * 0.5;
      }

      // Combined forces + Wander Force (small randomness to prevent static lock)
      let ax = steeringAlignment.x + steeringCohesion.x + steeringSeparation.x;
      let ay = steeringAlignment.y + steeringCohesion.y + steeringSeparation.y;

      ax += (Math.random() - 0.5) * 0.05;
      ay += (Math.random() - 0.5) * 0.05;

      // Simple attraction to center
      ax += (containerW / 2 - p.x) * 0.0001;
      ay += (containerH / 2 - p.y) * 0.0001;

      // Update velocity
      let nvx = p.vx + ax;
      let nvy = p.vy + ay;

      // ENFORCE SPEED LIMITS: Ensures they never stop
      const speed = Math.sqrt(nvx * nvx + nvy * nvy);
      if (speed < minSpeed) {
        const ratio = speed > 0 ? minSpeed / speed : 1;
        nvx = speed > 0 ? nvx * ratio : (Math.random() - 0.5) * minSpeed;
        nvy = speed > 0 ? nvy * ratio : (Math.random() - 0.5) * minSpeed;
      } else if (speed > maxSpeed) {
        const ratio = maxSpeed / speed;
        nvx *= ratio;
        nvy *= ratio;
      }

      // Update position
      let nx = p.x + nvx;
      let ny = p.y + nvy;

      // Improved bounds check with soft bounce
      const margin = 100;
      if (nx < 0) { nx = 0; nvx *= -1; }
      if (nx > containerW - margin) { nx = containerW - margin; nvx *= -1; }
      if (ny < 0) { ny = 0; nvy *= -1; }
      if (ny > containerH - margin) { ny = containerH - margin; nvy *= -1; }

      return { x: nx, y: ny, vx: nvx, vy: nvy };
    });

    pointsRef.current = nextPoints;

    // Apply visual updates directly to DOM for performance
    nextPoints.forEach((p, i) => {
      const el = itemRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [velocity, cohesion, alignment, separation, activeCategory, selectedProjectId]);

  const renderProjectContent = (project: IProject, isHover: boolean) => {
    const src = isHover
      ? `/${project.id}/${project.images.cover}`
      : (project.images.coverPoints ? `/${project.id}/${project.images.coverPoints}` : `/${project.id}/${project.images.cover}`);

    const isSvg = src.toLowerCase().endsWith('.svg');

    if (isSvg) {
      return (
        <div className={styles.svg_container}>
          <div
            className={styles.svg_mask}
            style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
          />
        </div>
      );
    }

    return <div className={styles.image}><Image src={src} /></div>;
  };


  const hoverProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null;

  return (
    <div className={styles.DotsView} ref={containerRef}>
      {projects.map((project, i) => {
        const isGhost = activeCategory !== "all" && !project.cat.includes(activeCategory);

        return (
          <Link
            key={project.id}
            ref={(el: HTMLAnchorElement | null) => { itemRefs.current[i] = el }}
            href={`/projects/${project.id}`}
            className={`${styles.project_flying} ${isGhost ? styles.unable : ''}`}
            style={{
              left: 0,
              top: 0,
              position: 'absolute',
              willChange: 'transform'
            }}
            onMouseEnter={() => setSelectedProjectId(project.id)}
            onMouseLeave={() => setSelectedProjectId(null)}
          >
            {style === "images" ?
              renderProjectContent(project, false) :
              <h6 className={styles.title}>{project.title}</h6>
            }
          </Link>
        );
      })}

      {/* Hover Title overlay */}
      {hoverProject && (
        <div className={styles.selectedProject} style={{ left: mouseX + 16, top: mouseY }}>
          <h6 className={styles.title}>{hoverProject.title}</h6>
        </div>
      )}
    </div>
  );
};

export default PointsView;
