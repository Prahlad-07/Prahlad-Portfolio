import ErrorBoundary from './components/ErrorBoundary.jsx';
import { IDEProvider, useIDE } from './components/ide/IDEContext.jsx';
import TitleBar from './components/ide/TitleBar.jsx';
import ActivityBar from './components/ide/ActivityBar.jsx';
import Explorer from './components/ide/Explorer.jsx';
import Tabs from './components/ide/Tabs.jsx';
import StatusBar from './components/ide/StatusBar.jsx';
import CommandPalette from './components/ide/CommandPalette.jsx';
import ReadmeFile from './sections/files/ReadmeFile.jsx';
import AboutFile from './sections/files/AboutFile.jsx';
import ExperienceFile from './sections/files/ExperienceFile.jsx';
import SkillsFile from './sections/files/SkillsFile.jsx';
import ProjectsFile from './sections/files/ProjectsFile.jsx';
import RecommendationsFile from './sections/files/RecommendationsFile.jsx';
import ContactFile from './sections/files/ContactFile.jsx';
import { personalInfo } from './constants/index.js';

const wrap = (label, node) => <ErrorBoundary fallbackText={`${label} failed to load.`}>{node}</ErrorBoundary>;

const EditorEnd = () => (
    <div className="editor-end">
        <span>{'// end of workspace — thanks for scrolling'}</span>
        <span>
            {'// '}
            <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">github</a>
            {'  ·  '}
            <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
            {'  ·  '}
            <a href={personalInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
            {'  ·  '}
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </span>
        <span>{`// © ${new Date().getFullYear()} ${personalInfo.fullName}. Built as a code editor with React.`}</span>
    </div>
);

const IDEShell = () => {
    const { scrollRef } = useIDE();
    return (
        <div className="ide">
            <TitleBar />
            <div className="ide-body">
                <ActivityBar />
                <Explorer />
                <main className="editor">
                    <Tabs />
                    <div className="editor-scroll" ref={scrollRef}>
                        {wrap('README', <ReadmeFile />)}
                        {wrap('about.jsx', <AboutFile />)}
                        {wrap('experience.json', <ExperienceFile />)}
                        {wrap('skills.json', <SkillsFile />)}
                        {wrap('projects.tsx', <ProjectsFile />)}
                        {wrap('recommendations.md', <RecommendationsFile />)}
                        {wrap('contact.ts', <ContactFile />)}
                        <EditorEnd />
                    </div>
                </main>
            </div>
            <StatusBar />
            <CommandPalette />
        </div>
    );
};

const App = () => (
    <IDEProvider>
        <IDEShell />
    </IDEProvider>
);

export default App;
