'use client'
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentI, DetailsI, PersonalDataType } from 'types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from 'components/Paragraph/Paragraph';

export default function About() {

  const { t } = useTranslation()

  const about = t("about", { returnObjects: true }) as PersonalDataType;

  const contacts = about.contacts;
  const presentation = about.presentation;

  const divideBlocks = (blocks: ContentI[]) => {
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

  function renderContent(content: string[] | DetailsI[]) {
    return content.map((c, i) => {
      
      switch (typeof c) {
        case "string":
          return <Paragraph key={i} text={c} />;
        case "object":
          if(c.singleLine) {            
            return (
              <div key={i} className={styles.text}>
                <p>{c.title && <b>{c.title} </b>}{c.text && c.text} {c.link && <a href={c.link.url} target="_blank" rel="noopener noreferrer">  {c.link.name}</a>}</p>
              </div>
            );
          } else {
            return (
              <div key={i} className={styles.text}>
                {c.title && <p><b>{c.title}</b></p>}
                {c.text && <Paragraph text={c.text} />}
                {c.link && <a href={c.link.url} target="_blank" rel="noopener noreferrer">{c.link.name}</a>}
              </div>
            );
          }

        default:
          return null;
      }
    });
  }
  

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
                {renderContent(content.content)}
              </div>
            ))}
          </div>

          <div className={styles.column}>
            {rightColumn.map((content, index) => (
              <div key={index} className={styles.block}>
                <h6>{content.title}</h6>
                {renderContent(content.content)}
              </div>
            ))}
          </div>
        </div>
        </div>

      </div>
    </div>
  )

}
