import { BlockType, MapImageUrl } from "react-notion";
import { INotionArticles } from "../interfaces/IArticles";

export interface BlockArticleI {
    id: string,
    type: string,
    blockData: string[],
    isChecked?: boolean,
    source?: string;
    src?: {
        link: string,
        caption: string,
    };
}


export const defaultMapImageUrl: MapImageUrl = (image = "", block) => {
    const url = new URL(
      `https://www.notion.so${
        image.startsWith("/image") ? image : `/image/${encodeURIComponent(image)}`
      }`
    );
  
    if (block && !image.includes("/images/page-cover/")) {
      const table =
        block.value.parent_table === "space" ? "block" : block.value.parent_table;
      url.searchParams.set("table", table);
      url.searchParams.set("id", block.value.id);
      url.searchParams.set("cache", "v2");
    }
  
    return url.toString();
  };

  
export function getNotionBlocks(data: INotionArticles) {

    const result: BlockArticleI[] = [];
    
    const currentPage = data[Object.keys(data)[0]];
    if(!currentPage) return null;
    currentPage.value.content?.forEach((blockId: string) => {

        const block = data[blockId];
        const blockValue = block.value;
        const blockType = blockValue.type;
        const properties = blockValue.properties;
        
        if (block) {
            result.push({
                id: blockValue.id,
                type: blockType,
                blockData: properties?.title[0],
                isChecked: properties?.checked ? true : false,
                ...((blockType === 'image') && { 
                    src: {
                        link: defaultMapImageUrl(properties?.source[0][0], block as BlockType),
                        caption: properties?.caption[0][0]
                    }
                }),
            });
        }
    });

    return result;

}