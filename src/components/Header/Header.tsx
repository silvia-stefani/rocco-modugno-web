import * as React from 'react';

import styles from './Header.module.scss';
import i18n from '../../i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItemsType } from '../../types/meuItemsType';
import { unstable_HistoryRouter, useLocation } from 'react-router-dom';

const Header: React.FC = () => {

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language)
  };

  const languages = [
    {
      id: "it",
      label: "IT",
      language: "Italiano"
    },
    {
      id: "en",
      label: "EN",
      language: "English"
    }
  ]

  const { t } = useTranslation();
  const menu = t('menu', { returnObjects: true }) as MenuItemsType[];
  
  const location = useLocation()
  const currentPage = location.pathname.slice(1);  

  return <header className={styles.Header}>
    <div className={styles.container}>
      <h2 className={styles.name}><a href="/">Rocco Modugno</a></h2>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          {menu.map((item) => {
            const isCurrent = currentPage === item.id ? styles.current : "";
            return <li key={item.id} className={`${styles.item} ${isCurrent}`}><a href={item.id}>{item.name}</a></li>
          })}
        </ul>
      </nav>
      <div className={styles.languages}>
        {languages.map((lan) => {
          const isCurrent = lan.id === currentLanguage ? styles.current : "";
          return <div className={`${styles.language} ${isCurrent}`} key={lan.id} onClick={() => changeLanguage(lan.id)}>{lan.label}</div>
        })}
      </div>
    </div>
  </header>;
};

export default Header;
