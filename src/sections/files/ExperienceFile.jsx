import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightJSON } from '../../components/ide/highlight.js';
import { IconPlay } from '../../components/ide/icons.jsx';
import { workExperiences } from '../../constants/index.js';
import useAdaptiveFlags from '../../hooks/useAdaptiveFlags.js';
import useTheme from '../../hooks/useTheme.js';

const loadScene = () => import('../../components/ExperienceSceneCanvas.jsx');
const ExperienceSceneCanvas = lazy(loadScene);

const experienceJSON = workExperiences.map((w) => ({
    company: w.name,
    title: w.pos,
    period: w.duration,
    summary: w.summary,
    highlights: w.highlights.length,
}));

const ExperienceFile = () => {
    const [animationName, setAnimationName] = useState('idle');
    const [isScrolling, setIsScrolling] = useState(false);
    const [visible, setVisible] = useState(false);
    const [seen, setSeen] = useState(false);
    const [webgl, setWebgl] = useState(true);
    const stageRef = useRef(null);
    const scrollTimer = useRef(0);

    const { isDark } = useTheme();
    const { isMobile, prefersReducedMotion, saveData, slowConnection } = useAdaptiveFlags();
    const lowPower = saveData || slowConnection;
    const renderScene = seen && webgl;
    const animateScene = visible && !prefersReducedMotion && (!(isMobile || lowPower) || !isScrolling);

    useEffect(() => {
        try {
            const c = document.createElement('canvas');
            setWebgl(Boolean(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl')));
        } catch {
            setWebgl(false);
        }
        if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(() => void loadScene());
        else window.setTimeout(() => void loadScene(), 600);
    }, []);

    useEffect(() => {
        const stage = stageRef.current;
        const root = document.querySelector('.editor-scroll');
        if (!stage || typeof IntersectionObserver === 'undefined') {
            setSeen(true);
            setVisible(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
                if (entry.isIntersecting) setSeen(true);
            },
            { root, rootMargin: '400px 0px', threshold: 0.01 },
        );
        io.observe(stage);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const scroller = document.querySelector('.editor-scroll');
        if (!scroller) return undefined;
        const onScroll = () => {
            setIsScrolling(true);
            window.clearTimeout(scrollTimer.current);
            scrollTimer.current = window.setTimeout(() => setIsScrolling(false), 150);
        };
        scroller.addEventListener('scroll', onScroll, { passive: true });
        return () => scroller.removeEventListener('scroll', onScroll);
    }, []);

    const stageInner = renderScene ? (
        <Suspense fallback={<div className="xp_stagePlaceholder"><span className="canvas-loader" /></div>}>
            <ExperienceSceneCanvas
                animationName={animationName}
                isActive={animateScene}
                isDark={isDark}
                isLowPowerMode={lowPower}
                isScrolling={isScrolling}
                isMobile={isMobile}
            />
        </Suspense>
    ) : (
        <div className="xp_stagePlaceholder">
            {webgl ? <span className="canvas-loader" /> : <img src="/assets/Prahlad_Yadav_Photo.jpeg" alt="Prahlad Yadav" />}
        </div>
    );

    return (
        <FileShell id="experience">
            <CodeBlock lines={highlightJSON(experienceJSON)} />

            <div className="preview">
                <div className="preview_bar">
                    <IconPlay />
                    <span>Run — experience.json · hover a role to greet</span>
                </div>
                <div className="preview_body">
                    <div className="xp">
                        <div className="xp_stage" ref={stageRef}>{stageInner}</div>

                        <div className="xp_roles">
                            {workExperiences.map((w) => (
                                <div
                                    key={w.id}
                                    className="xp_role"
                                    tabIndex={0}
                                    role="button"
                                    onPointerOver={() => setAnimationName(w.animation)}
                                    onPointerOut={() => setAnimationName('idle')}
                                    onFocus={() => setAnimationName(w.animation)}
                                    onBlur={() => setAnimationName('idle')}
                                >
                                    <div className="xp_roleTop">
                                        <img src={w.icon} alt="" loading="lazy" />
                                        <div>
                                            <div className="xp_roleName">{w.pos}</div>
                                            <div className="xp_roleOrg">{w.name}</div>
                                        </div>
                                        <span className="xp_rolePeriod">{w.duration}</span>
                                    </div>
                                    <p className="xp_roleSummary">{w.summary}</p>
                                    <ul className="xp_rolePoints">
                                        {w.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FileShell>
    );
};

export default ExperienceFile;
