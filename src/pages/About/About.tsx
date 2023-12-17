import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalDataType } from '../../types/PersonalDataType';

import styles from './About.module.scss';

const About: React.FC = () => {

  const { t } = useTranslation()
 
  const about = t("about", {returnObjects: true}) as PersonalDataType;

  const presentation = about.presentation.split("\n\n")
  
  return (
    <div className={styles.About}>
      <div className={styles.presentation}>
          <div>{presentation.map((paragraph) => (
            <div>{paragraph}</div>
          ))}</div>
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
