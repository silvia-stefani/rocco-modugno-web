import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Articles.module.scss';
import { IArticles } from '../../interfaces/IArticles';
import { Client } from "@notionhq/client";
import { useEffect } from 'react';


const Articles = () => {

    const { t } = useTranslation()
    const articles = t("articles", { returnObjects: true }) as IArticles;
  
    /* const apiKey = "secret_GY8z5TD5czqmaXpXnzJml72ymzga";
    const pageId = 'a1f0ac2a58c742cc97eff21cb1893b50';
    
  (async () => {
    const notion = new Client({ auth: apiKey });
    const response = await notion.databases.query({ 
        database_id: "2edbdd836963479696f1266cdb539b60"
     });
    console.log(response);
  })(); */

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

