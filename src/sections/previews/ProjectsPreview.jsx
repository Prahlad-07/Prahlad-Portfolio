import { useEffect, useState } from 'react';
import { myProjects } from '../../constants/index.js';
import { IconExternal } from '../../components/ide/icons.jsx';

const ProjectsPreview = () => {
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState(0);
    const [orient, setOrient] = useState('landscape');
    const p = myProjects[idx];

    useEffect(() => {
        setImg(0);
        setOrient('landscape');
    }, [idx]);

    useEffect(() => {
        if (p.images.length < 2) return undefined;
        const t = window.setInterval(() => setImg((i) => (i + 1) % p.images.length), 4400);
        return () => window.clearInterval(t);
    }, [p.images.length, idx]);

    const shot = p.images[img];

    return (
        <div className="pv pv-proj" data-stagger>
            <p className="pv_run">$ npm run projects</p>

            <div className="proj_grid">
                <ul className="proj_tabs" data-stagger>
                    {myProjects.map((pr, i) => (
                        <li key={pr.id}>
                            <button
                                type="button"
                                className={`proj_tab ${i === idx ? 'is-active' : ''}`}
                                onClick={() => setIdx(i)}
                            >
                                <span className="proj_mark">{pr.mark}</span>
                                <span className="proj_tabName">{pr.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="proj_detail">
                    <p className="proj_meta">
                        {p.category} · {p.year} · {p.repoState}
                    </p>
                    <h3 className="proj_name">{p.title}</h3>
                    <p className="proj_summary">{p.summary}</p>

                    <ul className="pv_list pv_list--num">
                        {p.impact.map((it, i) => (
                            <li key={it} data-n={String(i + 1).padStart(2, '0')}>
                                {it}
                            </li>
                        ))}
                    </ul>

                    <div className="proj_tags">
                        {p.tags.map((t) => (
                            <span className="chip" key={t.id}>
                                {t.path ? <img src={t.path} alt="" loading="lazy" /> : null}
                                {t.name}
                            </span>
                        ))}
                    </div>

                    {p.repoUrl ? (
                        <a className="btn btn--ghost" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                            <IconExternal /> {p.repoLabel}
                        </a>
                    ) : (
                        <span className="btn btn--ghost is-muted">{p.repoLabel}</span>
                    )}

                    <figure className="proj_shot">
                        <figcaption className="proj_shotBar">
                            <i />
                            <i />
                            <i />
                            <span>
                                {String(img + 1).padStart(2, '0')} / {String(p.images.length).padStart(2, '0')}
                            </span>
                        </figcaption>
                        <div className={`proj_shotView ${orient}`}>
                            <img
                                key={shot.src}
                                src={shot.src}
                                alt={shot.alt}
                                loading="lazy"
                                decoding="async"
                                onLoad={(e) => {
                                    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                                    setOrient(h > w ? 'portrait' : 'landscape');
                                }}
                            />
                        </div>
                        <div className="proj_thumbs">
                            {p.images.map((im, i) => (
                                <button
                                    key={im.id}
                                    type="button"
                                    className={`proj_thumb ${i === img ? 'is-active' : ''}`}
                                    onClick={() => setImg(i)}
                                    aria-label={`Screenshot ${i + 1}`}
                                >
                                    <img src={im.src} alt="" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPreview;
