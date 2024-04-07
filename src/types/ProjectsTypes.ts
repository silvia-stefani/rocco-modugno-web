import { ProjectsCatsIds } from "../interfaces/IProject"

export interface ProjectsCatsType {
    value: ProjectsCatsIds,
    label: string
}

export type ColabType = {
    id: number,
    title: string,
    extra: string[]
}