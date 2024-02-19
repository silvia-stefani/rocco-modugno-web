import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Articles.module.scss';
import { IArticles } from '../../interfaces/IArticles';

const Articles = () => {

    const { t } = useTranslation()
    const articles = t("articles", { returnObjects: true }) as IArticles;
  
    return <div className={styles.Articles}>
        <div className={styles.container}>
            <h6 className={styles.title}>
                {articles.title}
            </h6>
            <div>
                {articles.subtitle}
            </div>

            {/* Link al Notion */}
            <a href="" target="_blank" className={styles.link}>{articles.link_notion}</a>
        </div>
    </div>;
};

export default Articles;
