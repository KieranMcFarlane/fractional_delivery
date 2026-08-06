import { EbookSignup } from "@/components/ebook-signup";
import { HeroPathButtons } from "@/components/hero-path-buttons";
import { ServicePathSelector } from "@/components/service-path-selector";
import { Testimonials } from "@/components/testimonials";
import { calLink, calNamespace, calOrigin } from "@/lib/cal";
import type { Locale } from "@/lib/types";

const challenges = [
  ["Stalling velocity", "Delivery keeps slowing as the team grows and complexity rises."],
  ["Slipping roadmaps", "Deadlines slip every quarter, and nobody can quite say why."],
  ["Outcome friction", "Everyone is busy, yet the business results do not move."],
  ["Priority overload", "Priorities change faster than work gets finished, and effort gets wasted."],
  ["Fragile scale", "Leadership wants to accelerate, but the delivery foundation feels too shaky to push on."],
] as const;

const challengesFr = [
  ["Vitesse qui ralentit", "La delivery ralentit à mesure que l'équipe grandit et que la complexité augmente."],
  ["Roadmaps qui glissent", "Les échéances dérapent chaque trimestre, sans que personne puisse vraiment dire pourquoi."],
  ["Friction sur les résultats", "Tout le monde est occupé, mais les résultats business n'avancent pas."],
  ["Trop de priorités", "Les priorités changent plus vite que le travail ne se termine, et l'effort se disperse."],
  ["Croissance fragile", "La direction veut accélérer, mais les bases delivery semblent trop instables pour pousser plus fort."],
] as const;

const scalingServices = [
  {
    title: "Project Delivery Diagnostic",
    tagline: "Find where delivery slows down, and why.",
    body:
      "A clear look at how work actually moves through your organisation. Where it stalls, where decisions get stuck, and where the gaps between teams quietly cost you momentum. I use AI-assisted analysis to process your delivery data before we sit down together, so I arrive already knowing where to probe.",
    duration: "3 to 8 days",
    cta: "Book a diagnostic",
    image: "/images/delivery_model_scaling_art.jpg",
    outputs: [
      "Delivery friction map",
      "Key risks and bottlenecks identified",
      "Prioritised 30-60-90 day improvement plan",
      "AI-assisted pattern analysis of your delivery data",
    ],
  },
  {
    title: "Fractional Delivery Leadership",
    tagline: "Embed senior delivery leadership into your existing team.",
    body:
      "I work directly alongside your product, engineering and leadership teams, bringing the structure, rhythm and visibility that delivery needs as the organisation grows and coordination gets harder. Each week I run AI signal scanning across your delivery data, so risks surface before they reach your standup.",
    duration: "Quarterly",
    cta: "Start fractional support",
    image: "/images/team_alignment_art_abstract_1773586089439.png",
    outputs: [
      "Clear delivery cadence and planning structure",
      "Delivery visibility and reporting for leadership",
      "Risk and dependency management",
      "Weekly AI signal scanning for proactive risk detection",
    ],
  },
  {
    title: "Delivery Operating Model",
    tagline: "Design a delivery system that supports long-term growth.",
    body:
      "Together we build a practical operating model covering roles, decision paths, planning cadence, reporting and delivery health signals. It includes a delivery intelligence layer that defines which signals to watch and how to act on them, so you get a system that keeps working after I leave.",
    duration: "Scoped to team size",
    cta: "Design your model",
    image: "/images/chaos_to_order_art_1773583705793.png",
    outputs: [
      "Delivery playbook and operating principles",
      "Roles, responsibilities and decision paths",
      "Delivery health indicators and reporting structure",
      "AI intelligence layer integrated into your delivery playbook",
    ],
  },
  {
    title: "AI & Automation",
    tagline: "Put AI and automation to work inside how you operate.",
    body:
      "For teams ready to remove the repetitive, manual work that slows delivery. Working alongside a dedicated AI automation practice, I design and build the solutions: agentic workflows, CRM and system integrations, and automated processes. You get the operating model redesigned and the systems to run it actually built, from one accountable point of contact.",
    duration: "1 to 4 days a week",
    cta: "Explore an AI build",
    image: "/images/ai_delivery_intelligence_art.jpg",
    isNew: true,
    outputs: [
      "Mapped and redesigned workflows",
      "AI and automation built and integrated",
      "Connected CRM and systems",
      "Documented, scalable processes",
    ],
  },
] as const;

