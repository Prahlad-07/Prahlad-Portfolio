/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWorkspace } from './WorkspaceContext.jsx';
import { COMMAND_NAMES } from './terminal-commands.js';
import { FILES } from '../../content/files.js';
import { highlight } from './highlight.js';
import CodeBlock from './CodeBlock.jsx';
import { IconChevron, IconTerminal } from './icons.jsx';

const FILE_NAMES = FILES.map((f) => f.name).concat(FILES.map((f) => f.id));
const FILE_CMDS = new Set(['open', 'o', 'cd', 'cat', 'less', 'bat']);

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

const Terminal = ({ variant = 'docked' }) => {
    const { terminalLines, runCommand, terminalOpen, toggleTerminal, clearTerminal } = useWorkspace();
    const [value, setValue] = useState('');
    const [history, setHistory] = useState([]);
    const [hIdx, setHIdx] = useState(-1);
    const bodyRef = useRef(null);
    const inputRef = useRef(null);

    const collapsed = variant === 'docked' && !terminalOpen;

    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [terminalLines, terminalOpen]);

    const submit = (e) => {
        e.preventDefault();
        const v = value.trim();
        if (v) {
            setHistory((h) => [v, ...h].slice(0, 50));
            runCommand(v);
        }
        setValue('');
        setHIdx(-1);
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const next = Math.min(hIdx + 1, history.length - 1);
            if (history[next] !== undefined) {
                setHIdx(next);
                setValue(history[next]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = hIdx - 1;
            setHIdx(next);
            setValue(next < 0 ? '' : history[next] ?? '');
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const parts = value.split(/\s+/);
            if (parts.length <= 1) {
                const hit = COMMAND_NAMES.find((c) => c.startsWith(parts[0]));
                if (hit) setValue(`${hit} `);
            } else if (FILE_CMDS.has(parts[0])) {
                const frag = parts[parts.length - 1];
                const hit = FILE_NAMES.find((n) => n.startsWith(frag));
                if (hit) setValue(`${parts[0]} ${hit}`);
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            clearTerminal();
        }
    };

    const promptFocus = () => inputRef.current?.focus();
    const idle = useMemo(() => terminalLines.length <= 1, [terminalLines]);

    return (
        <section className={`term term--${variant} ${collapsed ? 'is-collapsed' : ''}`} aria-label="Terminal">
            <div className="term_head">
                <button
                    type="button"
                    className="term_headBtn"
                    onClick={variant === 'docked' ? toggleTerminal : undefined}
                >
                    <IconTerminal />
                    <span>TERMINAL</span>
                    {variant === 'docked' && (
                        <span className={`term_chev ${terminalOpen ? 'is-open' : ''}`}>
                            <IconChevron open={terminalOpen} />
                        </span>
                    )}
                </button>
                {!collapsed && (
                    <button type="button" className="term_clear" onClick={clearTerminal}>
                        clear
                    </button>
                )}
            </div>

            {!collapsed && (
                <>
                    <div className="term_body" ref={bodyRef} onClick={promptFocus} role="presentation">
                        {terminalLines.map((entry) => (
                            <Line key={entry.id ?? entry.text} entry={entry} />
                        ))}
                        {idle && (
                            <p className="term_line term_line--muted">
                                try: <span className="term_kbd">help</span>{' '}
                                <span className="term_kbd">ls</span>{' '}
                                <span className="term_kbd">open projects</span>{' '}
                                <span className="term_kbd">resume</span>
                            </p>
                        )}
                    </div>
                    <form className="term_input" onSubmit={submit}>
                        <span className="term_prompt">❯</span>
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="type a command…"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            aria-label="Terminal input"
                        />
                    </form>
                </>
            )}
        </section>
    );
};

export default Terminal;
