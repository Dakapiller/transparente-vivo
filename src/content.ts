export const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

type Person = {
  name: string
  role: string
  since: string
  quote: string
}

type RichTextPart = {
  text: string
  emphasis?: boolean
}

type LocaleContent = {
  nav: {
    menu: string
    close: string
    menuItems: Array<{
      label: string
      href: string
      active?: boolean
    }>
    petition: string
  }
  hero: {
    titleStart: string
    titleEmphasis: string
    titleEnd: string
    body: string
    cta: string
  }
  intro: {
    titleStart: string
    titleEmphasis: string
    titleEnd: string
  }
  stats: Array<{
    value: string
    emphasis: string
    label: string
  }>
  history: {
    titleStart: string
    titleEmphasis: string
    timeline: Array<{
      year: string
      label: string
      active?: boolean
    }>
  }
  people: Person[]
  peopleSection: {
    title: string
    titleParts: RichTextPart[]
    cta: string
    helper: string
  }
  ecosystem: {
    kicker: string
    titleStart: string
    titleEmphasis: string
    titleEnd: string
    bodyStart: string
    bodyEmphasis: string
    bodyEnd: string
    nodes: string[]
  }
  beliefs: {
    kicker: string
    titleStart: string
    titleEmphasis: string
    preserve: {
      title: string
      items: string[]
    }
    demolish: {
      title: string
      items: string[]
    }
  }
  cta: {
    titleStart: string
    titleEmphasis: string
    titleEnd: string
    body: string
    primary: string
    whatsapp: string
    shareMessage: string
  }
  footer: {
    about: string
    contactLabel: string
    contact: string
    addressLabel: string
    address: string
    socialLabel: string
    instagram: string
    facebook: string
  }
}

