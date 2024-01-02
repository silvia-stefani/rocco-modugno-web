import * as React from 'react';
import MouseModule from '../../components/MouseModule/MouseModule';
import { useEffect, useRef, useState } from 'react';

import styles from './Home.module.scss';
import { getFontNumber } from '../../utils/getFontNumber';

const Home: React.FC = () => {

  /* const { t } = useTranslation(); */

  /* const services = t('services', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    subtitle: string;
  }> */

  const elRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 40, y: 40 });

  const handleMove = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPosition({ x: clientX, y: clientY });
  }

  const [showAbout, setShowAbout] = useState(false)

  const actions = [
    {
      id: 'color',
      label: 'Cambiare colore',
      keyPress: 'c'
    },
    {
      id: 'font',
      label: 'Indossare il font',
      keyPress: 'f'
    },
    {
      id: 'multipy',
      label: 'Moltiplicare',
      keyPress: 'm'
    },
    {
      id: 'number',
      label: 'Spogliare il font',
      keyPress: 'n'
    },
    {
      id: 'reset',
      label: 'Resettare',
      keyPress: 'spazio + ↵'
    },
    {
      id: 'rotate',
      label: 'Rotare',
      keyPress: 'r'
    }
  ]  

  const [number, setNumber] = useState<string[]>([])
  
  useEffect(() => {
    const num = getFontNumber({
      x: position.x,
      element: elRef
    })
    if(num) setNumber(num)
  }, [position.x])
  

  return <div 
    ref={elRef} onMouseMove={handleMove} onTouchMove={handleMove}
    className={styles.Home}>

    { showAbout && <div className={styles.about}>
      <h3 className={styles.name}>ROCCO LORENZO MODUGNO</h3>
      <ul className={styles.list}>
        <li className={styles.item}>Soluzioni editoriali e consulenze specializzate per l’impresa, il design e l’arte.</li>
        <li className={styles.item}>Ottimizzo processi editoriali per farti risparmiare tempo.</li>
        <li className={styles.item}>Offro consulenze specializzate per la digital trasformation.</li>
        <li className={styles.item}>Faccio ricerca nell’ambito del creative coding e pattern making.</li>
      </ul>
    </div> }

    {/* <div className={styles.actions}>
      <div className={styles.action}>Spazio</div>
    </div> */}
    <MouseModule x={position.x} y={position.y} number={number} />

    <div className={styles.actions}>
      {actions.map((action) => (
        <div key={action.id} className={styles.action}>{action.label}: {action.keyPress}</div>
      ))}
    </div>
   
    <div className={styles.number}>
      <div>
        x: {position.x}
      </div>
      <div>
        y: {position.y}
      </div>
      <div>
        {number.map((n) => <div key={n}>{n}</div>)}
      </div>
    </div>
     
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
