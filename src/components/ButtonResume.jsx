import PropTypes from 'prop-types';

const ButtonResume = ({ name, isBeam = false, containerClas = '', onClick }) => {
    return (
        <button type="button" className={`btn ${containerClas}`} onClick={onClick}>
            {isBeam && (
                <span className="relative flex h-3 w-3 shrink-0 overflow-visible">
                    <span className="btn-ping" />
                    <span className="btn-ping_dot" />
                </span>
            )}
            {name}
        </button>
    );
};

ButtonResume.propTypes = {
    name: PropTypes.string.isRequired,
    isBeam: PropTypes.bool,
    containerClas: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonResume;
