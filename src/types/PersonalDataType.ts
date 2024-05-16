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
    experience: {
        title: string,
        content: string[]
    },
    mentions: {
        title: string,
        content: {
            title: string,
            text: string
        }[]
    },
    talks: {
        title: string,
        content: {
            title: string,
            text: string
        }[]
    },
    workshops: {
        title: string,
        content: {
            title: string,
            text: string
        }[]
    },
    juryMem: {
        title: string,
        content: {
            title: string,
            text: string
        }[]
    }
}