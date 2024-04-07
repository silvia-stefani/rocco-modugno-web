export interface ICoding {
    page: {
        title: string,
        description: string
    },
    projects: ICodingProjects[]
}

export interface ICodingProjects {
    id: string,
    title: string,
    subtitle: string,
    cover: string,
    link: string
}