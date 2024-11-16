import { BlockType } from "react-notion";

export interface IArticles {
    title: string,
    subtitle: string,
    link_notion: string
}

export interface INotionArticle {
    id: string;
    version: number;
    type: string;
    properties: {
        title: [string[]];
    };
    content: string[];
    created_time: number;
    last_edited_time: number;
    parent_id: string;
    parent_table: string;
    alive: boolean;
    space_id: string;
}
export interface INotionArticles {
    [key: string]: BlockType
}