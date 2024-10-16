'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../Articles.module.scss';
import { BlockArticleI, getNotionBlocks } from '../../../utils/getNotionBlocks';
import { INotionArticles } from '../../../interfaces/IArticles';
/* import { Client } from '@notionhq/client'; */

function ArticlePage({params}: {params: {articleId: string}}) {
  
  const id = params.articleId;
  const [data, setData] = useState<INotionArticles | null>(null);

  useEffect(() => {
    fetch(`https://notion-api.splitbee.io/v1/page/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching article:', error));
  }, [id]);


  if(!data) return null;
  const articlesBlocks = getNotionBlocks(data);
  
  const title = data[Object.keys(data)[0]]?.value.properties.title[0][0];

  if(!articlesBlocks) return null;

  const content = (block: BlockArticleI) => {
    switch (block.type) {
      case "header":
        return <h1>{block.blockData}</h1>
        break;
      case "sub_header":
        return <h2>{block.blockData}</h2>
        break;
      case "sub_sub_header":
        return <h3>{block.blockData}</h3>
        break;
      case "text":
        return <p>{block.blockData}</p>
        break;
      case "image":
        return <img src={block.source} />
        break;
      case "to_do":
        return <div className={styles.to_do}>
        <span className={`${styles.checkmark} ${block.isChecked ? styles.checked : ''}`}></span>
            <div>{block.blockData}</div>
        </div>
        break;
      case "quote":
        return <p className={styles.quote}>{block.blockData}</p>
        break;
      case "page":
        return <Link href={`article/${block.id}`}>{block.blockData}</Link>
        break;
    
      default:
        break;
    }
    return <div>{block.blockData}</div>
  }

  return <div className={styles.ArticlePage}>
    <h3>{title}</h3>

    {articlesBlocks.map((block) => {
    return <div id={block.type} key={block.id}>
        {content(block)}
        </div>
      })}
    {/* <NotionRenderer
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
    /> */}
  </div>;
}

export default ArticlePage;
