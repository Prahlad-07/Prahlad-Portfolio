import { useEffect, useState } from 'react';

const LINES = [
    { cmd: 'npx prahlad --portfolio' },
    { dim: 'resolving workspace …' },
    { ok: '7 files loaded' },
    { ok: 'terminal ready' },
    { dim: 'launching editor', arrow: true },
];

const alreadyBooted = () => {
    try {
        return sessionStorage.getItem('pf_booted') === '1';
    } catch {
        return false;
    }
};

const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Boot = () => {
    const [show, setShow] = useState(!alreadyBooted() && !reduced);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!show) return undefined;
        try {
            sessionStorage.setItem('pf_booted', '1');
        } catch {
            /* ignore */
        }
        const t1 = window.setTimeout(() => setDone(true), 1400);
        const t2 = window.setTimeout(() => setShow(false), 2000);
        const skip = () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            setDone(true);
            window.setTimeout(() => setShow(false), 320);
        };
        window.addEventListener('keydown', skip, { once: true });
        window.addEventListener('pointerdown', skip, { once: true });
        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            window.removeEventListener('keydown', skip);
            window.removeEventListener('pointerdown', skip);
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className={`boot ${done ? 'is-done' : ''}`} aria-hidden="true">
            {LINES.map((l, i) => (
                <p
                    key={i}
                    className="boot_line"
                    style={{ animationDelay: `${i * 170}ms` }}
                >
                    {l.cmd && (
                        <>
                            <span className="accent">$ </span>
                            {l.cmd}
                        </>
                    )}
                    {l.ok && (
                        <>
                            <b>✓ </b>
                            {l.ok}
                        </>
                    )}
                    {l.dim && l.dim}
                    {l.arrow && <span className="accent"> →</span>}
                </p>
            ))}
            <span className="boot_skip">press any key to skip</span>
        </div>
    );
};

export default Boot;