const scalingServicesFr = [
  {
    title: "Diagnostic de Delivery Projet",
    tagline: "Identifier où la delivery ralentit, et pourquoi.",
    body:
      "Une lecture claire de la façon dont le travail circule réellement dans votre organisation. Où il bloque, où les décisions se figent, et où les écarts entre équipes coûtent discrètement de la dynamique. J'utilise une analyse assistée par IA pour traiter vos données de delivery avant nos échanges, afin d'arriver en sachant déjà où approfondir.",
    duration: "3 à 8 jours",
    cta: "Réserver un diagnostic",
    image: "/images/delivery_model_scaling_art.jpg",
    outputs: [
      "Cartographie des frictions delivery",
      "Risques et blocages clés identifiés",
      "Plan d'amélioration priorisé à 30-60-90 jours",
      "Analyse assistée par IA des patterns dans vos données delivery",
    ],
  },
  {
    title: "Leadership Delivery Fractionné",
    tagline: "Intégrer un leadership delivery senior dans votre équipe existante.",
    body:
      "Je travaille directement avec vos équipes produit, engineering et leadership pour apporter la structure, le rythme et la visibilité dont la delivery a besoin quand l'organisation grandit et que la coordination devient plus difficile. Chaque semaine, j'analyse les signaux dans vos données delivery afin que les risques apparaissent avant le standup.",
    duration: "Trimestriel",
    cta: "Démarrer un support fractionné",
    image: "/images/team_alignment_art_abstract_1773586089439.png",
    outputs: [
      "Cadence delivery et structure de planification claires",
      "Visibilité delivery et reporting pour le leadership",
      "Gestion des risques et dépendances",
      "Analyse hebdomadaire des signaux IA pour détecter les risques plus tôt",
    ],
  },
  {
    title: "Modèle Opérationnel Delivery",
    tagline: "Concevoir un système delivery qui soutient la croissance.",
    body:
      "Nous construisons ensemble un modèle opérationnel concret couvrant les rôles, les chemins de décision, la cadence de planification, le reporting et les signaux de santé delivery. Il inclut une couche d'intelligence delivery qui définit les signaux à suivre et la façon d'agir.",
    duration: "Selon la taille de l'équipe",
    cta: "Concevoir votre modèle",
    image: "/images/chaos_to_order_art_1773583705793.png",
    outputs: [
      "Playbook delivery et principes opérationnels",
      "Rôles, responsabilités et chemins de décision",
      "Indicateurs de santé delivery et structure de reporting",
      "Couche d'intelligence IA intégrée au playbook delivery",
    ],
  },
  {
    title: "IA & Automatisation",
    tagline: "Mettre l'IA et l'automatisation au service de vos opérations.",
    body:
      "Pour les équipes prêtes à retirer le travail répétitif et manuel qui ralentit la delivery. Avec une pratique dédiée à l'automatisation IA, je conçois et construis les solutions: workflows agentiques, intégrations CRM et systèmes, et processus automatisés.",
    duration: "1 à 4 jours par semaine",
    cta: "Explorer un build IA",
    image: "/images/ai_delivery_intelligence_art.jpg",
    isNew: true,
    outputs: [
      "Workflows cartographiés et redessinés",
      "IA et automatisations construites et intégrées",
      "CRM et systèmes connectés",
      "Processus documentés et scalables",
    ],
  },
] as const;

