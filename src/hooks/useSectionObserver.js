import { useEffect, useRef, useState } from 'react';

const useSectionObserver = ({
    threshold = 0.16,
    rootMargin = '0px',
    triggerOnce = false,
} = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    useEffect(() => {
        const target = elementRef.current;
        if (!target) return undefined;

        if (typeof window.IntersectionObserver === 'undefined') {
            setIsVisible(true);
            setHasBeenVisible(true);
            return undefined;
        }

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                const currentlyVisible = entry.isIntersecting;
                setIsVisible(currentlyVisible);

                if (currentlyVisible) {
                    setHasBeenVisible(true);
                    if (triggerOnce) observer.disconnect();
                }
            },
            { threshold, rootMargin },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return {
        elementRef,
        isVisible,
        hasBeenVisible,
    };
};

export default useSectionObserver;
