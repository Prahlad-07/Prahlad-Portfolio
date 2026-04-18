import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { myProjects } from '../constants/index.js';

const Projects = () => {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeImageOrientation, setActiveImageOrientation] = useState('landscape');
    const projectTabRefs = useRef([]);
    const thumbnailRefs = useRef([]);

    const activeProject = myProjects[activeProjectIndex];
    const activeImages = activeProject.images;
    const activeImage = activeImages[activeImageIndex];
    const activeProjectNumber = String(activeProjectIndex + 1).padStart(2, '0');
    const totalProjects = String(myProjects.length).padStart(2, '0');
    const activeImageNumber = String(activeImageIndex + 1).padStart(2, '0');
    const totalImages = String(activeImages.length).padStart(2, '0');
    const activeImageMode =
        activeImageOrientation === 'portrait' ? 'Mobile experience' : 'Web experience';

    useEffect(() => {
        setActiveImageIndex(0);
        setActiveImageOrientation('landscape');
    }, [activeProjectIndex]);

    useEffect(() => {
        const activeTab = projectTabRefs.current[activeProjectIndex];
        activeTab?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }, [activeProjectIndex]);

    useEffect(() => {
        const activeThumbnail = thumbnailRefs.current[activeImageIndex];
        activeThumbnail?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }, [activeImageIndex, activeProjectIndex]);

    useEffect(() => {
        if (activeImages.length < 2) return undefined;

        const intervalId = window.setInterval(() => {
            setActiveImageIndex((previousIndex) => (previousIndex + 1) % activeImages.length);
        }, 4200);

        return () => window.clearInterval(intervalId);
    }, [activeImages.length, activeProjectIndex]);

    const moveProject = (direction) => {
        setActiveProjectIndex((previousIndex) => {
            const nextIndex = (previousIndex + direction + myProjects.length) % myProjects.length;
            return nextIndex;
        });
    };

    const moveImage = (direction) => {
        setActiveImageIndex((previousIndex) => {
            const nextIndex = (previousIndex + direction + activeImages.length) % activeImages.length;
            return nextIndex;
        });
    };

    return (
        <section className="section-wrap" id="projects">
            <div className="shell">
                <SectionHeader
                    eyebrow="Projects"
                    title="Projects presented like product-grade case studies, not just cards in a list."
                    description="This showcase is designed to help recruiters understand the product, the engineering depth, and the visual quality fast. Desktop screenshots and mobile screenshots now adapt to different frames so the section feels polished instead of cropped."
                />

                <section
                    className="projects-gallery"
                    style={{
                        '--project-primary': activeProject.theme.primary,
                        '--project-secondary': activeProject.theme.secondary,
                    }}
                >
                    <div className="projects-command">
                        <div className="projects-command_intro">
                            <span className="card-label">Project Showcase</span>
                            <p className="projects-command_note">
                                A tighter, more premium way to scan everything I have built. Pick a project
                                from the deck, then explore its story and screenshots in one focused stage.
                            </p>
                        </div>

                        <div className="projects-command_status">
                            <span className="projects-command_count">
                                {activeProjectNumber} / {totalProjects}
                            </span>
                            <div className="projects-arrow_group">
                                <button
                                    type="button"
                                    className="projects-arrow_button"
                                    onClick={() => moveProject(-1)}
                                    aria-label="Show previous project"
                                >
                                    &larr;
                                </button>
                                <button
                                    type="button"
                                    className="projects-arrow_button"
                                    onClick={() => moveProject(1)}
                                    aria-label="Show next project"
                                >
                                    &rarr;
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="projects-nav" aria-label="Project list">
                        {myProjects.map((project, index) => (
                            <button
                                key={project.id}
                                type="button"
                                ref={(node) => {
                                    projectTabRefs.current[index] = node;
                                }}
                                className={`projects-nav_item ${
                                    index === activeProjectIndex ? 'projects-nav_itemActive' : ''
                                }`}
                                style={{
                                    '--item-primary': project.theme.primary,
                                    '--item-secondary': project.theme.secondary,
                                }}
                                onClick={() => setActiveProjectIndex(index)}
                                aria-pressed={index === activeProjectIndex}
                            >
                                <span className="projects-nav_mark">{project.mark}</span>
                                <span className="projects-nav_body">
                                    <strong>{project.title}</strong>
                                    <small>{project.category}</small>
                                </span>
                                <span className="projects-nav_count">
                                    {String(project.images.length).padStart(2, '0')} shots
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="projects-stage">
                        <article className="projects-story">
                            <div className="projects-story_meta">
                                <span>{activeProject.category}</span>
                                <span>{activeProject.year}</span>
                                <span>{activeProject.repoState}</span>
                            </div>

                            <div className="projects-story_header">
                                <span className="projects-story_index">{activeProjectNumber}</span>
                                <div className="projects-story_heading">
                                    <h3>{activeProject.title}</h3>
                                    <p className="projects-story_summary">{activeProject.summary}</p>
                                </div>
                            </div>

                            <p className="projects-story_description">{activeProject.description}</p>

                            <div className="projects-story_points">
                                {activeProject.impact.map((point, index) => (
                                    <div key={point} className="projects-story_point">
                                        <span className="projects-story_pointIndex">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <p>{point}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="projects-story_tags">
                                {activeProject.tags.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="tech-pill"
                                        style={{ background: `${activeProject.theme.primary}12` }}
                                    >
                                        {tag.path ? (
                                            <img
                                                src={tag.path}
                                                alt={tag.name}
                                                className="tech-pill_icon"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : null}
                                        <span>{tag.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="projects-story_actions">
                                {activeProject.repoUrl ? (
                                    <a
                                        href={activeProject.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button-primary"
                                    >
                                        {activeProject.repoLabel}
                                    </a>
                                ) : (
                                    <span className="button-secondary project-stage_buttonMuted">
                                        {activeProject.repoLabel}
                                    </span>
                                )}
                            </div>

                            <div className="projects-story_note">
                                <span className="card-label">Build Focus</span>
                                <p>{activeProject.availabilityNote}</p>
                            </div>
                        </article>

                        <article className="projects-viewer">
                            <div className="projects-viewer_topbar">
                                <div className="projects-viewer_identity">
                                    <span className="projects-viewer_mark">{activeProject.mark}</span>
                                    <div>
                                        <span className="projects-viewer_title">{activeProject.title}</span>
                                        <span className="projects-viewer_mode">{activeImageMode}</span>
                                    </div>
                                </div>

                                <div className="projects-viewer_controls">
                                    <span className="projects-viewer_count">
                                        {activeImageNumber} / {totalImages}
                                    </span>
                                    <div className="projects-arrow_group">
                                        <button
                                            type="button"
                                            className="projects-arrow_button projects-arrow_buttonSecondary"
                                            onClick={() => moveImage(-1)}
                                            aria-label="Show previous screenshot"
                                        >
                                            &larr;
                                        </button>
                                        <button
                                            type="button"
                                            className="projects-arrow_button projects-arrow_buttonSecondary"
                                            onClick={() => moveImage(1)}
                                            aria-label="Show next screenshot"
                                        >
                                            &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`projects-stage_surface projects-stage_surface_${activeImageOrientation}`}>
                                <div className="projects-stage_aura" aria-hidden="true" />
                                <div className="projects-stage_auraSecondary" aria-hidden="true" />

                                <div className={`projects-device projects-device_${activeImageOrientation}`}>
                                    {activeImageOrientation === 'portrait' ? (
                                        <div className="projects-device_portraitBar" aria-hidden="true" />
                                    ) : (
                                        <div className="projects-device_browserBar" aria-hidden="true">
                                            <div className="projects-device_browserDots">
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                            <div className="projects-device_browserSearch" />
                                        </div>
                                    )}

                                    <div className="projects-device_screen">
                                        <img
                                            key={activeImage.src}
                                            src={activeImage.src}
                                            alt={activeImage.alt}
                                            className="projects-device_image"
                                            loading="lazy"
                                            decoding="async"
                                            onLoad={(event) => {
                                                const { naturalWidth, naturalHeight } = event.currentTarget;
                                                setActiveImageOrientation(
                                                    naturalHeight > naturalWidth ? 'portrait' : 'landscape'
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="projects-viewer_captionRow">
                                <p className="projects-showcase_caption">{activeImage.alt}</p>
                                <span className="projects-command_count">{activeImageMode}</span>
                            </div>

                            <div className="projects-filmstrip" aria-label={`${activeProject.title} screenshots`}>
                                {activeImages.map((image, index) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        ref={(node) => {
                                            thumbnailRefs.current[index] = node;
                                        }}
                                        className={`projects-thumb ${
                                            index === activeImageIndex ? 'projects-thumb_active' : ''
                                        }`}
                                        onClick={() => setActiveImageIndex(index)}
                                        aria-label={`Show screenshot ${index + 1} for ${activeProject.title}`}
                                        aria-pressed={index === activeImageIndex}
                                    >
                                        <img src={image.src} alt="" loading="lazy" decoding="async" />
                                    </button>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Projects;
