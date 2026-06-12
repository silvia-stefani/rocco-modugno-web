// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enPersonalData, enServices } from '../data/about/about_en';
import { itPersonalData, itServices } from '../data/about/about_it';
import { enMenu } from '../data/app_texts/menu/menu_en';
import { itMenu } from '../data/app_texts/menu/menu_it';
import { enProjects } from '../data/projects/projects_en';
import { itProjects } from '../data/projects/projects_it';
import { enProjectsCats } from '../data/projects/projectsCats_en';
import { itProjectsCats } from '../data/projects/projectsCats_it';
import { enCoding } from '../data/coding/coding_en';
import { itCoding } from '../data/coding/coding_it';
import { enHome } from '../data/home/home_en';
import { itHome } from '../data/home/home_it';
import { enUi } from '../data/app_texts/ui_en';
import { itUi } from '../data/app_texts/ui_it';

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
          projectsCats: enProjectsCats,
          coding: enCoding,
          home: enHome,
          ui: enUi
          // ... otras traducciones
        },
      },
      it: {
        translation: {
          services: itServices,
          menu: itMenu,
          about: itPersonalData,
          projects: itProjects,
          projectsCats: itProjectsCats,
          coding: itCoding,
          home: itHome,
          ui: itUi
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