import { codingProfiles } from "../constants/index.js";

const CodingProfiles = () => {
    return (
        <section className="c-space my-24 section-wrap" id="coding-profiles">
            <div className="coding-spotlight">
                <div className="coding-spotlight_head">
                    <p className="grid-headtext">Coding Profiles</p>
                    <p className="grid-subtext">
                        Competitive programming and open-source consistency across LeetCode, HackerRank, Codeforces, CodeChef, GitHub, and GeeksforGeeks.
                    </p>
                </div>

                <div className="profiles-grid profiles-grid_compact">
                    {codingProfiles.map((profile) => (
                        <a
                            key={profile.id}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-card profile-card_compact profile-card_link profile-card_animated"
                        >
                            <div className="profile-card_top">
                                <div className="profile-platform_wrap">
                                    <span
                                        className="profile-platform_iconWrap"
                                        style={{
                                            borderColor: `${profile.color}66`,
                                            backgroundColor: `${profile.color}1f`,
                                        }}
                                    >
                                        <img src={profile.icon} alt={`${profile.platform} logo`} className="profile-platform_icon" loading="lazy"/>
                                    </span>
                                    <p className="profile-platform">{profile.platform}</p>
                                </div>
                                <span className="profile-badge">{profile.badge}</span>
                            </div>
                            <p className="profile-handle">@{profile.handle}</p>
                            <p className="profile-highlight">{profile.highlight}</p>
                            <span className="profile-link">
                                Open Profile
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CodingProfiles;
