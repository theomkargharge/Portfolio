// Everything the site says lives here — update this file to keep the portfolio current.

export const profile = {
  name: 'Omkar Gharge',
  role: 'Flutter & GenAI Engineer',
  location: 'Pune, India',
  email: 'omkarghargeog@gmail.com',
  phone: '+91 85303 23286',
  phoneHref: 'tel:+918530323286',
  linkedin: 'https://www.linkedin.com/in/omkargharge/',
  github: 'https://github.com/theomkargharge',
  resume: `${import.meta.env.BASE_URL}Omkar_Gharge_Resume.pdf`,
};

export const stats = [
  { value: '3.5', suffix: '+', label: 'Years shipping Flutter' },
  { value: '1M', suffix: '+', label: 'Downloads on one app' },
  { value: '4', suffix: '', label: 'Apps live on the stores' },
  { value: '2', suffix: '', label: 'Platforms — iOS & Android' },
];

export type Link = { label: string; href: string };

export type Project = {
  id: 'akbar' | 'tryware' | 'buggy';
  index: string;
  name: string;
  tagline: string;
  org: string;
  period: string;
  category: string;
  summary: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  links: Link[];
};

export const projects: Project[] = [
  {
    id: 'akbar',
    index: '01',
    name: 'Akbar Travels',
    tagline: 'Flights & Hotels',
    org: 'Benzy Infotech · Akbar Travels Group',
    period: '2025 — Now',
    category: 'Travel · Production',
    summary:
      'One of India’s leading travel-booking apps. I build and maintain it in Flutter for iOS and Android — core flows for flights, hotels, visa services and holiday packages.',
    highlights: [
      'Real-time AI chatbot over WebSocket for booking, cancellation and ticket-download queries — with instant hand-off to a live agent on escalation.',
      'CleverTap push notifications, deep linking and Hive local storage for fast, reliable navigation.',
      'Razorpay, Tamara and Tabby payment gateways for secure checkout across markets.',
    ],
    metrics: [
      { value: '1M+', label: 'Downloads' },
      { value: 'iOS + Android', label: 'One codebase' },
    ],
    stack: ['Flutter', 'GetX', 'WebSocket', 'CleverTap', 'Hive', 'Razorpay', 'Tamara', 'Tabby'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.akbartravel.AkbarTravels&hl=en_IN' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/akbartravels-flights-hotels/id955378983' },
    ],
  },
  {
    id: 'tryware',
    index: '02',
    name: 'TryWare AI',
    tagline: 'GenAI virtual try-on',
    org: 'Personal product · Solo build',
    period: 'Live on Google Play',
    category: 'Generative AI · Full-stack',
    summary:
      'An end-to-end Generative AI clothing try-on app I took from idea to Google Play — Flutter frontend, async Python FastAPI backend, payments and infrastructure.',
    highlights: [
      'Image pipeline on the OpenAI gpt-image API — migrated from Gemini/Imagen after evaluating face accuracy and cost per image. Standard and HD modes.',
      'Race-condition-safe credit system with row-level locking (async SQLAlchemy), Firebase Auth and Razorpay webhooks for tiered credit packs.',
      'Deployed on a Hetzner VPS with Docker Compose, Caddy auto-HTTPS and GitHub Actions CI/CD.',
    ],
    metrics: [
      { value: 'Idea → Play', label: 'Built solo' },
      { value: 'SD + HD', label: 'Generation modes' },
    ],
    stack: ['Flutter', 'GetX', 'FastAPI', 'OpenAI', 'SQLAlchemy', 'Firebase Auth', 'Razorpay', 'Docker', 'GitHub Actions'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.crazzydev.tryware.dev' },
      { label: 'Website', href: 'https://trywareai.crazzyappz.in' },
    ],
  },
  {
    id: 'buggy',
    index: '03',
    name: 'Buggy & Buggy Sarathi',
    tagline: 'Ride-hailing platform',
    org: 'Movilidad Technologies',
    period: '2023 — 2024',
    category: 'Mobility · Rider + Driver',
    summary:
      'A complete ride-hailing platform — the Buggy rider app and the Buggy Sarathi driver app, which I built from scratch.',
    highlights: [
      'Live tracking with Google Maps, Places API, background location and a moving-marker feature — route accuracy and driver efficiency up 30%.',
      'WebSocket for instant ride requests, driver allocation and live updates — response times down 40%.',
      'Payments, AWS S3 document uploads, Firebase push, a floating app bubble and custom audio ride alerts — driver response rates up 25%.',
    ],
    metrics: [
      { value: '+30%', label: 'Engagement' },
      { value: '−40%', label: 'Response time' },
      { value: '+25%', label: 'Satisfaction' },
    ],
    stack: ['Flutter', 'Google Maps', 'Places API', 'WebSocket', 'Firebase', 'AWS S3', 'Background services'],
    links: [
      { label: 'Buggy', href: 'https://play.google.com/store/apps/details?id=com.buggy' },
      { label: 'Buggy Sarathi', href: 'https://play.google.com/store/apps/details?id=com.buggysarathi' },
    ],
  },
];

