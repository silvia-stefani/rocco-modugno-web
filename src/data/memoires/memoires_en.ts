import { IMemoires } from "../../interfaces/IMemoires";

export const enMemoires: IMemoires = {
    text: [
        { text: "Memoires", style: "italic" },
        { text: " è una raccolta di riflessioni poetiche e formali sulla decorazione. Il titolo è ispirato all’articolo di Sebastien Truchet “Memoires sur les combinasions” del 1704. A partire da questo articolo ho elaborato un nuovo metodo per la progettazione dei pattern basato sull’analisi combinatoria. I risvolti di questo nuovo approccio sono qui raccolti in una serie di articoli." }
    ],
    projects: [
        {
            id: 1,
            font: "Ghesboro Lisboa-Regular",
            title: "Memoires project title",
            mainImage: "",
            testo: "Project description",
            link: [
                {
                    id: 1,
                    url: ""
                }
            ],
            gallery: {
                num: [ 2500, 1900 ],
                base: 6,
                class: 16,
                matrix: 4
            }
        }
    ]
}