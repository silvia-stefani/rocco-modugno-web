import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalDataType } from '../../types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from '../../components/Paragraph/Paragraph';

const About: React.FC = () => {

  const { t } = useTranslation()
 
  const about = t("about", {returnObjects: true}) as PersonalDataType;

  const presentation = about.presentation;
  
  return (
    <div className={styles.About}>
      <div className={styles.image}>
        <img src="/profile_photo.jpg" alt="" />
      </div>
      <div className={styles.presentation}>
          <Paragraph text={presentation} />
          <div>
            <div>Rocco Modugno</div>
            <div>{about.address.street}</div>
            <div>{about.address.location}</div>
          </div>
      </div>
    </div>
  )

}

export default About;
