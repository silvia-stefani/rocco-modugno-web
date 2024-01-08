export type IProject = {
    id: string,
    cat: string[],
    date: string,
    place: string,
    client?: string,
    title: string,
    subtitle: string,
    description?: string,
    images: {
        cover: string,
        gallery: string[]
    },
    link?: string,
    photo?: string | string[],
    collab?: string[]
}