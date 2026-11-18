/**
 * Single source of truth for all portfolio copy.
 * Every fact here comes from Sabana's resumes (Project Manager resume + Mobile portfolio deck)
 * or, for trackAsset product context, the public product page. Nothing is invented —
 * if something isn't documented, it is left out.
 */

/** Prefixes a /public path with the site's base URL, so links work on GitHub Pages sub-paths too. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');

export const profile = {
  name: 'Sabana Asmi S',
  shortName: 'Sabana',
  primaryTitle: 'Android Engineer',
  supportingTitles: ['Technical Project Manager', 'Product Owner', 'Agile Delivery Lead'],
  currentRole: 'Technical Project Manager / Product Owner',
  currentCompany: 'Health Basix',
  email: 'sapnasabeela@gmail.com',
  phone: '+91 93842 95189',
  phoneHref: 'tel:+919384295189',
  linkedin: 'https://www.linkedin.com/in/sabana-asmi-sabeela/',
  linkedinHandle: 'sabana-asmi-sabeela',
  resumeUrl: asset('/Sabana-Asmi-Resume.pdf'),
  resumeFileName: 'Sabana-Asmi-S-Resume.pdf',
};

export const hero = {
  kicker: 'Android Engineer · Technical Project Manager',
  headline: ['Android apps built for', 'the real world', '— and the teams that ship them.'],
  intro:
    'From offline-first Android apps for US railroads to a nine-product healthcare platform — as the only Android developer on both — I design, build and lead mobile software from first requirement to production release.',
};

export const about = {
  lead: 'I’m an Android engineer at heart. For ten years I’ve built software for people who don’t sit at desks — railroad inspectors in the field, school nurses, counselors and parents — and I’ve learned that the best mobile products are shaped by how people actually work.',
  chapters: [
    {
      years: '2016 — 2019',
      title: 'Built for the field',
      text: 'At Brightui Technologies I developed enterprise Android apps for domestic and international clients — including trackAsset, an offline-first railroad asset management app for the US that I built and delivered independently.',
    },
    {
      years: '2019 — 2023',
      title: 'Owned the client conversation',
      text: 'As a Senior Android Developer at Mequals Technologies and Bright Bridge Infotech, I built apps in Kotlin and Java while owning scope, estimates, timelines and requirements directly with clients.',
    },
    {
      years: '2023 — Now',
      title: 'Leading the product',
      text: 'At Health Basix I’m the only Android developer — I build the platform’s Android apps myself — and its Technical Project Manager and Product Owner, leading a team of 10 from roadmap and backlog to sprint and release.',
    },
  ],
  principles: [
    'Mobile applications should be designed around how users actually work — not simply reproduce a desktop experience on a phone.',
    'Field applications cannot always depend on continuous connectivity.',
    'Production-ready means reliability, usability, performance and maintainability.',
  ],
  industries: ['Healthcare technology', 'Enterprise mobility', 'Railroad asset management (USA)'],
};

/* ---------- Technical expertise ---------- */

export type NodeId =
  | 'android'
  | 'kotlin'
  | 'java'
  | 'sdk'
  | 'room'
  | 'firebase'
  | 'rest'
  | 'sqlite'
  | 'mysql'
  | 'json'
  | 'volley'
  | 'glide'
  | 'maps'
  | 'gps'
  | 'rfid'
  | 'fcm'
  | 'git'
  | 'github'
  | 'jira'
  | 'trello'
  | 'scrum'
  | 'xml';

export const techNodes: { id: NodeId; label: string; ring: 0 | 1 | 2 }[] = [
  { id: 'android', label: 'Android', ring: 0 },
  { id: 'kotlin', label: 'Kotlin', ring: 1 },
  { id: 'java', label: 'Java', ring: 1 },
  { id: 'sdk', label: 'Android SDK', ring: 1 },
  { id: 'room', label: 'Room', ring: 1 },
  { id: 'firebase', label: 'Firebase', ring: 1 },
  { id: 'rest', label: 'REST APIs', ring: 1 },
  { id: 'sqlite', label: 'SQLite', ring: 2 },
  { id: 'xml', label: 'XML', ring: 2 },
  { id: 'mysql', label: 'MySQL', ring: 2 },
  { id: 'json', label: 'JSON', ring: 2 },
  { id: 'volley', label: 'Volley', ring: 2 },
  { id: 'glide', label: 'Glide', ring: 2 },
  { id: 'maps', label: 'Google Maps', ring: 2 },
  { id: 'gps', label: 'GPS', ring: 2 },
  { id: 'rfid', label: 'RFID', ring: 2 },
  { id: 'fcm', label: 'FCM', ring: 2 },
  { id: 'git', label: 'Git', ring: 2 },
  { id: 'github', label: 'GitHub', ring: 2 },
  { id: 'jira', label: 'Jira', ring: 2 },
  { id: 'trello', label: 'Trello', ring: 2 },
  { id: 'scrum', label: 'Scrum', ring: 2 },
];

