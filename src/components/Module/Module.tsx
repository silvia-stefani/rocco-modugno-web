import React, { TouchEventHandler, useEffect, useRef, useState } from 'react';

import styles from './Module.module.scss';

interface IModule {
    x: number,
    y: number,
    s: number,
    r: number,
    font: string,
    element: string,
    stamp?: boolean
}

const Module: React.FC<IModule> = ({
    x, y, s, r, font, element, stamp
}) => {
 
  const moduelRef = useRef<HTMLDivElement>(null);  
  const resultDivs: JSX.Element[] = [];
    for (let i = 0; i < element.length; i += 2) {
      resultDivs.push(
        <div key={i / 2}>
          {element.slice(i, i + 2)}
        </div>
      );
    }
  
    return (
        <div
          ref={moduelRef}
          className={`${styles.Module} ${stamp ? styles.stamp : ''}`}
          style={{
            left: `${x - s}px`,
            top: `${y - s}px`
          }}
        >
          <div 
            className={styles.content}
            style={{
              fontSize: `${s}px`,
              lineHeight: `${s}px`,
              rotate: `${r}deg`,
              fontFamily: font
            }}>
            {resultDivs.map((rd, i) => (<div key={i}>{rd}</div>))}
            </div>
        </div>
    );
};

export default Module;
