import { useEffect, useState } from 'react';

const DEFAULT_FLAGS = {
    isSmall: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false,
    saveData: false,
    slowConnection: false,
    canRenderHeavyScene: true,
};

const getConnection = () => {
    if (typeof navigator === 'undefined') return null;
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
};

const readFlags = () => {
    if (typeof window === 'undefined') return DEFAULT_FLAGS;

    const width = window.innerWidth;
    const isSmall = width <= 440;
    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;
    const isDesktop = width > 1024;

    const prefersReducedMotion = typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const connection = getConnection();
    const saveData = Boolean(connection?.saveData);
    const effectiveType = connection?.effectiveType || '';
    const slowConnection = effectiveType === 'slow-2g' || effectiveType === '2g';

    const canRenderHeavyScene = !isMobile && !prefersReducedMotion && !saveData && !slowConnection;

    return {
        isSmall,
        isMobile,
        isTablet,
        isDesktop,
        prefersReducedMotion,
        saveData,
        slowConnection,
        canRenderHeavyScene,
    };
};

const addMediaListener = (mediaQueryList, listener) => {
    if (!mediaQueryList) return () => {};

    if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
    }

    if (typeof mediaQueryList.addListener === 'function') {
        mediaQueryList.addListener(listener);
        return () => mediaQueryList.removeListener(listener);
    }

    return () => {};
};

export const useAdaptiveFlags = () => {
    const [flags, setFlags] = useState(readFlags);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const motionQuery = typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;
        const connection = getConnection();

        const updateFlags = () => {
            setFlags(readFlags());
        };

        updateFlags();
        window.addEventListener('resize', updateFlags, { passive: true });
        const removeMotionListener = addMediaListener(motionQuery, updateFlags);
        connection?.addEventListener?.('change', updateFlags);

        return () => {
            window.removeEventListener('resize', updateFlags);
            removeMotionListener();
            connection?.removeEventListener?.('change', updateFlags);
        };
    }, []);

    return flags;
};

export default useAdaptiveFlags;
