export type ProjectsCatsIds =
    "all" |
    "editorial" |
    "type" |
    "scripting" |
    "coding" |
    "consult" |
    "pattern" |
    "research" |
    "motion" |
    "poster" |
    "illustration" |
    "text-to-image" |
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
        coverList?: string,   // Specific cover for List View
        coverPoints?: string, // Specific cover for Points View
        gallery: string[]
    },
    link?: {
        name: string,
        url: string,
    }[],
    details?: string[],
}