/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useWorkspace } from './WorkspaceContext.jsx';
import { COMMAND_NAMES } from './terminal-commands.js';
import { FILES } from '../../content/files.js';
import { highlight } from './highlight.js';
import CodeBlock from './CodeBlock.jsx';
import { IconClose, IconTerminal } from './icons.jsx';

const FILE_NAMES = FILES.map((f) => f.name).concat(FILES.map((f) => f.id));
const FILE_CMDS = new Set(['open', 'o', 'cd', 'cat', 'less']);

const Line = ({ entry }) => {
    if (entry.kind === 'code') {
        return (
            <div className="term_code">
                <CodeBlock lines={highlight(entry.source, entry.lang)} gutter={false} />
            </div>
        );
    }
    if (entry.kind === 'cmd') {
        return (
            <p className="term_line term_line--cmd">
                <span className="term_prompt">❯</span> {entry.text}
            </p>
        );
    }
    return <p className={`term_line term_line--${entry.kind}`}>{entry.text}</p>;
};

const MobileTerminal = () => {
    const { terminalLines, runCommand, clearTerminal } = useWorkspace();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [history, setHistory] = useState([]);
    const bodyRef = useRef(null);

    useEffect(() => {
        if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [terminalLines, open]);

    const submit = (e) => {
        e.preventDefault();
        const v = value.trim();
        if (v) {
            setHistory((h) => [v, ...h].slice(0, 30));
            runCommand(v);
            setOpen(true);
        }
        setValue('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowUp' && history[0]) {
            e.preventDefault();
            setValue(history[0]);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const parts = value.split(/\s+/);
            if (parts.length <= 1) {
                const hit = COMMAND_NAMES.find((c) => c.startsWith(parts[0]));
                if (hit) setValue(`${hit} `);
            } else if (FILE_CMDS.has(parts[0])) {
                const hit = FILE_NAMES.find((n) => n.startsWith(parts[parts.length - 1]));
                if (hit) setValue(`${parts[0]} ${hit}`);
            }
        }
    };

    return (
        <>
            {open && (
                <div className="msheet" role="dialog" aria-label="Terminal">
                    <div className="msheet_head">
                        <span>
                            <IconTerminal /> TERMINAL
                        </span>
                        <button type="button" onClick={clearTerminal}>clear</button>
                        <button type="button" onClick={() => setOpen(false)} aria-label="Close terminal">
                            <IconClose />
                        </button>
                    </div>
                    <div className="msheet_body" ref={bodyRef}>
                        {terminalLines.map((entry) => (
                            <Line key={entry.id ?? entry.text} entry={entry} />
                        ))}
                    </div>
                    <form className="msheet_input" onSubmit={submit}>
                        <span className="term_prompt">❯</span>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="command…"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            autoFocus
                            aria-label="Terminal input"
                        />
                    </form>
                </div>
            )}

            <form className="mbar" onSubmit={submit}>
                <span className="term_prompt">❯</span>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => setOpen(true)}
                    placeholder="type a command — try `open projects`"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-label="Terminal input"
                />
            </form>
        </>
    );
};

export default MobileTerminal;
