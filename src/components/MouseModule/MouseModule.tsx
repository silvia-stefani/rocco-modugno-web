import React, { useEffect, useState } from 'react';
import styles from "./MouseModule.module.scss";
import { useKeyPress } from '../../utils/getPressedKey';
import { useTheme } from '../../contexts/ThemeContext';

interface MouseModuleI {
  x: number;
  y: number;
  number: string[]
}

const MouseModule: React.FC<MouseModuleI> = ({ number, x, y }) => {

  const divXNumber = number.map((n, i) => <div key={i}>{n}</div>)

  const [clickCount, setClickCount] = useState(1);
  const { toggleTheme } = useTheme();

  const handleCloneClick = () => {
    
  };

  const initialRandom = {
    color: "#272727",
    bg: "transparent",
    fontFamily: "QuartinoFloreale",
    width: 40,
    rotate: 0
  }

  const [random, setRandom] = useState(initialRandom)

  const pressedKey = useKeyPress();

  const handleKeyEvent = (key: any) => {
    switch (key) {
      case 'c':
        toggleTheme()
        break;
      case 'f':
        const isActive = random.fontFamily === "QuartinoFloreale";
        setRandom((prevState) => ({
          ...prevState,
          fontFamily: isActive ? "unset" : "QuartinoFloreale"
        }))
      break;
      case '+': 
          setRandom((prevState) => ({
            ...prevState,
            width: prevState.width + 50
          }))
        break;
      case '-': 
        setRandom((prevState) => ({
          ...prevState,
          width: prevState.width - 50
        }))
        break;
      case 'r':
          setRandom((prevState) => ({
            ...prevState,
            rotate: prevState.rotate + 45
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

  console.log(clickCount);
  

  return <div 
    className={styles.MouseModule} 
    onClick={handleCloneClick}
    style={{ 
      top: y, 
      left: x, 
      fontFamily: random.fontFamily,
      fontSize: random.width + 'px',
      lineHeight: random.width + 'px',
      transform: `translate(-50%, -50%) rotate(${random.rotate}deg)`,
      transition: `
        font-size 320ms ease-in-out, 
        line-height 320ms ease-in-out, 
        color 320ms ease-in-out,
        transform 320ms ease-in-out
      `
    }}>

    <div className={styles.container}>
     {Array.from(Array(clickCount).keys()).map((d) => <div key={d}>{divXNumber}</div>)}
    </div>

  </div>
};

export default MouseModule;
