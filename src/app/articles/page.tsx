'use client'
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Articles.module.scss';
import { IArticles, INotionArticles } from '../../interfaces/IArticles';
import { useEffect, useState } from 'react';

import Icon from '../../components/Icon/Icon';

export default function Articles() {

    const parentPageId = process.env.NEXT_PUBLIC_NOTION;    
    const { t } = useTranslation()
    const articles = t("articles", { returnObjects: true }) as IArticles;
  
    const [data, setData] = useState<INotionArticles>({});

    useEffect(() => {
        fetch('https://notion-api.splitbee.io/v1/page/' + parentPageId)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [parentPageId]);

    const articlesList = Object.keys(data);

    return <div className={styles.Articles}>
        <div className={styles.container}>
            <h6 className={styles.title}>
                {articles.title}
            </h6>
            <div>
                {articles.subtitle}
            </div>
            {/* <a href="" target="_blank" className={styles.link}>{articles.link_notion}</a> */}
        </div>

        <div className={styles.list}>
            {articlesList.map((d, i) => {                
                const el = data[d].value;
                if(!el) return null;
                const content = el.properties?.title;
                if(el.id === parentPageId) return null;
                if(!(el.type === "page")) return null;
                return <a className={styles.article_link} key={i} href={`/articles/${el.id}`}>
                    <span className={styles.title}>{content}</span>
                    <span className={styles.icon}><Icon size={24} name={"ArrowRight"} /></span>
                </a>
            })}
        </div>

    </div>;
}

