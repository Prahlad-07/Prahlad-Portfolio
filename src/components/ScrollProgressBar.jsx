import { useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
    const fillRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        let frameId = 0;

        const updateProgress = () => {
            frameId = 0;

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const maxScroll = Math.max(scrollHeight - clientHeight, 1);
            const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

            if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${progress})`;
                fillRef.current.style.opacity = progress > 0.01 ? '1' : '0';
            }
        };

        const scheduleUpdate = () => {
            if (frameId) return;
            frameId = window.requestAnimationFrame(updateProgress);
        };

        scheduleUpdate();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);

        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="scroll-progress" aria-hidden="true">
            <span ref={fillRef} className="scroll-progress_fill" />
        </div>
    );
};

export default ScrollProgressBar;
