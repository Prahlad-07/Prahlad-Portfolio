import useTheme from '../../hooks/useTheme.js';
import { personalInfo } from '../../constants/index.js';
import { useIDE } from './IDEContext.jsx';
import { fileById } from './ide-data.js';
import { IconBell, IconErr, IconGit, IconSync, IconWarn } from './icons.jsx';

const StatusBar = () => {
    const { activeFile, cursor, setPaletteOpen } = useIDE();
    const { theme, toggleTheme } = useTheme();
    const f = fileById(activeFile);

    return (
        <footer className="statusbar" aria-label="Status Bar">
            <a
                className="statusbar_item"
                href={`${personalInfo.socialLinks.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <IconGit />
                <span>main</span>
                <IconSync />
            </a>
            <span className="statusbar_item statusbar_hideSmall">
                <IconErr />
                <span>0</span>
                <IconWarn />
                <span>0</span>
            </span>
            <a className="statusbar_item" href={`mailto:${personalInfo.email}`}>
                <span className="statusbar_dot" aria-hidden="true" />
                <span>Open to work</span>
            </a>

            <span className="statusbar_spacer" />

            <button type="button" className="statusbar_item statusbar_hideSmall" onClick={() => setPaletteOpen(true)}>
                Ln {cursor.line}, Col {cursor.col}
            </button>
            <span className="statusbar_item statusbar_hideSmall">Spaces: 2</span>
            <span className="statusbar_item statusbar_hideSmall">UTF-8</span>
            <span className="statusbar_item">{f?.lang ?? 'Plain Text'}</span>
            <button type="button" className="statusbar_item" onClick={toggleTheme} title="Toggle theme">
                {theme === 'dark' ? 'Dark+' : 'Light+'}
            </button>
            <span className="statusbar_item">
                <IconBell />
            </span>
        </footer>
    );
};

export default StatusBar;
