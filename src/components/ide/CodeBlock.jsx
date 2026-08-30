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
    mdquote: 'tk-md-quote',
    link: 'tk-link',
};

const Token = ({ t, v }) => {
    if (t === 'plain') return v;
    return <span className={CLASS[t] || 'tk-plain'}>{v}</span>;
};

const CodeBlock = ({ lines, startLine = 1 }) => (
    <div className="code" style={{ counterReset: `line ${startLine - 1}` }}>
        {lines.map((tokens, i) => (
            <div className="cl" key={i}>
                <span className="cl_code">
                    {tokens.length === 1 && tokens[0].v === '' ? (
                        ' '
                    ) : (
                        tokens.map((tok, j) => (
                            <Token key={j} t={tok.t} v={tok.v} />
                        ))
                    )}
                </span>
            </div>
        ))}
    </div>
);

export default CodeBlock;
