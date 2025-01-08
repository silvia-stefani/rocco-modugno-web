export interface DetailsI {
    title?: string,
    text?: string,
    singleLine?: boolean,
    link?: {
        name: string,
        url: string;
    },
}

export interface ContentI {
    title: string,
    content: string[] | DetailsI[],
}

export type PersonalDataType = {
    contacts: {
        mail: string,
        tel: string,
        address: {
            street: string,
            location: string
        },
        pIva: string
    }
    presentation: string,
    content: ContentI[],
}