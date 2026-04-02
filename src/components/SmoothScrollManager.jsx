import { useEffect } from 'react';

const SmoothScrollManager = () => {
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('.section-wrap'));
        if (!sections.length) return undefined;

        const supportsMatchMedia = typeof window.matchMedia === 'function';
        const supportsIntersectionObserver = typeof window.IntersectionObserver !== 'undefined';
        const prefersReducedMotion = supportsMatchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

        sections.forEach((section, index) => {
            section.classList.add('section-animate');
            section.style.setProperty('--section-stagger', `${Math.min(index * 55, 260)}ms`);
        });

        if (prefersReducedMotion || !supportsIntersectionObserver) {
            sections.forEach((section) => section.classList.add('section-visible'));
            return undefined;
        }

        try {
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

            return () => {
                sectionObserver.disconnect();
            };
        } catch (error) {
            console.error('SmoothScrollManager observer initialization failed:', error);
            sections.forEach((section) => section.classList.add('section-visible'));
            return undefined;
        }
    }, []);

    return null;
};

export default SmoothScrollManager;
