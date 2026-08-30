// Single source of truth for every "file" in the workspace.
// `source` is the literal code shown in the editor / printed by `cat` / peeked on mobile.

export const FILES = [
    {
        id: 'hello',
        name: 'hello.ts',
        lang: 'ts',
        icon: 'ts',
        meta: 'start here',
        source: `/**
 * Prahlad Yadav — Full-Stack Engineer
 * Delhi, India · open to full-time SDE roles
 */

const me = {
  now:       "SDE @ Newton School",
  strongest: ["backend", "APIs", "system design"],
  alsoShips: ["React", "Kotlin", "Flutter"],
  proof:     "3000+ competitive-programming problems",
};

console.log("I build fast backends, solve hard problems, ship clean code.");

export default me;`,
    },
    {
        id: 'about',
        name: 'about.ts',
        lang: 'ts',
        icon: 'ts',
        meta: 'the substance',
        source: `// about.ts

export const about = {
  currently:   "Newton School — building runtime & platform systems",
  education:   "B.Tech IT · GEC Bilaspur · 2022–2026 · CGPA 8.1",
  learnedFrom: "3000+ DSA problems — how to stay calm under pressure",

  howIWork: [
    "ship fast — no over-engineering",
    "readable, documented code anyone can pick up",
    "measure first, then optimize",
  ],
};

// full history → open("experience.ts")`,
    },
    {
        id: 'experience',
        name: 'experience.ts',
        lang: 'ts',
        icon: 'ts',
        meta: '4 roles',
        source: `// experience.ts

type Role = {
  at: string;
  title: string;
  when: string;
  did: string[];   // click a card in the output to expand
};

export const experience: Role[] = [
  { at: "Newton School",  title: "SDE I",          when: "Jun 2026 — now",      did: 3 },
  { at: "Newton School",  title: "SDE Intern",     when: "Dec 2025 — May 2026", did: 3 },
  { at: "MIDAS Lab",      title: "SDE Intern",     when: "Jul 2024 — Sep 2024", did: 3 },
  { at: "TechCurators",   title: "Problem Setter", when: "May 2024 — Jul 2024", did: 2 },
];`,
    },
    {
        id: 'projects',
        name: 'projects.jsx',
        lang: 'jsx',
        icon: 'react',
        meta: '6 projects',
        source: `// projects.jsx

const projects = [
  { name: "BookMySalon",   stack: ["Java", "Spring Boot", "React", "MySQL"], status: "live" },
  { name: "GEC-B App",     stack: ["Kotlin", "Compose", "Firebase"],         status: "live" },
  { name: "Structify",     stack: ["Spring Boot", "React", "Docker"],        status: "live" },
  { name: "CodeSiksha",    stack: ["Flutter", "Firebase", "BLoC"],           status: "live" },
  { name: "Bg-Removal AI", stack: ["Spring Boot", "React", "Razorpay"],      status: "beta" },
  { name: "Netflix Clone", stack: ["React", "Firebase", "TMDB API"],         status: "demo" },
];

export function Projects() {
  // pick one from the list in the output pane →
  return projects.map((p) => <ProjectCard key={p.name} {...p} />);
}`,
    },
    {
        id: 'skills',
        name: 'skills.json',
        lang: 'json',
        icon: 'json',
        meta: 'the stack',
        // rendered from constants at runtime — see SkillsPreview / cat handler
    },
    {
        id: 'recommendations',
        name: 'recommendations.md',
        lang: 'md',
        icon: 'md',
        meta: '5 people',
        source: `# recommendations

> from mentors, leads, and teammates I've built and shipped with

## Satyendra Yadav — Principal TPM, Perforce
> Moves from concept to reliable implementation quickly. Disciplined
> enough for production-oriented teams.

## Dr. Rajiv Ratn Shah — Founder, MIDAS
> Delivered with ownership. Maturity beyond his experience level.

## Bhavya Garg — SDE, Newton School (mentor)
> Punctual, accountable, coachable. Serious and reliable on delivery.

// full quotes in the output pane →`,
    },
    {
        id: 'contact',
        name: 'contact.ts',
        lang: 'ts',
        icon: 'ts',
        meta: "let's talk",
        source: `// contact.ts

export const contact = {
  email:    "prahlad.yadav.off@gmail.com",
  location: "Delhi, India",
  github:   "github.com/Prahlad-07",
  linkedin: "linkedin.com/in/prahlad-yadav-07",
  status:   "open to full-time SDE roles",
};

export async function sendMessage(msg: Message): Promise<void> {
  // the form in the output pane actually works — try it
}`,
    },
];

export const fileById = (id) => FILES.find((f) => f.id === id);
export const firstFileId = FILES[0].id;
