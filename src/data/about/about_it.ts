import { PersonalDataType } from "../../types/PersonalDataType"


//Testi correnti sotto intestazione

export const itServices = [
  {
    id: 1,
    title: "PROGETTAZIONE GRAFICA"
  },
  {
    id: 2,
    title: "SERVIZI DIGITALI"
  },
  {
    id: 3,
    title: "DIDATTICA E RICERCA"
  },
  {
    id: 4,
    title: "TUTTO E NIENTE"
  }
]

export const itPersonalData: PersonalDataType = {
  contacts: {


    address: {
      street: "Rocco Lorenzo Modugno",
      location: "Altre Attività dei disegnatori grafici"
    },

    mail: 'roccol.modugno@gmail.com',
    tel: '',

    pIva: 'P.IVA 04194631208'
  },
  presentation: `TUTTO E NIENTE – Questo sito è un parco giochi, un portfolio, un portale. Ci trovi grafica, pattern, e didattica laboratoriale.`,




  content: [


    {

      title: 'Progetti indipendenti',
      content: [
        {
          singleLine: true,
          title: 'Blauer Schnipsel',
          text: 'con Adele Buffa e Andrea Righetto prendiamo la monnezza e facciamo la bellezza.',
          link: {

            name: 'Esplora',
            url: 'https://www.blauerschnipsel.com/',

          }

        },

        {
          singleLine: true,
          title: 'WhateverDev()',
          text: 'con Andrea Maffei e Michele Maffei sfidiamo l\'autorità algoritmica.',
          link: {

            name: 'Esplora',
            url: 'https://whatever-dev-ws.github.io/',

          }

        },

        {
          singleLine: true,
          title: 'Draft Masters',
          text: 'con Amedeo Bonini hackeriamo vecchi pen plotter.',
          link: {

            name: 'Esplora',
            url: 'https://whatever-dev-ws.github.io/',

          }

        }


      ]

    },


    {
      title: "Attività di Alta Formazione",
      content: [
        {
          singleLine: true,
          title: 'Professore a contratto – IED Torino',
          text: 'Type Design 1 (Modulo ABPR-19), Design della Comunicazione Visiva, A.A. 24-25, 25-26.',
          link: {
            name: '',
            url: ''
          },
        },

        {
          singleLine: true,
          title: 'Professore a contratto – ABADIR Sant\'Agata li Battiati',
          text: 'Graphic Design (Curricolare ABPR-19), Progettazione artistica per l\'impresa DAPL06, A.A. 24-25',
          link: {
            name: '',
            url: ''
          },
        },



        {
          singleLine: true,
          title: 'Assistente Ricercatore – unibz',
          text: 'Progetto start-up "INTRA - Designing Embodied Human-Data IntraActions". Responsabile di progetto: Seçil Uğur Yavuz, 2025.',
          link: {
            name: 'Sito del progetto INTRA',
            url: 'https://intra.projects.unibz.it/'
          },
        },

        {
          singleLine: true,
          title: 'Ricercatore FADE – unibz',
          text: 'Progetto "Graphic Design From the Alps", Responsabile di progetto: Antonino Benincasa, 2023.',
        },

        {
          singleLine: true,
          title: 'Assistente alla didattica – unibz',
          text: 'Libera Università di Bolzano; Facoltà di Design, progetto "WUP", Titolare del corso: Antonino Benincasa. A.A. 21-22, 22-23, 23-24, 25-26.',
        }


      ],
    },


    {
      title: "Pubblicazioni",
      content: [

        {
          singleLine: true,
          title: 'Lettere dal Tirolo',
          text: 'in Alpitypes, Franzlab, Bolzano IT, 2025. ISBN 978-88-946405-3-3.',
          link: {
            name: 'Libro',
            url: 'https://www.franzlab.com/shop/alpitypes'
          },
        },

        {
          singleLine: true,
          title: 'Designing Embodied Interactive Experiences on Environmental Issues',
          text: '- Ugur Yavuz, Menendez-Blanco, Modugno, Fruhstorfer. In Proceedings of the CHItaly 2025. ACM, New York, USA.',
          link: {
            name: 'Articolo',
            url: 'https://doi.org/10.1145/3750069.3750156'
          },
        },

        {
          singleLine: true,
          title: 'Tiling through typography, typing shapes combining types',
          text: 'in Algorithminc pattern catalogue, 2023.',
          link: {
            name: 'Articolo',
            url: 'https://doi.org/10.21428/108765d1.7ce0eb8b'
          },
        },
        {
          singleLine: true,

          title: 'Combinatoria del Blauer Schnipsel',
          text: 'in Blauer Schnipsel, Co-generating a social fabric, Bozen-Bolzano IT, Franzlab, 2022.',
          link: {
            name: 'Libro',
            url: 'https://www.franzlab.com/shop/cento-06-blauer-schnipsel'
          },
        },
        {
          singleLine: true,

          title: 'Rappresentare il potere',
          text: 'in Plume, Pensieri Letture Visioni, #3, 2024, Cubical Press.',
          link: {
            name: 'Rivista',
            url: 'https://letterecubitali.it/prodotto/plume-pensieri-letture-visioni-3/'
          },
        },
      ]
    },






    {
      title: "Lectures, Talks, Workshops",
      content: [
        {
          singleLine: true,
          title: 'Tiling Trough Typography, typing shapes combining types',
          text: 'Universitat Oberta de Catalunya, Barcelona ES, 24.11.23.',
          link: {
            name: "video (1:48)",
            url: 'https://www.youtube.com/live/TGIpkoW4FHM?si=9GdUKeTuk1Z6jGKa',
          }

        },
        {
          singleLine: true,
          title: 'Pensiero algoritmico, Spazi generativi e combinatoria del pattern',
          text: `– ABADIR di Sant’Agata li Battiati IT, Italia, 18.10.22.`
        },

        {
          singleLine: true,
          title: 'Lost / Found / Changed - GREP, GREP styles and TOC.',
          text: '- unibz, Bozen-Bolzano IT, Facoltà di Design, 2023.',
        },
        {
          singleLine: true,
          title: 'La combinatoria del pattern: disegno decorativo attraverso l’analisi combinatoria e lo scripting',
          text: "- Accademia ABADIR, Sant'Agata li Battiati IT, Corso di studio: Graphic Design e Media Digitali.",
        }

      ]
    },


    {
      title: "Formazione",
      content: [
        {
          text: 'ISIA Faenza IT, Diploma Accademico di II Livello in Design della Comunicazione, 2020.'
        },

        {
          text: 'ISIA Urbino IT, Diploma Accademico di I Livello in Progettazione Grafica e Comunicazione Visiva, 2018.'
        },

        {
          text: 'Erasmus Project at Burg Giebichenstein University of art and design, Halle (Saale) DE, Editorial Design Project, 2017.'
        }
      ]
    },



    {
      title: "Menzioni",
      content: [
        {
          singleLine: true,
          title: 'Plotting Empowerment, das generative Design der Draft Masters',
          text: '- Mehler Ludwig, Franz Magazine (4.2.25).',
          link: {
            name: "leggi l'articolo",
            url: 'https://franzmagazine.com/2025/02/04/plotting-empowerment',
          }
        },


        {
          singleLine: true,
          title: 'Blauer Schnipsel: Ein alter Stoff wird neu gedacht',
          text: '- Oberrauch Maria, Franz Magazine (24.11.22).',
          link: {
            name: "leggi l'articolo",
            url: 'https://franzmagazine.com/2022/11/24/blauer-schnipsel-ein-alter-stoff-wird-neu-gedacht',
          }
        },
        {
          singleLine: true,
          title: '17/4: A bottom-up environmental campaign',
          text: '- Sfligiotti, Silvia. 365 typo, 2 (2015-16): pp.308-309, étapes editions, ISBN: 9791095254010.'
        },


      ]
    },

    {
      title: "Selezione progetti esposti",
      content: [
        {
          singleLine: true,
          title: 'Love your experiments',
          text: ' in Prospectives on AI, Basel Academy of Art and Design FHNW, Basel CH, 28.9-1.10.2024.'
        },

        {
          singleLine: false,
          title: 'Blauer Schnipsel',
          text: 'in Identity in motion, Sala Espositiva di Laives, via Pietralba 29, Laives IT, 7-14.9.2024.'
        },

        {
          text: '"Biolife”, 03.11.2022 Fiera Bolzano, Bozen-Bolzano IT; in mostra: "Blauer Schnipsel"'
        },

        {
          singleLine: false,
          title: 'Blissett\'s Post Mortem Portraits',
          text: 'in Giovani senza futuro, anziani senza passato; Casa Baldassarri, via Fratelli Bedeschi 2, Bagnacavallo IT, 24.9-10.10.2021.'
        },

        {
          text: 'in Il tempo è finito! Megastore Sonic Belligeranza, via Mascarella 16, Bologna IT, 16.02.2022.'
        },

        {
          singleLine: false,
          title: 'Un\'infinità di disegni',

          text: 'in Neologia: Nuovi linguaggi del visual design in Italia, Certosa Graphic Village, Milano IT, 25-27.3.2022'
        },

        {
          text: '“Neologia: Nuovi linguaggi del visual design in Italia", 16-26.10.2021 Toolbox Coworking, Torino TO; in mostra: “Un’infinità di disegni”.'
        },







      ]
    }





    /*
        export interface DetailsI {
          title?: string, //opzionale
          text?: string, //opzionale
          singleLine?: boolean, //true mette tutto su una riga, false mette su più
          link?: { //opzionale
              name: string, //quello che vedi
              url: string; //link
          },
      }
    */




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