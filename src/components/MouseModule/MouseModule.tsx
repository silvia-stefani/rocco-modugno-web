import React, { useEffect, useState } from 'react';
import styles from "./MouseModule.module.scss";
import { useKeyPress } from '../../utils/getPressedKey';
import { colors } from '../../models/colors';
import { getRandomNum } from '../../utils/getRandomNum';
import { useTheme } from '../../contexts/ThemeContext';

interface MouseModuleI {
  x: number;
  y: number;
  number: string[]
}

const MouseModule: React.FC<MouseModuleI> = ({ number, x, y }) => {

  const divXNumber = number.map((n, i) => <div key={i}>{n}</div>)

  const [clickCount, setClickCount] = useState(1);
  const { nextTheme, toggleTheme } = useTheme();

  const handleCloneClick = () => {
    
  };

  const initialRandom = {
    color: "#272727",
    bg: "transparent",
    fontFamily: "QuartinoFloreale",
    width: "40px",
    rotate: "0deg"
  }

  const [random, setRandom] = useState(initialRandom)

  const pressedKey = useKeyPress();

  const handleKeyEvent = (key: any) => {
    switch (key) {
      case 'c':
        toggleTheme()
        break;
      case 'n':
        setRandom((prevState) => ({
          ...prevState,
          fontFamily: "Inter"
        }))
      break;
      case 'f':
        setRandom((prevState) => ({
          ...prevState,
          fontFamily: "QuartinoFloreale"
        }))
      break;
      case 's':  
          setRandom((prevState) => ({
            ...prevState,
            width: getRandomNum(5, 200) + "px"
          }))
        break;
      case 'r':
          setRandom((prevState) => ({
            ...prevState,
            rotate: getRandomNum(-200, 200) + "deg"
          }))
        break;
      case 'm':
        setClickCount((prevClickCount) => prevClickCount + 1);
      break;
      case (' ' && 'Enter'):
        setRandom(initialRandom)
        setClickCount(1)
      break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (pressedKey) {
      handleKeyEvent(pressedKey);
    }
  }, [pressedKey]);    

  return <div 
    className={styles.sketch} 
    onClick={handleCloneClick}
    style={{ 
      top: y, 
      left: x, 
      fontFamily: random.fontFamily,
      fontSize: random.width,
      lineHeight: random.width,
      transform: `translate(-50%, -50%) rotate(${random.rotate})`,
      transition: `
        font-size 320ms ease-in-out, 
        line-height 320ms ease-in-out, 
        color 320ms ease-in-out,
        transform 320ms ease-in-out
      `
    }}>

    <div>
     {Array.from(Array(clickCount).keys()).map((d) => <div key={d}>{divXNumber}</div>)}
    </div>

  </div>
};

export default MouseModule;
