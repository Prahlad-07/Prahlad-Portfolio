import { aboutHighlights, achievements, personalInfo } from '../../constants/index.js';

const AboutPreview = () => (
    <div className="pv pv-about" data-stagger>
        <p className="pv_run">$ ts-node about.ts</p>

        <p className="about_lead">
            I build backends that work — APIs, databases, system design, and the problems that
            need real thinking. Competitive programming taught me to stay calm under pressure;
            I bring that rigor to everything.
        </p>

        <div className="about_cols" data-stagger>
            <div>
                <p className="pv_label">how I work</p>
                <ul className="pv_list pv_list--arrow">
                    {aboutHighlights.map((h) => (
                        <li key={h.id}>
                            <b>{h.title}</b> — {h.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="pv_label">achievements</p>
                <ul className="pv_list pv_list--check">
                    {achievements.map((a) => (
                        <li key={a}>{a}</li>
                    ))}
                </ul>
            </div>
        </div>

        <p className="about_edu">
            <span className="pv_label">education</span> B.Tech IT · GEC Bilaspur · 2022–2026 · CGPA 8.1
        </p>
        <p className="about_edu">
            <span className="pv_label">currently</span> {personalInfo.availability.toLowerCase()}
        </p>
    </div>
);

export default AboutPreview;
