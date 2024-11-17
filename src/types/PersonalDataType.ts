export interface ContentI {
    title: string,
    content: string[] | {
        title: string,
        text: string
    }[]
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