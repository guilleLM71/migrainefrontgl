const preguntas = [
  {
    titulo: "¿Que edad tienes?",
    id:"pg1",
    tipopregunta:"input",
    respuesta: [
      { textarea: "" },
  
    ],
  },
  {
    titulo: "¿Cuál fue la duración en el último episodio de tus migrañas en días?",
    id:"pg2",
    tipopregunta:"input",
    respuesta: [
      { textarea: "" },
    ],
  },
  {
    titulo: "¿Con que frecuencia tienes tus episodios al mes?",
    id:"pg3",
    tipopregunta:"input",
    respuesta: [
      {textarea: "" },
    ],
  },
  {
    titulo: "¿Como clasificarias tu dolor de cabeza? Si lo tienes",
    id:"pg4",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "Ninguna" , value:"0"},
      { textoRespuesta: "Unilateral", value:"1"},
      { textoRespuesta: "Bilateral", value:"2"},
   
    ],
  },

  {
    titulo: "¿Que caracteristica tiene tu dolor de cabeza?",
    id:"pg5",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "Ninguna", value:"0" },
      { textoRespuesta: "Palpitante" , value:"1" },
      { textoRespuesta: "Constante" , value:"2" },

    ],
  },


  {
    titulo: "¿Que nivel de dolor de cabeza crees tener?",
    id:"pg6",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "Ninguna", value:"0"  },
      { textoRespuesta: "Leve", value:"1" },
      { textoRespuesta: "Media" , value:"2" },
      { textoRespuesta: "Severa", value:"3" },
    ],
  },

  {
    titulo: "¿Tus migrañas te provocan nauseas?",
    id:"pg7",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI", value:"1"  },
      { textoRespuesta: "NO", value:"0" },
 
    ],
  },

  {
    titulo: "¿Tus migrañas te provocan vomitos?",
    id:"pg8",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1"  },
      { textoRespuesta: "NO", value:"0" },
 
    ],
  },

  {
    titulo: "¿Tus migrañas son provocados por mucho ruido?, es decir tienes sensibildad al ruido ",
    id:"pg10",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
 
    ],
  },

  {
    titulo: "¿Tus migrañas son provocados cualquier provenencia de luz?, es decir tienes sensibildad a la luz",
    id:"pg11",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
 
    ],
  },

  {
    titulo: "Segun tu experiencia cuantos problemas visuales se presentan junto a tus migrañas, tomando en cuenta, visión de luces brillantes, luces que parpadean y puntos ciegos (escotoma) Visión doble, pérdida transitoria de visión, dolor en los ojos (solo un número)",
    id:"pg12",
    tipopregunta:"input",
    respuesta: [
      { textarea: "" },

 
    ],
  },

  {
    titulo: "Segun tu experiencia cuantos problemas sensoriales se presentan junto a tus migrañas, tomando en cuenta, entumecimientos, hormigueos, tambien cuentan sensibilades a la luz, sonido y  olores (solo un número)",
    id:"pg13",
    tipopregunta:"input",
    respuesta: [
      { textarea: "" },
     
     
 
    ],
  },


  {
    titulo: "¿Alguna vez se presentaron problemas de coordinacion del habla?",
    id:"pg14",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
     
     
 
    ],
  },

  {
    titulo: "¿Alguna vez se presentaron problemas de Sonidos y palabras desarticuladas?",
    id:"pg15",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI", value:"1"  },
      { textoRespuesta: "NO", value:"0" },
     
 
    ],
  },
  
  {
    titulo: "¿Alguna vez se presentaron problemas de vertigo o mareos?",
    id:"pg16",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO" , value:"0" },
     
     
 
    ],
  },

  {
    titulo: "¿Sufres de tinitus, es decir zumbidos o pitidos en el oido?",
    id:"pg17",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI", value:"1"  },
      { textoRespuesta: "NO", value:"0" },
     
     
 
    ],
  },

  {
    titulo: "¿Alguna vez sufriste de disminucion de sensibilidad auditiva o perdida de audicion?",
    id:"pg18",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
     
     
 
    ],
  },

  {
    titulo: "¿Alguna vez sufriste de vision doble durante tus episodios?",
    id:"pg19",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI", value:"1"  },
      { textoRespuesta: "NO", value:"0" },
     
     
 
    ],
  },
  {
    titulo: "¿Sufriste de defectos problemas visuales como, escotomas, glaucomas, etc?",
    id:"pg20",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
      
    ],
  },

  {
    titulo: "¿Alguna vez sufriste de problema en el control muscular de tu cuerpo?, es decir,  movimientos torpes involuntarios, dificultades para caminar y mantener el equilibrio, mala coordinación de las manos",
    id:"pg21",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI", value:"1"  },
      { textoRespuesta: "NO", value:"0" },
      
    ],
  },

  {
    titulo: "¿Alguna vez sufriste de problemas en la perdidad de conciencia?",
    id:"pg22",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
      
    ],
  },

  {
    titulo: "¿Alguna vez sufriste de sensación de hormigueo y entumecimiento, adormecimiento o ardor?",
    id:"pg23",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
      
    ],
  },

  {
    titulo: "¿Crees tener familiares con tus mismos problemas de migraña ?",
    id:"pg24",
    tipopregunta:"button",
    respuesta: [
      { textoRespuesta: "SI" , value:"1" },
      { textoRespuesta: "NO", value:"0" },
      
    ],
  },


];

export default preguntas;
