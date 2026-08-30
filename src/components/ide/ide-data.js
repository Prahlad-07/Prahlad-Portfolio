import { myProjects } from '../../constants/index.js';

export const FILES = [
    { id: 'readme', name: 'README.md', lang: 'Markdown', icon: 'md', crumb: ['portfolio', 'README.md'] },
    { id: 'about', name: 'about.jsx', lang: 'JavaScript JSX', icon: 'react', crumb: ['portfolio', 'src', 'about.jsx'] },
    { id: 'experience', name: 'experience.json', lang: 'JSON', icon: 'json', crumb: ['portfolio', 'src', 'experience.json'] },
    { id: 'skills', name: 'skills.json', lang: 'JSON', icon: 'json', crumb: ['portfolio', 'src', 'skills.json'] },
    { id: 'projects', name: 'projects.tsx', lang: 'TypeScript JSX', icon: 'ts', crumb: ['portfolio', 'src', 'projects', 'index.tsx'] },
    { id: 'recommendations', name: 'recommendations.md', lang: 'Markdown', icon: 'md', crumb: ['portfolio', 'recommendations.md'] },
    { id: 'contact', name: 'contact.ts', lang: 'TypeScript', icon: 'ts', crumb: ['portfolio', 'src', 'contact.ts'] },
];

const EXT_ICON = { tsx: 'ts', kt: 'json', dart: 'react' };

export const PROJECT_FILES = myProjects.map((p, index) => {
    const ext = p.tags[0]?.name?.toLowerCase().includes('kotlin')
        ? 'kt'
        : p.tags[0]?.name?.toLowerCase().includes('flutter')
            ? 'dart'
            : 'tsx';
    return {
        id: `project-${index}`,
        projectIndex: index,
        name: `${p.title.replace(/[^A-Za-z0-9]/g, '')}.${ext}`,
        icon: EXT_ICON[ext] || 'ts',
    };
});

export const fileById = (id) => FILES.find((f) => f.id === id);
