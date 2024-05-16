'use client'
import * as React from 'react';

import styles from './Splash.module.scss';
import { splashTime } from '../../models/splashTime';
import { useEffect, useState } from 'react';

interface ISplashProps {
  
}

const Splash: React.FunctionComponent<ISplashProps> = () => {
  
  interface currentNumberI {
    module1: number,
    module2: number
  }

  const [currentNumber, setCurrentNumber] = useState<currentNumberI>({module1: 0, module2: 5});
  const [loading, setLoading] = useState(0)

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        if (prevNumber.module1 < 30 && prevNumber.module2 < 30) {
          return { module1: prevNumber.module1 + 1, module2: prevNumber.module2 + 1 };
        } else {
          clearInterval(interval);
          return prevNumber;
        }
      });
    }, (splashTime - 1000) / 20); // Dividimos splashTime por 20 para ajustar el intervalo al número de iteraciones

    const loadingInterval = setInterval(() => {
      setLoading((prevLoading) => {
        if (prevLoading < 100) {
          return prevLoading + 1; // Incrementa el porcentaje en 5 cada intervalo
        } else {
          clearInterval(loadingInterval);
          return prevLoading;
        }
      });
    }, (splashTime - 1000) / 100); // Dividimos splashTime por 20 para que el porcentaje llegue al 100% cuando termine el conteo de los números
    return () => {
      clearInterval(interval);
      clearInterval(loadingInterval);
    };
  }, [splashTime - 1000]);

  return <div className={styles.Splash} style={{animationDelay: splashTime - 200 + "ms"}}>
    <div className={styles.module}>
        <div>{currentNumber.module1.toString().padStart(2, "0")}</div>
        <div>{currentNumber.module2.toString().padStart(2, "0")}</div>
    </div>
    <div className={styles.loading_label}>{loading}%</div>
  </div>;
};

export default Splash;