export type SkillCategory = {
  id: string;
  title: string;
  icon: 'smartphone' | 'code' | 'boxes' | 'network' | 'database' | 'cloud' | 'layers' | 'kanban' | 'workflow';
  items: string[];
  nodes: NodeId[];
  featured?: boolean;
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'android',
    title: 'Android Development',
    icon: 'smartphone',
    featured: true,
    items: ['Android SDK', 'Android Studio', 'XML layouts', 'Offline-first apps', 'Google Maps & GPS', 'RFID integration', 'Push notifications'],
    nodes: ['android', 'sdk', 'xml', 'kotlin', 'java', 'maps', 'gps', 'rfid', 'fcm', 'room'],
  },
  { id: 'lang', title: 'Programming Languages', icon: 'code', items: ['Kotlin', 'Java'], nodes: ['kotlin', 'java'] },
  { id: 'libs', title: 'Frameworks & Libraries', icon: 'boxes', items: ['Room', 'Volley', 'Glide'], nodes: ['room', 'volley', 'glide'] },
  {
    id: 'api',
    title: 'Backend & API Integration',
    icon: 'network',
    items: ['REST APIs', 'JSON', 'Third-party services'],
    nodes: ['rest', 'json', 'firebase'],
  },
  { id: 'db', title: 'Databases', icon: 'database', items: ['SQLite', 'Room Database', 'MySQL'], nodes: ['sqlite', 'room', 'mysql'] },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['Firebase Authentication', 'Firebase Cloud Messaging', 'Firebase Analytics', 'Firebase Console', 'Git', 'GitHub'],
    nodes: ['firebase', 'fcm', 'git', 'github'],
  },
  {
    id: 'arch',
    title: 'Software Architecture',
    icon: 'layers',
    items: ['Offline-first design', 'Local storage & data sync', 'Layered mobile architecture', 'Network handling'],
    nodes: ['room', 'sqlite', 'rest', 'firebase', 'android'],
  },
  { id: 'pm', title: 'Project Management Tools', icon: 'kanban', items: ['Jira', 'Trello'], nodes: ['jira', 'trello'] },
  {
    id: 'agile',
    title: 'Agile Methodologies',
    icon: 'workflow',
    items: ['Scrum', 'Sprint planning', 'Backlog management', 'User stories', 'Roadmap planning', 'Acceptance testing', 'Release management'],
    nodes: ['scrum', 'jira', 'trello'],
  },
];

export const alsoFamiliar = ['iOS', 'Xcode', 'React Native', 'Flutter'];

/* ---------- Projects ---------- */

