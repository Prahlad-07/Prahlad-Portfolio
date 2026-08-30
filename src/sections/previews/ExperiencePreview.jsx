import { useState } from 'react';
import { workExperiences } from '../../constants/index.js';
import { IconChevron } from '../../components/ide/icons.jsx';

const ExperiencePreview = () => {
    const [open, setOpen] = useState(workExperiences[0]?.id ?? null);

    return (
        <div className="pv pv-xp">
            <p className="pv_run">$ ts-node experience.ts</p>

            <ol className="xp_list">
                {workExperiences.map((w) => {
                    const isOpen = open === w.id;
                    return (
                        <li key={w.id} className={`xp_item ${isOpen ? 'is-open' : ''}`}>
                            <button
                                type="button"
                                className="xp_row"
                                onClick={() => setOpen(isOpen ? null : w.id)}
                                aria-expanded={isOpen}
                            >
                                <img className="xp_logo" src={w.icon} alt="" loading="lazy" />
                                <span className="xp_titles">
                                    <span className="xp_title">{w.pos}</span>
                                    <span className="xp_org">{w.name}</span>
                                </span>
                                <span className="xp_when">{w.duration}</span>
                                <span className="xp_chev">
                                    <IconChevron open={isOpen} />
                                </span>
                            </button>

                            {isOpen && (
                                <div className="xp_body">
                                    <p className="xp_summary">{w.summary}</p>
                                    <ul className="pv_list pv_list--arrow">
                                        {w.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default ExperiencePreview;
