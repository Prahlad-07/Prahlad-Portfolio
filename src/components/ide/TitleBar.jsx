import { useIDE } from './IDEContext.jsx';
import { fileById } from './ide-data.js';

const TitleBar = () => {
    const { activeFile, toggleSidebar } = useIDE();
    const f = fileById(activeFile);

    return (
        <div className="titlebar">
            <div className="titlebar_traffic" aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
            <div className="titlebar_menu">
                <button type="button" onClick={toggleSidebar} title="Toggle sidebar (⌘B)">
                    Explorer
                </button>
                <button
                    type="button"
                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                    title="Command palette (⌘K)"
                >
                    Go
                </button>
            </div>
            <div className="titlebar_title">
                {f ? `${f.name} — ` : ''}Prahlad Yadav · portfolio
            </div>
        </div>
    );
};

export default TitleBar;
