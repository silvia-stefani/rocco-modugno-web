// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enPersonalData, enServices } from './data/about_en';
import { itPersonalData, itServices } from './data/about_it';
import { enMenu } from './data/menu_en';
import { itMenu } from './data/menu_it';
import { enMemoires } from './data/memoires/memoires_en';
import { itMemoires } from './data/memoires/memoires_it';
import { enProjects } from './data/projects/projects_en';
import { itProjects } from './data/projects/projects_it';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          services: enServices,
          menu: enMenu,
          about: enPersonalData,
          memoires: enMemoires,
          projects: enProjects
          // ... otras traducciones
        },
      },
      it: {
        translation: {
          services: itServices,
          menu: itMenu,
          about: itPersonalData,
          memoires: itMemoires,
          projects: itProjects
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