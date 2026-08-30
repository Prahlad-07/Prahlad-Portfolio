/* eslint-disable react/prop-types */
/* Minimal icon set (stroke-based, inherits currentColor). */
export const IconFiles = () => (
    <svg viewBox="0 0 24 24"><path d="M4 4h9l3 3v13H4z" /><path d="M13 4v4h4" /><path d="M7 12h7M7 16h7" /></svg>
);
export const IconSearch = () => (
    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></svg>
);
export const IconGit = () => (
    <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="9" r="2.4" /><path d="M6 8.4v7.2M8.3 7.4 15.7 8M8 18h5a3 3 0 0 0 3-3v-3.5" /></svg>
);
export const IconRun = () => (
    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M4 4v16" /></svg>
);
export const IconExt = () => (
    <svg viewBox="0 0 24 24"><path d="M4 4h7v7H4z" /><path d="M13 13h7v7h-7z" /><path d="M20 8.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" /></svg>
);
export const IconGear = () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M5 5l1.8 1.8M17.2 17.2 19 19M3 12h2.5M18.5 12H21M5 19l1.8-1.8M17.2 6.8 19 5" /></svg>
);
export const IconAccount = () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.5" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>
);
export const IconChevron = ({ open }) => (
    <span className="tree_twisty" aria-hidden="true">{open ? '▾' : '▸'}</span>
);
export const IconClose = () => <span aria-hidden="true">✕</span>;
export const IconSync = () => (
    <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" /></svg>
);
export const IconErr = () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></svg>
);
export const IconWarn = () => (
    <svg viewBox="0 0 24 24"><path d="M12 4 3 19h18z" /><path d="M12 10v4M12 17h.01" /></svg>
);
export const IconBell = () => (
    <svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);
export const IconTerminal = () => (
    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></svg>
);
export const IconPlay = () => (
    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);
export const IconExternal = () => (
    <svg viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-8 8M12 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" /></svg>
);
export const IconCopy = () => (
    <svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
);
export const IconSend = () => (
    <svg viewBox="0 0 24 24"><path d="m4 12 16-7-7 16-2-7z" /></svg>
);
