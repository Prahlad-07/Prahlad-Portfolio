/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useWorkspace } from './WorkspaceContext.jsx';
import { fileById } from '../../content/files.js';
import { getSource } from '../../content/source.js';
import { highlight } from './highlight.js';
import CodeBlock from './CodeBlock.jsx';
import useTypewriter from './useTypewriter.js';

const EditorPane = ({ hidden = false }) => {
    const { activeFile } = useWorkspace();
    const f = fileById(activeFile);
    const source = useMemo(() => getSource(activeFile), [activeFile]);
    const lines = useMemo(() => highlight(source, f?.lang), [source, f]);

    // type only the landing file; the rest reveal fast
    const { chars, done, skip } = useTypewriter(activeFile, source.length, true);

    return (
        <section className={`editor ${hidden ? 'is-hidden' : ''}`} aria-label={`${f?.name} source`}>
            <div className="pane_head">
                <span className="pane_crumbs">
                    ~/prahlad<span className="pane_sep">/</span>
                    <b>{f?.name}</b>
                </span>
                {!done && (
                    <button type="button" className="pane_skip" onClick={skip}>
                        skip ⏎
                    </button>
                )}
            </div>
            <div className="editor_scroll" onClick={skip} role="presentation">
                <CodeBlock lines={lines} visibleChars={done ? null : chars} caret />
            </div>
        </section>
    );
};

export default EditorPane;