export const content = {
  pt: {
    nav: {
      menu: 'Menu',
      close: 'Fechar',
      menuItems: [
        { label: 'Introdução', href: '#top' },
        { label: 'Dados', href: '#community' },
        { label: 'Comunidade', href: '#people' },
        { label: 'Em que acreditamos', href: '#beliefs' },
        { label: 'Ecossistema', href: '#ecosystem' },
      ],
      petition: 'Assina a petição',
    },
    hero: {
      titleStart: 'Uma',
      titleEmphasis: 'comunidade',
      titleEnd: 'viva é património da cidade',
      body:
        'Este espaço é hoje um lugar de trabalho, encontro e criação. Antes de decidir o seu futuro, é essencial ouvir quem lhe dá vida todos os dias.',
      cta: 'Apoia esta causa',
    },
    intro: {
      titleStart: 'Sabias que o Edifício Transparente está',
      titleEmphasis: 'cheio de vida',
      titleEnd: 'por dentro?',
    },
    stats: [
      {
        value: '600+',
        emphasis: 'pessoas',
        label: 'trabalham aqui todos os dias',
      },
      {
        value: '100',
        emphasis: 'empresas',
        label: 'dependem deste ecossistema',
      },
      {
        value: '6',
        emphasis: 'restaurantes',
        label: 'vivem desta comunidade',
      },
      {
        value: '365',
        emphasis: 'dias',
        label: 'de atividade real no Porto',
      },
    ],
    history: {
      titleStart: 'Como este lugar se tornou',
      titleEmphasis: 'comunidade',
      timeline: [
        { year: '2001', label: 'Construído para a cultura' },
        { year: '2007', label: 'Abertura ao público' },
        { year: '2021', label: 'Criação do espaço de escritórios' },
        { year: '2025', label: 'Edifício ocupado a 100%' },
        { year: 'Agora', label: 'Demolição anunciada', active: true },
      ],
    },
    peopleSection: {
      title: 'Pessoas que aqui trabalham e tornam este lugar vivo',
      titleParts: [
        { text: 'Pessoas', emphasis: true },
        { text: ' que aqui ' },
        { text: 'trabalham', emphasis: true },
        { text: ' e tornam este lugar ' },
        { text: 'vivo', emphasis: true },
      ],
      cta: 'Protege esta comunidade',
      helper: 'leva menos de 1 minuto',
    },
    people: [
      {
        name: 'Mariana',
        role: 'consultora',
        since: 'desde 2022',
        quote: 'Se perder este espaço, perco a minha rede de contactos',
      },
      {
        name: 'Ricardo',
        role: 'empresário',
        since: 'desde 2022',
        quote: 'Se perder este espaço, perco a minha rede de contactos',
      },
      {
        name: 'Nome',
        role: 'emprego',
        since: 'desde 2022',
        quote: 'Se perder este espaço, perco a minha rede de contactos',
      },
      {
        name: 'Manuel',
        role: 'segurança',
        since: 'desde 2022',
        quote: 'Se perder este espaço, perco a minha rede de contactos',
      },
      {
        name: 'Ana',
        role: 'criativa',
        since: 'desde 2022',
        quote: 'Se perder este espaço, perco uma comunidade de trabalho',
      },
    ],
    ecosystem: {
      kicker: 'Porque funciona',
      titleStart: 'Um ecossistema',
      titleEmphasis: 'económico e social',
      titleEnd: 'no Porto',
      bodyStart: 'Restaurantes, escritórios, cultura e desporto trazem',
      bodyEmphasis: 'vida a uma zona que, sem este espaço, seria sazonal',
      bodyEnd: '.',
      nodes: ['Escritórios', 'Restaurantes', 'Desporto', 'Arte & Cultura'],
    },
    beliefs: {
      kicker: 'No que acreditamos',
      titleStart: 'Reutilizar também é construir o',
      titleEmphasis: 'futuro',
      preserve: {
        title: 'Não demolir',
        items: [
          'Preserva valor urbano, económico e social',
          'Mantém viva a atividade económica local',
          'Promove empregos, negócios e projetos',
          'Permite requalificar sem destruir',
        ],
      },
      demolish: {
        title: 'Demolir',
        items: [
          'Tem custos públicos difíceis de justificar',
          'Elimina postos de trabalho e negócios ativos',
          'Destrói um ecossistema económico que funciona',
          'Desfaz uma comunidade já existente',
        ],
      },
    },
    cta: {
      titleStart: 'Assina para',
      titleEmphasis: 'capacitar',
      titleEnd: 'este ecossistema',
      body:
        'Acreditamos em soluções que mantêm o valor e a atividade económica de um ecossistema que já está em funcionamento.',
      primary: 'Assina pela reutilização',
      whatsapp: 'Partilha por WhatsApp',
      shareMessage:
        'Eu apoio a reutilização do Edifício Transparente. Junta-te ao movimento Transparente Vivo.',
    },
    footer: {
      about:
        'O movimento Transparente Vivo é uma ação cívica criada por membros da comunidade do Edifício Transparente que pretende dar a conhecer o ecossistema existente neste espaço.',
      contactLabel: 'contacto',
      contact: 'ola@transparentevivo.pt',
      addressLabel: 'morada',
      address: 'via do castelo do queijo 395 4100-429 porto',
      socialLabel: 'Social',
      instagram: 'instagram',
      facebook: 'facebook',
    },
  },
  en: {
    nav: {
      menu: 'Menu',
      close: 'Close',
      menuItems: [
        { label: 'Introduction', href: '#top' },
        { label: 'Data', href: '#community' },
        { label: 'Community', href: '#people' },
        { label: 'What we believe', href: '#beliefs' },
        { label: 'Ecosystem', href: '#ecosystem' },
      ],
      petition: 'Sign the petition',
    },
    hero: {
      titleStart: 'A',
      titleEmphasis: 'living community',
      titleEnd: 'is city heritage',
      body:
        'This space is now a place for work, gathering, and creation. Before deciding its future, it is essential to listen to the people who bring it to life every day.',
      cta: 'Support this cause',
    },
    intro: {
      titleStart: 'Did you know the Edifício Transparente is',
      titleEmphasis: 'full of life',
      titleEnd: 'inside?',
    },
    stats: [
      {
        value: '600+',
        emphasis: 'people',
        label: 'work here every day',
      },
      {
        value: '100',
        emphasis: 'companies',
        label: 'depend on this ecosystem',
      },
      {
        value: '6',
        emphasis: 'restaurants',
        label: 'live from this community',
      },
      {
        value: '365',
        emphasis: 'days',
        label: 'of real activity in Porto',
      },
    ],
    history: {
      titleStart: 'How this place became a',
      titleEmphasis: 'community',
      timeline: [
        { year: '2001', label: 'Built for culture' },
        { year: '2007', label: 'Opened to the public' },
        { year: '2021', label: 'Office space created' },
        { year: '2025', label: 'Building fully occupied' },
        { year: 'Now', label: 'Demolition announced', active: true },
      ],
    },
    peopleSection: {
      title: 'People who work here and make this place alive',
      titleParts: [
        { text: 'People', emphasis: true },
        { text: ' who ' },
        { text: 'work', emphasis: true },
        { text: ' here and make this place ' },
        { text: 'alive', emphasis: true },
      ],
      cta: 'Protect this community',
      helper: 'takes less than 1 minute',
    },
    people: [
      {
        name: 'Mariana',
        role: 'consultant',
        since: 'here since 2022',
        quote: 'If I lose this space, I lose my network of contacts',
      },
      {
        name: 'Ricardo',
        role: 'entrepreneur',
        since: 'here since 2022',
        quote: 'If I lose this space, I lose my network of contacts',
      },
      {
        name: 'Name',
        role: 'worker',
        since: 'here since 2022',
        quote: 'If I lose this space, I lose my network of contacts',
      },
      {
        name: 'Manuel',
        role: 'security',
        since: 'here since 2022',
        quote: 'If I lose this space, I lose my network of contacts',
      },
      {
        name: 'Ana',
        role: 'creative',
        since: 'here since 2022',
        quote: 'If I lose this space, I lose a working community',
      },
    ],
    ecosystem: {
      kicker: 'Why it works',
      titleStart: 'An economic and social',
      titleEmphasis: 'ecosystem',
      titleEnd: 'in Porto',
      bodyStart: 'Restaurants, offices, culture, and sport bring',
      bodyEmphasis: 'life to an area that, without this space, would be seasonal',
      bodyEnd: '.',
      nodes: ['Offices', 'Restaurants', 'Sport', 'Art & Culture'],
    },
    beliefs: {
      kicker: 'What we believe',
      titleStart: 'Reuse is also building the',
      titleEmphasis: 'future',
      preserve: {
        title: 'Do not demolish',
        items: [
          'Preserves urban, economic, and social value',
          'Keeps local economic activity alive',
          'Promotes jobs, businesses, and projects',
          'Allows requalification without destruction',
        ],
      },
      demolish: {
        title: 'Demolish',
        items: [
          'Has public costs that are hard to justify',
          'Eliminates active jobs and businesses',
          'Destroys an economic ecosystem that works',
          'Breaks up an existing community',
        ],
      },
    },
    cta: {
      titleStart: 'Sign to',
      titleEmphasis: 'empower',
      titleEnd: 'this ecosystem',
      body:
        'We believe in solutions that preserve the value and economic activity of an ecosystem that is already working.',
      primary: 'Sign for reuse',
      whatsapp: 'Share on WhatsApp',
      shareMessage:
        'I support reusing the Edifício Transparente. Join the Transparente Vivo movement.',
    },
    footer: {
      about:
        'The Transparente Vivo movement is a civic action created by members of the Edifício Transparente community to reveal the ecosystem that already exists in this space.',
      contactLabel: 'contact',
      contact: 'ola@transparentevivo.pt',
      addressLabel: 'address',
      address: 'via do castelo do queijo 395 4100-429 porto',
      socialLabel: 'Social',
      instagram: 'instagram',
      facebook: 'facebook',
    },
  },
} satisfies Record<LanguageCode, LocaleContent>
