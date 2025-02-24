//Qui ci sono delle cose relative ai font per la decorazione

'use client'
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './Home.module.scss';
import Module from '../components/Module/Module';
import { moduleActions } from '../utils/moduleActions';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import useMousePosition from '../hooks/useMousePosition';
import { useGlobalContext } from '../contexts/GlobalContext';
import useBreakpoints from '../hooks/useBreakpoints';
import StaticModule from '../components/Module/StaticModule';
import { toDecimalsTwo } from '../utils/toDecimalsTwo';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
import { keyboardModuleEvents } from '../interfaces/IModuleActions';
import { toBase } from '../utils/generativeFunctions';

export default function Home() {

  const { isTouchable } = useBreakpoints()  
  const { t } = useTranslation()
  const texts = t("home", {returnObjects: true}) as {
    cta: string,
    legend: string[]
  };
  
  const currentLanguage: "it" | "en" = i18n.language as "it" | "en";
  
  type modules = { nums: number, font: string, x: number; y: number; s: number, r: number };

  const fonts = [
    "rolo deco a",
    "rolo deco b",
    "rolo deco c",
    "rolo deco d",
    "rolo deco e",
    "rolo deco f",
    "rolo deco g"
  ]
//  const maxNums = Math.pow(4, 4) / 4;

  const maxNums = Math.pow(4, 4);

  const modulesRef = useRef<HTMLDivElement>(null)
  const modW = modulesRef.current ? modulesRef.current.clientWidth : 0;
  const modH = modulesRef.current ? modulesRef.current.clientHeight : 0;
  const initialValues = {
    nums: 0, /* Min 0 max 63 */
    font: 'rolo deco a',
    s: 40,
    r: 0,
    x: Math.floor(Math.random() * (modW + 1)),
    y: Math.floor(Math.random() * (modH + 1))
  }

  const [printSettings, setPrintSettings] = useState<modules>(initialValues);
  
  useEffect(() => {
    if(isTouchable) {
      setPrintSettings((prevState) => ({
        ...prevState,
        s: 20
      }))
    }
  }, [isTouchable]);
  
  const [position, setPosition] = useState({ x: 200, y: 200 });

  const { x: mouseX, y: mouseY } = useMousePosition();
  const { fixedTexts, setFixedTexts } = useGlobalContext();

  useEffect(() => {
    const clientX = Math.floor(mouseX / initialValues.s) * initialValues.s;
    const clientY = Math.floor(mouseY / initialValues.s) * initialValues.s;
    setPosition({ x: clientX, y: clientY });
  }, [mouseX, mouseY]);

  function moduleHomeActions(action: keyboardModuleEvents) {
    setPrintSettings((prev) => {
      switch (action) {
        case 'change_module_plus':
          if (prev.nums < maxNums) {
            return {
              ...prev,
              nums: prev.nums + 1,
            };
          }
          return prev;
        case 'change_module_minus':
          return {
            ...prev,
            nums: Math.max(0, prev.nums - 1),
          };
        case 'enlarge_text':
          return {
            ...prev,
            s: prev.s * 2,
          };
        case 'reduce_text':
          return prev.s > 10
            ? {
                ...prev,
                s: prev.s / 2,
              }
            : prev;
        case 'rotate_text':
          return {
            ...prev,
            r: prev.r + 45,
            s: prev.r.toString().endsWith('5')
              ? prev.s * Math.sqrt(2)
              : prev.s / Math.sqrt(2),
          };
        case 'change_shape':
          return {
            ...prev,
            font: fonts[(fonts.indexOf(prev.font) + 1) % fonts.length],
          };
        case 'undo_action': {
          const result = confirm('Stai cencellando');
          if (result) setFixedTexts([]);
          return prev;
        }
        case 'undo_all':
          setFixedTexts((texts) => texts.slice(0, -1));
          return prev;
        default:
          return prev;
      }
    });
  }
  
  const [isDrawing, setIsDrawing] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    setIsDrawing(true)    
    handleMouseClick(e);
  };
  const handleMouseUp = () => {
    setIsDrawing(false)
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (isDrawing) {
      handleMouseClick(e);
    }
  };  

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {

    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const gridMouseX = Math.floor(clientX / initialValues.s) * initialValues.s;
    const gridMouseY = Math.floor(clientY / initialValues.s) * initialValues.s;
    setFixedTexts([...fixedTexts, { ...printSettings, x: gridMouseX, y: gridMouseY }]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const action = moduleActions.find(m => m.key === event.key)?.id;
    if(action) moduleHomeActions(action)
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    };
  }, [])

  const handleClick = (action: keyboardModuleEvents) => {
    moduleHomeActions(action)
  }
  
  const [actionsOpen, setActionsOpen] = useState(true);
  const [headH, setHeadH] = useState(0);
  const headActionsRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function calculateH() {
      if (headActionsRef.current) {
        setHeadH(headActionsRef.current.clientHeight + 69);
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
  const rotation = (r: number) => (r % 360 + 360) % 360;

  return <div className={styles.Home}>

    {isTouchable && <div className={styles.static_module}>
      <StaticModule s={20} r={printSettings.r} font={printSettings.font} element={toBase(printSettings.nums, 4)} />
    </div> }
    {fixedTexts.length <= 0 && <div className={styles.cta}>{texts.cta}</div>}

    <div
      ref={modulesRef}
      className={styles.modules_wrapper}
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
      tabIndex={0}
    >
      {fixedTexts.map((ft, index) => (<Module key={index} x={ft.x} y={ft.y} s={ft.s} r={ft.r} font={ft.font} element={toBase(ft.nums, 4)} />))}
      {!isTouchable && <Module stamp x={position.x} y={position.y} s={printSettings.s} r={printSettings.r} font={printSettings.font} element={toBase(printSettings.nums, 4)} />}
    </div>

    <div className={`${styles.actions} ${actionsOpen ? styles.open : ''}`} style={{ maxHeight: actionsOpen ? headH : '70dvh' }}>
      <div ref={headActionsRef} className={styles.head} onClick={handleOpenActions}>
        <div className={styles.container}>
          {moduleActions.map((ma) => (
            <Button
              key={ma.id}
              icon={ma.icon}
              label={ma.label[currentLanguage]}
              disabled={ma.id === "change_module_minus" && printSettings.nums === 0}
              onClick={() => handleClick(ma.id)}
              isTouchable={isTouchable}
            />
          ))}
        </div>
        <div className={styles.icon}>{fixedTexts.length > 0 && <Icon size={16} name={actionsOpen ? 'Plus' : 'Minus'} />}</div>
      </div>
      <div ref={legendRef} className={styles.legend}>
        <div className={styles.row}>
          {texts.legend.map((t, i) => (
            <div key={i} className={styles.data_title}>{t}</div>
          ))}
        </div>
        <div className={`${styles.row} ${styles.current}`}>
          <div className={styles.data}>{printSettings.nums}</div>
          <div className={styles.data}>{rotation(printSettings.r)}</div>
          <div className={styles.data}>{toDecimalsTwo(printSettings.s)}</div>
          <div className={styles.data}>{`${mouseX}, ${mouseY}`}</div>
        </div>
        {hasDrawing && fixedTexts.map((ft, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.data}>{ft.nums}</div>
            <div className={styles.data}>{rotation(ft.r)}</div>
            <div className={styles.data}>{toDecimalsTwo(ft.s)}</div>
            <div className={styles.data}>{`${ft.x}, ${ft.y}`}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
}

