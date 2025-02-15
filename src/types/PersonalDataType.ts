export interface DetailsI {
    title?: string, //opzionale
    text?: string, //opzionale
    singleLine?: boolean, //true mette tutto su una riga, false mette su più
    link?: { //opzionale
        name: string, //quello che vedi
        url: string; //link
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