import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { workExperiences } from '../constants/index.js';
import useAdaptiveFlags from '../hooks/useAdaptiveFlags.js';
import useSectionObserver from '../hooks/useSectionObserver.js';
import useTheme from '../hooks/useTheme.js';

const loadExperienceSceneCanvas = () => import('../components/ExperienceSceneCanvas.jsx');
const ExperienceSceneCanvas = lazy(loadExperienceSceneCanvas);

const Experience = () => {
    const [animationName, setAnimationName] = useState(workExperiences[0]?.animation || 'idle');
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(0);
    const scrollFrameRef = useRef(0);
    const scrollingRef = useRef(false);
    const { elementRef, isVisible, hasBeenVisible } = useSectionObserver({
        threshold: 0.16,
        rootMargin: '360px 0px',
    });
    const { isDark } = useTheme();
    const { isMobile, prefersReducedMotion, saveData, slowConnection } = useAdaptiveFlags();
    const shouldRenderScene = hasBeenVisible;
    const isLowPowerMode = saveData || slowConnection;
    const shouldThrottleScene = isMobile || isLowPowerMode;
    const shouldAnimateScene = isVisible && (!shouldThrottleScene || !isScrolling) && !prefersReducedMotion;

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const preloadCanvas = () => {
            void loadExperienceSceneCanvas();
        };

        if (typeof window.requestIdleCallback === 'function') {
            const idleId = window.requestIdleCallback(preloadCanvas, { timeout: 1400 });
            return () => {
                window.cancelIdleCallback?.(idleId);
            };
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

    return (
        <section ref={elementRef} className="section-wrap" id="experience">
            <div className="shell">
                <SectionHeader
                    eyebrow="Experience"
                    title="Experience built around learning fast, shipping reliably, and owning the details."
                    description="My internships reflect a backend-first path: systems work, API delivery, debugging under constraints, and disciplined engineering fundamentals."
                />

                <div className="work-container">
                    <div className="work-canvas">
                        {shouldRenderScene ? (
                            <Suspense
                                fallback={
                                    <div className="canvas-placeholder canvas-placeholder_tall">
                                        <img
                                            src="/assets/Prahlad_Yadav_Photo.jpeg"
                                            alt="Prahlad Yadav portrait"
                                            className="canvas-placeholder_visual"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <p className="canvas-placeholder_text">Preparing animated profile...</p>
                                    </div>
                                }
                            >
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
                            <div className="canvas-placeholder canvas-placeholder_tall">
                                <img
                                    src="/assets/Prahlad_Yadav_Photo.jpeg"
                                    alt="Prahlad Yadav portrait"
                                    className="canvas-placeholder_visual"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <p className="canvas-placeholder_text">
                                    Scroll to this section to load the animated preview.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="work-content">
                        <div className="work-content_inner">
                            {workExperiences.map(({ id, name, pos, icon, duration, summary, highlights, animation }, index) => (
                                <article
                                    key={id}
                                    className="work-content_container"
                                    onClick={() => setAnimationName(animation.toLowerCase())}
                                    onPointerOver={() => setAnimationName(animation.toLowerCase())}
                                    onPointerOut={() => setAnimationName('idle')}
                                    onFocus={() => setAnimationName(animation.toLowerCase())}
                                    onBlur={() => setAnimationName('idle')}
                                    tabIndex={0}
                                >
                                    <div className="work-timeline">
                                        <div className="work-content_logo">
                                            <img
                                                src={icon}
                                                alt={`${name} logo`}
                                                className="work-content_logoImage"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        {index !== workExperiences.length - 1 ? (
                                            <div className="work-content_bar" />
                                        ) : null}
                                    </div>

                                    <div className="work-copy">
                                        <span className="work-duration">{duration}</span>
                                        <p className="work-company">{name}</p>
                                        <h3 className="work-position">{pos}</h3>
                                        <p className="work-summary">{summary}</p>

                                        <div className="work-points">
                                            {highlights.map((highlight) => (
                                                <div key={highlight} className="work-point">
                                                    <span className="achievement-dot" aria-hidden="true" />
                                                    <p>{highlight}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
