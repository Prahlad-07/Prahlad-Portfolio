/* eslint-disable react/prop-types */
const CLASS = {
    keyword: 'tk-keyword',
    control: 'tk-control',
    string: 'tk-string',
    number: 'tk-number',
    comment: 'tk-comment',
    prop: 'tk-prop',
    fn: 'tk-fn',
    type: 'tk-type',
    const: 'tk-const',
    punct: 'tk-punct',
    plain: 'tk-plain',
    heading: 'tk-heading',
    bold: 'tk-bold',
    mdquote: 'tk-mdquote',
    link: 'tk-link',
};

const Span = ({ t, v }) => (t === 'plain' ? v : <span className={CLASS[t] || 'tk-plain'}>{v}</span>);

/**
 * lines: Line[]  (Token[][])
 * visibleChars: number | null  — reveal only this many chars, then a caret
 * caret: boolean               — blinking caret at the very end when fully shown
 * gutter: boolean              — show line numbers (default true)
 */
const CodeBlock = ({ lines, visibleChars = null, caret = false, gutter = true }) => {
    let budget = visibleChars;
    const done = visibleChars === null;

    return (
        <pre className={`code ${gutter ? '' : 'code--bare'}`} aria-label="source code">
            {lines.map((tokens, li) => {
                if (!done && budget <= 0 && li > 0) return null;
                const rendered = [];
                let lineHasCaret = false;

                for (let ti = 0; ti < tokens.length; ti += 1) {
                    const tok = tokens[ti];
                    if (done) {
                        rendered.push(<Span key={ti} t={tok.t} v={tok.v} />);
                        continue;
                    }
                    if (budget <= 0) { lineHasCaret = true; break; }
                    if (tok.v.length <= budget) {
                        rendered.push(<Span key={ti} t={tok.t} v={tok.v} />);
                        budget -= tok.v.length;
                    } else {
                        rendered.push(<Span key={ti} t={tok.t} v={tok.v.slice(0, budget)} />);
                        budget = 0;
                        lineHasCaret = true;
                        break;
                    }
                }

                const showCaretHere = !done && lineHasCaret;
                if (!done && !lineHasCaret && budget > 0) budget -= 1;
                const atEnd = caret && done && li === lines.length - 1;

                return (
                    <span className="cl" key={li}>
                        {gutter && <span className="ln" aria-hidden="true">{li + 1}</span>}
                        <span className="cl_code">
                            {rendered.length ? rendered : ' '}
                            {(showCaretHere || atEnd) && <span className="caret" aria-hidden="true" />}
                        </span>
                    </span>
                );
            })}
        </pre>
    );
};

export default CodeBlock;
