export type ProjectsCatsIds = 
"all" |
"editorial" |
"type" |
"scripting" |
"consult" |
"pattern" |
"research" |
"motion" |
"poster" |
"textile" 
;

export type IProject = {
    id: string,
    cat: ProjectsCatsIds[],
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
    details?: string[],
}