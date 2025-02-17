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
  //presentation: `Collaboro con università, aziende e professionisti per sviluppare progetti innovativi. Puoi contattarmi per condividere strumenti, esperienze e visioni. `,
  //presentation: `Multidisciplinary Designer with a focus on Design Research, Digital Manufacturing and publishing. I provide designs and consultancy for companies, studios and museums who need to implement their workflow in terms of time saving, control, and technological implementation. More in general I look for simple solutions to complex problems. I also teach in the field of graphic design and visual communication, with a focus on collective creative processes. I am currently based in Bolzano-Bozen (Italy) where I am involved in two different artistic projects: Blauer Schnipsel and Draft Masters.`,
  presentation: `Mi occupo di Ricerca nell'ambito del Design, Digital Manufacturing ed Editoria. La mia pratica tiene insieme diverse discipline, come la comunicazione visiva e la programmazione, l'editoria e la didattica, la tipografia e la tessitura, il calcolo combinatorio e la decorazione. 
  Progetto, faccio consulenza e formazione per aziende, studi di design, e musei che hanno bisogno di migliorare il loro flusso di lavoro, in termini di ottimizzazione dei tempi, controllo e implementazione tecnologica. Più in generale mi piace trovare soluzioni semplici a problemi complessi. Insegno nell'ambito della progettazione grafica e della comunicazione visiva, con una particolare attenzione ai processi creativi collettivi. Attualmente vivo a Bolzano-Bozen (Italia) dove collaboro a diversi progetti artistici, come Blauer Schnipsel e Draft Masters.`,

  content: [
    {
      title: "Attività di Alta Formazione",
      content: [
        { singleLine:true,
          title: 'Assistente Ricercatore',
        text: '– Libera Università di Bolzano, Facoltà di Design. Progetto start-up "INTRA – Designing Embodied Human-Data IntraActions". Responsabile di progetto: Seçil Uğur Yavuz, 2025.',
        },

        {
          singleLine:true,
          title: 'Ricercatore FADE',
        text: '– Libera Università di Bolzano; Facoltà di Design, progetto "Graphic Design From the Alps", Responsabile di progetto: Antonino Benincasa, 2023.',
        },

      {
        singleLine: true,
        title: 'Assistente alla didattica',
        text: 'Libera Università di Bolzano; Facoltà di Design, progetto "WUP", Titolare del corso: Antonino Benincasa. A.A. 21-22, 22-23, 23-24.',
      },
        {
          title: 'WORKSHOP UNIVERSITARI',
        },
        
        {
          singleLine: true,
          title: 'Lost / Found / Changed – GREP, GREP styles and TOC.',
          text: '– Libera Università di Bolzano, Bolzano BZ, Facoltà di Design, Corso: Tipografia e Grafica, Titolare del corso: Antonino Benincasa; A.A. 2023-24, A.A. 2022-23.',
        },
        {          
          singleLine: true,
          title: 'La combinatoria del pattern: disegno decorativo attraverso l’analisi combinatoria e lo scripting',
          text: "– Accademia ABADIR, Sant'Agata li Battiati CT, Corso di studio: Graphic Design e Media Digitali, Titolare del corso: Mauro Bubbico; A.A. 2020-2021.",
        }

      ],
    },

    {
      title: "Formazione",
      content: [
        {
          text: 'ISIA Faenza, Diploma Accademico di II Livello in Design della Comunicazione, Tesi: "Un-infinità di Disegni", Relatrice: Valentina Rachiele, Correlatore: Marco Buiani, 2020.'
        },
        {
          text: 'Erasmus Project: Burg Giebichenstein University of art and design, Halle (Saale) DE, Editorial Design Project 2016-17'
        },
        { 
          text: 'ISIA Urbino, Diploma Accademico di I Livello in Progettazione Grafica e Comunicazione Visiva. Tesi: "Archeologia, Tradizione e Arti Applicate, il Pattern", Relatore: Marco Ferrari, Correlatore: Mauro Bubbico; 2018.'
        }
      ]
    },



    {
      title: "Pubblicazioni",
      content: [
        
        {
          singleLine: true,
          title:'Tiling through typography, typing shapes combining types',
          text: '– Modugno, Rocco Lorenzo; Algorithminc pattern catalogue (2023). DOI:',
          link: {
            name: 'https://doi.org/10.21428/108765d1.7ce0eb8b',
            url: 'https://doi.org/10.21428/108765d1.7ce0eb8b'
          },
        },
        {
          singleLine: true,

          title: 'Blauer Schnipsel, Co-generating a social fabric',
          text: '– Buffa Adele, Modugno Rocco L., Righetto Andrea et al. (2020). Bolzano, Franzlab. ISBN: 978-88-945462-5-5',
          link: {
            name: 'link al libro',
            url: 'https://www.franzlab.com/shop/cento-06-blauer-schnipsel'
          },
        },
        {
          singleLine: true,

          title: 'Rappresentare il potere',
          text: '– Modugno, Rocco Lorenzo. Plume, Pensieri Letture Visioni, #3 (2024), Cubical Press, ISBN: 979-12-210-5080-6',
          link: {
            name: 'link alla rivista',
            url: 'https://letterecubitali.it/prodotto/plume-pensieri-letture-visioni-3/'
          },
        },
      ]
    },



    {
      title: "Talks",
      content: [
        {
          singleLine: true,
          title: 'Tiling Trough Typography, typing shapes combining types',
          text: '– Modugno, Rocco Lorenzo, 1:48. 2023, Universitat Oberta de Catalunya, Barcelona, 24.11.23.',
          link: {
            name: "guarda la presentazione",
            url: 'https://www.youtube.com/live/TGIpkoW4FHM?si=9GdUKeTuk1Z6jGKa',
          }

        },
        {
          singleLine: true,
          title: 'Pensiero algoritmico, Spazi generativi e combinatoria del pattern',
          text: `– Modugno, Rocco Lorenzo. 2022, Lecture non pubblicata svoltasi da remoto sulle metodologie utilizzate nei workshop tenuti presso Abadir; ABADIR di Sant’Agata li Battiati CT, Italia, 18.10.22.`
        },
        {
          singleLine: true,
          title: 'Tradizione e innovazione attraverso la pratica del design',
          text: `Buffa A., Modugno R., Righetto A., 2022, Talk non pubblicata sul progetto sperimentale Blauer Schnipsel; REX Upcycling Convention, Brixen BZ, Italy, 09.02.22.`
        }
      ]
    },

    {
      title: "Menzioni",
      content: [
        {
          singleLine: true,
          title: 'Plotting Empowerment, das generative Design der Draft Masters',
          text: '– Mehler Ludwig, Franz Magazine (4.2.25).',
          link: {
            name: "leggi l'articolo",
            url: 'https://franzmagazine.com/2025/02/04/plotting-empowerment',
          }
        },

        
          {
            singleLine: true,
            title: 'Blauer Schnipsel: Ein alter Stoff wird neu gedacht',
            text: '– Oberrauch Maria, Franz Magazine (24.11.22).',
            link: {
              name: "leggi l'articolo",
              url: 'https://franzmagazine.com/2022/11/24/blauer-schnipsel-ein-alter-stoff-wird-neu-gedacht',
            }
          },
        {
          singleLine: true,
          title: '17/4: A bottom-up environmental campaign',
          text: '– Sfligiotti, Silvia. 365 typo, 2 (2015-16): pp.308-309, étapes editions, ISBN: 9791095254010.'
        },


      ]
    }, 

    {
      title: "Mostre Collettive",
      content: [
        {
          text: '"Prospectives on AI", 28.9-1.10.2024, Basel Academy of Art and Design FHNW, Basel; in mostra: "Love your experiments", poster made with Mauro Bubbico.'
        },

        {
          text: '"Identity in motion", 7-14.9.2024, Sala Espositiva di Laives, via Pietralba 29, Laives BZ; in mostra: "Blauer Schnipsel".'
        },

        {
          text: '"Biolife”, 03.11.2022 Fiera Bolzano, Bolzano BZ; in mostra: "Blauer Schnipsel"'
        },

        {
          text: '"Design with values", 21.10.2022 Oberrauch Ziet, Bolzano BZ; in mostra: "Blauer Schnipsel"'
        },

        {
          text: '“Neologia: Nuovi linguaggi del visual design in Italia", 25-27.3.2022 Certosa Graphic Village, Milano MI; in mostra: “Un’infinità di disegni”.'
        },
        {
          text: '"Giovani senza futuro, anziani senza passato", 24.9-10.10.2021, Casa Baldassarri, via Fratelli Bedeschi 2, Bagnacavallo BO; in mostra: "The Blisset Family".'
        },

        {
          text: '“Neologia: Nuovi linguaggi del visual design in Italia", 16-26.10.2021 Toolbox Coworking, Torino TO; in mostra: “Un’infinità di disegni”.'
        }
        
      ]
    }, 


{

  title: 'progetti artistici',
  content: [
    { 
      singleLine: true,
      title: 'Blauer Schnipsel',
  text: 'con Adele Buffa e Andrea Righetto. Upcycling degli scarti industriali derivati dalla produzione del Blauer Schurz (tipico grembiule sudtirolese), attraverso pratiche collettive.',
  link: {

    name: 'Account Instagram',
    url: 'https://www.instagram.com/blauerschnipsel/',

  }
  
  }


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