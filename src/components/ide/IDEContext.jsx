/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FILES } from './ide-data.js';

const IDEContext = createContext(null);

export const useIDE = () => {
    const ctx = useContext(IDEContext);
    if (!ctx) throw new Error('useIDE must be used inside <IDEProvider>');
    return ctx;
};

const LINE_HEIGHT = 22;

export const IDEProvider = ({ children }) => {
    const [openTabs, setOpenTabs] = useState(['readme', 'about', 'experience', 'projects']);
    const [activeFile, setActiveFile] = useState('readme');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [projectIndex, setProjectIndex] = useState(0);
    const [cursor, setCursor] = useState({ line: 1, col: 1 });

    const scrollRef = useRef(null);
    const suppressSpy = useRef(false);
    const isSmall = typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches;

    useEffect(() => {
        if (isSmall) setSidebarOpen(false);
    }, [isSmall]);

    const scrollToFile = useCallback((id) => {
        const el = document.getElementById(`file-${id}`);
        const scroller = scrollRef.current;
        if (!el || !scroller) return;
        suppressSpy.current = true;
        const top = el.offsetTop - 2;
        scroller.scrollTo({ top, behavior: 'smooth' });
        window.setTimeout(() => {
            suppressSpy.current = false;
        }, 700);
    }, []);

    const openFile = useCallback(
        (id, opts = {}) => {
            setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
            setActiveFile(id);
            if (typeof opts.projectIndex === 'number') setProjectIndex(opts.projectIndex);
            scrollToFile(id);
            if (isSmall) setSidebarOpen(false);
        },
        [scrollToFile, isSmall],
    );

    const closeTab = useCallback(
        (id) => {
            setOpenTabs((tabs) => {
                const next = tabs.filter((t) => t !== id);
                if (id === activeFile && next.length) {
                    const fallback = next[Math.max(0, tabs.indexOf(id) - 1)];
                    setActiveFile(fallback);
                    scrollToFile(fallback);
                }
                return next.length ? next : tabs;
            });
        },
        [activeFile, scrollToFile],
    );

    // Scroll-spy: update active file + fake cursor position
    useEffect(() => {
        const scroller = scrollRef.current;
        if (!scroller) return undefined;

        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                setCursor({
                    line: Math.max(1, Math.round(scroller.scrollTop / LINE_HEIGHT) + 1),
                    col: 1,
                });
                if (suppressSpy.current) return;
                const probe = scroller.scrollTop + 110;
                let current = FILES[0].id;
                for (const f of FILES) {
                    const el = document.getElementById(`file-${f.id}`);
                    if (el && el.offsetTop <= probe) current = f.id;
                }
                setActiveFile((prev) => {
                    if (prev !== current) {
                        setOpenTabs((tabs) => (tabs.includes(current) ? tabs : [...tabs, current]));
                    }
                    return current;
                });
            });
        };

        scroller.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => scroller.removeEventListener('scroll', onScroll);
    }, []);

    // Cmd/Ctrl+K or Cmd/Ctrl+P → palette
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'p')) {
                e.preventDefault();
                setPaletteOpen((v) => !v);
            }
            if (e.key === 'Escape') setPaletteOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const value = useMemo(
        () => ({
            files: FILES,
            openTabs,
            activeFile,
            setActiveFile,
            openFile,
            closeTab,
            sidebarOpen,
            toggleSidebar: () => setSidebarOpen((v) => !v),
            paletteOpen,
            setPaletteOpen,
            projectIndex,
            setProjectIndex,
            cursor,
            scrollRef,
        }),
        [openTabs, activeFile, openFile, closeTab, sidebarOpen, paletteOpen, projectIndex, cursor],
    );

    return <IDEContext.Provider value={value}>{children}</IDEContext.Provider>;
};

IDEProvider.propTypes = { children: PropTypes.node };
