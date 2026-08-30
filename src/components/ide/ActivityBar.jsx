import useTheme from '../../hooks/useTheme.js';
import { personalInfo } from '../../constants/index.js';
import { useIDE } from './IDEContext.jsx';
import {
    IconAccount,
    IconExt,
    IconFiles,
    IconGear,
    IconGit,
    IconRun,
    IconSearch,
} from './icons.jsx';

const ActivityBar = () => {
    const { toggleSidebar, sidebarOpen, setPaletteOpen, openFile } = useIDE();
    const { toggleTheme } = useTheme();

    return (
        <nav className="activitybar" aria-label="Activity Bar">
            <button
                type="button"
                className={`activitybar_btn ${sidebarOpen ? 'is-active' : ''}`}
                onClick={toggleSidebar}
                title="Explorer (⌘B)"
                aria-label="Explorer"
            >
                <IconFiles />
            </button>
            <button
                type="button"
                className="activitybar_btn"
                onClick={() => setPaletteOpen(true)}
                title="Go to file (⌘K)"
                aria-label="Go to file"
            >
                <IconSearch />
            </button>
            <a
                className="activitybar_btn"
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                title="Source Control — GitHub"
                aria-label="Source Control"
            >
                <IconGit />
            </a>
            <button
                type="button"
                className="activitybar_btn"
                onClick={() => openFile('experience')}
                title="Run — experience.json"
                aria-label="Run and Debug"
            >
                <IconRun />
            </button>
            <button
                type="button"
                className="activitybar_btn"
                onClick={() => openFile('skills')}
                title="Extensions — skills.json"
                aria-label="Extensions"
            >
                <IconExt />
            </button>

            <span className="activitybar_spacer" />

            <button
                type="button"
                className="activitybar_btn"
                onClick={toggleTheme}
                title="Toggle theme (Light+ / Dark+)"
                aria-label="Toggle color theme"
            >
                <IconGear />
            </button>
            <a
                className="activitybar_btn"
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Account — LinkedIn"
                aria-label="Account"
            >
                <IconAccount />
            </a>
        </nav>
    );
};

export default ActivityBar;
