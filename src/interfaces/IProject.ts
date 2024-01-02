import { ColabType, ProjectsCatsType } from "../types/ProjectsTypes"

export type IProject = {
    id: string,
    cat: string,
    date: string,
    title: string,
    subtitle: string,
    description: string,
    images: {
        cover: string,
        gallery: string[]
    },
    collab?: ColabType[]
}