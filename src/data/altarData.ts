import { AltarElement } from '../types.ts';

export const ALTAR_ELEMENTS: AltarElement[] = [
  {
    id: 'cempasuchil',
    name: 'Flor de Cempasúchil',
    nahuatlName: 'Cempohualxochitl (veinte flores)',
    symbolism: 'Luz del sol y sendero aromático',
    category: 'guias',
    icon: '🌼',
    detailedFact: 'Por su color naranja intenso que asemeja al sol y su perfume característico, se deshoja creando un camino desde la puerta de la casa hasta el altar para que el alma no se extravíe.',
    promptQuestion: '¿Por qué la flor de cempasúchil es indispensable en el altar y cuál es la leyenda de Xóchitl y Huitzilin?'
  },
  {
    id: 'pan-de-muerto',
    name: 'Pan de Muerto',
    symbolism: 'El ciclo de la vida, cráneo y huesos',
    category: 'ofrenda',
    icon: '🍞',
    detailedFact: 'La esfera en la cima simboliza el cráneo o cabeza del difunto. Las cuatro canillas transversales representan los huesos y los cuatro rumbos del universo prehispánico (Nahuac). Su esencia de azahar o anís evoca el recuerdo.',
    promptQuestion: '¿Cuál es el origen prehispánico y virreinal del Pan de Muerto y qué significan sus cuatro canillas?'
  },
  {
    id: 'sal',
    name: 'Sal en plato o cruz',
    symbolism: 'Purificación y preservación del alma',
    category: 'elementos',
    icon: '🧂',
    detailedFact: 'Elemento fundamental de purificación para que el cuerpo del difunto no se corrompa en su trayecto de ida y vuelta para el siguiente año.',
    promptQuestion: '¿Por qué se pone un platito de sal en el altar de muertos y qué papel juega en la purificación espiritual?'
  },
  {
    id: 'agua',
    name: 'Vaso con Agua',
    symbolism: 'Mitigar la sed del alma tras el largo viaje',
    category: 'elementos',
    icon: '💧',
    detailedFact: 'El agua representa la fuente de la vida. Se ofrece a las ánimas para que sacien su sed después del arduo recorrido desde el Mictlán o el más allá.',
    promptQuestion: '¿Qué representa el agua en la ofrenda y cómo se relaciona con la pureza y el descanso del ánima?'
  },
  {
    id: 'velas',
    name: 'Velas y Veladoras',
    symbolism: 'Luz, fe y esperanza que alumbra el retorno',
    category: 'guias',
    icon: '🕯️',
    detailedFact: 'La flama representa la luz que ilumina el camino de regreso al lugar de descanso. Antiguamente se usaban rajas de ocote; el número de cirios suele coincidir con los difuntos recordados.',
    promptQuestion: '¿Qué simbolizan las veladoras moradas y blancas en la ofrenda tradicional?'
  },
  {
    id: 'copal',
    name: 'Copal e Incienso',
    nahuatlName: 'Copalli (resina sagrada)',
    symbolism: 'Sublimación de la oración y limpieza de malas energías',
    category: 'elementos',
    icon: '💨',
    detailedFact: 'Era la ofrenda aromática que los mexicas dedicaban a sus dioses. Su humo asciende llevando las plegarias y purifica el espacio de malos espíritus para que el alma entre con paz.',
    promptQuestion: '¿Cómo usaban el copal los pueblos prehispánicos y por qué purifica el altar de muertos?'
  },
  {
    id: 'papel-picado',
    name: 'Papel Picado',
    symbolism: 'El elemento viento y la alegría de la fiesta',
    category: 'ofrenda',
    icon: '🪁',
    detailedFact: 'Representa el aire y el viento por su ligereza y movimiento. Los colores tradicionales tienen significado: naranja (luto prehispánico), morado (duelo católico), rosa (gozo) y blanco (pureza).',
    promptQuestion: '¿Qué significa cada color del papel picado y cómo representa el elemento aire en el altar?'
  },
  {
    id: 'calaveritas',
    name: 'Calaveritas de Azúcar o Chocolate',
    symbolism: 'La muerte siempre presente pero dulce',
    category: 'ofrenda',
    icon: '💀',
    detailedFact: 'Tienen su raíz en el Tzompantli prehispánico (hilera de cráneos sagrados). En la época colonial se adaptaron con la técnica del alfeñique italiano. Llevar el nombre en la frente recuerda nuestro propio destino con alegría.',
    promptQuestion: '¿De dónde nacieron las calaveritas de azúcar y qué relación tienen con el Tzompantli prehispánico?'
  },
  {
    id: 'xoloitzcuintle',
    name: 'El Perro Xoloitzcuintle',
    nahuatlName: 'Xólotl + itzcuintli (perro del dios Xólotl)',
    symbolism: 'Guía espiritual a través del río Apanohuacalhuia',
    category: 'guias',
    icon: '🐕',
    detailedFact: 'En la cosmovisión mexica, el alma debía cruzar el caudaloso río del inframundo montada sobre el lomo de un Xoloitzcuintle bermejo, quien sólo ayudaba a quienes habían sido bondadosos con los perros en vida.',
    promptQuestion: '¿Cómo ayudaba el Xoloitzcuintle a las almas a cruzar el río del Mictlán y por qué es tan especial?'
  },
  {
    id: 'fotografia',
    name: 'Fotografía o Retrato',
    symbolism: 'La persona a quien se dedica el tributo de amor',
    category: 'ofrenda',
    icon: '🖼️',
    detailedFact: 'Debe colocarse en el nivel superior de la ofrenda. Recuerda que no han desaparecido, sino que viven en la memoria de su familia y comunidad.',
    promptQuestion: '¿Dónde debe colocarse la fotografía del difunto en un altar de 3 o 7 niveles y por qué?'
  },
  {
    id: 'comida-bebida',
    name: 'Comida Favorita y Mole',
    symbolism: 'El deleite del ánima mediante los aromas',
    category: 'ofrenda',
    icon: '🍲',
    detailedFact: 'Las almas no comen la materia física, sino que se nutren de la esencia aromática (los aromas cálidos del mole con pollo, el atole de masa, los tamales y los frutos de temporada como mandarinas y tejocotes).',
    promptQuestion: '¿Cómo "comen" las almas los alimentos puestos en la ofrenda según la creencia tradicional?'
  },
  {
    id: 'niveles-altar',
    name: 'Los 7 Niveles del Altar',
    symbolism: 'Los pasos necesarios para llegar al descanso eterno',
    category: 'guias',
    icon: '🪜',
    detailedFact: 'Los altares pueden ser de 2 niveles (cielo y tierra), de 3 niveles (cielo, tierra y purgatorio), o monumentales de 7 niveles, que representan las estaciones que el alma debe atravesar para alcanzar la paz eterna.',
    promptQuestion: '¿Qué significa cada uno de los 7 niveles de un altar tradicional de muertos para una maqueta escolar?'
  }
];

