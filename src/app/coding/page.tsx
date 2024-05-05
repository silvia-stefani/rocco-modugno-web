'use client'
import * as React from 'react';

import styles from './Coding.module.scss';
import { Image } from '../../components/Image/Image';
import { useTranslation } from 'react-i18next';
import { ICoding } from '../../interfaces/ICoding';

export default function coding() {

  const {t} = useTranslation()

  const coding = t("coding", { returnObjects: true }) as ICoding;
  const scriptsProjects = coding.projects;

  return (
    <main className={styles.Coding}>
      <div className={styles.description}>
        <h6>{coding.page.title}</h6>
        <p>{coding.page.description}</p>
      </div>
      <div className={styles.grid}>
        {scriptsProjects.map((sp) => (
          <a key={sp.id} className={styles.ScriptProject} href={sp.link} target='_blank'>
              <div className={styles.image}>
                <Image cover src={'/scripts_img/' + sp.cover} />
              </div>
              <h4 className={styles.title}>{sp.title}<span>{sp.subtitle}</span></h4>
          </a>
        ))}
      </div>
    </main>
  )
};
