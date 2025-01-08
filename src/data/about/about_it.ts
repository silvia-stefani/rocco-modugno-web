import { PersonalDataType } from "../../types/PersonalDataType"


//Testi correnti sotto intestazione

export const itServices = [
  {
    id: 1,
    title: ""
  },
  {
    id: 2,
    title: "" 
  },
  {
    id: 3,
    title: ""
  }
]

export const itPersonalData: PersonalDataType = {
  contacts: {
    mail: 'roccol.modugno@gmail.com ',
    tel: '+39 366 345 84 22',
    address: {
      street: "Via Aurelio Saffi 43",
      location: "Bologna BO, 40131 – Italy"
    },
    pIva: '04194631208'
  },
  presentation: `Collaboro con università, aziende e professionisti per sviluppare progetti innovativi. Puoi contattarmi per condividere strumenti, esperienze e visioni. `,
  content: [
    {
      title: "Esperienze principali",
      content: [
        "2024 Assegnista di ricerca per la libera università di Bolzano, Libero professionista a P.Iva",
        "2023 Ricercatore FADE e Assistente alla didattica per la Libera Università di Bolzano",
        "2022 Assistente alla didattica per la Libera Università di Bolzano",
        "2021 Collaboratore per Claudia Polizzi Graphic Design Studio, Assistente alla didattica per la Libera Università di Bolzano",
        "2020 Grafico editoriale per Manfredi Edizioni",
        "2019 Grafico editoriale per Lilit Books, Montescaglioso  MT",
        "2018 Grafico per Vertigo Coop, Tito PZ"
      ],
    },
    {
      title: "Pubblicazioni e menzioni",
      content: [
        {
          title: 'Tiling through typography, typing shapes combining types;',
          text: 'R. Modugno, Algorithminc pattern catalogue. DOI:',
          singleLine: true,
          link: {
             name: "https://doi.org/10.21428/108765d1.7ce0eb8b",
             url: "https://doi.org/10.21428/108765d1.7ce0eb8b"
          }
        },
        {
          title: 'Blauer Schnipsel, co-generating a social fabric;',
          text: 'Buffa, Modugno, Righetto; Franzlab 2020. ISBN: 978-88-945462-5-5',
          singleLine: true,
        },
        {
          title: 'Silvia Sfigiotti, 17/4: A bottom-up environmental campaign,',
          text: '365 typo 2, étapes editions, 2015-16',
          singleLine: true,
        }
      ]
    },
    {
      title: "Talks",
      content: [
        {
          title: 'Tiling Trough Typography, typing shapes combining types',
          text: '· 24.11.2023 Universitat Oberta de Catalunya, Barcelona, Spagna'
        },
        {
          title: 'Pensiero algoritmico, Spazi generativi e combinatoria del pattern',
          text: `· 18.10.2022 ABADIR di Sant’Agata li Battiati CT, Italia
          *enter*Presentazione da remoto dei workshop tenuti presso Abadir`
        },
        {
          title: 'Tradizione e innovazione attraverso la pratica del design',
          text: `· 09.02.2022 REX Upcycling Convention, Brixen BZ`
        }
      ]
    },
    {
      title: "Progetti artistici",
      content: [
        {
          link: {
            name: "Nome del link",
            url: "https://url.com",
          }
        },
      ]
    },

    /*Array di oggetti per intestazioni elastiche
    {
      title: "cane",
      content: [ //array o di titoli e oggetti oppure di sole stringhe ("...","...")
     {title: "uccellino",
     text: "gattino",
     }]
    }
*/




  ]
}