export const STUDY_TOPICS = [
  {
    title: 'El Mictlán y sus 9 Niveles',
    summary: 'La cosmovisión mexica del viaje de 4 años hacia el descanso eterno gobernado por Mictlantecuhtli y Mictecacíhuatl.',
    question: 'Explícame los 9 niveles del Mictlán paso a paso de manera clara para un proyecto de secundaria.'
  },
  {
    title: 'El Calendario del 27 Oct al 2 Nov',
    summary: 'Cada fecha recibe a diferentes almas: mascotas, accidentes, niños y adultos.',
    question: '¿Qué día llega cada ánima desde el 27 de octubre hasta el 2 de noviembre según las tradiciones mexicanas?'
  },
  {
    title: 'Día de Muertos vs. Halloween',
    summary: 'Diferencias históricas, espirituales y culturales entre ambas celebraciones sincretizadas.',
    question: '¿Cuáles son las diferencias históricas y culturales entre el Día de Muertos y Halloween explicadas para clase de historia?'
  },
  {
    title: 'La Catrina y José Guadalupe Posada',
    summary: 'De "La Calavera Garbancera" satírica en grabado al elegante mural de Diego Rivera.',
    question: '¿Cuál es la historia completa de La Catrina, qué criticaba José Guadalupe Posada y cómo Diego Rivera la nombró Catrina?'
  },
  {
    title: 'Tradiciones Regionales (Xantolo, Janitzio, Mixquic)',
    summary: 'Cómo celebran en la Huasteca, Pátzcuaro Michoacán, Oaxaca y los altares blancos de Huaquechula.',
    question: '¿Cómo se celebra el Día de Muertos en Michoacán, Oaxaca y la Huasteca (Xantolo)?'
  }
];
