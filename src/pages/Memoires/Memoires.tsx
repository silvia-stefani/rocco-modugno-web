import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MemoiresType } from '../../types/MemoiresTypes';

const Memoires: React.FC = () => {

  const { t } = useTranslation();

  const memoires = t("memoires", { returnObjects: true }) as MemoiresType;

  return (
    <div>
      <div>{memoires.text.map((fragment, index) => (
        <span key={index} style={{ fontStyle: fragment.style ? fragment.style : "normal"}}>{fragment.text}</span>
      ))}</div>
      {memoires.projects.map((memoire) => {
        return <a key={memoire.id} href={`memoires/${memoire.id}`}>{memoire.title}</a>
      })}
    </div>
  )

};

export default Memoires;
