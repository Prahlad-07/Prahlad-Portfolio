import SectionHeader from '../components/SectionHeader.jsx';
import { codingProfiles, skillGroups } from '../constants/index.js';

const Skills = () => {
    return (
        <section className="section-wrap" id="skills">
            <div className="shell">
                <SectionHeader
                    eyebrow="Skills"
                    title="A stack shaped around shipping production-quality software."
                    description="My toolkit is strongest in backend engineering, but it is broad enough to build complete products with good architecture, thoughtful interfaces, and reliable delivery."
                />

                <div className="skills-grid">
                    {skillGroups.map((group) => (
                        <article
                            key={group.id}
                            className="premium-card skill-card"
                            style={{
                                '--skill-accent': group.accent,
                                '--skill-surface': `${group.accent}14`,
                            }}
                        >
                            <div className="skill-card_header">
                                <span className="skill-accent_bar" aria-hidden="true" />
                                <div>
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                </div>
                            </div>

                            <div className="skill-pill_group">
                                {group.items.map((item) => (
                                    <span key={item} className="skill-pill">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <article className="premium-card skills-proof_card">
                    <div className="skills-proof_intro">
                        <span className="card-label">Proof of craft</span>
                        <h3>Competitive programming and open-source consistency reinforce the engineering fundamentals behind the product work.</h3>
                    </div>

                    <div className="profile-grid">
                        {codingProfiles.map((profile) => (
                            <a
                                key={profile.id}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-card_refined"
                                style={{
                                    '--profile-accent': profile.color,
                                    '--profile-surface': `${profile.color}12`,
                                }}
                            >
                                <div className="profile-card_topline">
                                    <div className="profile-platform_wrap">
                                        <span className="profile-icon_wrap">
                                            <img
                                                src={profile.icon}
                                                alt={`${profile.platform} logo`}
                                                className="profile-platform_icon"
                                                loading="lazy"
                                            />
                                        </span>
                                        <div>
                                            <strong>{profile.platform}</strong>
                                            <p>@{profile.handle}</p>
                                        </div>
                                    </div>
                                    <span className="profile-badge_refined">{profile.badge}</span>
                                </div>

                                <p className="profile-highlight_refined">{profile.highlight}</p>
                            </a>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Skills;
