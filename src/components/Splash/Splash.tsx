'use client'
import * as React from 'react';

import styles from './Splash.module.scss';
import { useEffect, useState } from 'react';
import { splashTime } from 'models/splashTime';
import { toBase } from 'utils/generativeFunctions';

interface ISplashProps {
  
}

const Splash: React.FunctionComponent<ISplashProps> = () => {

  const [loading, setLoading] = useState(0)

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoading((prevLoading) => {
        if (prevLoading < 100) {
          return prevLoading + 1;
        } else {
          clearInterval(loadingInterval);
          return prevLoading;
        }
      });
    }, (splashTime - 1000) / 100);
    return () => {
      clearInterval(loadingInterval);
    };
  }, [splashTime - 1000]);

  const baseNumber = toBase(loading, 4);
  const resultDivs: JSX.Element[] = [];
    for (let i = 0; i < baseNumber.length; i += 2) {
      resultDivs.push(
        <div key={i / 2}>
          {baseNumber.slice(i, i + 2)}
        </div>
    );
  }

  return <div className={styles.Splash} style={{animationDelay: splashTime - 200 + "ms"}}>
    <div className={styles.module}>
        {resultDivs}
    </div>
    <div className={styles.loading_label}>{loading}%</div>
  </div>;
};

export default Splash;
