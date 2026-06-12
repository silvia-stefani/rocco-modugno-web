'use client'
import * as React from 'react';

import styles from './Header.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import Icon from 'components/Icon/Icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'contexts/ThemeContext';
import useBreakpoints from 'hooks/useBreakpoints';
import { languages } from 'models/languages';
import { MenuItemsType } from 'types/MeuItemsType';
import { ServicesType } from 'types/ServicesType';
import i18n from 'utils/i18n';

interface IHeader {
}

/**
 * Header component that provides navigation, branding, language switching, and theme toggling.
 * It also features a rotating list of services/roles under the name.
 */
const Header: React.FC<IHeader> = () => {

  const { currentTheme, toggleTheme } = useTheme();
  const { smallDevice } = useBreakpoints()

  // Manage current language state for persistence/UI updates
  const [currentLanguage, setCurrentLanguage,] = useState(i18n.language)
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  };

  const { t } = useTranslation();
  const menu = t('menu', { returnObjects: true }) as MenuItemsType[];
  const services = t('services', { returnObjects: true }) as ServicesType[];

  const currentPage = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Renders the mobile menu using a React Portal to ensure it appears above all other content.
   */
  const headerMobile = () => {
    return createPortal(<nav className={styles.MobileMenu}>
      <span onClick={() => setMobileOpen(false)}><Icon name={"Close"} /></span>
      <ul className={styles.menu}>
        {menu.map((item) => {
          const isCurrent = currentPage === `/${item.id}` ? styles.current : "";
          const link = item.id === "articles" ? "https://gifted-roundworm-865.notion.site/Articoli-pubblicati-fc967737aa2d4921be04eeddb5a2d054" : `/${item.id}`;
          const target = item.id === "articles" ? "_blank" : "_self";
          return <li key={item.id} className={`${styles.item} ${isCurrent}`}><Link href={link} target={target}>
            {item.name}
          </Link></li>
        })}
      </ul>
    </nav>, document.body)
  }

  // Close mobile menu automatically when navigation occurs
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  const [currentI, setCurrentI] = useState(0);

  return <Fragment>
    {/* Render mobile menu if open */}
    {mobileOpen && headerMobile()}

    <header className={styles.Header}>
      <div className={styles.container}>
        {/* Branding and rotating role description */}
        <Link href={'/'} className={styles.data}>
          <h2 className={styles.name}>Rocco Modugno</h2>
          <div
            className={styles.metadata}
            onAnimationIteration={() => setCurrentI((prev) => (prev + 1) % services.length)}
          >
            {services[currentI].title}
          </div>
        </Link>

        {!smallDevice && <Fragment>
          {/* Desktop Navigation */}
          <nav className={styles.navbar}>
            <ul className={styles.menu}>
              {menu.map((item) => {
                const isCurrent = currentPage === `/${item.id}` ? styles.current : "";
                const link = item.id === "articles" ? "https://gifted-roundworm-865.notion.site/Articoli-pubblicati-fc967737aa2d4921be04eeddb5a2d054" : `/${item.id}`;
                const target = item.id === "articles" ? "_blank" : "_self";
                return <li key={item.id} className={`${styles.item} ${isCurrent}`}><Link href={link} target={target}>
                  {item.name}
                </Link></li>
              })}
            </ul>
          </nav>
          {/* Language Switcher */}
          <div className={styles.languages}>
            {languages.map((lan) => {
              const isCurrent = lan.id === currentLanguage ? styles.current : "";
              return <div className={`${styles.language} ${isCurrent}`} key={lan.id} onClick={() => changeLanguage(lan.id)}>{lan.label}</div>
            })}
          </div>
        </Fragment>}

        {/* Theme Toggle Button */}
        <div className={styles.theme} onClick={toggleTheme}>
          <span className={styles.picker} style={{ backgroundColor: currentTheme.colors.primary }}></span>
        </div>

        {/* Hamburger Menu Icon for mobile */}
        {smallDevice && <div onClick={() => setMobileOpen(true)}><Icon name={"Menu"} /></div>}
      </div>
    </header>
  </Fragment>;
};

export default Header;