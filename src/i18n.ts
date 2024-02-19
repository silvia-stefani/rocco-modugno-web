// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enPersonalData, enServices } from './data/about_en';
import { itPersonalData, itServices } from './data/about_it';
import { enMenu } from './data/menu_en';
import { itMenu } from './data/menu_it';
import { enProjects } from './data/projects/projects_en';
import { itProjects } from './data/projects/projects_it';
import { enArticles } from './data/articles_en';
import { itArticles } from './data/articles_it';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          services: enServices,
          menu: enMenu,
          about: enPersonalData,
          projects: enProjects,
          articles: enArticles
          // ... otras traducciones
        },
      },
      it: {
        translation: {
          services: itServices,
          menu: itMenu,
          about: itPersonalData,
          projects: itProjects,
          articles: itArticles
          // ... otras traducciones
        },
      },
    },
    lng: 'it',
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;