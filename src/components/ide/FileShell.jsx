/* eslint-disable react/prop-types */
import { fileById } from './ide-data.js';

const FileShell = ({ id, children }) => {
    const f = fileById(id);
    return (
        <section className="file" id={`file-${id}`} aria-label={f?.name}>
            <div className="file_crumbs">
                {f?.crumb.map((c, i) => (
                    <span
                        key={i}
                        className={i === f.crumb.length - 1 ? 'file_crumbLeaf' : undefined}
                    >
                        {c}
                    </span>
                ))}
            </div>
            {children}
        </section>
    );
};

export default FileShell;
