'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';
import Link from 'next/link';
import styles from '../Articles.module.scss';


function ArticlePage({params}: {params: {articleId: string}}) {
  
  const id = params.articleId;
  const [data, setData] = useState<any>({});

  useEffect(() => {
      // notion-api-worker
      fetch(
      'https://notion-api.splitbee.io/v1/page/' + id
      )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const title = data[Object.keys(data)[0]]?.value.properties.title[0][0];

  return <div className={styles.ArticlePage}>
    <h3>{title}</h3>
    <NotionRenderer
      blockMap={data}
      customBlockComponents={{
        page: ({ blockValue }) => {
            console.log(blockValue);
            return <Link href={`article/${blockValue.id}`}>{blockValue.properties?.title[0]}</Link>
      },
        header: ({blockValue}) => {
            const title = blockValue.properties?.title[0];
            return <h1>{title}</h1>
        },
        to_do:({blockValue}) => {
            const isChecked = blockValue.properties?.checked;
            const text = blockValue.properties?.title[0];
            return <div className={styles.to_do}>
                <span className={`${styles.checkmark} ${isChecked ? styles.checked : ''}`}></span>
                <div>{text}</div>
            </div>
        },
        quote: ({blockValue}) => {
            const text = blockValue.properties?.title[0];
            return <p className={styles.quote}>
                "{text}"
            </p>
        },
      }}
    />
  </div>;
};

export default ArticlePage;
