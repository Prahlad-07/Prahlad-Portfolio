/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useWorkspace } from './WorkspaceContext.jsx';
import { fileById } from '../../content/files.js';
import { IconRefresh } from './icons.jsx';
import HelloPreview from '../../sections/previews/HelloPreview.jsx';
import AboutPreview from '../../sections/previews/AboutPreview.jsx';
import ExperiencePreview from '../../sections/previews/ExperiencePreview.jsx';
import ProjectsPreview from '../../sections/previews/ProjectsPreview.jsx';
import SkillsPreview from '../../sections/previews/SkillsPreview.jsx';
import RecommendationsPreview from '../../sections/previews/RecommendationsPreview.jsx';
import ContactPreview from '../../sections/previews/ContactPreview.jsx';

const MAP = {
    hello: HelloPreview,
    about: AboutPreview,
    experience: ExperiencePreview,
    projects: ProjectsPreview,
    skills: SkillsPreview,
    recommendations: RecommendationsPreview,
    contact: ContactPreview,
};

const PreviewPane = ({ hidden = false }) => {
    const { activeFile } = useWorkspace();
    const [nonce, setNonce] = useState(0);
    const f = fileById(activeFile);
    const Body = MAP[activeFile] ?? (() => null);

    return (
        <section className={`preview-pane ${hidden ? 'is-hidden' : ''}`} aria-label={`${f?.name} output`}>
            <div className="pane_head">
                <span className="pane_crumbs">
                    OUTPUT<span className="pane_sep">—</span>
                    <b>{f?.name}</b>
                </span>
                <button type="button" className="pane_skip" onClick={() => setNonce((n) => n + 1)} aria-label="Re-run">
                    <IconRefresh />
                </button>
            </div>
            <div className="preview_scroll">
                <Body key={`${activeFile}-${nonce}`} />
            </div>
        </section>
    );
};

export default PreviewPane;
