/**
 * Every visible string on the site.
 *
 * The Norwegian copy is Noregna's own text, taken verbatim from noregna.no.
 * The English copy is Noregna's own published English version of the same
 * pages. Nothing here is invented marketing language, and no capability,
 * certification or figure appears that Noregna does not already claim.
 *
 * The only editorial change: en-dashes and em-dashes have been normalised to
 * regular hyphens, or the sentence split, so the typography stays clean.
 */

import type { AppShotKey } from "@/content/app-shots";

export type Locale = "no" | "en";

export const EXTERNAL = {
  app: "https://app.noregna.no",
  invoice: "https://invoice.noregna.no",
  brreg: "https://www.brreg.no",
  appStore: "https://apps.apple.com/no/app/noregna/id6740986621",
  playStore: "https://play.google.com/store/apps/details?id=com.norenga.kundeportal",
  maps: "https://maps.google.com/?q=%C3%98stre+Aker+vei+17,+0581+Oslo",
  email: "post@noregna.no",
  facebook: "https://www.facebook.com/share/15X8n3cWEr/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/noregna.no?igsh=MWo2Mzl4NHNiMHRvaA%3D%3D&utm_source=qr",
} as const;

export const COMPANY = {
  legalName: "Noregna AS",
  orgNr: "933 233 391",
  address: "Østre Aker vei 17, 0581 Oslo",
  addressFull: "Østre Aker vei 17, 0581 Oslo, Norge",
  email: "post@noregna.no",
} as const;

type Feature = { title: string; body?: string; icon: string };
type SystemModule = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  benefitsTitle: string;
  benefits: string[];
  icon: string;
  external?: string;
};

export type Dict = {
  meta: {
    locale: Locale;
    siteName: string;
    titleHome: string;
    descHome: string;
    titleServices: string;
    descServices: string;
    titleApp: string;
    descApp: string;
    titleContact: string;
    descContact: string;
  };
  nav: {
    home: string;
    services: string;
    app: string;
    contact: string;
    login: string;
    tryFree: string;
    allSystems: string;
    menu: string;
    close: string;
    skipToContent: string;
    languageLabel: string;
    themeLabel: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroLead: string;
    heroTrustHints: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    intent: { title: string; body: string };
    why: { title: string; items: Feature[] };
    advantage: { title: string; items: string[] };
    systems: {
      title: string;
      items: { name: string; body: string; icon: string; slug: string }[];
    };
    portal: {
      title: string;
      lead: string;
      getsTitle: string;
      gets: string[];
      worthTitle: string;
      worth: { title: string; body: string }[];
      cta: string;
    };
    overview: { title: string; lead: string; points: string[]; close: string };
    outcomes: { title: string; lead: string; items: { title: string; body: string; icon: string }[] };
    /**
     * The section that separates the three products. Every product's name,
     * heading, body and call to action below it is Noregna's own copy, reused
     * from where it already appears on the site. The strings added here are the
     * section label, its lead (assembled from Noregna's own statements about
     * what is and is not part of the platform), and the "where it lives" lines,
     * which state an address rather than make a claim.
     */
    products: {
      title: string;
      lead: string;
      whereLabel: string;
      platformWhere: string;
      portalWhere: string;
      invoiceWhere: string;
      includedLabel: string;
      separateLabel: string;
      freeLabel: string;
    };
    invoice: {
      name: string;
      title: string;
      lead: string;
      points: string[];
      cta: string;
      ctaAria: string;
    };
    faq: { title: string; items: { q: string; a: string; points?: string[]; close?: string }[] };
  };
  services: {
    title: string;
    lead: string;
    pick: string;
    modules: SystemModule[];
  };
  appPage: {
    badgeApple: string;
    badgeGoogle: string;
    eyebrow: string;
    title: string;
    lead: string;
    getsTitle: string;
    gets: Feature[];
    worthTitle: string;
    worth: { title: string; body: string }[];
    carouselPrev: string;
    carouselNext: string;
    /** Alt text for each app screen, keyed like APP_SHOTS. */
    screens: Record<AppShotKey, string>;
  };
  contact: {
    title: string;
    lead: string;
    formTitle: string;
    fields: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      org: string;
      orgHelp: string;
      searchLabel: string;
      searchPlaceholder: string;
      selectHint: string;
      manualLabel: string;
      message: string;
      messagePlaceholder: string;
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorRequired: string;
    errorEmail: string;
    errorGeneric: string;
    errorCaptcha: string;
    reset: string;
    detailsTitle: string;
    addressLabel: string;
    emailLabel: string;
    orgLabel: string;
    directTitle: string;
    directBody: string;
    trialCta: string;
  };
  footer: {
    about: string;
    shortcuts: string;
    systems: string;
    contact: string;
    privacy: string;
    cookies: string;
    terms: string;
    rights: string;
    viewMap: string;
    orgNr: string;
    facebook: string;
    instagram: string;
  };
  notFound: { title: string; body: string; cta: string };
};

/* ==========================================================================
   NORSK
   ========================================================================== */

