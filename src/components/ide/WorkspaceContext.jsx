/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useTheme from '../../hooks/useTheme.js';
import { FILES, fileById, firstFileId } from '../../content/files.js';
import { runCommand as execCommand } from './terminal-commands.js';

const Ctx = createContext(null);
export const useWorkspace = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error('useWorkspace must be inside <WorkspaceProvider>');
    return v;
};

const WELCOME = [
    { kind: 'out', text: "prahlad-portfolio — type 'help' for commands, or just read on." },
];

let uid = 0;

export const WorkspaceProvider = ({ children }) => {
    const { theme, setTheme, toggleTheme } = useTheme();
    const [activeFile, setActiveFile] = useState(firstFileId);
    const [terminalOpen, setTerminalOpen] = useState(true);
    const [expandedCard, setExpandedCard] = useState(firstFileId);
    const [lines, setLines] = useState(WELCOME);
    const openHandlers = useRef(new Set());

    const push = useCallback((entries) => {
        setLines((cur) => [...cur, ...entries.map((e) => ({ id: (uid += 1), ...e }))]);
    }, []);

    const clearTerminal = useCallback(() => setLines([]), []);

    const openFile = useCallback((id, { fromTerminal } = {}) => {
        if (!fileById(id)) return;
        setActiveFile(id);
        setExpandedCard(id);
        openHandlers.current.forEach((fn) => fn(id));
        if (!fromTerminal) return;
    }, []);

    const registerOpenHandler = useCallback((fn) => {
        openHandlers.current.add(fn);
        return () => openHandlers.current.delete(fn);
    }, []);

    const runCommand = useCallback(
        (raw) => {
            const input = raw.trim();
            push([{ kind: 'cmd', text: input }]);
            const result = execCommand(input, {
                files: FILES,
                openFile: (id) => openFile(id, { fromTerminal: true }),
                clearTerminal,
                theme,
                setTheme,
                toggleTheme,
            });
            if (result && result.length) push(result);
        },
        [push, openFile, clearTerminal, theme, setTheme, toggleTheme],
    );

    const value = useMemo(
        () => ({
            files: FILES,
            activeFile,
            openFile,
            registerOpenHandler,
            terminalOpen,
            toggleTerminal: () => setTerminalOpen((v) => !v),
            setTerminalOpen,
            expandedCard,
            setExpandedCard,
            terminalLines: lines,
            runCommand,
            clearTerminal,
            theme,
        }),
        [activeFile, openFile, registerOpenHandler, terminalOpen, expandedCard, lines, runCommand, clearTerminal, theme],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

WorkspaceProvider.propTypes = { children: PropTypes.node };
