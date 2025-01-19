'use client'

import { INotionArticles } from 'interfaces/IArticles';
import { useState, useEffect } from 'react';
import { getNotionBlocks, BlockArticleI } from 'utils/getNotionBlocks';
import styles from './Article.module.scss';
import Link from 'next/link';
/* import { getListNumber } from 'react-notion'; */

const Article = ({ id }: { id: string } ) => {

    const [data, setData] = useState<INotionArticles | null>(null);

    useEffect(() => {
      fetch(`https://notion-api.splitbee.io/v1/page/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching article:', error));
    }, [id]);

    if (!id) return null;
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
          return <figure>
            <img src={block.src?.link} />
            <figcaption>{block.src?.caption}</figcaption>
          </figure>
          break;
        case "to_do":
          return <div className={styles.to_do}>
          <span className={`${styles.checkmark} ${block.isChecked ? styles.checked : ''}`}></span>
              <div>{block.blockData}</div>
          </div>
          break;

        case "bulleted_list":            
          return <li className={styles.li_item}>{block.blockData}</li>;
          break;
        case "quote":
          return <p className={styles.quote}>{block.blockData}</p>
          break;
        case "page":
          return <Link href={`article/${block.id}`}>{block.blockData}</Link>
          break;
        case "divider":
          return <div>
            <hr />
          </div>
          break;
      
        default:
          return <div>{block.blockData}</div>
          break;
      }
    }
    
  
    return <div className={styles.Article}>

      <h1 className={styles.title}>{title}</h1>
  
      {articlesBlocks.map((block) => {
        return <div id={block.type} key={block.id}>
          {content(block)}
        </div>
      })}

    </div>;
  }
  
  export default Article;