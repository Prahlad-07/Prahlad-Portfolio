import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { workExperiences } from '../constants/index.js';
import useAdaptiveFlags from '../hooks/useAdaptiveFlags.js';
import useSectionObserver from '../hooks/useSectionObserver.js';
import useTheme from '../hooks/useTheme.js';

const loadExperienceSceneCanvas = () => import('../components/ExperienceSceneCanvas.jsx');
const ExperienceSceneCanvas = lazy(loadExperienceSceneCanvas);

const Experience = () => {
    const [animationName, setAnimationName] = useState('idle');
    const [isScrolling, setIsScrolling] = useState(false);
    const [webglSupported, setWebglSupported] = useState(true);
    const scrollTimeoutRef = useRef(0);
    const scrollFrameRef = useRef(0);
    const scrollingRef = useRef(false);
    const { elementRef, isVisible, hasBeenVisible } = useSectionObserver({
        threshold: 0.16,
        rootMargin: '360px 0px',
    });
    const { isDark } = useTheme();
    const { isMobile, prefersReducedMotion, saveData, slowConnection } = useAdaptiveFlags();
    const shouldRenderScene = hasBeenVisible && webglSupported;
    const isLowPowerMode = saveData || slowConnection;
    const shouldThrottleScene = isMobile || isLowPowerMode;
    const shouldAnimateScene = isVisible && (!shouldThrottleScene || !isScrolling) && !prefersReducedMotion;

    useEffect(() => {
        try {
            const probe = document.createElement('canvas');
            const gl =
                probe.getContext('webgl2') ||
                probe.getContext('webgl') ||
                probe.getContext('experimental-webgl');
            setWebglSupported(Boolean(gl));
        } catch {
            setWebglSupported(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const preloadCanvas = () => void loadExperienceSceneCanvas();

        if (typeof window.requestIdleCallback === 'function') {
            const idleId = window.requestIdleCallback(preloadCanvas, { timeout: 1400 });
            return () => window.cancelIdleCallback?.(idleId);
        }

        const timeoutId = window.setTimeout(preloadCanvas, 500);
        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const stopScrollState = () => {
            scrollingRef.current = false;
            setIsScrolling(false);
        };

        const markScrolling = () => {
            if (!scrollingRef.current) {
                scrollingRef.current = true;
                setIsScrolling(true);
            }
            window.clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = window.setTimeout(stopScrollState, 140);
        };

        const handleScroll = () => {
            if (scrollFrameRef.current) return;
            scrollFrameRef.current = window.requestAnimationFrame(() => {
                scrollFrameRef.current = 0;
                markScrolling();
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.clearTimeout(scrollTimeoutRef.current);
            window.cancelAnimationFrame(scrollFrameRef.current);
        };
    }, []);

    const scenePlaceholder = webglSupported ? (
        <div className="xp-stage_placeholder">
            <span className="canvas-loader" aria-hidden="true" />
        </div>
    ) : (
        <div className="xp-stage_placeholder">
            <img
                src="/assets/Prahlad_Yadav_Photo.jpeg"
                alt="Prahlad Yadav"
                className="xp-stage_fallbackImage"
                loading="lazy"
                decoding="async"
            />
        </div>
    );

    return (
        <section ref={elementRef} className="section-wrap" id="experience">
            <div className="shell">
                <SectionHeader
                    eyebrow="Experience"
                    title="Where I've built backend systems."
                    description="Hover a role — the character waves back."
                />

                <div className="xp-layout">
                    <div className="xp-stage">
                        <div className="xp-stage_canvas">
                            {shouldRenderScene ? (
                                <Suspense fallback={scenePlaceholder}>
                                    <ExperienceSceneCanvas
                                        animationName={animationName}
                                        isActive={shouldAnimateScene}
                                        isDark={isDark}
                                        isLowPowerMode={isLowPowerMode}
                                        isScrolling={isScrolling}
                                        isMobile={isMobile}
                                    />
                                </Suspense>
                            ) : (
                                scenePlaceholder
                            )}
                        </div>
                    </div>

                    <ol className="xp-list">
                        {workExperiences.map(({ id, name, pos, icon, duration, summary, highlights, animation }) => (
                            <li
                                key={id}
                                className="xp-item"
                                tabIndex={0}
                                onPointerOver={() => setAnimationName(animation)}
                                onPointerOut={() => setAnimationName('idle')}
                                onFocus={() => setAnimationName(animation)}
                                onBlur={() => setAnimationName('idle')}
                            >
                                <span className="xp-item_period">{duration}</span>

                                <div className="xp-item_head">
                                    <span className="xp-item_logo">
                                        <img src={icon} alt={`${name} logo`} loading="lazy" decoding="async" />
                                    </span>
                                    <div className="xp-item_titles">
                                        <h3 className="xp-item_role">{pos}</h3>
                                        <p className="xp-item_org">{name}</p>
                                    </div>
                                </div>

                                <p className="xp-item_summary">{summary}</p>

                                <ul className="xp-points">
                                    {highlights.map((highlight) => (
                                        <li key={highlight} className="xp-point">
                                            <span className="xp-point_marker" aria-hidden="true" />
                                            <p>{highlight}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Experience;
