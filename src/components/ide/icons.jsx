/* eslint-disable react/prop-types */
const S = ({ children, ...p }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
        {children}
    </svg>
);

export const IconFile = () => <S><path d="M13 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9z" /><path d="M13 3v6h6" /></S>;
export const IconChevron = ({ open }) => <S style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}><path d="m9 6 6 6-6 6" /></S>;
export const IconClose = () => <S><path d="m6 6 12 12M18 6 6 18" /></S>;
export const IconTerminal = () => <S><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></S>;
export const IconPlay = () => <S><path d="M8 5v14l11-7z" /></S>;
export const IconRefresh = () => <S><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" /></S>;
export const IconExternal = () => <S><path d="M14 5h5v5M19 5l-9 9M12 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" /></S>;
export const IconCopy = () => <S><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></S>;
export const IconCheck = () => <S><path d="m5 13 4 4L19 7" /></S>;
export const IconSend = () => <S><path d="m4 12 16-7-7 16-2-7z" /></S>;
export const IconGit = () => <S><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="9" r="2.2" /><path d="M6 8.2v7.6M8.2 7.3 15.6 8.4M8 18h5a3 3 0 0 0 3-3v-3.4" /></S>;
export const IconSun = () => <S><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></S>;
export const IconMoon = () => <S><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" /></S>;
export const IconMenu = () => <S><path d="M4 7h16M4 12h16M4 17h16" /></S>;
export const IconGrip = () => <S strokeWidth="2"><path d="M8 10h8M8 14h8" /></S>;
export const IconArrow = () => <S><path d="M5 12h14M13 6l6 6-6 6" /></S>;
