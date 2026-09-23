/*
 * All portfolio content lives here. Sources: the full-stack resume
 * (src/assets/AnaGarciaResume.pdf) and the UTRGV unofficial transcript.
 */
import talkieImg from '../assets/talkie.png';
import serverImg from '../assets/server.png';
import commentsImg from '../assets/comments.png';
import folioImg from '../assets/folio.png';
import chasingTimeImg from '../assets/chasingTime.png';

// Name shown in the menu bar and phone status bar.
export const OS_NAME = 'Ana OS';

export const PROFILE = {
  name: 'Ana Garcia',
  title: 'SOFTWARE ENGINEER',
  bio: 'Full-stack software engineer building production mobile and web apps end to end, from Postgres schemas and Go APIs to React and React Native frontends.',
  email: 'anagarcia3174@gmail.com',
  phone: '956-212-7174',
  site: 'anagarcia.vercel.app',
  github: 'https://github.com/anagarcia3174',
  githubHandle: '@anagarcia3174',
  linkedin: 'https://www.linkedin.com/in/anagarcia17/',
  linkedinHandle: 'in/anagarcia17',
};

const repo = (label, href) => ({ label, icon: 'git-branch', href });
const live = (label, href) => ({ label, icon: 'external-link', href });

export const PROJECTS = [
  {
    id: 'talkie',
    file: 'talkie.md',
    name: 'Talkie',
    when: '2025 – PRESENT',
    image: talkieImg,
    about: 'Social mobile app for tracking and reviewing movies and TV shows.',
    bullets: [
      'Engineered a full-stack social mobile app with a PostgreSQL/Supabase backend and live TMDB API integration.',
      'Secured user data end-to-end with Apple Sign-In (OAuth), Supabase Auth, and row-level security policies.',
      'Architected a service → Zustand store → component pattern across 10+ domain-scoped services.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'NativeWind', 'Zustand'],
    links: [repo('Repository', 'https://github.com/anagarcia3174/talkie')],
  },
  {
    id: 'nailz',
    file: 'nailzbydardo.md',
    name: 'NailzByDardo',
    when: 'AUG 2026 – PRESENT',
    image: serverImg,
    about: 'Salon management system, built solo and actively used to run a real business.',
    bullets: [
      'Owned the entire full-stack lifecycle solo — from schema design through a Go backend to a production React/TypeScript frontend.',
      'Architected a strict layered backend (handler → service → repository) with versioned migrations across an 8-table PostgreSQL schema.',
      'Modeled all financial data as integer cents to guarantee precise revenue, discount, and tip calculations.',
    ],
    stack: ['Go', 'chi', 'pgx/v5', 'sqlc', 'PostgreSQL', 'React', 'TypeScript', 'TanStack Query'],
    links: [
      repo('Backend', 'https://github.com/anagarcia3174/nailzbydardo-backend'),
      repo('Frontend', 'https://github.com/anagarcia3174/nailzbydardo-frontend'),
    ],
  },
  {
    id: 'express',
    file: 'express-starter.md',
    name: 'Express Backend Starter',
    when: 'DEC 2024',
    image: serverImg,
    about: 'Production-ready API boilerplate with authentication and email services.',
    bullets: [
      'Implemented a production-ready JWT system with access/refresh token rotation, covering registration, login, logout, and refresh.',
      'Built a full AWS SES service with pre-configured EJS templates for verification, password reset, and notifications.',
      'Hardened the API with rate limiting, input validation, CORS configuration, and a clean service-layer architecture.',
    ],
    stack: ['TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'AWS SES'],
    links: [repo('Repository', 'https://github.com/anagarcia3174/express-backend-starter')],
  },
  {
    id: 'comments',
    file: 'comments.md',
    name: 'Comments!',
    when: '2024',
    image: commentsImg,
    about: 'Movie companion web app with timestamp-specific commenting.',
    bullets: [
      'Users post and view comments on movies at specific timestamps, backed by a real-time database.',
      'TMDB API integration for the movie catalogue and Firebase Authentication for accounts.',
    ],
    stack: ['React', 'Firebase', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    links: [
      live('Live demo', 'https://movie-app-client-seven.vercel.app/'),
      repo('Repository', 'https://github.com/anagarcia3174/movie-app'),
    ],
  },
  {
    id: 'folio',
    file: 'folio.md',
    name: 'Folio',
    when: 'FALL 2024',
    image: folioImg,
    about: 'Mobile app connecting service-based professionals with local clients.',
    bullets: [
      'Robust authentication, real-time messaging, and location-based portfolio discovery.',
      'Built as the UTRGV Computer Science senior project.',
    ],
    stack: ['Flutter', 'Firebase', 'Dart'],
    links: [repo('Repository', 'https://github.com/UTRGV-CSCI-Senior-Project/senior_final_project')],
  },
  {
    id: 'chasing',
    file: 'chasing-time.md',
    name: 'Chasing Time',
    when: 'SPRING 2024',
    image: chasingTimeImg,
    about: 'Endless runner game with procedural generation and object pooling.',
    bullets: [
      'Procedural level generation, optimized object pooling, and dynamic player animations.',
      'Awarded top 3 out of all games in the UTRGV Game Dev course, Spring 2024.',
    ],
    stack: ['C#', 'Unity'],
    links: [live('Play', 'https://play.unity.com/en/games/1ad98862-c125-4a72-91dc-cf366fe2f2d5/chasing-time')],
  },
];

export const SKILL_GROUPS = [
  { label: 'LANGUAGES', items: ['TypeScript', 'JavaScript', 'Go', 'SQL', 'Dart', 'HTML/CSS'] },
  { label: 'FRONTEND / MOBILE', items: ['React', 'React Native', 'Expo', 'TanStack Query', 'Flutter'] },
  { label: 'BACKEND', items: ['Go', 'chi', 'pgx/v5', 'sqlc', 'golang-migrate', 'Node.js', 'Express.js', 'REST APIs'] },
  { label: 'DATABASES & INFRA', items: ['PostgreSQL', 'Supabase', 'MongoDB', 'Firebase', 'Docker'] },
  { label: 'DEVELOPER TOOLS', items: ['Git', 'GitHub', 'TDD', 'Agile Methodology'] },
];

export const EXPERIENCE = [
  {
    org: 'NailzByDardo',
    when: 'AUG 2026 – PRESENT',
    role: 'Full-Stack Developer — Independent / Freelance',
    bullets: [
      'Owned the entire full-stack lifecycle solo — from schema design through a Go backend to a production React/TypeScript frontend — for a salon management system actively used to run a real business.',
      'Architected a strict layered backend (handler → service → repository) using Go, chi, pgx/v5, and sqlc, with versioned schema migrations via golang-migrate across an 8-table PostgreSQL schema.',
      'Built the frontend data layer with TanStack Query, centralizing cache invalidation logic across appointment, client, and financial data to keep UI state reliably in sync with the API.',
      'Designed a reusable layout/scroll architecture shared across all pages in React with CSS Modules, and modeled all financial data as integer cents to guarantee precise revenue, discount, and tip calculations.',
    ],
  },
  {
    org: 'University of Texas Rio Grande Valley',
    when: 'AUG – DEC 2024',
    role: 'Academic Assistant — Web Development Course',
    bullets: [
      'Reviewed and evaluated student web development assignments, assessing code quality and correctness.',
      'Provided written technical feedback identifying errors and guiding students toward correct solutions.',
    ],
  },
];

export const EDUCATION = [
  {
    org: 'University of Texas Rio Grande Valley',
    when: 'DECEMBER 2024',
    degree: 'B.S. Computer Science — GPA 3.96',
    notes: ['Summa Cum Laude', "President's List — Fall 2022 through Spring 2024"],
  },
  {
    org: 'South Texas College',
    when: 'AUGUST 2021',
    degree: 'A.A. Interdisciplinary Studies',
    notes: [],
  },
];

/*
 * The resume window mirrors src/assets/AnaGarciaResume.pdf section by section.
 * If you update the PDF, update this too.
 */
export const RESUME = {
  contact: [
    { label: '956-212-7174', href: 'tel:9562127174' },
    { label: 'anagarcia3174@gmail.com', href: 'mailto:anagarcia3174@gmail.com' },
    { label: 'linkedin.com/in/anagarcia17', href: 'https://www.linkedin.com/in/anagarcia17/' },
    { label: 'github.com/anagarcia3174', href: 'https://github.com/anagarcia3174' },
    { label: 'anagarcia.vercel.app', href: 'https://anagarcia.vercel.app' },
  ],
  education: [
    { org: 'University of Texas Rio Grande Valley', when: 'DECEMBER 2024', detail: 'Bachelor of Science in Computer Science — GPA: 3.96' },
    { org: 'South Texas College', when: 'AUGUST 2021', detail: 'Associate of Arts in Interdisciplinary Studies' },
  ],
  skills: [
    ['Languages', 'TypeScript, JavaScript, Go, SQL, Dart, HTML/CSS'],
    ['Frontend/Mobile', 'React, React Native, Expo, TanStack Query, Flutter'],
    ['Backend', 'Go, chi, pgx/v5, sqlc, golang-migrate, Node.js, Express.js, REST APIs'],
    ['Databases & Infra', 'PostgreSQL, Supabase, MongoDB, Firebase, Docker'],
    ['Developer Tools', 'Git, GitHub, TDD, Agile Methodology'],
  ],
  experience: [
    {
      ...EXPERIENCE[0],
      links: [
        { label: 'Backend Repository', href: 'https://github.com/anagarcia3174/nailzbydardo-backend' },
        { label: 'Frontend Repository', href: 'https://github.com/anagarcia3174/nailzbydardo-frontend' },
      ],
    },
    { ...EXPERIENCE[1], links: [] },
  ],
  projects: [
    {
      name: 'Talkie',
      tech: 'React Native / Expo, TypeScript, Supabase, NativeWind, Zustand',
      when: '2025 – PRESENT',
      summary: 'Social mobile app for tracking and reviewing movies and TV shows',
      bullets: [
        'Engineered a full-stack social mobile app with a PostgreSQL/Supabase backend and live TMDB API integration, supporting movie and TV tracking, review writing, and curated media lists.',
        'Secured user data end-to-end by implementing Apple Sign-In (OAuth), Supabase Auth, and row-level security (RLS) policies that enforce per-user data boundaries at the database layer.',
        'Architected a scalable service → Zustand store → component pattern across 10+ domain-scoped services with consistent error handling, keeping async operations predictable and maintainable.',
      ],
      links: [{ label: 'GitHub Repository', href: 'https://github.com/anagarcia3174/talkie' }],
    },
    {
      name: 'Express Backend Starter',
      tech: 'TypeScript, Node.js, Express.js, MongoDB, JWT, AWS SES',
      when: 'DECEMBER 2024',
      summary: 'Production-ready API boilerplate with authentication and email services',
      bullets: [
        'Eliminated auth boilerplate by implementing a production-ready JWT system with access/refresh token rotation, covering registration, login, logout, and token refresh out of the box.',
        'Reduced email integration effort by building a full AWS SES service with pre-configured EJS templates for verification, password reset, and account notifications.',
        'Hardened the API with rate limiting, input validation, CORS configuration, and a clean TypeScript service-layer architecture ready for immediate production use.',
      ],
      links: [{ label: 'GitHub Repository', href: 'https://github.com/anagarcia3174/express-backend-starter' }],
    },
  ],
};
