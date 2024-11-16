'use client'
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalDataType } from 'types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from 'components/Paragraph/Paragraph';

export default function About() {

  const { t } = useTranslation()

  const about = t("about", { returnObjects: true }) as PersonalDataType;

  const contacts = about.contacts;
  const presentation = about.presentation;
  const experience = about.experience;
  const mentions = about.mentions;
  const talks = about.talks;
  const workshops = about.workshops;
  const jurymem = about.juryMem;

  return (
    <div className={styles.About}>

      <div className={styles.content}>

        <div className={styles.contacts}>
          <a href={`mailto:${contacts.mail}`}>{contacts.mail}</a>
          <a href={`tel:${contacts.tel}`}>{contacts.tel}</a>
          <Paragraph text={contacts.address.street} />
          <Paragraph text={contacts.address.location} />
          <Paragraph text={contacts.pIva} />
        </div>

        <div className={styles.image}>
          <img src="/profile_photo.jpg" alt="" />
        </div>

        <div className={styles.presentation}>
          <div className={styles.title}>{presentation}</div>
          <div className={styles.block}>
            <h6>{experience.title}</h6>
            {experience.content.map((e, i) => (
              <Paragraph key={i} text={e} />
            ))}
          </div>
          <div className={styles.block}>
            <h6>{mentions.title}</h6>
            {mentions.content.map((m, i) => (
              <div key={i} className={styles.text}>
                <p><b>{m.title}</b></p>
                <Paragraph text={m.text} />
              </div>
            ))}
          </div>
          <div className={styles.block}>
            <h6>{talks.title}</h6>
            <div>{talks.content.map((t, i) => (
              <div key={i} className={styles.text}>
                <p><b>{t.title}</b></p>
                <Paragraph text={t.text} />
              </div>
            ))}</div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.block}>
              <h6>{workshops.title}</h6>
              {workshops.content.map((w, i) => (
                <div key={i} className={styles.tex}>
                  <b>{w.title}</b>
                  <Paragraph text={w.text} />
                </div>
              ))}
          </div>
          <div className={styles.block}>
              <h6>{jurymem.title}</h6>
              {jurymem.content.map((jm, i) => (
                <div key={i} className={styles.tex}>
                  <b>{jm.title}</b>
                  <Paragraph text={jm.text} />
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  )

}
