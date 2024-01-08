import * as React from 'react';
import MouseModule from '../../components/MouseModule/MouseModule';
import { useEffect, useRef, useState } from 'react';

import styles from './Home.module.scss';
import { getFontNumber } from '../../utils/getFontNumber';
import ActionsMenu from '../../components/ActionsMenu/ActionsMenu';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  const elRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 200, y: 200 });

  const handleMove = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPosition({ x: clientX, y: clientY });
  }

  const actions = [
    {
      id: 'color',
      label: 'Cambiare colore',
      keyPress: 'c'
    },
    {
      id: 'enlarge',
      label: 'Ingrandire',
      keyPress: '+'
    }, 
    {
      id: 'reduce',
      label: 'Diminuire',
      keyPress: '-'
    },    
    {
      id: 'font',
      label: 'Attivare/disattivare il font',
      keyPress: 'f'
    },
    {
      id: 'multipy',
      label: 'Moltiplicare',
      keyPress: 'm'
    },
    {
      id: 'rotate',
      label: 'Rotare',
      keyPress: 'r'
    },
    {
      id: 'reset',
      label: 'Resettare',
      keyPress: 'spazio + ↵'
    },
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

    <MouseModule x={position.x} y={position.y} number={number} />

    {/* <div className={styles.actions}>
      {actions.map((action) => (
        <div key={action.id} className={styles.action}>{action.label}: {action.keyPress}</div>
      ))}
    </div> */}
    <ActionsMenu actions={actions} />
   
    <div className={styles.numbers}>
      <div>
        x: {position.x}
      </div>
      <div>
        y: {position.y}
      </div>
      <div>
        testo: {number.map((n, i) => <div key={i}>{n}</div>)}
      </div>
    </div>

    <div className={styles.btn}>
      <Link to={'/memoires'}>Scopri di più</Link>
    </div>

  </div>
};

export default Home;
