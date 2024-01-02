import { MemoiresGalleryType } from "../types/MemoiresTypes";
import { TextType } from "../types/TextType";

export type IMemoires = {
    text: TextType,
    projects: {
        id: number,
        font: string,
        title: string,
        mainImage: string;
        testo: string,
        link?: {
            id: number,
            url: string
        }[],
        gallery: MemoiresGalleryType
    }[]
}