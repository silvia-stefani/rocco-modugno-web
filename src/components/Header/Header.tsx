import * as React from 'react';

import styles from './Header.module.scss';
import i18n from '../../i18n';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItemsType } from '../../types/MeuItemsType';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { languages } from '../../models/languages';
import useBreakpoints from '../../hooks/useBreakpoints';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';

interface IHeader { 
}

const Header: React.FC<IHeader> = ({}) => {

  const { nextTheme, toggleTheme } = useTheme();
  const { smallDevice } = useBreakpoints()
  
  const [currentLanguage, setCurrentLanguage,] = useState(i18n.language)
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  };

  const { t } = useTranslation();
  const menu = t('menu', { returnObjects: true }) as MenuItemsType[];
  const services = t('services', { returnObjects: true }) as any[];
  
  const location = useLocation();
  const currentPage = location.pathname.slice(1);  

  const [mobileOpen, setMobileOpen] = useState(false);
  const headerMobile = () => {
    return createPortal(<nav className={styles.MobileMenu}>
    <span onClick={() => setMobileOpen(false)}><Icon name={"Close"} /></span>
    <ul className={styles.menu}>
      {menu.map((item) => {
        const isCurrent = currentPage === item.id ? styles.current : "";
        return <li key={item.id} className={`${styles.item} ${isCurrent}`}><Link to={item.id}>{item.name}</Link></li>
      })}
    </ul>
    </nav>, document.body)
  }

  useEffect(() => {
    setMobileOpen(false); // Cierra el menú móvil cuando cambia la ubicación
  }, [location]);

  const [currentI, setCurrentI] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      setCurrentI((currentI + 1) % services.length)
    }, 3000);
  }, [currentI]);

  return <Fragment>
    {mobileOpen && headerMobile()}
    <header className={styles.Header}>
    <div className={styles.container}>
      <div className={styles.data}>
        <h2 className={styles.name}><Link to={"/"}>Rocco Modugno</Link></h2>
      </div>
      {!smallDevice && <Fragment>
        <nav className={styles.navbar}>
          <ul className={styles.menu}>
            {menu.map((item) => {
              const isCurrent = currentPage === item.id ? styles.current : "";
              return <li key={item.id} className={`${styles.item} ${isCurrent}`}><Link to={item.id}>{item.name}</Link></li>
            })}
          </ul>
        </nav>
        <div className={styles.languages}>
          {languages.map((lan) => {
            const isCurrent = lan.id === currentLanguage ? styles.current : "";
            return <div className={`${styles.language} ${isCurrent}`} key={lan.id} onClick={() => changeLanguage(lan.id)}>{lan.label}</div>
          })}
        </div>
      </Fragment>}
      <div className={styles.theme} onClick={toggleTheme}>
        <span className={styles.picker} style={{backgroundColor: nextTheme.colors.bg}}></span>
        {/* {nextTheme.label} */}
      </div>
      {smallDevice && <div onClick={() => setMobileOpen(true)}><Icon name={"Menu"} /></div>}
    </div>
    <div className={styles.metadata}>{services[currentI].title}</div>
  </header>
  </Fragment>;
};

export default Header;