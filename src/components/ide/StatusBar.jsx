import useTheme from '../../hooks/useTheme.js';
import { personalInfo } from '../../constants/index.js';
import { useWorkspace } from './WorkspaceContext.jsx';
import { fileById } from '../../content/files.js';
import { IconGit } from './icons.jsx';

const LANG = { ts: 'TypeScript', jsx: 'JavaScript JSX', json: 'JSON', md: 'Markdown' };

const StatusBar = () => {
    const { activeFile } = useWorkspace();
    const { theme, toggleTheme } = useTheme();
    const f = fileById(activeFile);

    return (
        <footer className="statusbar">
            <a className="statusbar_item" href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <IconGit /> main
            </a>
            <a className="statusbar_item" href={`mailto:${personalInfo.email}`}>
                <span className="statusbar_dot" aria-hidden="true" /> open to work
            </a>
            <span className="statusbar_spacer" />
            <span className="statusbar_item statusbar_item--hide">{f?.name}</span>
            <span className="statusbar_item">{LANG[f?.lang] ?? 'Plain Text'}</span>
            <button type="button" className="statusbar_item" onClick={toggleTheme}>
                {theme === 'dark' ? 'Dark+' : 'Light+'}
            </button>
        </footer>
    );
};

export default StatusBar;
