// Lightweight syntax highlighting for the IDE-style portfolio.
// Each function returns Line[]  where  Line = Token[]  and  Token = { t, v }.

const KEYWORD = new Set([
    'const', 'let', 'var', 'function', 'class', 'new', 'typeof', 'instanceof',
    'extends', 'implements', 'static', 'get', 'set', 'super', 'void', 'this',
    'type', 'interface', 'enum', 'as', 'readonly', 'public', 'private',
    'protected', 'declare', 'namespace', 'keyof', 'satisfies',
]);
const CONTROL = new Set([
    'import', 'from', 'export', 'default', 'return', 'if', 'else', 'for',
    'while', 'do', 'switch', 'case', 'break', 'continue', 'await', 'async',
    'yield', 'in', 'of', 'try', 'catch', 'finally', 'throw',
]);
const CONSTS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);
const PRIMITIVE_TYPES = new Set(['string', 'number', 'boolean', 'any', 'unknown', 'never', 'object', 'symbol', 'bigint']);

const TOKEN_RE = new RegExp(
    [
        '(\\/\\/[^\\n]*)',                       // 1 line comment
        '(`(?:\\\\.|[^`\\\\])*`)',               // 2 template string
        '("(?:\\\\.|[^"\\\\])*")',               // 3 double string
        "('(?:\\\\.|[^'\\\\])*')",               // 4 single string
        '(\\b\\d[\\d_]*(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)', // 5 number
        '([A-Za-z_$][\\w$]*)',                   // 6 identifier
        '(\\s+)',                                // 7 whitespace
        '([^\\s\\w])',                           // 8 punctuation (single char)
    ].join('|'),
    'g',
);

function tokenizeCodeLine(line) {
    const tokens = [];
    let m;
    TOKEN_RE.lastIndex = 0;
    let prevMeaningful = '';

    const raw = [];
    while ((m = TOKEN_RE.exec(line)) !== null) raw.push(m);

    for (let i = 0; i < raw.length; i += 1) {
        const m2 = raw[i];
        const [, comment, tmpl, dq, sq, num, ident, ws, punct] = m2;

        if (comment !== undefined) {
            tokens.push({ t: 'comment', v: comment });
            continue;
        }
        if (tmpl !== undefined || dq !== undefined || sq !== undefined) {
            const v = tmpl ?? dq ?? sq;
            // string used as an object key?  ("foo":)
            let j = i + 1;
            while (raw[j] && raw[j][7] !== undefined) j += 1;
            const isKey = raw[j] && raw[j][8] === ':';
            tokens.push({ t: isKey ? 'prop' : 'string', v });
            continue;
        }
        if (num !== undefined) {
            tokens.push({ t: 'number', v: num });
            continue;
        }
        if (ws !== undefined) {
            tokens.push({ t: 'plain', v: ws });
            continue;
        }
        if (punct !== undefined) {
            tokens.push({ t: 'punct', v: punct });
            if (punct.trim()) prevMeaningful = punct;
            continue;
        }
        if (ident !== undefined) {
            // look ahead for next meaningful char
            let j = i + 1;
            while (raw[j] && raw[j][7] !== undefined) j += 1;
            const nextPunct = raw[j] ? raw[j][8] : '';

            let t = 'plain';
            if (KEYWORD.has(ident)) t = 'keyword';
            else if (CONTROL.has(ident)) t = 'control';
            else if (CONSTS.has(ident)) t = 'const';
            else if (prevMeaningful === '.') t = 'prop';
            else if (nextPunct === '(') t = 'fn';
            else if (nextPunct === ':') t = 'prop';
            else if (PRIMITIVE_TYPES.has(ident)) t = 'keyword';
            else if (/^[A-Z]/.test(ident)) t = 'type';

            tokens.push({ t, v: ident });
            prevMeaningful = ident;
            continue;
        }
    }
    return tokens;
}

export function highlightCode(source) {
    return source.replace(/\t/g, '  ').split('\n').map((line) => {
        if (line.trim() === '') return [{ t: 'plain', v: '' }];
        return tokenizeCodeLine(line);
    });
}

// Pretty JSON that keeps short primitive arrays on a single line (VS Code-ish).
export function formatJSON(value, indent = 0) {
    const pad = '  '.repeat(indent);
    const padIn = '  '.repeat(indent + 1);

    if (value === null || typeof value !== 'object') return JSON.stringify(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        const allPrimitive = value.every((v) => v === null || typeof v !== 'object');
        if (allPrimitive) {
            const inline = `[ ${value.map((v) => JSON.stringify(v)).join(', ')} ]`;
            if (inline.length + pad.length <= 118) return inline;
        }
        const items = value.map((v) => padIn + formatJSON(v, indent + 1));
        return `[\n${items.join(',\n')}\n${pad}]`;
    }

    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    const items = keys.map((k) => `${padIn}${JSON.stringify(k)}: ${formatJSON(value[k], indent + 1)}`);
    return `{\n${items.join(',\n')}\n${pad}}`;
}

export function highlightJSON(value) {
    return highlightCode(formatJSON(value));
}

// ---- Markdown ----------------------------------------------------------------

function inlineMarkdown(text) {
    const tokens = [];
    const re = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(_[^_]+_)/g;
    let last = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) tokens.push({ t: 'plain', v: text.slice(last, m.index) });
        if (m[1]) tokens.push({ t: 'bold', v: m[1].slice(2, -2) });
        else if (m[2]) tokens.push({ t: 'string', v: m[2] });
        else if (m[3]) tokens.push({ t: 'link', v: m[3].slice(1, m[3].indexOf(']')) });
        else if (m[4]) tokens.push({ t: 'mdquote', v: m[4].slice(1, -1) });
        last = re.lastIndex;
    }
    if (last < text.length) tokens.push({ t: 'plain', v: text.slice(last) });
    return tokens.length ? tokens : [{ t: 'plain', v: text }];
}

export function highlightMarkdown(source) {
    return source.split('\n').map((line) => {
        if (line.trim() === '') return [{ t: 'plain', v: '' }];
        if (/^#{1,6}\s/.test(line)) return [{ t: 'heading', v: line }];
        if (/^>\s?/.test(line)) return [{ t: 'mdquote', v: line }];
        const bullet = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (bullet) {
            return [
                { t: 'plain', v: bullet[1] },
                { t: 'punct', v: `${bullet[2]} ` },
                ...inlineMarkdown(bullet[3]),
            ];
        }
        return inlineMarkdown(line);
    });
}
