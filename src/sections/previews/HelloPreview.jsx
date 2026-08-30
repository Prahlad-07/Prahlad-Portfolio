import { personalInfo, heroMetrics } from '../../constants/index.js';
import { IconExternal } from '../../components/ide/icons.jsx';

const HelloPreview = () => (
    <div className="pv pv-hello" data-stagger>
        <p className="pv_run">$ node hello.ts</p>

        <div className="hello_card">
            <img
                className="hello_photo"
                src="/assets/Prahlad_Yadav_Photo.jpeg"
                alt="Prahlad Yadav"
                loading="eager"
                decoding="async"
            />
            <div className="hello_body">
                <h1 className="hello_name">{personalInfo.fullName}</h1>
                <p className="hello_role">
                    {personalInfo.role} · {personalInfo.location}
                </p>
                <p className="hello_line">
                    I build <em>fast</em> backends, solve <em>hard</em> problems, ship <em>clean</em> code.
                </p>

                <div className="pv_actions">
                    <a className="btn" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <IconExternal /> Resume
                    </a>
                    <a className="btn btn--ghost" href={`mailto:${personalInfo.email}`}>
                        Email
                    </a>
                    <a className="btn btn--ghost" href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a className="btn btn--ghost" href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>

        <div className="hello_stats" data-stagger>
            {heroMetrics.map((m) => (
                <div className="hello_stat" key={m.id}>
                    <b>{m.value}</b>
                    <span>{m.label}</span>
                </div>
            ))}
        </div>

        <p className="pv_hint">try the terminal below — <code>ls</code>, <code>open projects</code>, <code>cat hello.ts</code></p>
    </div>
);

export default HelloPreview;
