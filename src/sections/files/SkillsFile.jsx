import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightJSON } from '../../components/ide/highlight.js';
import { IconPlay } from '../../components/ide/icons.jsx';
import { codingProfiles, skillGroups } from '../../constants/index.js';

const skillsJSON = {
    strongest: 'Backend & APIs',
    ...Object.fromEntries(
        skillGroups.map((g) => [g.title.replace(/\s*&\s*|\s+/g, '_').toLowerCase(), g.items]),
    ),
    profiles: Object.fromEntries(codingProfiles.map((p) => [p.platform, p.badge])),
};

const SkillsFile = () => (
    <FileShell id="skills">
        <CodeBlock lines={highlightJSON(skillsJSON)} />

        <div className="preview">
            <div className="preview_bar">
                <IconPlay />
                <span>Preview — skills.json</span>
            </div>
            <div className="preview_body">
                <div className="skills-grid">
                    {skillGroups.map((g) => (
                        <div className="skill-card" key={g.id}>
                            <h4>&quot;{g.title}&quot;</h4>
                            <p>{g.description}</p>
                            <div className="skill-tags">
                                {g.items.map((i) => (
                                    <span className="skill-tag" key={i}>{i}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="proj_meta" style={{ marginTop: 20 }}>
                    {'// proof of craft — competitive programming & open source'}
                </div>
                <div className="profiles-row">
                    {codingProfiles.map((p) => (
                        <a
                            key={p.id}
                            className="profile-chip"
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={p.icon} alt="" loading="lazy" />
                            <div>
                                <b>{p.platform}</b>
                                <span>{p.badge}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </FileShell>
);

export default SkillsFile;
