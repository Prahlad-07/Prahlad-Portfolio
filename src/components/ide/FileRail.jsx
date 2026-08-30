import { useWorkspace } from './WorkspaceContext.jsx';
import FileGlyph from './FileGlyph.jsx';

const FileRail = () => {
    const { files, activeFile, openFile } = useWorkspace();
    return (
        <nav className="rail" aria-label="Files">
            <p className="rail_head">Explorer</p>
            <ul className="rail_list">
                {files.map((f) => (
                    <li key={f.id}>
                        <button
                            type="button"
                            className={`rail_item ${activeFile === f.id ? 'is-active' : ''}`}
                            onClick={() => openFile(f.id)}
                            aria-current={activeFile === f.id ? 'true' : undefined}
                        >
                            <FileGlyph icon={f.icon} />
                            <span className="rail_name">{f.name}</span>
                            <span className="rail_meta">{f.meta}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <p className="rail_hint">
                <span className="kbd">tab</span> in the terminal to autocomplete
            </p>
        </nav>
    );
};

export default FileRail;
