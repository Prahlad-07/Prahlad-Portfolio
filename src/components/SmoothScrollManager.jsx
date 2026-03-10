import { useEffect } from 'react';

const SCROLL_DURATION = 700;

const easeInOutCubic = (t) => (
    t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
);

const SmoothScrollManager = () => {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let rafId = 0;
        let startTime = 0;
        let startY = 0;
        let targetY = 0;

        const cancelAnimation = () => {
            if (!rafId) return;
            cancelAnimationFrame(rafId);
            rafId = 0;
        };

        const getTopOffset = () => {
            const scrollPaddingTop = parseInt(
                window.getComputedStyle(document.documentElement).scrollPaddingTop,
                10
            );
            return Number.isFinite(scrollPaddingTop) ? scrollPaddingTop : 88;
        };

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / SCROLL_DURATION, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo({
                top: startY + (targetY - startY) * easedProgress,
                behavior: 'auto',
            });

            if (progress < 1) {
                rafId = requestAnimationFrame(animateScroll);
            } else {
                rafId = 0;
            }
        };

        const handleAnchorClick = (event) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const anchor = event.target.closest('a[href^="#"]');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            startY = window.scrollY;
            targetY = Math.max(
                0,
                target.getBoundingClientRect().top + window.scrollY - getTopOffset()
            );
            startTime = 0;

            cancelAnimation();
            rafId = requestAnimationFrame(animateScroll);

            window.history.replaceState(null, '', href);
        };

        const cancelOnUserAction = () => {
            cancelAnimation();
        };

        const sections = Array.from(document.querySelectorAll('.section-wrap'));
        sections.forEach((section, index) => {
            section.classList.add('section-animate');
            section.style.setProperty('--section-stagger', `${Math.min(index * 55, 260)}ms`);
        });

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));

        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('wheel', cancelOnUserAction, { passive: true });
        window.addEventListener('touchstart', cancelOnUserAction, { passive: true });
        window.addEventListener('keydown', cancelOnUserAction);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('wheel', cancelOnUserAction);
            window.removeEventListener('touchstart', cancelOnUserAction);
            window.removeEventListener('keydown', cancelOnUserAction);
            sectionObserver.disconnect();
            cancelAnimation();
        };
    }, []);

    return null;
};

export default SmoothScrollManager;
