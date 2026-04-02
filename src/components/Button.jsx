const Button = ({name, isBeam = false, containerClas}) => {
    return (
        <button type="button" className={`btn ${containerClas}`}>
            {isBeam && (
                <span className="relative flex h-3 w-3 shrink-0 overflow-visible">
                    <span className="btn-ping"/>
                    <span className="btn-ping_dot"/>
                </span>
            )}
            {name}
        </button>
    )
}
export default Button
