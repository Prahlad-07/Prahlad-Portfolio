import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightMarkdown } from '../../components/ide/highlight.js';
import { IconPlay } from '../../components/ide/icons.jsx';
import { clientReviews } from '../../constants/index.js';

const MD = `# Recommendations

> From mentors, engineering leads, and teammates I've built and shipped with.

${clientReviews
        .map((r) => `## ${r.name}\n_${r.position}_\n\n> ${r.review}`)
        .join('\n\n')}`;

const RecommendationsFile = () => (
    <FileShell id="recommendations">
        <CodeBlock lines={highlightMarkdown(MD)} />

        <div className="preview">
            <div className="preview_bar">
                <IconPlay />
                <span>Preview — recommendations.md</span>
            </div>
            <div className="preview_body">
                <div className="recs">
                    {clientReviews.map((r) => (
                        <div className="rec" key={r.id}>
                            <p className="rec_quote">{r.review}</p>
                            <div className="rec_by">
                                <img src={r.img} alt={r.name} loading="lazy" />
                                <div>
                                    <b>{r.name}</b>
                                    <span>{r.position}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </FileShell>
);

export default RecommendationsFile;
