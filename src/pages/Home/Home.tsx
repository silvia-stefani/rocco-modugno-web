import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './Home.module.scss';
import Module from '../../components/Module/Module';
import { moduleActions } from '../../utils/moduleActions';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import useMousePosition from '../../hooks/useMousePosition';
import { useGlobalContext } from '../../contexts/GlobalContext';

const Home: React.FC = () => {

  type modules = { nums: number, font: string, x: number; y: number; s: number, r: number };

  const modulesRef = useRef<HTMLDivElement>(null)
  const modW = modulesRef.current ? modulesRef.current.clientWidth : 0;
  const modH = modulesRef.current ? modulesRef.current.clientHeight : 0;
  const initialValues = {
    nums: 129,
    font: 'rolo deco rounded',
    s: 40,
    r: 0,
    x: Math.floor(Math.random() * (modW + 1)),
    y: Math.floor(Math.random() * (modH + 1))
  }
  
  const [printSettings, setPrintSettings] = useState<modules>(initialValues);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  
  const { x: mouseX, y: mouseY } = useMousePosition();
  const { fixedTexts, setFixedTexts } = useGlobalContext();
  useEffect(() => {
    const clientX = Math.floor(mouseX / initialValues.s) * initialValues.s;
    const clientY = Math.floor(mouseY / initialValues.s) * initialValues.s;
    setPosition({ x: clientX, y: clientY });
  }, [mouseX, mouseY])
  
  function moduleHomeActions (action: string) {
    switch (action) {
      case 'ArrowRight':
        setPrintSettings((prev) => ({
          ...prev,
          nums: prev.nums + 1
        }));
        break;
      case 'ArrowLeft':
        setPrintSettings((prev) => ({
          ...prev,
          nums: prev.nums - 1
        }));
        break;
      case 'ArrowUp':
        setPrintSettings((prev) => ({
          ...prev,
          s: prev.s * 2
        }));
        break;
      case 'ArrowDown':
        if (printSettings.s > 10) {
          setPrintSettings((prev) => ({
            ...prev,
            s: prev.s / 2
          }));
        }
        break;
      case 'r':
        setPrintSettings((prev) => ({
          ...prev,
          r: prev.r + 45,
          s: prev.r.toString().endsWith('5') ? prev.s * Math.sqrt(2) : prev.s / Math.sqrt(2)
        }));
        break;
      case 'b':
        setPrintSettings((prev) => ({
          ...prev,
          font: prev.font === 'rolo deco' ? 'rolo deco rounded' : 'rolo deco'
        }));
        break;
      case 'z':
        setFixedTexts((prev) => ( prev.slice(0, -1) ));
        break;
      default:
      break;
    }
    
  } 
        
  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) => {
    const gridMouseX = Math.floor(e.touches ? e.touches[0] : e.clientX / initialValues.s) * initialValues.s;
    const gridMouseY = Math.floor(e.touches ? e.touches[0] : e.clientY / initialValues.s) * initialValues.s;
    setFixedTexts([...fixedTexts, { ...printSettings, x: gridMouseX, y: gridMouseY }]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {

    moduleHomeActions(event.key)

    // Reset num if it exceeds pow(n, k) / 4
    if (printSettings.nums > Math.pow(6, 4) / 4) {
      setPrintSettings((prev) => ({
        ...prev,
        nums: 0
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    };
  }, [])
  

  const handleClick = (action:string) => {
    moduleHomeActions(action)
  }

  // Function to get the module from the numbers
  const toBase = (num: number, base: number, classe: number, lMatrix: number) => {
    let converted = num.toString(base);
    while (converted.length < classe) {
      converted = '0' + converted;
    }
    
    /* const resultDivs: JSX.Element[] = [];
    for (let i = 0; i < converted.length; i += lMatrix) {
      resultDivs.push(
        <div key={i / lMatrix}>
          {converted.slice(i, i + lMatrix)}
        </div>
      );
    } */
    return converted;
    
  };

  const [actionsOpen, setActionsOpen] = useState(false);
  const [headH, setHeadH] = useState(0);

  const headActionsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function calculateH() {
      if(headActionsRef.current) {
        setHeadH(headActionsRef.current.clientHeight);
      }
    }
    calculateH()
    window.addEventListener("resize", calculateH)
    return () => {
      window.removeEventListener("resize", calculateH)
    };
  }, [headActionsRef])

  const handleOpenActions = () => {
    setActionsOpen(!actionsOpen)
  }


  const hasDrawing = fixedTexts.length > 0;

  return <div className={styles.Home}>

    {fixedTexts.length <= 0 && <div className={styles.cta}>Premi i tasti per disegnare</div>}

    <div className={`${styles.actions} ${actionsOpen ? styles.open : ''}`} style={{transform: `translateY(${actionsOpen ? `calc(100% - ${headH}px)` : `0`})`}}>
      <div ref={headActionsRef} className={styles.head} onClick={handleOpenActions}>
        <div className={styles.container}>
          {moduleActions.map((ma) => (
          <Button 
            key={ma.id} 
            label={`${ma.label}: ${ma.icon}`}
            disabled={ma.id === "change_module_minus" && printSettings.nums === 0}
            onClick={() => handleClick(ma.key)}
          />
          ))}
        </div>
        <Icon size={24} name={actionsOpen ? 'Plus' : 'Minus'} />
      </div>
      <div className={styles.legend}>
          <div className={styles.row}>
            <div className={styles.data}>{'Numero'}</div>
            <div className={styles.data}>{'Rotazione'}</div>
            <div className={styles.data}>{'Misura'}</div>
            <div className={styles.data}>{'Posizione X'}</div>
            <div className={styles.data}>{'Posizione Y'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.data}>{printSettings.nums}</div>
            <div className={styles.data}>{printSettings.r}</div>
            <div className={styles.data}>{printSettings.s}</div>
            <div className={styles.data}>{mouseX}</div>
            <div className={styles.data}>{mouseY}</div>
          </div>
        { hasDrawing && fixedTexts.map((ft, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.data}>{ft.nums}</div>
            <div className={styles.data}>{ft.r}</div>
            <div className={styles.data}>{ft.s}</div>
            <div className={styles.data}>{ft.x}</div>
            <div className={styles.data}>{ft.y}</div>
          </div>
        )) }
      </div>
    </div>

    <div
      ref={modulesRef}
      className={styles.modules_wrapper}
      onClick={handleMouseClick}
      onTouchStart={handleMouseClick}
      tabIndex={0}
    >
      {fixedTexts.map((ft, index) => ( <Module key={index} x={ft.x} y={ft.y} s={ft.s} r={ft.r} font={ft.font} element={toBase(ft.nums, 6, 4, 2)}  /> ))}
      <Module stamp x={position.x} y={position.y} s={printSettings.s} r={printSettings.r} font={printSettings.font} element={toBase(printSettings.nums, 6, 4, 2)}  /> 

    </div>

  </div>
};

export default Home;