const no: Dict = {
  meta: {
    locale: "no",
    siteName: "Noregna",
    titleHome: "Noregna - oppdragsstyring og kvalitetskontroll for regnskapsførere",
    descHome:
      "Norskutviklet, skybasert oppdragsstyringssystem for regnskapsbyråer. Full fristkontroll, kvalitetssikring etter GRFS, kundekontroll og trygg kundedialog på ett sted.",
    titleServices: "Våre systemer - Noregna",
    descServices:
      "Fremdrift, Rapportering, Kundeportal, Chatnet, FileShare, TaskManager, Invoice og Sync. Åtte moduler bygget for norske regnskapsbyråer.",
    titleApp: "Noregna Kundeportal - appen kundene dine har i lomma",
    descApp:
      "Åpne poster, dokumenter, rapporter, dagsoppgjør og GDPR-sikker chat. Kundeportalen som gir kundene dine oversikt og byrået færre henvendelser.",
    titleContact: "Kontakt oss - Noregna",
    descContact:
      "Ta kontakt for en demo av Noregna, eller prøv systemet gratis i én måned. Noregna AS, Østre Aker vei 17, 0581 Oslo.",
  },
  nav: {
    home: "Hjem",
    services: "Våre systemer",
    app: "App",
    contact: "Kontakt oss",
    login: "Logg inn",
    tryFree: "Prøv gratis",
    allSystems: "Se alle systemer",
    menu: "Meny",
    close: "Lukk",
    skipToContent: "Hopp til innhold",
    languageLabel: "Språk",
    themeLabel: "Bytt mellom lyst og mørkt tema",
  },
  home: {
    heroEyebrow: "Velkommen til Noregna",
    heroTitle: "Oppdragsstyring og kvalitetskontroll,",
    heroTitleAccent: "gjort enkelt for regnskapsførere",
    heroLead:
      "Full kontroll over oppdragene, med oversikt over alle frister, kvalitetssikring og hvitvaskingsoppfølging.",
    heroTrustHints: ["Kvalitetssikring", "Kundekontroll", "Sikker kundedialog", "Utviklet i Norge"],
    ctaPrimary: "Prøv gratis",
    ctaSecondary: "Book demo",
    intent: {
      title: "Forenkle arbeidsflyten din, forbedre kundeforholdet ditt",
      body: "Bli med i det økende antallet regnskapsbyråer som har effektivisert arbeidshverdagen sin med Noregna. Forenkle arbeidsflyten din, forbedre kundeforholdet ditt og få kontroll over frister, kundekontroll og hvitvaskingsoppfølging.",
    },
    why: {
      title: "Hvorfor velge Noregna?",
      items: [
        {
          title: "Full oversikt over alle oppdrag",
          body: "Status på hvert oppdrag og hver kommende frist i én oversikt, slik at ingenting glipper.",
          icon: "overview",
        },
        {
          title: "Kvalitetsstyringssystem",
          body: "Arbeidet utføres strukturert og dokumenteres fortløpende i tråd med GRFS.",
          icon: "quality",
        },
        {
          title: "Kundekontroll (KYC og PEP)",
          body: "Kundekontroll og hvitvasking følges opp der oppdraget ligger, ikke i et sidesystem.",
          icon: "kyc",
        },
        { title: "Sikker rapportering til kunder", icon: "report" },
        { title: "Trygg kommunikasjon med kunder og kollegaer", icon: "chat" },
        { title: "Meget enkelt signeringsmodul", icon: "sign" },
        { title: "Markedets rimeligste system", icon: "price" },
      ],
    },
    advantage: {
      title: "Opplev Noregna-fordelen",
      items: [
        "Brukervennlig grensesnitt",
        "Sikker og pålitelig",
        "Skalerbare løsninger",
        "Eksepsjonell støtte",
        "Kostnadseffektiv",
      ],
    },
    systems: {
      title: "Utforsk Noregna",
      items: [
        {
          name: "Fremdrift",
          slug: "fremdrift",
          icon: "progress",
          body: "Et meget effektivt oppdragsstyringsverktøy som gir full oversikt over alle oppdrag. Systemet forenkler oppdragsstyring med fokus på kvalitet og utførelse.",
        },
        {
          name: "Rapportering",
          slug: "rapportering",
          icon: "report",
          body: "Utviklet for å gjøre rapporteringsarbeidet enkelt og sikkert for kundene deres. Rapportering skjer internt i systemet med passordbeskyttet tilgang.",
        },
        {
          name: "Kundeportal",
          slug: "kundeportal",
          icon: "portal",
          body: "En rapporteringskanal for regnskapsførere. Den gir kundene full tilgang til rapporter og dokumenter byrået har delt.",
        },
      ],
    },
    portal: {
      title: "Kundeportalen kundene dine har i lomma",
      lead: "Noregna Kundeportal gir kundene deres en løpende oversikt over åpne poster, tilgang til alle dokumenter byrået har delt, og en trygg kanal for å sende inn det som mangler. Resultatet er færre henvendelser til byrået, og ingen tvil om hva som er levert.",
      getsTitle: "Dette får kundene",
      gets: [
        "Åpne poster, alltid tilgjengelig",
        "Alle dokumenter og rapporter",
        "Dagsoppgjør på få tastetrykk",
        "GDPR-sikker chat",
      ],
      worthTitle: "Hvorfor det lønner seg",
      worth: [
        {
          title: "Ingen tvil om hva som mangler",
          body: "Både kunden og byrået ser den samme listen over åpne poster.",
        },
        {
          title: "Kunden slipper å spørre",
          body: "Rapportene ligger klare i appen, så byrået slipper henvendelser om noe som allerede er delt.",
        },
        {
          title: "Sparer tid begge veier",
          body: "Mindre e-post og færre purringer, tid som frigjøres både hos kunden og hos regnskapsføreren.",
        },
        {
          title: "Trygg dialog",
          body: "Kommunikasjon og dokumentdeling skjer internt i systemet, ikke over e-post.",
        },
      ],
      cta: "Prøv gratis",
    },
    overview: {
      title: "Full oversikt",
      lead: "Få full kontroll over oppdragene med Noregna. Vårt omfattende dashbord gir:",
      points: [
        "Sanntidsoversikt over alle oppdrag og kommende frister.",
        "Status på kundekontroll, KYC og anti-hvitvaskingsoppfølging.",
        "Prioritering av oppgaver basert på frist og risiko.",
      ],
      close:
        "Med Noregna kan du fokusere på det som er viktigst, samtidig som du holder deg trygg på at frister overholdes og dokumentasjonskravene er ivaretatt.",
    },
    outcomes: {
      title: "Hva byrået får ut av Noregna",
      lead: "Færre løse tråder og mer forutsigbar drift.",
      items: [
        {
          title: "Ingen frister på avveie",
          body: "Oppfølgingen ligger i systemet, ikke i hodet på én person eller i et regneark.",
          icon: "deadline",
        },
        {
          title: "Trygghet ved kvalitetskontroll",
          body: "Dokumentasjonen bygges opp mens arbeidet gjøres, ikke i etterkant.",
          icon: "quality",
        },
        {
          title: "Mindre administrasjon",
          body: "Mindre leting, purring og dobbeltarbeid, mer tid til fagarbeidet.",
          icon: "tasks",
        },
        {
          title: "Lettere å komme inn i",
          body: "Nye medarbeidere ser raskt hvem som har ansvar for hva, og hva som gjenstår.",
          icon: "overview",
        },
        {
          title: "Vokser med byrået",
          body: "Fungerer like godt for ett kontor som for flere avdelinger.",
          icon: "progress",
        },
        {
          title: "Trygg databehandling",
          body: "Norsk løsning med sikker lagring av kunde- og oppdragsdata.",
          icon: "flag",
        },
      ],
    },
    products: {
      title: "Produktene våre",
      lead: "Noregna-plattformen er byråets arbeidsflate. Kundeportalen er kundens. Noregna Invoice er et frittstående faktureringssystem, og er ikke en del av plattformen.",
      whereLabel: "Tilgjengelig på",
      platformWhere: "app.noregna.no",
      portalWhere: "App Store og Google Play",
      invoiceWhere: "invoice.noregna.no",
      includedLabel: "Del av plattformen",
      separateLabel: "Egen app",
      freeLabel: "Gratis å bruke",
    },
    invoice: {
      name: "Noregna Invoice",
      title: "Noregna Invoice - gratis fakturering",
      lead: "Fakturering er ikke en del av Noregna-plattformen. Vi tilbyr det i stedet som en egen, frittstående løsning: Noregna Invoice. Den er helt gratis å bruke, og du kommer i gang på invoice.noregna.no.",
      points: [
        "Opprett og send profesjonelle fakturaer på sekunder",
        "Automatiske betalingspåminnelser og oppfølging",
        "Full oversikt over utestående og betalte fakturaer",
        "Helt gratis å bruke, ingen lisenskostnad",
        "GDPR-kompatibel og i samsvar med norske skatteregler",
      ],
      cta: "Prøv gratis",
      ctaAria: "Prøv Noregna Invoice gratis, åpnes på invoice.noregna.no",
    },
    faq: {
      title: "Ofte stilte spørsmål",
      items: [
        {
          q: "Hva er Noregna?",
          a: "Noregna er et norskutviklet, skybasert oppdragsstyringssystem laget for regnskapsbyråer. I stedet for regneark og løse huskelister samler du oppdrag, frister og dokumentasjon på ett sted.",
          points: [
            "Full fristkontroll: Status på alle oppdrag og kommende frister i én oversikt, slik at ingenting glipper.",
            "Kvalitetssikring etter GRFS: Arbeidet utføres strukturert og dokumenteres fortløpende, så du står trygt ved kvalitetskontroll.",
            "Kundekontroll og hvitvasking: KYC og PEP følges opp og dokumenteres der oppdraget ligger, ikke i et sidesystem.",
            "Trygg kundedialog: Del rapporter og dokumenter gjennom kundeportalen framfor e-post.",
          ],
          close:
            "Kort sagt: mindre tid på administrasjon og purring, og trygghet for at dokumentasjonskravene er ivaretatt.",
        },
        {
          q: "Hva inneholder Noregna?",
          a: "Noregna samler det et regnskapsbyrå trenger for å holde struktur og orden, på ett sted:",
          points: [
            "Alt om kunden samlet: Kontaktopplysninger, avtaler og dokumenter ligger på kunden, slutt på leting i e-post og mapper.",
            "Oppdrag med eier og frist: Hvert oppdrag har ansvarlig, status og frist, så alle ser hva som gjenstår og hva som haster.",
            "Kvalitetsstyring og hvitvasking: Kvalitetssikring, KYC og PEP dokumenteres fortløpende i tråd med GRFS.",
            "Dokumenthåndtering: Klientavtaler, MVA-innleveringer og annen dokumentasjon lagres sikkert og er lette å finne igjen.",
            "Samlet kundedialog: Chat i sanntid og kundeportal gjør kommunikasjonen sporbar, i stedet for spredt i e-post.",
            "Enkel signering: Signeringsmodul for avtaler og dokumenter, uten omvei innom andre verktøy.",
            "Noregna Invoice: Vårt frittstående faktureringssystem, gratis å bruke, tilgjengelig på invoice.noregna.no.",
            "Utviklet i Norge: Bygget for norske krav og norsk arbeidshverdag.",
          ],
          close:
            "Resultatet er ett system der ingenting faller mellom to stoler, og dokumentasjonen er på plass den dagen kvalitetskontrollen kommer.",
        },
        {
          q: "Hva får byrået mitt ut av Noregna?",
          a: "For byrået betyr Noregna færre løse tråder og mer forutsigbar drift:",
          points: [
            "Ingen frister på avveie: Oppfølgingen ligger i systemet, ikke i hodet på én person eller i et regneark.",
            "Trygghet ved kvalitetskontroll: Dokumentasjonen bygges opp mens arbeidet gjøres, ikke i etterkant.",
            "Mindre administrasjon: Mindre leting, purring og dobbeltarbeid, mer tid til fagarbeidet.",
            "Lettere å komme inn i: Nye medarbeidere ser raskt hvem som har ansvar for hva, og hva som gjenstår.",
            "Vokser med byrået: Fungerer like godt for ett kontor som for flere avdelinger.",
            "Trygg databehandling: Norsk løsning med sikker lagring av kunde- og oppdragsdata.",
          ],
        },
        {
          q: "Hva koster Noregna?",
          a: "Du betaler en fast pris for basisbrukeren, pluss en pris per bruker utover det. Alle priser er eks. mva. per måned.",
          points: [
            "Basisbruker: 2 490,- i ordinær pris.",
            "Fra bruker 2: 249,- per bruker.",
            "Tilbud ut året: Abonnerer du innen 31.12.2026, betaler du 1 490,- for basisbrukeren og 149,- per bruker fra bruker 2.",
            "Rabatten på 1 000,- er varig og følger deg så lenge du er kunde, senere kommer kun ordinære prisjusteringer.",
            "Tilbudet gjelder et begrenset antall plasser.",
          ],
        },
        {
          q: "Hvordan kommer jeg i gang?",
          a: "Du velger selv hvordan du vil starte:",
          points: [
            "Prøv gratis i én måned: Registrer deg på app.noregna.no og ta systemet i bruk med én gang, uten kostnad.",
            "Ta kontakt: Fyll ut kontaktskjemaet, så tar vi det derfra.",
          ],
          close:
            "Vi anbefaler uansett en demo først. En kort gjennomgang gjør at du får satt opp oppdrag, frister og kundekontroll riktig fra start, og da får du langt mer ut av prøveperioden.",
        },
      ],
    },
  },
  services: {
    title: "Programvare for en enklere hverdag",
    lead:
      "Få en enklere hverdag på jobb med programvare for økonomi, regnskap, fakturering, inkasso, lønn og HR, prosjektledelse, innkjøp, elektronisk signering, dokumentsharing og personvern.",
    pick: "Velg løsning",
    modules: [
      {
        slug: "fremdrift",
        name: "Noregna Fremdrift",
        tagline: "Oppdragsstyring",
        icon: "progress",
        intro:
          "Forenkle dine daglige arbeidsflyter med Noregna Fremdrift, et alt-i-ett-verktøy for å administrere prosjekter, team og forretningsdrift. Fra HR og lønn til automatisering av oppgaver hjelper vi deg med å effektivisere driften, øke effektiviteten og fokusere på det som betyr mest: din vekst.",
        benefitsTitle: "Positive sider ved Noregna Fremdrift",
        benefits: [
          "Fullstendig oversikt over arbeidsflyt og frister",
          "Loggføring og dokumentasjon av arbeidsutførelse",
          "Risikoklassifisering av kunder",
          "Oversikt over kunder etter bransje",
          "Effektiv kundekontroll",
          "Alt samlet på ett sted",
        ],
      },
      {
        slug: "rapportering",
        name: "Noregna Rapportering",
        tagline: "Rapportering",
        icon: "report",
        intro:
          "Ta informerte beslutninger med Noregna Rapportering. Våre kraftige rapporteringsverktøy gir sanntidsinnsikt i din bedrifts ytelse, økonomi og drift. Hold deg foran med datadrevne beslutninger og handlingsorienterte rapporter som holder deg på rett spor.",
        benefitsTitle: "Fordeler med Noregna Rapportering",
        benefits: [
          "Enkel og effektiv innsending",
          "Sikker og GDPR-kompatibel kanal",
          "Alltid tilgjengelig via kundeportalen",
          "Redusert risiko for feil",
          "Tidsbesparende både for kunde og konsulent",
        ],
      },
      {
        slug: "kundeportal",
        name: "Noregna Kundeportal",
        tagline: "Kundeportal",
        icon: "portal",
        intro:
          "Gi kundene dine mer kontroll med Noregna Kundeportal. Denne selvbetjeningsportalen sikrer sømløs kommunikasjon og åpenhet, og lar kundene få tilgang til oppdateringer, dokumenter og støtte når det passer dem.",
        benefitsTitle: "Fordeler for regnskapsførere og kunder",
        benefits: [
          "GDPR-sikker kommunikasjon av sensitive dokumenter",
          "Passordbeskyttet tilgang for kundene",
          "Enkel rapportdeling fra regnskapsfører",
          "Mulighet for intern lagring, usynlig for kunden",
          "Forebygging av GDPR-brudd og tilhørende bøter",
          "Profesjonelt og tillitsbyggende for kunder",
        ],
      },
      {
        slug: "chatnet",
        name: "Noregna Chatnet",
        tagline: "Sikker chat",
        icon: "chat",
        intro:
          "Forenkle klientkommunikasjonen med Chatnet. Denne sikre plattformen lar klienter koble seg direkte til sin utpekte regnskapsfører gjennom sanntidschat, dele viktige filer og få oppdateringer enkelt, alt på ett sted.",
        benefitsTitle: "Fordeler med Noregna Chatnet",
        benefits: [
          "GDPR-kompatibel meldingsutveksling",
          "Passordbeskyttet kundeapp",
          "Sporbarhet og dokumentasjon av kommunikasjon",
          "Trygg håndtering av sensitive forespørsler",
          "Profesjonelt og tillitsvekkende for kundene",
          "Unngår bruk av usikre tredjepartsplattformer",
        ],
      },
      {
        slug: "fileshare",
        name: "Noregna FileShare",
        tagline: "Fildeling",
        icon: "share",
        intro:
          "Del filer sikkert med full kontroll og GDPR-trygghet, både internt og med eksterne parter.",
        benefitsTitle: "Fordeler med Noregna FileShare",
        benefits: [
          "Sikker fildeling med kodebeskyttelse",
          "GDPR-vennlig dokumentoverføring",
          "Unngår bruk av usikre tredjepartsløsninger",
          "Bedre kontroll og etterprøvbarhet",
          "Profesjonelt inntrykk og økt kundetillit",
          "Fleksibilitet, del kun det som trengs",
        ],
      },
      {
        slug: "taskmanager",
        name: "Noregna TaskManager",
        tagline: "Interne oppgaver",
        icon: "tasks",
        intro:
          "Få full kontroll på interne oppgaver med én plattform skreddersydd for regnskapsbyråer.",
        benefitsTitle: "Fordeler med Noregna TaskManager",
        benefits: [
          "Alt samlet i én plattform, inkludert uten ekstra kostnad",
          "Effektiv oppgavefordeling og intern organisering",
          "Felles statusoversikt og sanntidsoppdateringer",
          "Direkte kommunikasjon på oppgavenivå",
          "Styrket samarbeid og reduserte flaskehalser",
          "Optimalisert for regnskapsbyråers arbeidsprosesser",
        ],
      },
      {
        slug: "sync",
        name: "Noregna Sync",
        tagline: "Brønnøysund-synk",
        icon: "sync",
        intro:
          "Noregna Sync er utviklet for å gjøre det enklere å fange opp endringer hos kundene dine. Verktøyet kjører synkronisering av alle kundene dine mot Brønnøysundregistrene og fanger opp avvik i den offentlig registrerte informasjonen, helt automatisk, uten at du må slå opp hver enkelt kunde.",
        benefitsTitle: "Positive sider ved Noregna Sync",
        benefits: [
          "Automatisk synkronisering av alle kunder mot brreg.no",
          "Varsler dersom byrået ikke lenger står registrert som regnskapsfører hos kunden",
          "Fanger opp avvik i all offentlig registrert informasjon",
          "Slipper manuelle oppslag på hver enkelt kunde",
          "Kunderegisteret stemmer alltid med offentlige data",
        ],
      },
      {
        slug: "invoice",
        name: "Noregna Invoice",
        tagline: "Fakturering",
        icon: "invoice",
        external: EXTERNAL.invoice,
        intro:
          "Noregna Invoice er vårt frittstående faktureringssystem, og er ikke en del av Noregna-plattformen. Det er helt gratis å bruke, og du kommer i gang på invoice.noregna.no.",
        benefitsTitle: "Positive sider ved Noregna Invoice",
        benefits: [
          "Helt gratis å bruke, ingen lisenskostnad",
          "Opprett og send profesjonelle fakturaer på sekunder",
          "Automatiske betalingspåminnelser og oppfølging",
          "Full oversikt over utestående og betalte fakturaer",
          "GDPR-kompatibel og i samsvar med norske skatteregler",
        ],
      },
    ],
  },
  appPage: {
    badgeApple: "Last ned Noregna-appen fra App Store",
    badgeGoogle: "Last ned Noregna-appen fra Google Play",
    eyebrow: "Noregna Kundeportal",
    title: "Kundeportalen kundene dine har i lomma",
    lead: "Noregna Kundeportal gir kundene deres en løpende oversikt over åpne poster, tilgang til alle dokumenter byrået har delt, og en trygg kanal for å sende inn det som mangler. Resultatet er færre henvendelser til byrået, og ingen tvil om hva som er levert.",
    getsTitle: "Dette får kundene",
    gets: [
      {
        title: "Åpne poster, alltid tilgjengelig",
        body: "Regnskapsføreren laster opp listen over åpne poster, og kunden ser den til enhver tid. Bilag lastes opp direkte på posten det gjelder.",
        icon: "overview",
      },
      {
        title: "Alle dokumenter og rapporter",
        body: "Lønnsslipper, terminrapporter, MVA-oppgaver og andre rapporter byrået har gjort tilgjengelig, samlet på ett sted.",
        icon: "files",
      },
      {
        title: "Dagsoppgjør på få tastetrykk",
        body: "Innebygd skjema for dagsoppgjør. Kunden fyller ut og sender det ferdige oppgjøret til regnskapsføreren med noen få tastetrykk, og dokumentasjonskravet er ivaretatt.",
        icon: "settle",
      },
      {
        title: "GDPR-sikker chat",
        body: "Noregna Chatnet er innebygd. All kommunikasjon skjer internt i systemet, passordbeskyttet på begge sider, ikke over e-post.",
        icon: "chat",
      },
      {
        title: "Opplasting av bilag",
        body: "For kunder som ikke har innboks i regnskapssystemet fra før, kan bilag lastes opp direkte i appen.",
        icon: "upload",
      },
      {
        title: "Norsk og trygg",
        body: "Utviklet i Norge, tilpasset norske krav til personvern og dokumentasjon.",
        icon: "flag",
      },
    ],
    worthTitle: "Hvorfor det lønner seg",
    worth: [
      {
        title: "Ingen tvil om hva som mangler",
        body: "Både kunden og byrået ser den samme listen over åpne poster. Slutt på misforståelser om hva som er sendt og hva som gjenstår.",
      },
      {
        title: "Kunden slipper å spørre",
        body: "Rapportene ligger klare i appen, så byrået slipper henvendelser om noe som allerede er delt.",
      },
      {
        title: "Sparer tid begge veier",
        body: "Mindre e-post og færre purringer, tid som frigjøres både hos kunden og hos regnskapsføreren.",
      },
      {
        title: "Trygg dialog",
        body: "Kommunikasjon og dokumentdeling skjer internt i systemet, ikke over e-post.",
      },
    ],
    carouselPrev: "Forrige skjermbilde",
    carouselNext: "Neste skjermbilde",
    screens: {
      home: "Hjem-skjermen i Noregna Kundeportal med varsel om manglende bilag og snarveier til opplasting, dagsoppgjør og dokumenter",
      overview: "Oversikt-skjermen med nøkkeltall for manglende bilag, nye opplastinger, uleste meldinger og abonnement",
      missing: "Skjermen for manglende bilag, med kommentar fra regnskapsføreren og knapp for å laste opp",
      uploads: "Last opp bilag: velg måned, med antall filer per måned",
      source: "Velg kilde for opplasting: kamera eller galleri",
      settlement: "Dagsoppgjør med Z-rapport og omsetning fordelt på MVA-satser",
      documents: "Mine dokumenter, med mapper for bilag, kasse, lønn og MVA sortert etter år",
      chat: "Meldinger: chat med regnskapsføreren",
      notifications: "Varsler om nye dokumenter og signeringsforespørsler",
      profile: "Profil med konto, abonnement og juridisk informasjon",
      switch: "Bytt firma: velg hvilket firma du vil bruke",
      login: "Innloggingsskjermen i Noregna Kundeportal",
      splash: "Velkomstskjermen Kundeportal, levert av Noregna",
    },
  },
  contact: {
    title: "Kontakt oss",
    lead: "Fyll ut skjemaet, så tar vi det derfra. Vi anbefaler en kort demo først, så får du satt opp oppdrag, frister og kundekontroll riktig fra start.",
    formTitle: "Send oss en melding",
    fields: {
      firstName: "Ditt navn",
      lastName: "Ditt etternavn",
      email: "Din e-post",
      phone: "Telefon",
      org: "Organisasjonsnavn",
      orgHelp: "Byrået eller selskapet du representerer.",
      searchLabel: "Finn din bedrift",
      searchPlaceholder: "Søk på bedriftsnavn...",
      selectHint: "Velg bedriften din fra listen eller skriv inn manuelt nedenfor.",
      manualLabel: "Eller skriv inn organisasjonsnavn manuelt",
      message: "Melding",
      messagePlaceholder: "Fortell kort hva dere trenger, og hvor mange brukere dere er.",
    },
    submit: "Send en melding",
    submitting: "Sender",
    successTitle: "Takk, meldingen er sendt",
    successBody: "Takk for henvendelsen! Vi har sendt deg en bekreftelse på e-post og tar kontakt snart.",
    errorRequired: "Dette feltet må fylles ut.",
    errorEmail: "Skriv inn en gyldig e-postadresse.",
    errorGeneric: "Meldingen kunne ikke sendes. Prøv igjen, eller send en e-post til post@noregna.no.",
    errorCaptcha: "Bekreft at du ikke er en robot.",
    reset: "Send en ny melding",
    detailsTitle: "Kom i kontakt",
    addressLabel: "Adresse",
    emailLabel: "E-postadresse",
    orgLabel: "Organisasjonsnummer",
    directTitle: "Vil du heller prøve selv?",
    directBody: "Registrer deg på app.noregna.no og ta systemet i bruk med én gang, gratis i én måned.",
    trialCta: "Prøv gratis",
  },
  footer: {
    about:
      "Noregna lager tjenester som gjør arbeidsdagen enklere for regnskapsførere. Vi samler oppdrag, frister, kvalitetssikring og hvitvaskingsoppfølging på ett sted, slik at byrået holder struktur og orden, og står trygt ved kvalitetskontroll. Utviklet i Norge, for norske regnskapsbyråer.",
    shortcuts: "Snarveier",
    systems: "Våre systemer",
    contact: "Kontakt oss",
    privacy: "Personvern",
    cookies: "Informasjonskapsler",
    terms: "Kjøps- og leveringsbetingelser",
    rights: "Alle rettigheter forbeholdt.",
    orgNr: "Org.nr.",
    viewMap: "Vis i kart",
    facebook: "Noregna på Facebook",
    instagram: "Noregna på Instagram",
  },
  notFound: {
    title: "Denne siden finnes ikke",
    body: "Lenken kan være utdatert, eller adressen kan være skrevet feil. Herfra kommer du videre:",
    cta: "Til forsiden",
  },
};

