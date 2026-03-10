const ButtonResume = ({ name, isBeam = false, containerClas, onClick }) => {
    return (
        <button type="button" className={`btn ${containerClas}`} onClick={onClick}>
            {isBeam && (
                <span className="relative flex h-3 w-3">
                    <span className="btn-ping" />
                    <span className="btn-ping_dot" />
                </span>
            )}
            {name}
        </button>
    );
};

export default ButtonResume;
