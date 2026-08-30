// Lightweight syntax highlighting. Returns Line[] where Line = Token[] and Token = { t, v }.

const KEYWORD = new Set([
    'const', 'let', 'var', 'function', 'class', 'new', 'typeof', 'instanceof',
    'extends', 'implements', 'static', 'get', 'set', 'super', 'void', 'this',
    'type', 'interface', 'enum', 'as', 'readonly', 'public', 'private',
    'protected', 'declare', 'namespace', 'keyof',
]);
const CONTROL = new Set([
    'import', 'from', 'export', 'default', 'return', 'if', 'else', 'for',
    'while', 'do', 'switch', 'case', 'break', 'continue', 'await', 'async',
    'yield', 'in', 'of', 'try', 'catch', 'finally', 'throw',
]);
const CONSTS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);
const PRIMS = new Set(['string', 'number', 'boolean', 'any', 'unknown', 'never', 'object', 'symbol', 'Promise', 'Array']);

const RE = new RegExp(
    [
        '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)',
        '(`(?:\\\\.|[^`\\\\])*`)',
        '("(?:\\\\.|[^"\\\\])*")',
        "('(?:\\\\.|[^'\\\\])*')",
        '(\\b\\d[\\d_]*(?:\\.\\d+)?\\b)',
        '([A-Za-z_$][\\w$]*)',
        '(\\s+)',
        '([^\\s\\w])',
    ].join('|'),
    'g',
);

function tokenizeLine(line) {
    const raw = [];
    let m;
    RE.lastIndex = 0;
    while ((m = RE.exec(line)) !== null) raw.push(m);

    const out = [];
    let prev = '';
    for (let i = 0; i < raw.length; i += 1) {
        const [, comment, tmpl, dq, sq, num, ident, ws, punct] = raw[i];

        if (comment !== undefined) { out.push({ t: 'comment', v: comment }); continue; }
        if (tmpl !== undefined || dq !== undefined || sq !== undefined) {
            const v = tmpl ?? dq ?? sq;
            let j = i + 1;
            while (raw[j] && raw[j][7] !== undefined) j += 1;
            out.push({ t: raw[j] && raw[j][8] === ':' ? 'prop' : 'string', v });
            continue;
        }
        if (num !== undefined) { out.push({ t: 'number', v: num }); continue; }
        if (ws !== undefined) { out.push({ t: 'plain', v: ws }); continue; }
        if (punct !== undefined) {
            out.push({ t: 'punct', v: punct });
            if (punct.trim()) prev = punct;
            continue;
        }
        // identifier
        let j = i + 1;
        while (raw[j] && raw[j][7] !== undefined) j += 1;
        const next = raw[j] ? raw[j][8] : '';
        let t = 'plain';
        if (KEYWORD.has(ident) || PRIMS.has(ident)) t = 'keyword';
        else if (CONTROL.has(ident)) t = 'control';
        else if (CONSTS.has(ident)) t = 'const';
        else if (prev === '.') t = 'prop';
        else if (next === '(') t = 'fn';
        else if (next === ':') t = 'prop';
        else if (/^[A-Z]/.test(ident)) t = 'type';
        out.push({ t, v: ident });
        prev = ident;
    }
    return out.length ? out : [{ t: 'plain', v: '' }];
}

export function highlightCode(source) {
    // handle block comments spanning lines by pre-splitting
    return String(source).replace(/\t/g, '  ').split('\n').map((l) => (l === '' ? [{ t: 'plain', v: '' }] : tokenizeLine(l)));
}

// Pretty JSON that keeps short primitive arrays on one line.
export function formatJSON(value, indent = 0) {
    const pad = '  '.repeat(indent);
    const padIn = '  '.repeat(indent + 1);
    if (value === null || typeof value !== 'object') return JSON.stringify(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        if (value.every((v) => v === null || typeof v !== 'object')) {
            const inline = `[${value.map((v) => JSON.stringify(v)).join(', ')}]`;
            if (inline.length + pad.length <= 120) return inline;
        }
        return `[\n${value.map((v) => padIn + formatJSON(v, indent + 1)).join(',\n')}\n${pad}]`;
    }
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    return `{\n${keys.map((k) => `${padIn}${JSON.stringify(k)}: ${formatJSON(value[k], indent + 1)}`).join(',\n')}\n${pad}}`;
}

export function highlightJSON(value) {
    return highlightCode(formatJSON(value));
}

function inlineMD(text) {
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
    return String(source).split('\n').map((line) => {
        if (line === '') return [{ t: 'plain', v: '' }];
        if (/^#{1,6}\s/.test(line)) return [{ t: 'heading', v: line }];
        if (/^>\s?/.test(line)) return [{ t: 'mdquote', v: line }];
        if (/^\/\//.test(line)) return [{ t: 'comment', v: line }];
        const b = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (b) return [{ t: 'plain', v: b[1] }, { t: 'punct', v: `${b[2]} ` }, ...inlineMD(b[3])];
        return inlineMD(line);
    });
}

export function highlight(source, lang) {
    if (lang === 'md') return highlightMarkdown(source);
    if (lang === 'json') return typeof source === 'string' ? highlightCode(source) : highlightJSON(source);
    return highlightCode(source);
}
