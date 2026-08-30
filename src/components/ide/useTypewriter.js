import { useEffect, useRef, useState } from 'react';

const seen = new Set();
const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Progressively reveals `total` characters.
 * - instant if reduced-motion, already seen this key, or `enabled` is false
 * - total animation time capped ~1.4s (fast for long files, deliberate for short)
 * Returns { chars, done, skip }.
 */
export default function useTypewriter(key, total, enabled = true) {
    const instant = !enabled || reduced || seen.has(key);
    const [chars, setChars] = useState(instant ? total : 0);
    const [done, setDone] = useState(instant);
    const raf = useRef(0);

    useEffect(() => {
        seen.add(key);
        if (instant) {
            setChars(total);
            setDone(true);
            return undefined;
        }
        setChars(0);
        setDone(false);

        const perChar = Math.min(11, Math.max(2.5, 1400 / total));
        let start;
        const tick = (ts) => {
            if (start === undefined) start = ts;
            const n = Math.min(total, Math.floor((ts - start) / perChar));
            setChars(n);
            if (n >= total) {
                setDone(true);
                return;
            }
            raf.current = window.requestAnimationFrame(tick);
        };
        raf.current = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(raf.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const skip = () => {
        window.cancelAnimationFrame(raf.current);
        setChars(total);
        setDone(true);
    };

    return { chars: done ? total : chars, done, skip };
}
