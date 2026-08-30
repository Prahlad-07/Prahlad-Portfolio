import { fileById } from './files.js';
import { codingProfiles, skillGroups } from '../constants/index.js';
import { formatJSON } from '../components/ide/highlight.js';

export function skillsJSON() {
    return {
        strongest: 'Backend & APIs',
        ...Object.fromEntries(
            skillGroups.map((g) => [g.title.replace(/\s*&\s*|\s+/g, '_').toLowerCase(), g.items]),
        ),
        profiles: Object.fromEntries(codingProfiles.map((p) => [p.platform, p.badge])),
    };
}

export function getSource(id) {
    const f = fileById(id);
    if (!f) return '';
    if (id === 'skills') return formatJSON(skillsJSON());
    return f.source || '';
}
