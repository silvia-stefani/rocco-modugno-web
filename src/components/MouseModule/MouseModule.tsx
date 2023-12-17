import React, { useEffect } from 'react';
import styles from "./MouseModule.module.scss";
import { matrix, toBase } from '../../utils/generativeFunctions';

interface MouseModuleI {
  x: number,
  y: number,
  element: any
}

const MouseModule: React.FC<MouseModuleI> = ({ element, x, y }) => {

  const [number, setNumber] = React.useState(0)
  let n = 6;
  let k = 4;

  useEffect(() => {

    function map(value: number, start1: number, stop1: number, start2: number, stop2: number, interval: number): number {
      const scaledValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
      const adjustedValue = Math.round(scaledValue / interval) * interval;
      return start2 < stop2 ? Math.min(adjustedValue, stop2) : Math.max(adjustedValue, stop2);
    }

    const rect = element.current.getBoundingClientRect();
    const mouseX = x - rect.left;

    // Ajusta el valor del 'interval' según el cambio deseado 
    const interval = 10;

    // Mapear la posición del ratón en X al rango de 0 a 1295 con intervalos de 10 en 10 
    const mappedX = map(mouseX, 0, rect.width, 0, 1295, interval);
    const roundedX = Math.round(mappedX);

    // Puedes usar roundedX y roundedY como desees o establecerlos en el estado 
    setNumber(roundedX);

  }, [x, y])

  let a = toBase(number, n, k);
  /* let simm = simmetrica(a); */

  const matrice = matrix(a, 2).map((string, i) => <div key={i}>{string}</div>)
  /* const tavola = matrix(simm, 16).map((string, i) => <div key={i}>{string}</div>) */
  

  return <div className={styles.sketch} style={{ top: y, left: x }}>
    {matrice}

  </div>
};

export default MouseModule;
