import React, { useRef } from 'react';

import styles from './Module.module.scss';

interface IModule {
  x: number;       // X coordinate (usually grid-snapped)
  y: number;       // Y coordinate (usually grid-snapped)
  s: number;       // Size in pixels (affects font-size and line-height)
  r: number;       // Rotation in degrees
  font: string;    // Font family for the decorative characters
  element: string; // The string representation of the module (e.g., "0010")
  stamp?: boolean; // If true, the module follows the cursor (preview mode)
}

/**
 * Module component renders a single generative element on the canvas.
 * It takes a string of digits and renders them in a grid-like character block.
 */
const Module: React.FC<IModule> = ({
  x, y, s, r, font, element, stamp
}) => {

  const moduelRef = useRef<HTMLDivElement>(null);
  const resultDivs: JSX.Element[] = [];

  // Split the element string into pairs of characters for rendering
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
        // Position the module so it's centered on the cursor/grid point
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
        {/* Render the characters in a 2x2 or similar layout based on CSS */}
        {resultDivs.map((rd, i) => (<div key={i}>{rd}</div>))}
      </div>
    </div>
  );
};

export default Module;

