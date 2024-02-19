import React, { TouchEventHandler, useEffect, useState } from 'react';

import styles from './Module.module.scss';

interface IModule {
    x: number,
    y: number,
    s: number,
    r: number,
    font: string,
    element: any,
    stamp?: boolean
}

const Module: React.FC<IModule> = ({
    x, y, s, r, font, element, stamp
}) => {

 
    return (
        <div
          className={`${styles.Module} ${stamp ? styles.stamp : ''}`}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            fontSize: `${s}px`,
            lineHeight: `${s}px`,
            rotate: `${r}deg`,
            fontFamily: font
          }}
        >
          {element}
        </div>
    );
};

export default Module;
