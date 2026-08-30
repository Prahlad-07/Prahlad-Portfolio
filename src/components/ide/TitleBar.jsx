/* eslint-disable react/prop-types */
import useTheme from '../../hooks/useTheme.js';
import { personalInfo } from '../../constants/index.js';
import { useWorkspace } from './WorkspaceContext.jsx';
import { fileById } from '../../content/files.js';
import { IconExternal, IconGit, IconMoon, IconSun } from './icons.jsx';

const TitleBar = ({ compact = false }) => {
    const { activeFile, files, openFile } = useWorkspace();
    const { theme, toggleTheme } = useTheme();
    const f = fileById(activeFile);

    return (
        <header className="titlebar">
            <span className="traffic" aria-hidden="true">
                <i />
                <i />
                <i />
            </span>

            {compact ? (
                <label className="titlebar_select">
                    <span className="visually-hidden">Open file</span>
                    <select value={activeFile} onChange={(e) => openFile(e.target.value)}>
                        {files.map((x) => (
                            <option key={x.id} value={x.id}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </label>
            ) : (
                <span className="titlebar_path">
                    ~/prahlad — <b>{f?.name}</b>
                </span>
            )}

            <span className="titlebar_spacer" />

            <a
                className="titlebar_btn"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <IconExternal /> résumé
            </a>
            <a
                className="titlebar_btn"
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
            >
                <IconGit />
            </a>
            <button type="button" className="titlebar_btn titlebar_btn--icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
        </header>
    );
};

export default TitleBar;
