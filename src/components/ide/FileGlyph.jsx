/* eslint-disable react/prop-types */
const GLYPH = { ts: 'TS', json: '{}', react: 'JSX', md: 'MD' };
const FileGlyph = ({ icon, className = '' }) => (
    <span className={`glyph glyph--${icon} ${className}`} aria-hidden="true">
        {GLYPH[icon] ?? '·'}
    </span>
);
export default FileGlyph;
