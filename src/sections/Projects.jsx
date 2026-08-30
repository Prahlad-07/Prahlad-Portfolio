import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { myProjects } from '../constants/index.js';

const scrollItemIntoContainer = (container, item) => {
    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const leftOffset = itemRect.left - containerRect.left;
    const targetLeft =
        container.scrollLeft + leftOffset - (container.clientWidth - itemRect.width) / 2;

    container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
    });
};

const Projects = () => {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeImageOrientation, setActiveImageOrientation] = useState('landscape');
    const projectTabRefs = useRef([]);
    const thumbnailRefs = useRef([]);
    const projectListRef = useRef(null);
    const thumbnailListRef = useRef(null);

    const activeProject = myProjects[activeProjectIndex];
    const activeImages = activeProject.images;
    const activeImage = activeImages[activeImageIndex];
    const activeProjectNumber = String(activeProjectIndex + 1).padStart(2, '0');
    const totalProjects = String(myProjects.length).padStart(2, '0');
    const activeImageNumber = String(activeImageIndex + 1).padStart(2, '0');
    const totalImages = String(activeImages.length).padStart(2, '0');

    useEffect(() => {
        setActiveImageIndex(0);
        setActiveImageOrientation('landscape');
    }, [activeProjectIndex]);

    useEffect(() => {
        const activeTab = projectTabRefs.current[activeProjectIndex];
        scrollItemIntoContainer(projectListRef.current, activeTab);
    }, [activeProjectIndex]);

    useEffect(() => {
        const activeThumbnail = thumbnailRefs.current[activeImageIndex];
        scrollItemIntoContainer(thumbnailListRef.current, activeThumbnail);
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

    return (
        <section className="section-wrap" id="projects">
            <div className="shell">
                <SectionHeader
                    eyebrow="Projects"
                    title="Real products, built end to end."
                    description="Pick one from the list to see the story and the screens."
                />

                <section
                    className="projects-gallery"
                    style={{
                        '--project-primary': activeProject.theme.primary,
                        '--project-secondary': activeProject.theme.secondary,
                    }}
                >
                    <div className="projects-rail">
                        <div className="projects-rail_top">
                            <span className="projects-counter">
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

                        <div className="projects-rail_list" aria-label="Project list" ref={projectListRef}>
                            {myProjects.map((project, index) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    ref={(node) => {
                                        projectTabRefs.current[index] = node;
                                    }}
                                    className={`projects-rail_item ${
                                        index === activeProjectIndex ? 'projects-rail_itemActive' : ''
                                    }`}
                                    style={{
                                        '--item-primary': project.theme.primary,
                                        '--item-secondary': project.theme.secondary,
                                    }}
                                    onClick={() => setActiveProjectIndex(index)}
                                    aria-pressed={index === activeProjectIndex}
                                >
                                    <span className="projects-rail_mark">{project.mark}</span>
                                    <span className="projects-rail_copy">
                                        <strong>{project.title}</strong>
                                        <small>{project.category}</small>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="projects-spotlight">
                        <article className="projects-spotlight_copy">
                            <div className="projects-spotlight_meta">
                                <span>{activeProject.category}</span>
                                <span>{activeProject.year}</span>
                                <span>{activeProject.repoState}</span>
                            </div>

                            <h3 className="projects-spotlight_title">{activeProject.title}</h3>
                            <p className="projects-spotlight_summary">{activeProject.summary}</p>

                            <ul className="projects-spotlight_points">
                                {activeProject.impact.map((point, index) => (
                                    <li key={point} className="projects-spotlight_point">
                                        <span className="projects-counter">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <p>{point}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="projects-spotlight_tags">
                                {activeProject.tags.map((tag) => (
                                    <span key={tag.id} className="tech-pill">
                                        {tag.path ? (
                                            <img
                                                src={tag.path}
                                                alt=""
                                                className="tech-pill_icon"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : null}
                                        {tag.name}
                                    </span>
                                ))}
                            </div>

                            <div className="projects-spotlight_actions">
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
                        </article>

                        <article className="projects-showcase">
                            <div
                                className={`projects-showcase_viewer ${
                                    activeImageOrientation === 'portrait'
                                        ? 'projects-showcase_viewer_portrait'
                                        : ''
                                }`}
                            >
                                <img
                                    key={activeImage.src}
                                    src={activeImage.src}
                                    alt={activeImage.alt}
                                    className={`projects-showcase_image projects-showcase_image_${activeImageOrientation}`}
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

                            <div className="projects-showcase_footer">
                                <p className="projects-showcase_caption">{activeImage.alt}</p>
                                <span className="projects-showcase_count">
                                    {activeImageNumber} / {totalImages}
                                </span>
                            </div>

                            <div
                                className="projects-thumbs"
                                aria-label={`${activeProject.title} screenshots`}
                                ref={thumbnailListRef}
                            >
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