/* ==========================================================================
   ENGLISH
   ========================================================================== */

const en: Dict = {
  meta: {
    locale: "en",
    siteName: "Noregna",
    titleHome: "Noregna - engagement management and quality control for accountants",
    descHome:
      "A Norwegian-built, cloud-based engagement management system for accounting firms. Full deadline control, quality assurance under GRFS, client due diligence and secure client dialogue in one place.",
    titleServices: "Our systems - Noregna",
    descServices:
      "Progress, Reporting, Customer Portal, Chatnet, FileShare, TaskManager, Invoice and Sync. Eight modules built for Norwegian accounting firms.",
    titleApp: "Noregna Client Portal - the app your clients carry in their pocket",
    descApp:
      "Outstanding items, documents, reports, daily settlement and GDPR-secure chat. The client portal that gives your clients an overview and your firm fewer enquiries.",
    titleContact: "Contact us - Noregna",
    descContact:
      "Get in touch for a demo of Noregna, or try the system free for one month. Noregna AS, Østre Aker vei 17, 0581 Oslo.",
  },
  nav: {
    home: "Home",
    services: "Our systems",
    app: "App",
    contact: "Contact us",
    login: "Log in",
    tryFree: "Try for free",
    allSystems: "See all systems",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    languageLabel: "Language",
    themeLabel: "Switch between light and dark theme",
  },
  home: {
    heroEyebrow: "Welcome to Noregna",
    heroTitle: "Engagement management and quality control,",
    heroTitleAccent: "made easy for accountants",
    heroLead:
      "Full control over your engagements, with an overview of every deadline, quality assurance and anti-money-laundering follow-up.",
    heroTrustHints: ["Quality assurance", "Client due diligence", "Secure client dialogue", "Built in Norway"],
    ctaPrimary: "Try for free",
    ctaSecondary: "Book a demo",
    intent: {
      title: "Simplify your workflow, enhance your client relationships",
      body: "Join the growing number of accounting firms that have streamlined their working day with Noregna. Simplify your workflow, improve your client relationships, and take control of deadlines, client due diligence and anti-money-laundering follow-up.",
    },
    why: {
      title: "Why choose Noregna?",
      items: [
        {
          title: "Full overview of all engagements",
          body: "The status of every engagement and upcoming deadline in a single overview, so nothing slips.",
          icon: "overview",
        },
        {
          title: "Quality management system",
          body: "Work is carried out in a structured way and documented as you go, in line with GRFS.",
          icon: "quality",
        },
        {
          title: "Client due diligence (KYC and PEP)",
          body: "Due diligence and AML checks are followed up on the engagement itself, not in a separate system.",
          icon: "kyc",
        },
        { title: "Secure reporting to clients", icon: "report" },
        { title: "Secure communication with clients and colleagues", icon: "chat" },
        { title: "A very simple signing module", icon: "sign" },
        { title: "The market's most affordable system", icon: "price" },
      ],
    },
    advantage: {
      title: "Experience the Noregna advantage",
      items: [
        "User-friendly interface",
        "Secure and reliable",
        "Scalable solutions",
        "Exceptional support",
        "Cost effective",
      ],
    },
    systems: {
      title: "Explore Noregna",
      items: [
        {
          name: "Progress",
          slug: "fremdrift",
          icon: "progress",
          body: "A very effective engagement management tool that gives a full overview of every engagement. The system simplifies engagement management with a focus on quality and execution.",
        },
        {
          name: "Reporting",
          slug: "rapportering",
          icon: "report",
          body: "Built to make reporting easy and secure for your clients. Reporting happens inside the system, with password-protected access.",
        },
        {
          name: "Customer Portal",
          slug: "kundeportal",
          icon: "portal",
          body: "A reporting channel for accountants. It gives clients full access to the reports and documents the firm has shared.",
        },
      ],
    },
    portal: {
      title: "The client portal your clients carry in their pocket",
      lead: "Noregna Client Portal gives your clients a running overview of outstanding items, access to every document the firm has shared, and a secure channel for sending in whatever is missing. The result is fewer enquiries to the firm, and no doubt about what has been delivered.",
      getsTitle: "What your clients get",
      gets: [
        "Outstanding items, always available",
        "All documents and reports",
        "Daily settlement in a few taps",
        "GDPR-secure chat",
      ],
      worthTitle: "Why it pays off",
      worth: [
        {
          title: "No doubt about what is missing",
          body: "Both the client and the firm see the same list of outstanding items.",
        },
        {
          title: "Clients need not ask",
          body: "The reports are already waiting in the app, so the firm avoids enquiries about something it has already shared.",
        },
        {
          title: "Saves time both ways",
          body: "Less email and fewer reminders, time freed up for the client and the accountant alike.",
        },
        {
          title: "Secure dialogue",
          body: "Communication and document sharing happen inside the system, not over email.",
        },
      ],
      cta: "Try for Free",
    },
    overview: {
      title: "Full overview",
      lead: "Get complete control over your engagements with Noregna. Our comprehensive dashboard provides:",
      points: [
        "A real-time overview of every engagement and upcoming deadline.",
        "Status on client due diligence, KYC and anti-money-laundering follow-up.",
        "Task prioritisation based on deadline and risk.",
      ],
      close:
        "With Noregna, you can focus on what matters most while staying confident that deadlines are met and documentation requirements are covered.",
    },
    outcomes: {
      title: "What your firm gets out of Noregna",
      lead: "Fewer loose ends and more predictable operations.",
      items: [
        {
          title: "No deadline goes missing",
          body: "Follow-up lives in the system, not in one person's head or in a spreadsheet.",
          icon: "deadline",
        },
        {
          title: "Confidence at quality review",
          body: "Documentation builds up as the work is done, not afterwards.",
          icon: "quality",
        },
        {
          title: "Less admin",
          body: "Less searching, chasing and duplicated effort, more time for professional work.",
          icon: "tasks",
        },
        {
          title: "Easier to step into",
          body: "New colleagues quickly see who is responsible for what, and what is outstanding.",
          icon: "overview",
        },
        {
          title: "Grows with the firm",
          body: "Works just as well for a single office as for several departments.",
          icon: "progress",
        },
        {
          title: "Safe data handling",
          body: "A Norwegian solution with secure storage of client and engagement data.",
          icon: "flag",
        },
      ],
    },
    products: {
      title: "Our products",
      lead: "The Noregna platform is the firm's workspace. The client portal is the client's. Noregna Invoice is a standalone invoicing system, and is not part of the platform.",
      whereLabel: "Available at",
      platformWhere: "app.noregna.no",
      portalWhere: "App Store and Google Play",
      invoiceWhere: "invoice.noregna.no",
      includedLabel: "Part of the platform",
      separateLabel: "Separate app",
      freeLabel: "Free to use",
    },
    invoice: {
      name: "Noregna Invoice",
      title: "Noregna Invoice - free invoicing",
      lead: "Invoicing is not part of the Noregna platform. We offer it instead as a separate, standalone product: Noregna Invoice. It is completely free to use, and you can get started at invoice.noregna.no.",
      points: [
        "Create and send professional invoices in seconds",
        "Automatic payment reminders and follow-ups",
        "Full overview of outstanding and paid invoices",
        "Completely free to use, no licence cost",
        "GDPR-compliant and aligned with Norwegian tax regulations",
      ],
      cta: "Try it free",
      ctaAria: "Try Noregna Invoice for free, opens at invoice.noregna.no",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "What is Noregna?",
          a: "Noregna is a Norwegian-built, cloud-based engagement management system made for accounting firms. Instead of spreadsheets and scattered reminders, you keep engagements, deadlines and documentation in one place.",
          points: [
            "Full deadline control: The status of every engagement and upcoming deadline in a single overview, so nothing slips.",
            "Quality assurance under GRFS: Work is carried out in a structured way and documented as you go, so you are ready for a quality review.",
            "Client due diligence and AML: KYC and PEP checks are followed up and documented on the engagement itself, not in a separate system.",
            "Secure client dialogue: Share reports and documents through the client portal rather than by email.",
          ],
          close:
            "In short: less time on admin and chasing, and confidence that documentation requirements are covered.",
        },
        {
          q: "What does Noregna include?",
          a: "Noregna brings together what an accounting firm needs to stay structured and in control, in one place:",
          points: [
            "Everything about the client, together: Contact details, agreements and documents sit on the client, no more digging through email and folders.",
            "Engagements with an owner and a deadline: Every engagement has a responsible person, a status and a deadline, so everyone sees what is outstanding and what is urgent.",
            "Quality management and AML: Quality assurance, KYC and PEP checks are documented as you go, in line with GRFS.",
            "Document management: Client agreements, VAT submissions and other documentation are stored securely and are easy to find again.",
            "Client dialogue in one place: Real-time chat and the client portal make communication traceable instead of scattered across email.",
            "Simple signing: A signing module for agreements and documents, without detouring through other tools.",
            "Noregna Invoice: Our standalone invoicing system, free to use, available at invoice.noregna.no.",
            "Built in Norway: Made for Norwegian requirements and the Norwegian working day.",
          ],
          close:
            "The result is one system where nothing falls through the cracks, and the documentation is in place the day a quality review comes.",
        },
        {
          q: "What does my firm get out of Noregna?",
          a: "For the firm, Noregna means fewer loose ends and more predictable operations:",
          points: [
            "No deadline goes missing: Follow-up lives in the system, not in one person's head or in a spreadsheet.",
            "Confidence at quality review: Documentation builds up as the work is done, not afterwards.",
            "Less admin: Less searching, chasing and duplicated effort, more time for professional work.",
            "Easier to step into: New colleagues quickly see who is responsible for what, and what is outstanding.",
            "Grows with the firm: Works just as well for a single office as for several departments.",
            "Safe data handling: A Norwegian solution with secure storage of client and engagement data.",
          ],
        },
        {
          q: "What does Noregna cost?",
          a: "You pay a fixed price for the base user, plus a price per additional user. All prices are excluding VAT, per month.",
          points: [
            "Base user: NOK 2,490 at the standard rate.",
            "From user 2: NOK 249 per user.",
            "Offer for the rest of the year: Subscribe before 31 December 2026 and you pay NOK 1,490 for the base user and NOK 149 per user from user 2.",
            "The NOK 1,000 discount is permanent and stays with you for as long as you remain a customer, only ordinary price adjustments follow later.",
            "The offer applies to a limited number of places.",
          ],
        },
        {
          q: "How do I get started?",
          a: "You choose how to begin:",
          points: [
            "Try it free for one month: Register at app.noregna.no and start using the system straight away, at no cost.",
            "Get in touch: Fill in the contact form and we will take it from there.",
          ],
          close:
            "We recommend a demo first either way. A short walkthrough helps you set up engagements, deadlines and client due diligence correctly from the start, and you will get far more out of the trial period.",
        },
      ],
    },
  },
  services: {
    title: "Software for a simpler working day",
    lead:
      "Get an easier everyday life at work with software in finance, accounting, invoicing, debt collection, payroll and HR, project management, purchasing, electronic signing, document sharing and privacy.",
    pick: "Pick a solution",
    modules: [
      {
        slug: "fremdrift",
        name: "Noregna Progress",
        tagline: "Engagement management",
        icon: "progress",
        intro:
          "Simplify your daily workflows with Noregna Fremdrift, an all-in-one tool for managing projects, teams and business operations. From HR and payroll to task automation, we help you streamline operations, boost efficiency, and focus on what matters most: your growth.",
        benefitsTitle: "The benefits of Noregna Progress",
        benefits: [
          "Complete overview of workflow and deadlines",
          "Logging and documentation of work execution",
          "Customer risk classification",
          "Overview of customers by industry",
          "Efficient customer control",
          "Everything gathered in one place",
        ],
      },
      {
        slug: "rapportering",
        name: "Noregna Reporting",
        tagline: "Reporting",
        icon: "report",
        intro:
          "Make informed decisions with Noregna Rapportering. Our powerful reporting tools provide real-time insights into your business performance, financials and operations. Stay ahead with data-driven decisions and actionable reports that keep you on track.",
        benefitsTitle: "The benefits of Noregna Reporting",
        benefits: [
          "Simple and efficient submission",
          "Secure and GDPR-compliant channel",
          "Always accessible via the customer portal",
          "Reduced risk of errors",
          "Time-saving for both customer and consultant",
        ],
      },
      {
        slug: "kundeportal",
        name: "Noregna Customer Portal",
        tagline: "Customer portal",
        icon: "portal",
        intro:
          "Empower your customers with Noregna Kundeportal. This self-service portal ensures seamless communication and transparency, allowing clients to access updates, documents and support at their convenience.",
        benefitsTitle: "The benefits for accountants and clients",
        benefits: [
          "GDPR-secure communication of sensitive documents",
          "Password-protected access for clients",
          "Easy report sharing by accountants",
          "Internal storage option, invisible to the client",
          "Prevention of GDPR breaches and related fines",
          "Professional and trust-building for clients",
        ],
      },
      {
        slug: "chatnet",
        name: "Noregna Chatnet",
        tagline: "Secure chat",
        icon: "chat",
        intro:
          "Simplify client communication with Chatnet. This secure platform allows clients to connect directly with their designated accountant through real-time chats, share important files and get updates effortlessly, all in one streamlined space.",
        benefitsTitle: "The benefits of Noregna Chatnet",
        benefits: [
          "GDPR-compliant message exchange",
          "Password-protected customer app",
          "Traceability and documentation of communication",
          "Secure handling of sensitive requests",
          "Professional and trust-building for customers",
          "Avoids the use of insecure third-party platforms",
        ],
      },
      {
        slug: "fileshare",
        name: "Noregna FileShare",
        tagline: "File sharing",
        icon: "share",
        intro:
          "Share files securely with full control and GDPR compliance, both internally and externally.",
        benefitsTitle: "The benefits of Noregna FileShare",
        benefits: [
          "Secure file sharing with code protection",
          "GDPR-friendly document transfer",
          "Avoids the use of insecure third-party solutions",
          "Better control and auditability",
          "Professional impression and increased client trust",
          "Flexibility, share only what is needed",
        ],
      },
      {
        slug: "taskmanager",
        name: "Noregna TaskManager",
        tagline: "Internal tasks",
        icon: "tasks",
        intro:
          "Take full control of internal tasks with a platform tailored for accounting agencies.",
        benefitsTitle: "The benefits of Noregna TaskManager",
        benefits: [
          "All-in-one platform, included at no extra cost",
          "Efficient task delegation and internal organisation",
          "Shared status overview and real-time updates",
          "Direct communication at task level",
          "Improved collaboration and reduced bottlenecks",
          "Optimised for accounting firm workflows",
        ],
      },
      {
        slug: "sync",
        name: "Noregna Sync",
        tagline: "Brønnøysund sync",
        icon: "sync",
        intro:
          "Noregna Sync is built to make it easier to catch changes at your clients. The tool synchronises all of your clients against the Brønnøysund Register Centre and picks up discrepancies in the publicly registered information, fully automatically, without you having to look up each client.",
        benefitsTitle: "The benefits of Noregna Sync",
        benefits: [
          "Automatic synchronisation of all clients against brreg.no",
          "Alerts you if your firm is no longer registered as the accountant for a client",
          "Picks up discrepancies across all publicly registered information",
          "No more manual lookups for each individual client",
          "Your client register always matches the public data",
        ],
      },
      {
        slug: "invoice",
        name: "Noregna Invoice",
        tagline: "Invoicing",
        icon: "invoice",
        external: EXTERNAL.invoice,
        intro:
          "Noregna Invoice is our standalone invoicing system, and is not part of the Noregna platform. It is completely free to use, and you can get started at invoice.noregna.no.",
        benefitsTitle: "The benefits of Noregna Invoice",
        benefits: [
          "Completely free to use, no licence cost",
          "Create and send professional invoices in seconds",
          "Automatic payment reminders and follow-ups",
          "Full overview of outstanding and paid invoices",
          "GDPR-compliant and aligned with Norwegian tax regulations",
        ],
      },
    ],
  },
  appPage: {
    badgeApple: "Download the Noregna app from the App Store",
    badgeGoogle: "Download the Noregna app from Google Play",
    eyebrow: "Noregna Client Portal",
    title: "The client portal your clients carry in their pocket",
    lead: "Noregna Client Portal gives your clients a running overview of outstanding items, access to every document the firm has shared, and a secure channel for sending in whatever is missing. The result is fewer enquiries to the firm, and no doubt about what has been delivered.",
    getsTitle: "What your clients get",
    gets: [
      {
        title: "Outstanding items, always available",
        body: "The accountant uploads the list of outstanding items, and the client can see it at any time. Receipts are uploaded straight onto the item they belong to.",
        icon: "overview",
      },
      {
        title: "All documents and reports",
        body: "Payslips, periodic reports, VAT returns and other reports the firm has made available, gathered in one place.",
        icon: "files",
      },
      {
        title: "Daily settlement in a few taps",
        body: "A built-in daily settlement form. The client fills it in and sends the completed settlement to the accountant in a few taps, with the documentation requirement covered.",
        icon: "settle",
      },
      {
        title: "GDPR-secure chat",
        body: "Noregna Chatnet is built in. All communication stays inside the system, password-protected on both sides, not over email.",
        icon: "chat",
      },
      {
        title: "Receipt upload",
        body: "For clients who do not already have an inbox in their accounting system, receipts can be uploaded straight into the app.",
        icon: "upload",
      },
      {
        title: "Norwegian and secure",
        body: "Built in Norway, aligned with Norwegian privacy and documentation requirements.",
        icon: "flag",
      },
    ],
    worthTitle: "Why it pays off",
    worth: [
      {
        title: "No doubt about what is missing",
        body: "Both the client and the firm see the same list of outstanding items. No more misunderstandings about what has been sent and what remains.",
      },
      {
        title: "Clients need not ask",
        body: "The reports are already waiting in the app, so the firm avoids enquiries about something it has already shared.",
      },
      {
        title: "Saves time both ways",
        body: "Less email and fewer reminders, time freed up for the client and the accountant alike.",
      },
      {
        title: "Secure dialogue",
        body: "Communication and document sharing happen inside the system, not over email.",
      },
    ],
    carouselPrev: "Previous screen",
    carouselNext: "Next screen",
    screens: {
      home: "The Home screen of the Noregna Client Portal, with a missing-receipts alert and shortcuts to upload, daily settlement and documents",
      overview: "The Overview screen with key figures for missing receipts, new uploads, unread messages and subscription",
      missing: "The Missing receipts screen, with the accountant's comment and an upload button",
      uploads: "Upload receipts: pick a month, with the number of files per month",
      source: "Choose an upload source: camera or gallery",
      settlement: "Daily settlement with Z-report and sales split by VAT rate",
      documents: "My Documents, with folders for receipts, cash, payroll and VAT sorted by year",
      chat: "Messages: chat with your accountant",
      notifications: "Notifications about new documents and signing requests",
      profile: "Profile with account, subscription and legal information",
      switch: "Switch company: choose which company to use",
      login: "The Noregna Client Portal login screen",
      splash: "The Kundeportal welcome screen, powered by Noregna",
    },
  },
  contact: {
    title: "Contact us",
    lead: "Fill in the form and we will take it from there. We recommend a short demo first, so you set up engagements, deadlines and client due diligence correctly from the start.",
    formTitle: "Feel Free to Message",
    fields: {
      firstName: "Your Name",
      lastName: "Your Surname",
      email: "Your Email",
      phone: "Phone",
      org: "Organization Name",
      orgHelp: "The firm or company you represent.",
      searchLabel: "Find your company",
      searchPlaceholder: "Search by company name...",
      selectHint: "Select your company from the list or enter manually below.",
      manualLabel: "Or enter organization name manually",
      message: "Message",
      messagePlaceholder: "Tell us briefly what you need, and how many users you are.",
    },
    submit: "Send a Message",
    submitting: "Sending",
    successTitle: "Thank you, your message has been sent",
    successBody: "Thank you for getting in touch! We have sent you a confirmation by email and will be in contact shortly.",
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
    errorGeneric: "The message could not be sent. Try again, or email post@noregna.no.",
    errorCaptcha: "Please confirm that you are not a robot.",
    reset: "Send another message",
    detailsTitle: "Get in Touch",
    addressLabel: "Address",
    emailLabel: "Email Address",
    orgLabel: "Organisation number",
    directTitle: "Would you rather try it yourself?",
    directBody: "Register at app.noregna.no and start using the system straight away, free for one month.",
    trialCta: "Try for free",
  },
  footer: {
    about:
      "Noregna builds services that make the working day easier for accountants. We bring engagements, deadlines, quality assurance and anti-money-laundering follow-up together in one place, so your firm stays structured and in control, and ready for a quality review. Built in Norway, for Norwegian accounting firms.",
    shortcuts: "Quick links",
    systems: "Our systems",
    contact: "Contact us",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms of purchase and delivery",
    rights: "All rights reserved.",
    orgNr: "Org. no.",
    viewMap: "View on map",
    facebook: "Noregna on Facebook",
    instagram: "Noregna on Instagram",
  },
  notFound: {
    title: "This page does not exist",
    body: "The link may be out of date, or the address may be mistyped. From here you can carry on:",
    cta: "Go to the homepage",
  },
};

export function getDict(locale: Locale): Dict {
  return locale === "en" ? en : no;
}
