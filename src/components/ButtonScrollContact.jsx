const ButtonScrollContact = ({ name, isBeam = false, containerClas }) => {
    const handleScroll = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <button type="button" className={`btn ${containerClas}`} onClick={handleScroll}>
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

export default ButtonScrollContact;