const outcomes = [
  [
    "Predictable delivery",
    "You stop finding out about problems in the weekly update. Work moves forward with clear ownership, realistic timelines, and enough visibility that leadership can trust the plan without having to chase it.",
  ],
  [
    "Stronger team coordination",
    "Product, design and engineering stop working in parallel and start working together. Handovers get cleaner, priorities get clearer, and the friction that was quietly eating into your delivery capacity starts to fade.",
  ],
  [
    "Leadership focus on growth",
    "You stop being pulled back into day-to-day delivery decisions and get the headspace to focus on where the business is actually going. The team runs. You lead.",
  ],
] as const;

const outcomesFr = [
  [
    "Delivery prévisible",
    "Vous arrêtez de découvrir les problèmes dans le point hebdomadaire. Le travail avance avec une ownership claire, des délais réalistes, et assez de visibilité pour que le leadership puisse faire confiance au plan.",
  ],
  [
    "Meilleure coordination d'équipe",
    "Produit, design et engineering cessent de travailler en parallèle et commencent à avancer ensemble. Les handovers deviennent plus nets, les priorités plus claires, et les frictions diminuent.",
  ],
  [
    "Leadership concentré sur la croissance",
    "Vous êtes moins tiré dans les décisions delivery quotidiennes et retrouvez l'espace nécessaire pour vous concentrer sur la direction réelle de l'entreprise.",
  ],
] as const;

const aboutReasons = [
  [
    "I have led delivery from the inside.",
    "I have managed delivery directly inside digital, AI and tech teams as they scaled. I know what breaks first because I have been in the room when it happened.",
  ],
  [
    "Practical structure, built around your reality.",
    "I do not arrive with a framework to install or a certification to justify. I look at how your team actually works, find where delivery is losing momentum, and build something that fits.",
  ],
  [
    "Built for the growth gap.",
    "That moment when informal ways of working stop being enough. Too big to coordinate by instinct, too small for a full ops function. That is where I operate.",
  ],
  [
    "The right structure, with less weight.",
    "The goal is never more meetings or more documentation. It is enough clarity that teams can decide and move work forward without constant escalation.",
  ],
  [
    "AI where it earns its place.",
    "I use AI to surface delivery signals earlier, so risks get caught before they compound.",
  ],
] as const;

const aboutReasonsFr = [
  [
    "J'ai dirigé la delivery de l'intérieur.",
    "J'ai géré la delivery directement dans des équipes digitales, IA et tech en croissance. Je sais ce qui casse en premier parce que j'ai été dans la pièce quand cela s'est produit.",
  ],
  [
    "Une structure pratique, construite autour de votre réalité.",
    "Je n'arrive pas avec un framework à installer. J'observe comment votre équipe travaille vraiment, j'identifie où la delivery perd de la dynamique, et je construis quelque chose qui s'adapte.",
  ],
  [
    "Conçue pour le moment de croissance difficile.",
    "Ce moment où les façons informelles de travailler ne suffisent plus. Trop grand pour coordonner à l'instinct, trop petit pour une fonction ops complète. C'est là que j'interviens.",
  ],
  [
    "La bonne structure, sans lourdeur.",
    "L'objectif n'est jamais plus de réunions ou plus de documentation. C'est assez de clarté pour que les équipes décident et avancent sans escalade constante.",
  ],
  [
    "L'IA là où elle mérite sa place.",
    "J'utilise l'IA pour faire remonter les signaux delivery plus tôt, afin que les risques soient détectés avant de s'accumuler.",
  ],
] as const;

const faqs = [
  [
    "When is the right time to bring in delivery leadership support?",
    "Usually when delivery has started slipping faster than you can fix it from inside the team, or when a digital programme is too big to run off the side of someone's desk.",
  ],
  [
    "What types of teams do you typically work with?",
    "Two kinds: established businesses going digital without an internal tech team, and scaling product, engineering and AI teams that need delivery structure.",
  ],
  [
    "What does a typical engagement look like?",
    "It starts with a look at how work actually moves through your organisation. From there we agree the highest-leverage changes and I work alongside your team to put them in place.",
  ],
  [
    "Do you work with distributed or international teams?",
    "Yes. I work across Europe and am comfortable leading distributed teams and managing agencies and vendors remotely. English and French.",
  ],
] as const;

