export const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

export const personIds = [
  'alex',
  'mariana',
  'ricardo',
  'fernando',
  'raquel',
  'manuel',
  'diogo',
  'ines-consultora',
  'catia',
  'marlon',
  'patricia',
  'guilherme',
  'ines-designer',
  'joana',
  'jane',
  'vanessa',
  'jose-maria',
  'rebecca',
  'hellen',
  'tomas',
  'daniel-product',
  'daniel-engenheiro',
  'joao',
  'afonso',
  'carlos',
  'thomas',
  'agatha',
  'yazmin',
  'renata',
  'malu',
  'juan',
] as const

export type PersonId = (typeof personIds)[number]

type Person = {
  id: PersonId
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
    linkedin: string
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
        { label: 'No que acreditamos', href: '#beliefs' },
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
        value: '~100',
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
        id: 'alex',
        name: 'Alex',
        role: 'Sales Manager',
        since: 'Aqui desde 2026',
        quote: 'Aqui nasceram amizades para a vida.',
      },
      {
        id: 'mariana',
        name: 'Mariana',
        role: 'Consultora',
        since: 'Aqui desde 2023',
        quote: 'Aqui encontrei a minha comunidade.',
      },
      {
        id: 'ricardo',
        name: 'Ricardo',
        role: 'CEO',
        since: 'Aqui desde 2022',
        quote: 'Aqui encontrei a minha vibe profissional.',
      },
      {
        id: 'fernando',
        name: 'Fernando',
        role: 'Estratega de Transformacao Digital, Fundador',
        since: 'Aqui desde 2022',
        quote: 'Aqui o meu horizonte tornou-se mais horizontal.',
      },
      {
        id: 'raquel',
        name: 'Raquel',
        role: 'Fundadora',
        since: 'Aqui desde 2025',
        quote: 'Aqui cresci, pessoal e profissionalmente.',
      },
      {
        id: 'manuel',
        name: 'Manuel',
        role: 'Porteiro',
        since: 'Aqui desde',
        quote: 'Aqui encontrei o meu lugar.',
      },
      {
        id: 'diogo',
        name: 'Diogo',
        role: 'Marketing',
        since: 'Aqui desde 2014',
        quote: 'Este lugar abriu-me novas oportunidades.',
      },
      {
        id: 'ines-consultora',
        name: 'Inês',
        role: 'Consultora',
        since: 'Aqui desde 2021',
        quote: 'Este lugar deu-me novas perspectivas.',
      },
      {
        id: 'catia',
        name: 'Cátia',
        role: 'Marketing',
        since: 'Aqui desde 2025',
        quote: 'Este espaço faz-me sentir parte de algo.',
      },
      {
        id: 'marlon',
        name: 'Marlon',
        role: 'Vidéografo',
        since: 'Aqui desde 2025',
        quote: 'Este espaço ligou-me a pessoas incríveis.',
      },
      {
        id: 'patricia',
        name: 'Patrícia',
        role: 'People Partner',
        since: 'Aqui desde 2026',
        quote: 'Este lugar trouxe mais cor ao meu dia a dia.',
      },
      {
        id: 'guilherme',
        name: 'Guilherme',
        role: 'Developer',
        since: 'Aqui desde 2026',
        quote: 'Este espaço tornou o Porto mais meu.',
      },
      {
        id: 'ines-designer',
        name: 'Inês',
        role: 'Graphic Designer',
        since: 'Aqui desde 2026',
        quote: 'Aqui conheci pessoas que me inspiram.',
      },
      {
        id: 'joana',
        name: 'Joana',
        role: 'People and Culture',
        since: 'Aqui desde 2023',
        quote: 'Este lugar mostrou-me o valor da comunidade.',
      },
      {
        id: 'jane',
        name: 'Jane',
        role: 'Sales Development Rep',
        since: 'Aqui desde 2026',
        quote: 'Aqui construí relações que importam.',
      },
      {
        id: 'vanessa',
        name: 'Vanessa',
        role: 'Space Manager',
        since: 'Aqui desde 2024',
        quote: 'Aqui encontrei mais do que um local de trabalho.',
      },
      {
        id: 'jose-maria',
        name: 'José Maria',
        role: 'Designer',
        since: 'Aqui desde 2024',
        quote: 'Aqui encontrei energia para criar e crescer.',
      },
      {
        id: 'rebecca',
        name: 'Rebecca',
        role: 'Arquiteta',
        since: 'Aqui desde 2023',
        quote: 'Este lugar mudou a minha vida.',
      },
      {
        id: 'hellen',
        name: 'Hellen',
        role: 'Talent Manager',
        since: 'Aqui desde 2024',
        quote: 'Aqui criaram-se laços que continuam fora daqui.',
      },
      {
        id: 'tomas',
        name: 'Tomás',
        role: 'Product',
        since: 'Aqui desde 2024',
        quote: 'Este espaço tornou-se uma segunda casa.',
      },
      {
        id: 'daniel-product',
        name: 'Daniel',
        role: 'Product',
        since: 'Aqui desde 2024',
        quote: 'Aqui encontrei pessoas com quem cresci.',
      },
      {
        id: 'daniel-engenheiro',
        name: 'Daniel',
        role: 'Engenheiro de Software',
        since: 'Aqui desde 2025',
        quote: 'Aqui senti que não estava sozinho.',
      },
      {
        id: 'joao',
        name: 'João',
        role: 'Engenheiro de Software',
        since: 'Aqui desde',
        quote: 'Este espaço faz parte da minha rotina.',
      },
      {
        id: 'afonso',
        name: 'Afonso',
        role: 'Gerente do Frik',
        since: 'Aqui desde 2025',
        quote: 'Aqui encontrei pessoas que me fazem ficar.',
      },
      {
        id: 'carlos',
        name: 'Carlos',
        role: 'Empregado da mesa',
        since: 'Aqui desde 2023',
        quote: 'Este lugar tornou-se parte da minha história.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Empregado da mesa',
        since: 'Aqui desde 2026',
        quote: 'Este lugar fez-me sentir bem-vindo desde o primeiro dia.',
      },
      {
        id: 'agatha',
        name: 'Ágatha',
        role: 'Empregada de balcão',
        since: 'Aqui desde 2026',
        quote: 'Aqui surgiram ligações que não esperava.',
      },
      {
        id: 'yazmin',
        name: 'Yazmin',
        role: 'Empregada da mesa',
        since: 'Aqui desde 2026',
        quote: 'Este espaço fez-me acreditar em novas possibilidades.',
      },
      {
        id: 'renata',
        name: 'Renata',
        role: 'Empregada da mesa',
        since: 'Aqui desde 2018',
        quote: 'Aqui sinto-me em casa.',
      },
      {
        id: 'malu',
        name: 'Malu',
        role: 'Empregada da mesa',
        since: 'Aqui desde 2026',
        quote: 'Aqui encontrei inspiração para seguir em frente.',
      },
      {
        id: 'juan',
        name: 'Juan',
        role: 'Ajudante de cozinha',
        since: 'Aqui desde 2025',
        quote: 'Este lugar ajudou-me a recomeçar.',
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
      linkedin: 'linkedin',
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
      titleEnd: "is the city's heritage",
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
        value: '~100',
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
        { year: '2025', label: 'Building 100% occupied' },
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
        id: 'alex',
        name: 'Alex',
        role: 'Sales Manager',
        since: 'here since 2026',
        quote: 'This is where lifelong friendships were born.',
      },
      {
        id: 'mariana',
        name: 'Mariana',
        role: 'Consultant',
        since: 'here since 2023',
        quote: 'This is where I found my community.',
      },
      {
        id: 'ricardo',
        name: 'Ricardo',
        role: 'CEO',
        since: 'here since 2022',
        quote: 'This is where I found my professional vibe.',
      },
      {
        id: 'fernando',
        name: 'Fernando',
        role: 'Digital Transformation Strategist, Founder',
        since: 'here since 2022',
        quote: 'Here, my horizon became more horizontal.',
      },
      {
        id: 'raquel',
        name: 'Raquel',
        role: 'Founder',
        since: 'here since 2025',
        quote: 'Here, I grew personally and professionally.',
      },
      {
        id: 'manuel',
        name: 'Manuel',
        role: 'Doorman',
        since: 'here since',
        quote: 'Here I found my place.',
      },
      {
        id: 'diogo',
        name: 'Diogo',
        role: 'Marketing',
        since: 'here since 2014',
        quote: 'This place opened new opportunities for me.',
      },
      {
        id: 'ines-consultora',
        name: 'Inês',
        role: 'Consultant',
        since: 'here since 2021',
        quote: 'This place gave me new perspectives.',
      },
      {
        id: 'catia',
        name: 'Cátia',
        role: 'Marketing',
        since: 'here since 2025',
        quote: 'This space makes me feel part of something.',
      },
      {
        id: 'marlon',
        name: 'Marlon',
        role: 'Videographer',
        since: 'here since 2025',
        quote: 'This space connected me with incredible people.',
      },
      {
        id: 'patricia',
        name: 'Patrícia',
        role: 'People Partner',
        since: 'here since 2026',
        quote: 'This place brought more color to my everyday life.',
      },
      {
        id: 'guilherme',
        name: 'Guilherme',
        role: 'Developer',
        since: 'here since 2026',
        quote: 'This space made Porto feel more mine.',
      },
      {
        id: 'ines-designer',
        name: 'Inês',
        role: 'Graphic Designer',
        since: 'here since 2026',
        quote: 'Here I met people who inspire me.',
      },
      {
        id: 'joana',
        name: 'Joana',
        role: 'People and Culture',
        since: 'here since 2023',
        quote: 'This place showed me the value of community.',
      },
      {
        id: 'jane',
        name: 'Jane',
        role: 'Sales Development Rep',
        since: 'here since 2026',
        quote: 'Here I built relationships that matter.',
      },
      {
        id: 'vanessa',
        name: 'Vanessa',
        role: 'Space Manager',
        since: 'here since 2024',
        quote: 'Here I found more than a workplace.',
      },
      {
        id: 'jose-maria',
        name: 'José Maria',
        role: 'Designer',
        since: 'here since 2024',
        quote: 'Here I found energy to create and grow.',
      },
      {
        id: 'rebecca',
        name: 'Rebecca',
        role: 'Architect',
        since: 'here since 2023',
        quote: 'This place changed my life.',
      },
      {
        id: 'hellen',
        name: 'Hellen',
        role: 'Talent Manager',
        since: 'here since 2024',
        quote: 'Here, bonds were created that continue beyond this place.',
      },
      {
        id: 'tomas',
        name: 'Tomás',
        role: 'Product',
        since: 'here since 2024',
        quote: 'This space has become a second home.',
      },
      {
        id: 'daniel-product',
        name: 'Daniel',
        role: 'Product',
        since: 'here since 2024',
        quote: 'Here I found people I grew with.',
      },
      {
        id: 'daniel-engenheiro',
        name: 'Daniel',
        role: 'Software Engineer',
        since: 'here since 2025',
        quote: "Here I felt I wasn't alone.",
      },
      {
        id: 'joao',
        name: 'João',
        role: 'Software Engineer',
        since: 'here since',
        quote: 'This space is part of my routine.',
      },
      {
        id: 'afonso',
        name: 'Afonso',
        role: 'Frik Manager',
        since: 'here since 2025',
        quote: 'Here I found people who make me stay.',
      },
      {
        id: 'carlos',
        name: 'Carlos',
        role: 'Waiter',
        since: 'here since 2023',
        quote: 'This place has become part of my story.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Waiter',
        since: 'here since 2026',
        quote: 'This place made me feel welcome from day one.',
      },
      {
        id: 'agatha',
        name: 'Ágatha',
        role: 'Counter Staff',
        since: 'here since 2026',
        quote: "Here I made connections I didn't expect.",
      },
      {
        id: 'yazmin',
        name: 'Yazmin',
        role: 'Waitress',
        since: 'here since 2026',
        quote: 'This space made me believe in new possibilities.',
      },
      {
        id: 'renata',
        name: 'Renata',
        role: 'Waitress',
        since: 'here since 2018',
        quote: 'Here I feel at home.',
      },
      {
        id: 'malu',
        name: 'Malu',
        role: 'Waitress',
        since: 'here since 2026',
        quote: 'Here I found inspiration to keep moving forward.',
      },
      {
        id: 'juan',
        name: 'Juan',
        role: 'Kitchen Assistant',
        since: 'here since 2025',
        quote: 'This place helped me start over.',
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
      titleEmphasis: 'protect',
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
      linkedin: 'linkedin',
    },
  },
} satisfies Record<LanguageCode, LocaleContent>
