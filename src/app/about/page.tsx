'use client'
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentI, PersonalDataType } from 'types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from 'components/Paragraph/Paragraph';

export default function About() {

  const { t } = useTranslation()

  const about = t("about", { returnObjects: true }) as PersonalDataType;

  const contacts = about.contacts;
  const presentation = about.presentation;

  const divideBlocks = (blocks: any[]) => {
    const leftColumn: ContentI[] = [];
    const rightColumn: ContentI[] = [];
  
    blocks.forEach((block, index) => {
      if (index % 2 === 0) {
        leftColumn.push(block);
      } else {
        rightColumn.push(block);
      }
    });
  
    return { leftColumn, rightColumn };
  };
  
  const { leftColumn, rightColumn } = divideBlocks(about.content);

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
          <div className={styles.content}>
          <div className={styles.column}>
            {leftColumn.map((content, index) => (
              <div key={index} className={styles.block}>
                <h6>{content.title}</h6>
                {content.content.map((c, i) => {
                  const isString = typeof c === "string";
                  return isString ? (
                    <Paragraph key={i} text={c} />
                  ) : (
                    <div key={i} className={styles.text}>
                      <p><b>{c.title}</b></p>
                      <Paragraph text={c.text} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.column}>
            {rightColumn.map((content, index) => (
              <div key={index} className={styles.block}>
                <h6>{content.title}</h6>
                {content.content.map((c, i) => {
                  const isString = typeof c === "string";
                  return isString ? (
                    <Paragraph key={i} text={c} />
                  ) : (
                    <div key={i} className={styles.text}>
                      <p><b>{c.title}</b></p>
                      <Paragraph text={c.text} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        </div>

      </div>
    </div>
  )

}