export type Project = {
  id: string;
  name: string;
  category: string;
  period: string;
  accent: 'droid' | 'iris';
  summary: string;
  overview: string;
  problem: string;
  role: string;
  roleTitle: string;
  responsibilities: string[];
  tech: string[];
  features: string[];
  challenges: { title: string; text: string }[];
  impact: string[];
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    id: 'trackasset',
    name: 'trackAsset',
    category: 'Android · Railroad asset management · USA',
    period: '2016 — 2019',
    accent: 'droid',
    summary: 'An offline-first Android app that lets railroad inspectors record inspections, defects and maintenance in the field — with or without a signal.',
    overview:
      'trackAsset is an enterprise inspection management product for railroads, covering signals, bridges, track and switches, locomotives and PTC equipment. I built its Android application end to end.',
    problem:
      'Railroad inspections are regulated, paper-heavy and happen along the track — exactly where connectivity drops. Inspectors needed to capture inspections, defects and maintenance work in the field without losing data, then get it back to the office.',
    roleTitle: 'Sole Android developer',
    role: 'I independently designed, developed, deployed and maintained the Android application — from implementation through release and ongoing enhancements.',
    responsibilities: [
      'Translated stakeholder and business-user requirements into mobile workflows',
      'Built inspection, defect tracking and maintenance management features',
      'Implemented local storage and data synchronization',
      'Integrated GPS, Google Maps and RFID-based tracking',
      'Managed releases, deployment and ongoing enhancements',
    ],
    tech: ['Java', 'Android SDK', 'SQLite', 'Room', 'Google Maps', 'GPS', 'RFID', 'REST APIs', 'JSON'],
    features: ['Asset inspection', 'Defect tracking', 'Maintenance workflows', 'GPS & map view of assets', 'RFID asset tracking', 'Offline data capture', 'Sync when back online'],
    challenges: [
      {
        title: 'Work that never stops for the network',
        text: 'Inspections are stored locally in SQLite / Room so inspectors keep working with no connection, then synchronize when the network is restored.',
      },
      {
        title: 'Hardware in a fast field flow',
        text: 'GPS, Google Maps and RFID had to fit into an inspection flow quick enough to use while walking or riding the track.',
      },
    ],
    impact: [
      'Improved field operations by moving inspection work onto mobile',
      'Delivered and maintained end to end by one developer',
      'Part of a product built to support FRA inspection requirements (49 CFR Parts 213, 234, 236 & 237), per the product’s published documentation',
    ],
    link: { href: 'https://www.railroadsoftware.com/railroad-asset-inspection-management/', label: 'View trackAsset product page' },
  },
  {
    id: 'healthbasix',
    name: 'Health Basix',
    category: 'Healthcare platform · Web & mobile',
    period: '2023 — Now',
    accent: 'iris',
    summary: 'A healthcare platform of nine connected products for school health — from student assessment and screening to nurse, counseling and parent reporting.',
    overview:
      'Health Basix brings student health assessment, screening and evaluation, school dashboards, parent reports, nurse and counseling management, special education tracking and an administrative portal together — alongside mobile applications for healthcare services.',
    problem:
      'School health involves many people — students, nurses, counselors, administrators and parents — each needing their own workflow and view. Delivering that as one coherent platform means many products moving forward at once.',
    roleTitle: 'Sole Android developer · Product Owner',
    role: 'I’m the only Android developer on the platform — I build and maintain its Android apps myself. I also own delivery: requirements, priorities, backlog, sprints and releases, and I lead the team of 10 that builds the wider platform.',
    responsibilities: [
      'Build and maintain the platform’s Android applications as the sole Android developer',
      'Lead and mentor a team of 10 developers, testers and designers',
      'Define requirements, priorities and business objectives with stakeholders',
      'Translate business needs into functional specifications',
      'Run backlog management, sprint planning and release activities in Agile',
      'Review deliverables, validate features and drive improvements from user feedback',
      'Monitor progress, mitigate risks and keep milestones on time',
    ],
    tech: ['Android', 'Android SDK', 'Android Studio', 'Agile / Scrum', 'Jira', 'Web portals', 'Acceptance testing'],
    features: [
      'Student Health Assessment',
      'Health Screening & Evaluation',
      'School Health Dashboard',
      'Parent Health Reports',
      'Nurse Management System',
      'Counseling Management',
      'Special Education Tracking',
      'Administrative Portal',
      'Mobile apps for healthcare services',
    ],
    challenges: [
      {
        title: 'One Android developer, two hats',
        text: 'Building every Android app on the platform myself while also running the backlog, sprints and releases for the whole product.',
      },
      {
        title: 'Many products, one roadmap',
        text: 'Managing multiple healthcare applications under one platform — balancing stakeholder priorities across them in a single roadmap and backlog.',
      },
      {
        title: 'One team across disciplines',
        text: 'Coordinating developers, QA engineers and UI/UX designers so each release is validated and ready for real users.',
      },
    ],
    impact: ['Sole developer behind the platform’s Android apps', '9 healthcare products delivered under one platform', 'Projects delivered on time while maintaining quality standards', 'Team of 10 led and mentored'],
  },
];

/* ---------- Experience ---------- */

export type Job = {
  company: string;
  title: string;
  start: string;
  end: string;
  current?: boolean;
  focus: 'Android' | 'Android + Leadership';
  summary: string;
  responsibilities: string[];
  achievements?: string[];
  tech: string[];
};

