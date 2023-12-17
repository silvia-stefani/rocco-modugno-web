type MemoiresGalleryRangeType = {
    from: number,
    to: number
}


type MemoiresGalleryType = {
    num: MemoiresGalleryRangeType | number[],
    base: number,
    class: number,
    matrix: number
}

export type MemoiresType = {
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
}