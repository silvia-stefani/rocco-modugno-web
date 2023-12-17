import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MemoiresType } from '../../types/MemoiresType';

const Memoires: React.FC = () => {

  const { t } = useTranslation();

  const memoires = t("memoires", { returnObjects: true }) as MemoiresType[];
  
  return (
    <div>
        Memoires
        {memoires.map((memoire) => {
          return <a key={memoire.id} href={`memoires/${memoire.id}`}>{memoire.title}</a>
        })}
    </div>
  )

};

export default Memoires;