export const experience: Job[] = [
  {
    company: 'Health Basix',
    title: 'Technical Project Manager / Product Owner',
    start: 'Mar 2023',
    end: 'Present',
    current: true,
    focus: 'Android + Leadership',
    summary: 'Sole Android developer and product lead for a healthcare platform.',
    responsibilities: [
      'Develop and maintain the platform’s Android applications as the only Android developer',
      'Lead end-to-end software delivery from requirement gathering to production release',
      'Define product requirements, priorities and business objectives with stakeholders',
      'Translate business needs into functional specifications and guide implementation',
      'Manage backlogs, sprint planning, prioritization and releases using Agile',
      'Coordinate developers, QA engineers and UI/UX designers',
      'Monitor progress, mitigate risks and ensure timely delivery of milestones',
    ],
    achievements: [
      'Managed multiple healthcare applications under the Health Basix platform',
      'Led and mentored a team of 10 developers, testers and designers',
      'Delivered projects on time while maintaining quality standards',
      'Contributed to roadmap planning, feature prioritization and stakeholder engagement',
    ],
    tech: ['Android', 'Agile / Scrum', 'Jira', 'Product backlog', 'Release management'],
  },
  {
    company: 'Bright Bridge Infotech Pvt Ltd',
    title: 'Senior Android Developer',
    start: 'Mar 2021',
    end: 'Mar 2023',
    focus: 'Android',
    summary: 'Building Android applications while owning scope and client requirements.',
    responsibilities: [
      'Developed Android applications using Java and Kotlin',
      'Managed project scope and delivery timelines',
      'Worked directly with clients to gather requirements and propose technical solutions',
      'Integrated REST APIs and third-party services',
      'Ensured quality releases and bug-free deployments',
      'Participated in project estimation and planning',
    ],
    tech: ['Kotlin', 'Java', 'Android SDK', 'REST APIs'],
  },
  {
    company: 'Mequals Technologies',
    title: 'Senior Android Developer',
    start: 'Dec 2019',
    end: 'Feb 2021',
    focus: 'Android',
    summary: 'Delivering client Android apps from requirements to release.',
    responsibilities: [
      'Developed Android applications using Java and Kotlin',
      'Collaborated directly with clients on requirements and technical solutions',
      'Managed project scope and delivery timelines',
      'Integrated REST APIs and third-party services',
      'Ensured quality releases and bug-free deployments',
    ],
    tech: ['Kotlin', 'Java', 'REST APIs', 'Firebase'],
  },
  {
    company: 'Brightui Technologies',
    title: 'Junior Android Developer',
    start: 'Feb 2016',
    end: 'Nov 2019',
    focus: 'Android',
    summary: 'Enterprise Android apps for domestic and international clients.',
    responsibilities: [
      'Developed enterprise Android applications for domestic and international clients',
      'Built offline-first mobile applications for railroad asset management',
      'Designed inspection and defect management applications',
      'Integrated Google Maps and RFID-based tracking',
      'Managed application releases and deployment',
      'Worked closely with business users on operational requirements',
    ],
    achievements: [
      'Delivered multiple enterprise mobility solutions',
      'Improved field operations through mobile business applications',
      'Managed end-to-end application development and deployment',
    ],
    tech: ['Java', 'Android SDK', 'SQLite', 'Room', 'Google Maps', 'RFID'],
  },
];

export const education = [
  { degree: 'Bachelor of Business Management', school: 'Annamalai University', period: '2022 — 2023' },
  { degree: 'Bachelor of Engineering', school: 'Anna University', period: '2010 — 2014' },
];

/* ---------- Leadership ---------- */

export const leadership = [
  { icon: 'users', title: 'Lead teams', text: 'Lead and mentor a team of 10 developers, testers and designers.' },
  { icon: 'target', title: 'Manage technical projects', text: 'Plan and execute, monitor progress, mitigate risks and hit milestones.' },
  { icon: 'handshake', title: 'Coordinate stakeholders', text: 'Define requirements, priorities and business objectives with stakeholders and clients.' },
  { icon: 'package', title: 'Own product delivery', text: 'Product vision, backlog, user stories, prioritization and acceptance testing.' },
  { icon: 'repeat', title: 'Drive Agile', text: 'Scrum ceremonies, sprint planning and release coordination.' },
  { icon: 'rocket', title: 'Ship mobile & web products', text: 'Android apps and healthcare web portals, delivered to production.' },
] as const;

