import PropTypes from 'prop-types';

const Button = ({ name, isBeam = false, containerClas = '', href, target, rel, onClick }) => {
    const content = (
        <>
            {isBeam && (
                <span className="relative flex h-3 w-3 shrink-0 overflow-visible">
                    <span className="btn-ping" />
                    <span className="btn-ping_dot" />
                </span>
            )}
            {name}
        </>
    );

    if (href) {
        return (
            <a href={href} target={target} rel={rel} className={`btn ${containerClas}`}>
                {content}
            </a>
        );
    }

    return (
        <button type="button" className={`btn ${containerClas}`} onClick={onClick}>
            {content}
        </button>
    );
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    isBeam: PropTypes.bool,
    containerClas: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
