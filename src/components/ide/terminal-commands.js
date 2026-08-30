import { personalInfo } from '../../constants/index.js';
import { getSource } from '../../content/source.js';

const out = (text) => ({ kind: 'out', text });
const muted = (text) => ({ kind: 'muted', text });
const err = (text) => ({ kind: 'err', text });

const openUrl = (url) => {
    if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener');
};

const HELP = [
    ['ls', 'list the files in this workspace'],
    ['open <file>', 'open a file  (alias: o, cd)'],
    ['cat <file>', 'print a file to the terminal'],
    ['resume', 'open my resume (PDF)'],
    ['email', 'start an email to me'],
    ['gh · in · ig', 'open GitHub · LinkedIn · Instagram'],
    ['theme [dark|light]', 'switch the color theme'],
    ['whoami · date · echo', 'the usual'],
    ['clear', 'clear the terminal'],
];

export function runCommand(input, ctx) {
    if (!input) return [];
    const [cmd, ...rest] = input.split(/\s+/);
    const arg = rest.join(' ');
    const files = ctx.files;
    const resolve = (name) => {
        if (!name) return null;
        const n = name.replace(/^\.?\//, '').toLowerCase();
        return files.find((f) => f.id === n || f.name.toLowerCase() === n || f.name.toLowerCase().startsWith(n));
    };

    switch (cmd) {
        case 'help':
        case 'man':
        case '?':
            return [
                muted('commands:'),
                ...HELP.map(([c, d]) => out(`  ${c.padEnd(20)} ${d}`)),
            ];

        case 'ls':
        case 'll':
        case 'dir': {
            const long = /-l|-a|-la|-al/.test(arg) || cmd === 'll';
            return files.map((f) =>
                long ? out(`  ${f.name.padEnd(22)} ${f.meta}`) : out(`  ${f.name}`),
            );
        }

        case 'open':
        case 'o':
        case 'cd': {
            if (arg === '..' || arg === '~' || arg === '/') return [muted('~/prahlad/portfolio')];
            const f = resolve(arg);
            if (!f) return [err(`open: no such file: ${arg || '(nothing)'}`)];
            ctx.openFile(f.id);
            return [muted(`→ ${f.name}`)];
        }

        case 'cat':
        case 'less':
        case 'bat': {
            const f = resolve(arg);
            if (!f) return [err(`cat: no such file: ${arg || '(nothing)'}`)];
            return [{ kind: 'code', lang: f.lang, source: getSource(f.id) }];
        }

        case 'pwd':
            return [out('~/prahlad/portfolio')];

        case 'whoami':
            return [out('prahlad — backend-first engineer · open to full-time SDE roles')];

        case 'date':
            return [out(new Date().toString())];

        case 'echo':
            return [out(arg)];

        case 'resume':
        case 'cv':
            openUrl(personalInfo.resumeUrl);
            return [muted('opening resume.pdf …')];

        case 'email':
        case 'mail':
            if (typeof window !== 'undefined') window.location.href = `mailto:${personalInfo.email}`;
            return [muted(`drafting an email to ${personalInfo.email} …`)];

        case 'gh':
        case 'github':
            openUrl(personalInfo.socialLinks.github);
            return [muted('opening github.com/Prahlad-07 …')];

        case 'in':
        case 'linkedin':
            openUrl(personalInfo.socialLinks.linkedin);
            return [muted('opening linkedin …')];

        case 'ig':
        case 'instagram':
            openUrl(personalInfo.socialLinks.instagram);
            return [muted('opening instagram …')];

        case 'theme': {
            const t = arg === 'dark' || arg === 'light' ? arg : ctx.theme === 'dark' ? 'light' : 'dark';
            ctx.setTheme(t);
            return [muted(`theme → ${t}+`)];
        }

        case 'clear':
        case 'cls':
            ctx.clearTerminal();
            return [];

        case 'sudo':
            return [err('we trust you have received the usual lecture. permission denied.')];
        case 'rm':
            return [out('nice try. everything here is version controlled anyway.')];
        case 'exit':
        case 'quit':
        case ':q':
            return [out('there is no exit — just scroll.')];
        case 'vim':
        case 'nano':
            return [out(`you're already in an editor. it's this whole page.`)];
        case 'npm':
            return [muted(arg.includes('hire') ? 'added 1 package: prahlad@available' : 'nothing to install here.')];

        default:
            return [err(`command not found: ${cmd} — try 'help'`)];
    }
}

export const COMMAND_NAMES = [
    'help', 'ls', 'open', 'cat', 'resume', 'email', 'gh', 'in', 'ig',
    'theme', 'whoami', 'date', 'echo', 'clear', 'pwd',
];
