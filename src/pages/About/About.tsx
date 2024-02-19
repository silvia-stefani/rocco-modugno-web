import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalDataType } from '../../types/PersonalDataType';

import styles from './About.module.scss';
import Paragraph from '../../components/Paragraph/Paragraph';

const About: React.FC = () => {

  const { t } = useTranslation()

  const about = t("about", { returnObjects: true }) as PersonalDataType;

  const presentation = about.presentation;

  return (
    <div className={styles.About}>
      <div className={styles.image}>
        <img src="/profile_photo.jpg" alt="" />
      </div>
      <div className={styles.presentation}>
        <Paragraph text={presentation} />
        <div className={styles.block}>
          <h6>Esperienze principali</h6>
          <Paragraph text={`Nell’ambito dell’editoria per l’arte ho lavorato per Manfredi Edizioni, e Lilith Books e ho collaborato con Claudia Polizzi Graphic Design Studio.
            *enter*Nell’ambito della ricerca e dell’insegnamento ho lavorato per la Libera Università di Bolzano, L’ABADIR di Sant’Agata li Battiati e la Scuola Open Source.
            *enter*Nell’ambito del pattern design ho collaborato con Mauro Bubbico e Luigi Veccia.`
          } />
        </div>
        <div className={styles.block}>
          <h6>Project Mentions and Publications</h6>
          <Paragraph text={`Tiling through typography, typing shapes combining types; R. Modugno, Algorithminc pattern catalogue. DOI: https://doi.org/10.21428/108765d1.7ce0eb8b
            *enter*Blauer Schnipsel, co-generating a social fabric; Modugno, Buffa, Righetto; Franzlab 2020. ISBN: 978-88-945462-5-5
            *enter*Silvia Sfigiotti, 17/4: A bottom-up environmental campaign, 365 typo 2, étapes editions, 2015-16`
          } />
        </div>
        <div className={styles.block}>
          <h6>Talks</h6>
          <Paragraph text={`Pensiero algoritmico, Spazi generativi e combinatoria del pattern
          18.10.2022 ABADIR di Sant’Agata li Battiati CT, Italia
          Presentazione da remoto dei workshop tenuti presso Abadir.
          *enter*Tradizione e innovazione attraverso la pratica del design
          Con A. Buffa e A. Righetto
          09.02.2022 REX Upcycling Convention, Brixen BZ, Italia
          Presentazione del progetto Blauer Schnipsel: impostazione, sviluppo, feedback e prospettive.
          *enter*Tiling Trough Typography, typing shapes combining types
          24.11.2023 Universitat Oberta de Catalunya, Barcelona, Spagna`
          } />
        </div>
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
