import * as React from 'react';
import { useState } from 'react';

import styles from './Home.module.scss';
import Module from '../../components/Module/Module';

const Home: React.FC = () => {

  const [num, setNum] = useState<number>(0);

  const initialValues = {
    font: 'rolo deco',
    s: 50,
    r: 0,
    x: 200,
    y: 200
  }
  type modules = { dis: any; font: string, x: number; y: number; s: number, r: number }[]
  const [fixedTexts, setFixedTexts] = useState<modules>([]);
  const [printSettings, setPrintSettings] = useState<typeof initialValues>(initialValues);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) => {
    const gridMouseX = Math.floor(e.touches ? e.touches[0] : e.clientX / printSettings.s) * printSettings.s;
    const gridMouseY = Math.floor(e.touches ? e.touches[0] : e.clientY / printSettings.s) * printSettings.s;
    const dis = toBase(num, 6, 4, 2);
    setFixedTexts([...fixedTexts, { dis, ...printSettings, x: gridMouseX, y: gridMouseY }]);
  };

  const handleMove = (e: any) => {
    const clientX = Math.floor(e.clientX / printSettings.s) * printSettings.s;
    const clientY = Math.floor(e.clientY / printSettings.s) * printSettings.s;
    setPosition({ x: clientX, y: clientY });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {

    if (event.key === 'ArrowRight') {
      setNum(num + 1);
    } else if (event.key === 'ArrowLeft') {
      setNum(num - 1);
    } else if (event.key === 'ArrowUp') {
      setPrintSettings((prev) => ({
        ...prev,
        s: printSettings.s * 1.5
      }));
    } else if (event.key === 'ArrowDown' && printSettings.s > 10) {
      setPrintSettings((prev) => ({
        ...prev,
        s: printSettings.s / 1.5
      }));
    } else if (event.key === 'r') {
      setPrintSettings((prev) => ({
        ...prev,
        r: printSettings.r + 45
      }));
    } else if (event.key === 'b') {
      setPrintSettings((prev) => ({
        ...prev,
        font: printSettings.font === 'rolo deco' ? 'rolo deco rounded' : 'rolo deco'
      }));
    } else if (event.key === 'z' || event.key === 'Z') {
      if (fixedTexts.length > 0) {
        setFixedTexts(fixedTexts.slice(0, -1));
      }
    }

    // Reset num if it exceeds pow(n, k) / 4
    if (num > Math.pow(6, 4) / 4) {
      setNum(0);
    }
  };

  // Function to get the module from the numbers
  const toBase = (num: number, base: number, classe: number, lMatrix: number): JSX.Element[] => {
    let converted = num.toString(base);
    while (converted.length < classe) {
      converted = '0' + converted;
    }

    const result: JSX.Element[] = [];
    for (let i = 0; i < converted.length; i += lMatrix) {
      result.push(
        <div key={i / lMatrix}>
          {converted.slice(i, i + lMatrix)}
        </div>
      );
    }
    return result;
  };
  

  return <div
    className={styles.Home}>

      <table>
        <tr>
          <td>N</td>
          <td>R</td>
          <td>X</td>
          <td>Y</td>
        </tr>
        {fixedTexts.map((ft) => (
          <tr>
          <td>{ft.dis}</td>
          <td>{ft.r}</td>
          <td>{ft.x}</td>
          <td>{ft.y}</td>
        </tr>
        ))}
      </table>

    <div
      className={styles.modules_wrapper}
      onClick={handleMouseClick}
      onTouchStart={handleMouseClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMove}
      tabIndex={0}
    >
      {fixedTexts.map((ft, index) => ( <Module key={index} x={ft.x} y={ft.y} s={ft.s} r={ft.r} font={ft.font} element={ft.dis}  /> ))}
      <Module stamp x={position.x} y={position.y} s={printSettings.s} r={printSettings.r} font={printSettings.font} element={toBase(num, 6, 4, 2)}  /> 

    </div>

    {/* <div className={styles.actions}>
      {actions.map((action) => (
        <div key={action.id} className={styles.action}>{action.label}: {action.keyPress}</div>
      ))}
    </div> */}
    {/* <ActionsMenu actions={actions} />
   
    <div className={styles.numbers}>
      <div>
        x: {position.x}
      </div>
      <div>
        y: {position.y}
      </div>
      <div>
        testo: {number.map((n, i) => <div key={i}>{n}</div>)}
      </div>
    </div>

    <div className={styles.btn}>
      <Link to={'/memoires'}>Scopri di più</Link>
    </div> */}

  </div>
};

export default Home;
