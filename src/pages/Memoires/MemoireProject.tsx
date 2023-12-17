import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MemoiresType } from '../../types/MemoiresType';
import { matrix, toBase } from '../../utils/generativeFunctions';


const MemoireProject: React.FC = () => {
    
    const { t } = useTranslation();

    const memoires = t("memoires", { returnObjects: true }) as MemoiresType[];  
    

  let a = toBase(1900, memoires[0].gallery.base, memoires[0].gallery.base);
  /* let simm = simmetrica(a); */

  const matrice = matrix(a, 2).map((string, i) => <div key={i}>{string}</div>)
  
  return <div>
    memoire project
    <div style={{fontFamily: memoires[0].font}}>
        <div>{matrice}</div>
    </div>
  </div>;
};

export default MemoireProject;