export const lifecycle = ['Requirement', 'UX', 'Architecture', 'Development', 'Integration', 'Testing', 'Release', 'Improvement'];

/* ---------- Achievements (documented numbers only) ---------- */

export const achievements = [
  { value: 10, suffix: '+', label: 'Years in IT', note: 'Android engineering to product leadership' },
  { value: 4, suffix: '+', label: 'Years leading products', note: 'Project management & product ownership' },
  { value: 10, suffix: '', label: 'Team members led', note: 'Developers, testers and designers' },
  { value: 9, suffix: '', label: 'Healthcare products', note: 'Delivered under the Health Basix platform' },
  { value: 10, suffix: 'K+', label: 'App downloads', note: 'Across applications I’ve worked on' },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Work' },
  { id: 'health-apps', label: 'Apps' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- Healthcare mobile app portfolio ---------- */

export type HealthApp = {
  id: 'parent' | 'carestation' | 'wellness';
  name: string;
  tagline: string;
  audience: string;
  overview: string;
  features: string[];
  contributions: string[];
  tech: string[];
  /**
   * Real app screenshots. Drop PNG/JPG/WebP files into /public/screenshots and list them here,
   * e.g. ['/screenshots/parent-home.webp']. While empty, the card shows a clearly-labelled
   * illustrative concept screen instead.
   */
  screenshots: string[];
};

export const healthAppsShowcase = {
  image: asset('/images/healthcare-apps-showcase.webp'),
  alt: 'Concept showcase of three Health Basix Android apps: HealthBasix Parent, Care Station and Wellness',
};

const sharedContributions = [
  'Sole Android developer — built the app end to end',
  'Turned UI/UX designs into production Android screens and workflows',
  'Integrated the Health Basix platform through REST APIs',
  'Tested with QA and managed Play Store releases',
];

export const healthApps: HealthApp[] = [
  {
    id: 'parent',
    name: 'HealthBasix Parent',
    tagline: 'Family health, made simple',
    audience: 'For parents',
    overview:
      'Gives parents one place to follow their child’s school health — health reports, records, immunization reminders, clinic visits and doctor consultations.',
    features: [
      'Child health profile',
      'Health reports',
      'Health records',
      'Immunization reminders',
      'Care Station visit history',
      'Doctor consultation',
      'Health wallet',
      'Notifications & support',
    ],
    contributions: [...sharedContributions.slice(0, 1), 'Built the report, records and reminder flows parents use', ...sharedContributions.slice(1)],
    tech: ['Android SDK', 'Android Studio', 'REST APIs', 'JSON'],
    screenshots: [],
  },
  {
    id: 'carestation',
    name: 'HBX Nurse Care Station',
    tagline: 'School clinic management',
    audience: 'For school nurses',
    overview:
      'Helps school nurses run the clinic day to day — log student visits, record vitals and medication, and keep track of follow-ups.',
    features: [
      'Today’s clinic visits dashboard',
      'Student visit queue with status',
      'New visit logging',
      'Vitals recording',
      'Medication tracking',
      'Follow-ups',
      'Student directory & reports',
      'Online / sync status',
    ],
    contributions: [...sharedContributions.slice(0, 1), 'Built visit, vitals and medication workflows for fast use in the clinic', ...sharedContributions.slice(1)],
    tech: ['Android SDK', 'Android Studio', 'REST APIs', 'JSON'],
    screenshots: [],
  },
  {
    id: 'wellness',
    name: 'Wellness',
    tagline: 'Better wellbeing, brighter tomorrow',
    audience: 'For students',
    overview: 'Encourages healthy routines with a daily wellbeing check-in, weekly progress, a wellness trend and simple tips.',
    features: ['Daily mood check-in', 'Weekly progress score', 'Activity goals', 'Mood tracking', 'Healthy habits', 'Wellness trend', 'Wellness tips', 'Insights'],
    contributions: [...sharedContributions.slice(0, 1), 'Built the daily check-in, progress and trend experience', ...sharedContributions.slice(1)],
    tech: ['Android SDK', 'Android Studio', 'REST APIs', 'JSON'],
    screenshots: [],
  },
];
