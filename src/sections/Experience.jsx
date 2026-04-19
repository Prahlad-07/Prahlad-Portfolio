import { lazy, Suspense, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { workExperiences } from '../constants/index.js';
import useAdaptiveFlags from '../hooks/useAdaptiveFlags.js';
import useSectionObserver from '../hooks/useSectionObserver.js';

const ExperienceSceneCanvas = lazy(() => import('../components/ExperienceSceneCanvas.jsx'));

const Experience = () => {
    const [animationName, setAnimationName] = useState(workExperiences[0]?.animation || 'idle');
    const { elementRef, isVisible, hasBeenVisible } = useSectionObserver({
        threshold: 0.16,
        rootMargin: '220px 0px',
    });
    const { isMobile } = useAdaptiveFlags();
    const shouldRenderScene = hasBeenVisible;

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
                                    isActive={isVisible}
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
