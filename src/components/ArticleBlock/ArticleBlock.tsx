import * as React from 'react';
import { INotionArticle } from '../../interfaces/IArticles';

interface IArticleBlockProps {
    element: INotionArticle
}

const ArticleBlock: React.FunctionComponent<IArticleBlockProps> = ({element}) => {
  
    if(!element.properties) return null;

    switch (element.type) {
        case "page":
            return <a href={`/article/${element.id}`}>{element.properties.title}</a>
            break;
        case "text":
            return <p>{element.properties.title}</p>
            break;
        case "image":
            console.log(element);
            
            return <img src={`https://www.notion.so/image/https%3A%2F%2F`} />
            break;
        
        default:
            return <div>{element.properties.title}</div>
            break;
    }
};

export default ArticleBlock;
