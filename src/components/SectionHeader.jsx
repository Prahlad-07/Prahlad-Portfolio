/* eslint-disable react/prop-types */

const SectionHeader = ({ eyebrow, title, description, className = '' }) => {
    const headerClassName = ['section-header', className].filter(Boolean).join(' ');

    return (
        <div className={headerClassName}>
            {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
            <h2 className="section-title">{title}</h2>
            {description ? <p className="section-description">{description}</p> : null}
        </div>
    );
};

export default SectionHeader;
