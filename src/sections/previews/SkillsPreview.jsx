import { codingProfiles, skillGroups } from '../../constants/index.js';
import { IconExternal } from '../../components/ide/icons.jsx';

const SkillsPreview = () => (
    <div className="pv pv-skills">
        <p className="pv_run">$ cat skills.json | render</p>

        <div className="skill_groups">
            {skillGroups.map((g) => (
                <div className="skill_group" key={g.id}>
                    <p className="skill_groupHead">
                        <b>{g.title}</b>
                        <span>{g.description}</span>
                    </p>
                    <div className="skill_chips">
                        {g.items.map((i) => (
                            <span className="chip" key={i}>
                                {i}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <p className="pv_label">proof of craft</p>
        <div className="skill_profiles">
            {codingProfiles.map((p) => (
                <a key={p.id} className="skill_profile" href={p.url} target="_blank" rel="noopener noreferrer">
                    <img src={p.icon} alt="" loading="lazy" />
                    <span className="skill_profileName">{p.platform}</span>
                    <span className="skill_profileBadge">{p.badge}</span>
                    <IconExternal />
                </a>
            ))}
        </div>
    </div>
);

export default SkillsPreview;
