import * as React from 'react';
import MouseModule from '../../components/MouseModule/MouseModule';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import styles from './Home.module.scss';

const Home: React.FC = () => {

  const { t } = useTranslation();

  const services = t('services', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    subtitle: string;
  }>

  const elRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 40, y: 40 });

  const handleMove = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPosition({ x: clientX, y: clientY });
  }

  return <div ref={elRef} className={styles.Home} onMouseMove={handleMove} onTouchMove={handleMove}>

    {/* <div className={styles.actions}>
      <div className={styles.action}>Premi la barra di spazio</div>
    </div> */}
    <MouseModule x={position.x} y={position.y} element={elRef} />
    
    {/* <div className={styles.services}>
      {services.map((service: any) => (
          <div key={service.id} className={styles.service}>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.text}>{service.subtitle}</p>
          </div>
        ))}
    </div> */}

  </div>
};

export default Home;