export const experience = [
  {
    company: 'Benzy Infotech',
    detail: 'Akbar Travels Group',
    role: 'Flutter Developer',
    period: 'Jan 2025 — Present',
    location: 'Pune',
    current: true,
    points: [
      'Develop and maintain Akbar Travels: Flights & Hotels (1M+ downloads) for iOS and Android — flights, hotels, visa services and holiday packages — and ship releases to the App Store and Play Store.',
      'Integrated CleverTap push notifications, deep linking, Hive local storage and Razorpay, Tamara and Tabby payment gateways.',
      'Built a real-time AI chatbot over WebSocket for booking, cancellation and ticket-download queries, with zero-delay messaging and instant hand-off to live support agents.',
    ],
    tags: ['Flutter', 'GetX', 'WebSocket', 'CleverTap', 'Payments'],
  },
  {
    company: 'Movilidad Technologies',
    detail: 'Travel & Mobility',
    role: 'Flutter Developer',
    period: 'Jun 2023 — Dec 2024',
    location: 'Pune',
    current: false,
    points: [
      'Integrated Google Maps with real-time location tracking and battery-efficient background services — user engagement up 25%, reliability and uptime up 20%.',
      'Implemented WebSocket-based real-time communication, cutting data-sync delays by 30%.',
      'Built a fully responsive UI with custom animations and transitions — retention up 15%, design rework down 20%.',
    ],
    tags: ['Flutter', 'Google Maps', 'WebSocket', 'Firebase', 'AWS S3'],
  },
];

export const skillGroups = {
  ai: {
    title: 'Generative AI',
    blurb: 'LLM-powered features, retrieval pipelines and agents that make apps genuinely smarter.',
    items: ['LangChain', 'LangGraph', 'RAG', 'AI Agents', 'Prompt Engineering', 'OpenAI', 'Gemini', 'Embeddings', 'Vector Databases'],
  },
  mobile: {
    title: 'Mobile',
    blurb: 'Production Flutter for iOS and Android, from first commit to store release.',
    items: ['Flutter', 'Dart', 'Swift', 'Java', 'GetX', 'Riverpod', 'Provider', 'Bloc', 'Hive', 'Deep linking'],
  },
  backend: {
    title: 'Backend & Cloud',
    blurb: 'APIs, real-time and infrastructure behind the apps.',
    items: ['Python', 'FastAPI', 'Firebase', 'Firestore', 'Supabase', 'REST', 'WebSocket', 'AWS S3', 'Cloudflare', 'Docker', 'GitHub Actions'],
  },
  payments: {
    title: 'Payments',
    blurb: 'Checkout flows across India and the Gulf.',
    items: ['Razorpay', 'PhonePe', 'Checkout', 'Tamara', 'Tabby'],
  },
  integrations: {
    title: 'Integrations',
    blurb: 'Engagement, maps and monetisation.',
    items: ['CleverTap', 'Google Maps', 'Places API', 'AdMob', 'Push notifications'],
  },
  tools: {
    title: 'Tooling',
    blurb: 'AI-assisted development and the everyday kit.',
    items: ['Claude Code', 'OpenAI Codex', 'Google Antigravity', 'Xcode', 'Android Studio', 'VS Code', 'Postman', 'Git', 'GitHub', 'Bitbucket'],
  },
};

export const education = {
  school: 'Dr. Babasaheb Ambedkar Technological University',
  degree: 'B.Tech, Computer Science & Engineering',
  period: '2019 — 2023',
  grade: 'CGPA 8.47',
};

export const ticker = [
  'Flutter', 'Dart', 'LangChain', 'LangGraph', 'RAG', 'AI Agents', 'FastAPI', 'Python', 'OpenAI', 'Gemini',
  'Firebase', 'Supabase', 'WebSocket', 'Google Maps', 'Razorpay', 'CleverTap', 'Docker', 'AWS S3', 'Riverpod', 'Swift',
];
