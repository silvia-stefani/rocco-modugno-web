import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalDataType } from '../../types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from '../../components/Paragraph/Paragraph';

const About: React.FC = () => {

  const { t } = useTranslation()

  const about = t("about", { returnObjects: true }) as PersonalDataType;

  const presentation = about.presentation;
  const experience = about.experience;
  const mentions = about.mentions;
  const talks = about.talks;

  return (
    <div className={styles.About}>
      <div className={styles.image}>
        <img src="/profile_photo.jpg" alt="" />
      </div>
      <div className={styles.presentation}>
        <div className={styles.text}>
          <Paragraph text={presentation.text} />
          <div className={styles.block}>
            <h6>{experience.title}</h6>
            <Paragraph text={experience.text} />
          </div>
          <div className={styles.block}>
            <h6>{mentions.title}</h6>
            <Paragraph text={mentions.text} />
          </div>
          <div className={styles.block}>
            <h6>{talks.title}</h6>
            <Paragraph text={talks.text} />
          </div>
          <div>
            <div>Rocco Modugno</div>
            <div>{about.address.street}</div>
            <div>{about.address.location}</div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default About;
