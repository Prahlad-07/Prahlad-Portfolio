import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import TitleBar from './TitleBar.jsx';
import FileRail from './FileRail.jsx';
import EditorPane from './EditorPane.jsx';
import PreviewPane from './PreviewPane.jsx';
import Terminal from './Terminal.jsx';
import StatusBar from './StatusBar.jsx';

const SplitLayout = () => {
    const tablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [view, setView] = useState('preview');

    return (
        <div className={`shell ${tablet ? 'shell--tablet' : 'shell--desktop'}`}>
            <TitleBar compact={tablet} />

            <div className="shell_main">
                {!tablet && <FileRail />}

                {tablet && (
                    <div className="seg" role="tablist" aria-label="View">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={view === 'code'}
                            className={view === 'code' ? 'is-active' : ''}
                            onClick={() => setView('code')}
                        >
                            &lt;/&gt; Code
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={view === 'preview'}
                            className={view === 'preview' ? 'is-active' : ''}
                            onClick={() => setView('preview')}
                        >
                            ▦ Preview
                        </button>
                    </div>
                )}

                <EditorPane hidden={tablet && view !== 'code'} />
                <PreviewPane hidden={tablet && view !== 'preview'} />
            </div>

            <Terminal variant="docked" />
            <StatusBar />
        </div>
    );
};

export default SplitLayout;
