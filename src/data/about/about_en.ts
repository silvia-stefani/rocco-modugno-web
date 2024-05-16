import { PersonalDataType } from "../../types/PersonalDataType"

export const enServices = [
    {
        id: 1,
        title: "Editorial services"
      },
      {
        id: 2,
        title: "Graphic design"
      },
      {
        id: 3,
        title: "Pattern design"
      },
      {
        id: 4,
        title: "Consulting"
      }
]

export const enPersonalData: PersonalDataType = {
  contacts: {
    mail: 'roccol.modugno@gmail.com ',
    tel: '+39 366 345 84 22',
    address: {
      street: "Via Aurelio Saffi 43",
      location: "Bologna BO, 40131 – Italy"
    },
    pIva: '04194631208'
  },
  presentation: `CIAO! Vuoi lavorare insieme?`,
  experience: {
    title: "Esperienze principali",
    content: [
      "2024 Libero professionista a P.Iva",
      "2023 Ricercatore FADE per la Libera Università di Bolzano BZ",
      "'21 Assistente di progetto per la Libera Università di Bolzano BZ",
      "'21 Collaboratore per Claudia Polizzi Graphic Design Studio, Bolzano BZ",
      "'20 Grafico editoriale per Manfredi Edizioni, Imola BO",
      "'19 Grafico editoriale per Lilit Books, Montescaglioso  MT",
      "'18 Grafico per Vertigo Coop, Tito PZ"
    ],
  },
  mentions: {
    title: "Menzioni e Pubblicazioni",
    content: [
      {
        title: 'Tiling through typography, typing shapes combining types;',
        text: 'R. Modugno, Algorithminc pattern catalogue. *enter*DOI: https://doi.org/10.21428/108765d1.7ce0eb8b'
      },
      {
        title: 'Blauer Schnipsel, co-generating a social fabric;',
        text: 'Modugno, Buffa, Righetto; Franzlab 2020. *enter*ISBN: 978-88-945462-5-5'
      },
      {
        title: 'Silvia Sfigiotti, 17/4: A bottom-up environmental campaign,',
        text: '365 typo 2, étapes editions, 2015-16'
      }
    ]
  },
  talks: {
    title: "Talks",
    content: [
      {
        title: 'Tiling Trough Typography, typing shapes combining types',
        text: '· 24.11.2023 Universitat Oberta de Catalunya, Barcelona, Spagna'
      },
      {
        title: 'Pensiero algoritmico, Spazi generativi e combinatoria del pattern',
        text: `· 18.10.2022 ABADIR di Sant’Agata li Battiati CT, Italia
        *enter*Presentazione da remoto dei workshop tenuti presso Abadi`
      },
      {
        title: 'Tradizione e innovazione attraverso la pratica del design',
        text: `· 09.02.2022 REX Upcycling Convention, Brixen BZ
        *enter*Con A. Buffa e A. Righetto`
      }
    ]
  },
  workshops: {
    title: "Workshops",
    content: [
      {
        title: 'Blauer Schnipsel for "A Place to bz"',
        text: '· 07.10.2023 Via del Macello, Bolzano BZ'
      },
      {
        title: 'XYZ 2022 “Tradire la tradizione” | Scuola Open Source',
        text: '· 25.09-03.08.2022 Mola di Bari BA'
      },
      {
        title: 'Lost/Found/Changed - GREP, styles and TOC | unibz',
        text: `· ay 2022-2023, Libera Università di Bolzano BZ
        *enter*· ay 2021-2022, Libera Università di Bolzano BZ`
      },
      {
        title: 'Blauer Schnipsel - We-Shirt | Fashio for Future, Bolzano BZ',
        text: `· 21.04.2023 Workshop: Svi.Co.Land Officine Vispa - Bolzano BZ
        *enter*28.04.2023 Flash mob: Piazza Walther - Bolzano BZ`
      },
      {
        title: 'Blauer Schnipsel - From string to fabric | By Design or By Disaster',
        text: `· 30.03.2023 Silandro/Schlanders BZ`
      },
      {
        title: 'Blauer Schnipsel - Co-generating a social fabric',
        text: `· 09.05.2022 Svi.Co.Land Officine Vispa - Bolzano BZ
        *enter*· 13.05.2022 Bitz Fablab - Bolzano BZ
        *enter*· 16.05.2022 Svi.Co.Land Officine Vispa - Bolzano BZ
        *enter*· 21.05.2022 Bitz Fablab - Bolzano BZ`
      },
      {
        title: 'Blauer Schnipsel - Shape grammar sample book | Biolife',
        text: `· 03.11.2022 Fiera Bolzano, Bolzano BZ`
      },
      {
        title: "La combinatoria del pattern | Accademia Abadir di Sant'A. li Battiati",
        text: `· 01-02.2021 Workshop da remoto`
      }
    ]
  },
  juryMem: {
    title: "Jury Member",
    content: [
      {
        title: "Dung – Game Jam, Hackathon",
        text: `· 23.04.2023 Libera Università di Bolzano, Bolzano BZ
        *enter*· 12.04.2022 Libera Università di Bolzano, Bolzano BZ`
      }
    ]
  }
}