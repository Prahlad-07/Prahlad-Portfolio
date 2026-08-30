/* eslint-disable react/prop-types */
import { useIDE } from './IDEContext.jsx';
import { fileById } from './ide-data.js';

const TabIcon = ({ icon }) => {
    const glyph = { md: 'M↓', json: '{ }', react: '⚛', ts: 'TS' }[icon] ?? '·';
    return <span className={`tree_icon i-${icon}`} aria-hidden="true">{glyph}</span>;
};

const Tabs = () => {
    const { openTabs, activeFile, setActiveFile, openFile, closeTab } = useIDE();

    return (
        <div className="tabs" role="tablist">
            {openTabs.map((id) => {
                const f = fileById(id);
                if (!f) return null;
                const isActive = id === activeFile;
                return (
                    <div
                        key={id}
                        role="tab"
                        aria-selected={isActive}
                        className={`tab ${isActive ? 'is-active' : ''}`}
                        onClick={() => {
                            setActiveFile(id);
                            openFile(id);
                        }}
                    >
                        <TabIcon icon={f.icon} />
                        <span>{f.name}</span>
                        <button
                            type="button"
                            className="tab_close"
                            aria-label={`Close ${f.name}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(id);
                            }}
                        >
                            ✕
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Tabs;
