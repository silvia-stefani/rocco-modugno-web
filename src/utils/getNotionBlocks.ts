import { INotionArticles } from "../interfaces/IArticles";

export interface BlockArticleI {
    id: string,
    type: string,
    blockData: string[],
    isChecked?: boolean,
    source?: string;
}

export function getNotionBlocks(data: INotionArticles) {

    const result: BlockArticleI[] = [];
    
    const currentPage = data[Object.keys(data)[0]];

    currentPage?.value.content.forEach((blockId: string) => {
        if (data[blockId] && data[blockId].value.properties) {
            const block = data[blockId].value;
            const properties = data[blockId].value.properties;
            
            result.push({
                id: block.id,
                type: data[blockId].value.type,
                blockData: properties.title[0],
                isChecked: properties.checked ? true : false,
            });
        }
    });

    return result;

}