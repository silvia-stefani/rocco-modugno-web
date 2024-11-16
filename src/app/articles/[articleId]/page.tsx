import * as React from 'react';

import Article from './client/Article';

export async function generateStaticParams() {

  const parentPageId = process.env.NEXT_PUBLIC_NOTION;    
  const response = await fetch('https://notion-api.splitbee.io/v1/page/' + parentPageId);
  const data = await response.json();

  return Object.keys(data).map((d: string) => ({
    articleId: d
  }));

}


const ArticlePage = ({ params }: { params: { articleId: string } }) => {

  const id = params.articleId;

  if(!id) return null;

  return <Article id={id} />

}

export default ArticlePage;