const faqsFr = [
  [
    "Quand faut-il faire appel à un leadership delivery externe ?",
    "Souvent lorsque la delivery commence à glisser plus vite que l'équipe ne peut la corriger de l'intérieur, ou lorsqu'un programme digital est trop important pour être géré en plus du reste.",
  ],
  [
    "Avec quels types d'équipes travaillez-vous ?",
    "Deux types: des entreprises établies qui passent au digital sans équipe tech interne, et des équipes produit, engineering et IA en croissance qui ont besoin de structure delivery.",
  ],
  [
    "À quoi ressemble un engagement typique ?",
    "On commence par regarder comment le travail circule réellement dans votre organisation. Ensuite, nous définissons les changements les plus utiles et je travaille avec votre équipe pour les mettre en place.",
  ],
  [
    "Travaillez-vous avec des équipes distribuées ou internationales ?",
    "Oui. Je travaille à travers l'Europe et je suis à l'aise avec les équipes distribuées, les agences et les fournisseurs à distance. Anglais et français.",
  ],
] as const;

const copy = {
  en: {
    eyebrow: "Fractional Delivery & Digital Leadership",
    heroTitle: "Senior leadership for complex digital delivery,",
    heroEmphasis: "without the full-time hire",
    heroQuote: "\"When digital gets complex, I bring clarity and structure.\"",
    heroBody:
      "I lead digital programmes for established businesses going digital without an internal tech team, and I bring delivery structure to scaling tech and AI teams that already have one. Same senior, hands-on leadership, on the days you need it, shaped to where you are.",
    doorBusiness: "I'm a business going digital",
    doorBusinessMeta: "Transformation, no internal tech team",
    doorScaling: "I'm a scaling tech team",
    doorScalingMeta: "Delivery structure for your team",
    discoveryLink: "Or book a discovery call",
    trusted: "Trusted by teams at",
    trustedMicrocopy: "Engagements delivered in-house and through agency teams.",
    challengesEyebrow: "The challenges",
    challengesHeading: "When teams usually call me",
    challengesIntro:
      "Whether you are a business with a big digital project and no tech team, or a team whose delivery has outgrown its systems, the symptoms tend to look familiar.",
    pathEyebrow: "Choose your path",
    pathHeadingPrefix: "Where are you",
    pathHeadingEmphasis: "starting from?",
    pathIntro: "Pick the one that sounds like you, and head straight to the relevant offer.",
    doorOne: "Path 1",
    doorTwo: "Path 2",
    businessTitle: "Businesses going digital",
    businessIntro:
      "An established organisation with a serious digital agenda and no internal tech team. You need someone senior to own the programme and steer the agencies.",
    scalingTitle: "Scaling tech and AI teams",
    scalingIntro:
      "You already have product, design and engineering, but delivery is slipping as you grow. You need structure and rhythm that fits your team.",
    businessEyebrow: "For businesses going digital",
    businessHeading: "Lead your digital programme with someone who has done it before",
    businessBody:
      "For established organisations in care, hospitality, retail and professional services with a real digital agenda: a website rebuild, new systems, a marketing and digital function to stand up, but no internal tech leadership. I own the programme end to end.",
    service: "Service",
    businessServiceTitle: "Fractional Digital Leadership",
    businessServiceTagline: "Be the senior digital leader your business needs, part time.",
    businessCadence: "Ongoing, 1 to 3 days a week",
    bestFor: "Best for",
    businessBestFor: "Established businesses going digital without an in-house tech team.",
    bookDiscovery: "Book a discovery call",
    whatYouGet: "What you get",
    businessOutputs: [
      "Clear digital roadmap aligned to business goals",
      "Agency and vendor selection and management",
      "Website, systems and marketing modernisation delivered",
      "Board-level reporting in plain, non-technical language",
    ],
    scalingEyebrow: "For scaling tech & AI teams",
    scalingHeading: "Bring delivery structure to a team that has outgrown its systems",
    scalingBody:
      "For product, engineering and AI teams where coordination pressure is starting to slow delivery. I work directly alongside your existing team and bring the structure, rhythm and visibility that growth demands.",
    newBadge: "New",
    outcomeEyebrow: "The outcome",
    outcomeHeading: "What you gain",
    outcomeIntro: "Operational clarity that lets teams scale delivery without losing momentum.",
    intelligenceEyebrow: "Technology & insight",
    intelligenceHeading: "AI-enabled",
    intelligenceHeadingEmphasis: "delivery intelligence",
    intelligenceBody:
      "AI helps reveal patterns across backlogs, workflows and team communication that delivery leaders often spot too late, including recurring blockers, estimation drift and hidden coordination friction. I use it because it genuinely helps me catch risks before they become your problem.",
    aboutEyebrow: "About",
    aboutHeading: "Camille, fractional delivery and digital leadership",
    aboutBody:
      "I help organisations get digital done, whether that means leading a transformation for a business without an internal tech team, or bringing delivery structure to a scaling tech team that already has one. I have spent the last 8 years leading digital delivery across agencies, international organisations and high-growth teams.",
    aboutTags: ["Based in the UK, working across Europe", "English & French", "Professionally insured: PI, cyber & data protection"],
    whyChoose: "Why teams choose me",
    faqHeading: "Common questions",
    ctaHeadingPrefix: "Discuss your",
    ctaHeadingEmphasis: "delivery challenges",
    ctaBody: "Let us explore how your team could scale delivery, and whether I can help bring structure to your growth.",
    ctaNote: "Book directly in the calendar and share context during scheduling.",
  },
  fr: {
    eyebrow: "Fractional Delivery & Leadership Digital",
    heroTitle: "Leadership senior pour la delivery digitale complexe,",
    heroEmphasis: "sans recruter à temps plein",
    heroQuote: "\"Quand le digital devient complexe, j'apporte clarté et structure.\"",
    heroBody:
      "Je pilote des programmes digitaux pour des entreprises établies qui passent au digital sans équipe tech interne, et j'apporte de la structure delivery aux équipes tech et IA en croissance qui en ont déjà une. Le même leadership senior et opérationnel, les jours où vous en avez besoin.",
    doorBusiness: "Je suis une entreprise qui passe au digital",
    doorBusinessMeta: "Transformation, sans équipe tech interne",
    doorScaling: "Je suis une équipe tech en croissance",
    doorScalingMeta: "Structure delivery pour votre équipe",
    discoveryLink: "Ou réserver un discovery call",
    trusted: "Trusted by teams at",
    trustedMicrocopy: "Engagements réalisés en interne et via des équipes d'agence.",
    challengesEyebrow: "Les défis",
    challengesHeading: "Quand les équipes font appel à moi",
    challengesIntro:
      "Que vous soyez une entreprise avec un grand projet digital et pas d'équipe tech, ou une équipe dont la delivery a dépassé ses systèmes, les symptômes se ressemblent souvent.",
    pathEyebrow: "Choisissez votre point de départ",
    pathHeadingPrefix: "D'où",
    pathHeadingEmphasis: "partez-vous ?",
    pathIntro: "Choisissez l'option qui vous ressemble et allez directement vers l'offre pertinente.",
    doorOne: "Parcours 1",
    doorTwo: "Parcours 2",
    businessTitle: "Entreprises qui passent au digital",
    businessIntro:
      "Une organisation établie avec une vraie ambition digitale et pas d'équipe tech interne. Vous avez besoin d'une personne senior pour porter le programme et piloter les agences.",
    scalingTitle: "Équipes tech et IA en croissance",
    scalingIntro:
      "Vous avez déjà produit, design et engineering, mais la delivery glisse avec la croissance. Vous avez besoin d'une structure adaptée à votre équipe.",
    businessEyebrow: "Pour les entreprises qui passent au digital",
    businessHeading: "Piloter votre programme digital avec quelqu'un qui l'a déjà fait",
    businessBody:
      "Pour les organisations établies dans le care, l'hospitality, le retail et les services professionnels avec une vraie ambition digitale: refonte de site, nouveaux systèmes, fonction marketing et digital à structurer, mais sans leadership tech interne. Je prends le programme en main de bout en bout.",
    service: "Service",
    businessServiceTitle: "Leadership Digital Fractionné",
    businessServiceTagline: "Le leadership digital senior dont votre entreprise a besoin, à temps partiel.",
    businessCadence: "Continu, 1 à 3 jours par semaine",
    bestFor: "Idéal pour",
    businessBestFor: "Entreprises établies qui passent au digital sans équipe tech interne.",
    bookDiscovery: "Réserver un discovery call",
    whatYouGet: "Ce que vous obtenez",
    businessOutputs: [
      "Roadmap digitale claire alignée aux objectifs business",
      "Sélection et pilotage des agences et fournisseurs",
      "Modernisation du site, des systèmes et du marketing",
      "Reporting board-level en langage clair et non technique",
    ],
    scalingEyebrow: "Pour les équipes tech & IA en croissance",
    scalingHeading: "Apporter de la structure delivery à une équipe qui a dépassé ses systèmes",
    scalingBody:
      "Pour les équipes produit, engineering et IA où la pression de coordination commence à ralentir la delivery. Je travaille directement avec votre équipe existante et j'apporte la structure, le rythme et la visibilité nécessaires.",
    newBadge: "Nouveau",
    outcomeEyebrow: "Le résultat",
    outcomeHeading: "Ce que vous gagnez",
    outcomeIntro: "Une clarté opérationnelle qui permet aux équipes de scaler la delivery sans perdre leur dynamique.",
    intelligenceEyebrow: "Technologie & insight",
    intelligenceHeading: "Intelligence delivery",
    intelligenceHeadingEmphasis: "assistée par IA",
    intelligenceBody:
      "L'IA aide à révéler des patterns dans les backlogs, les workflows et les communications d'équipe que les leaders delivery repèrent souvent trop tard, notamment les blocages récurrents, les dérives d'estimation et les frictions de coordination cachées.",
    aboutEyebrow: "À propos",
    aboutHeading: "Camille, fractional delivery et leadership digital",
    aboutBody:
      "J'aide les organisations à faire avancer le digital, qu'il s'agisse de piloter une transformation pour une entreprise sans équipe tech interne, ou d'apporter une structure delivery à une équipe tech en croissance. J'ai passé les 8 dernières années à diriger la delivery digitale côté agences, organisations internationales et équipes en forte croissance.",
    aboutTags: ["Basée au Royaume-Uni, active en Europe", "Anglais & français", "Assurée professionnellement: PI, cyber & protection des données"],
    whyChoose: "Pourquoi les équipes me choisissent",
    faqHeading: "Questions fréquentes",
    ctaHeadingPrefix: "Discutons de vos",
    ctaHeadingEmphasis: "défis delivery",
    ctaBody: "Explorons comment votre équipe peut scaler la delivery, et si je peux aider à structurer votre croissance.",
    ctaNote: "Réservez directement dans le calendrier et partagez le contexte pendant la réservation.",
  },
} as const;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.16em] ${light ? "text-[#f3a78f]" : "text-[#e9694b]"}`}>
      {children}
    </p>
  );
}

function CheckMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 flex-none text-[#e9694b]">
      <path d="M13.5 4.25 6.25 11.5 2.5 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const origin = calOrigin();

  return (
    <button
      type="button"
      data-cal-namespace={calNamespace()}
      data-cal-link={calLink()}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      {...(origin ? { "data-cal-origin": origin } : {})}
      className={`inline-flex cursor-pointer items-center justify-center rounded-[0.7rem] bg-[#e9694b] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#d4583c] active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

export function HomeRedesign({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const localizedChallenges = locale === "fr" ? challengesFr : challenges;
  const localizedServices = locale === "fr" ? scalingServicesFr : scalingServices;
  const localizedOutcomes = locale === "fr" ? outcomesFr : outcomes;
  const localizedAboutReasons = locale === "fr" ? aboutReasonsFr : aboutReasons;
  const localizedFaqs = locale === "fr" ? faqsFr : faqs;

  return (
    <div className="overflow-x-clip bg-white text-[#54606f]">
      <section id="top" className="px-4 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="max-w-[780px] font-sans text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.028em] text-[#15233b] md:text-[54px]">
              {t.heroTitle} <em className="gradient-text font-serif font-medium italic">{t.heroEmphasis}</em>
            </h1>
            <p className="mt-6 font-serif text-[23px] italic leading-[1.4] text-[#15233b]">
              {t.heroQuote}
            </p>
            <p className="mt-6 max-w-[36rem] text-[18px] leading-[1.62] text-[#54606f]">
              {t.heroBody}
            </p>

            <HeroPathButtons
              businessLabel={t.doorBusiness}
              businessMeta={t.doorBusinessMeta}
              scalingLabel={t.doorScaling}
              scalingMeta={t.doorScalingMeta}
            />
            <a
              href="#discovery-call"
              className="mt-5 inline-flex text-sm font-semibold text-[#54606f] transition hover:text-[#e9694b]"
            >
              {t.discoveryLink} <span className="ml-2" aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-[1.1rem_-1.1rem_-1.1rem_1.1rem] rounded-[1.25rem] bg-[#fdece6]" />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-[#e3e7ee] bg-[#eef1f5]">
              <img
                src="/fractional_delivery_images/hero_image.jpeg"
                alt="Camille Wilhelm McFarlane leading digital delivery work"
                className="aspect-[5/6] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eceef2] bg-[#fbfbfc] px-4 py-9 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#9aa4b2]">{t.trusted}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-65 grayscale">
            <span className="flex h-12 w-36 items-center justify-center">
              <img src="/images/Logo/Havas_Worldwide__LLC_HAVAS_CREATIVE_NETWORK_EXPANDS_MELISSA_TIFR.jpg" alt="Havas" className="max-h-9 w-auto max-w-full object-contain" />
            </span>
            <span className="flex h-20 w-24 items-center justify-center">
              <img src="/images/Logo/thisisone.jpeg" alt="This is One" className="max-h-16 w-auto max-w-full object-contain" />
            </span>
            <span className="flex h-20 w-24 items-center justify-center">
              <img src="/images/Logo/33.png" alt="ThirtyThree" className="max-h-16 w-auto max-w-full object-contain" />
            </span>
            <span className="flex h-20 w-24 items-center justify-center">
              <img src="/images/bandq.png" alt="B&Q" className="max-h-16 w-auto max-w-full object-contain" />
            </span>
            <span className="flex h-12 w-36 items-center justify-center">
              <img src="/images/screwfix.png" alt="Screwfix" className="max-h-9 w-auto max-w-full object-contain" />
            </span>
          </div>
          <p className="mt-6 text-[13px] text-[#9aa4b2]">{t.trustedMicrocopy}</p>
        </div>
      </section>

      <section id="how-i-help" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-14 max-w-[43rem] text-center">
            <Eyebrow>{t.challengesEyebrow}</Eyebrow>
            <h2 className="font-sans text-[2.45rem] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.022em] text-[#15233b]">
              {t.challengesHeading}
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-[#54606f]">
              {t.challengesIntro}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {localizedChallenges.map(([title, body], index) => (
              <article key={title} className="rounded-2xl border border-[#e9ecf1] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-30px_rgba(21,35,59,0.5)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.65rem] bg-[#fdece6] font-serif text-lg font-medium italic text-[#e9694b]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-[18px] font-sans text-[19px] font-semibold text-[#15233b]">{title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-[#54606f]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicePathSelector copy={t} services={localizedServices} />

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-14 max-w-[43rem] text-center">
            <Eyebrow>{t.outcomeEyebrow}</Eyebrow>
            <h2 className="font-sans text-[2.45rem] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.022em] text-[#15233b]">{t.outcomeHeading}</h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-[#54606f]">{t.outcomeIntro}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {localizedOutcomes.map(([title, body], index) => (
              <article key={title} className="rounded-[1.1rem] bg-[#f5f6f9] p-8">
                <div className="font-serif text-3xl font-medium italic text-[#e9694b]">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 font-sans text-[21px] font-semibold text-[#15233b]">{title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-[#54606f]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#15233b] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[55rem] text-center">
          <Eyebrow light>{t.intelligenceEyebrow}</Eyebrow>
          <h2 className="font-sans text-[2.35rem] md:text-[40px] font-semibold leading-[1.12] tracking-[-0.022em] text-white">
            {t.intelligenceHeading} <em className="font-serif font-medium italic text-[#f3a78f]">{t.intelligenceHeadingEmphasis}</em>
          </h2>
          <p className="mt-6 text-[19px] leading-[1.65] text-[#aab6c8]">
            {t.intelligenceBody}
          </p>
        </div>
      </section>

      <section id="who-i-help" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="mx-auto max-w-[18rem] lg:mx-0 lg:sticky lg:top-24 lg:self-start">
            <img src="/images/camm/about-frame.png" alt="Camille Wilhelm McFarlane portrait" className="w-full rounded-[1rem] object-cover" />
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {t.aboutTags.map((item) => (
                <span key={item} className="rounded-full border border-[#e6e9ef] bg-[#f5f6f9] px-3 py-2 text-xs font-semibold text-[#54606f]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>{t.aboutEyebrow}</Eyebrow>
            <h2 className="font-sans text-[2.25rem] md:text-[38px] font-semibold leading-[1.12] tracking-[-0.022em] text-[#15233b]">
              {t.aboutHeading}
            </h2>
            <p className="mt-5 text-[18px] leading-[1.62] text-[#54606f]">
              {t.aboutBody}
            </p>
            <p className="mt-9 text-xs font-bold uppercase tracking-[0.1em] text-[#aeb6c2]">{t.whyChoose}</p>
            <div className="mt-5 space-y-5">
              {localizedAboutReasons.map(([title, body]) => (
                <div key={title} className="flex items-start gap-4">
                  <CheckMark />
                  <p className="text-[16px] leading-[1.55] text-[#54606f]">
                    <strong className="font-semibold text-[#15233b]">{title}</strong> {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials locale={locale} />
      <EbookSignup locale={locale} />

      <section id="faq" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[52rem]">
          <div className="mb-12 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-sans text-[2.45rem] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.022em] text-[#15233b]">{t.faqHeading}</h2>
          </div>
          <div className="space-y-3">
            {localizedFaqs.map(([question, answer], index) => (
              <details key={question} className="group rounded-[0.9rem] border border-[#e6e9ef] bg-white p-6 open:shadow-[0_18px_42px_-34px_rgba(21,35,59,0.45)]" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-[#15233b]">
                  {question}
                  <span className="text-[24px] font-normal leading-none text-[#e9694b] group-open:hidden">+</span>
                  <span className="hidden text-[24px] font-normal leading-none text-[#e9694b] group-open:inline">-</span>
                </summary>
                <p className="mt-4 text-[16px] leading-[1.62] text-[#54606f]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="discovery-call" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[57rem] rounded-[1.5rem] border border-[#f6dcd2] bg-[#fdf1ec] px-6 py-14 text-center md:px-12 md:py-16">
          <h2 className="font-sans text-[2.35rem] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.022em] text-[#15233b]">
            {t.ctaHeadingPrefix} <em className="font-serif font-medium italic text-[#e9694b]">{t.ctaHeadingEmphasis}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[35rem] text-[18px] leading-[1.6] text-[#54606f]">
            {t.ctaBody}
          </p>
          <CalButton className="mt-8 px-8 py-4 text-base">{t.bookDiscovery}</CalButton>
          <p className="mt-5 text-[13px] text-[#9aa4b2]">{t.ctaNote}</p>
        </div>
      </section>
    </div>
  );
}
