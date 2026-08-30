import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import Developer from './Developer.jsx';
import PropTypes from 'prop-types';

const ExperienceSceneCanvas = ({
    animationName,
    isActive,
    isDark,
    isLowPowerMode,
    isScrolling,
    isMobile,
}) => {
    const dprRange = isLowPowerMode
        ? isScrolling
            ? [0.82, 0.98]
            : [1, 1.18]
        : isMobile
            ? isScrolling
                ? [0.9, 1.05]
                : [1.05, 1.22]
            : isScrolling
                ? [1, 1.18]
                : [1.2, 1.5];

    return (
        <Canvas
            dpr={dprRange}
            frameloop={isActive ? 'always' : 'never'}
            resize={{ scroll: false, debounce: { scroll: 60, resize: 0 } }}
            gl={{
                antialias: !isLowPowerMode,
                alpha: true,
                powerPreference: 'high-performance',
                stencil: false,
            }}
            performance={{ min: isLowPowerMode ? 0.52 : 0.72, debounce: 180 }}
        >
            <ambientLight intensity={isDark ? 3.85 : 4.45} />
            <hemisphereLight
                skyColor={isDark ? '#d8e5ff' : '#fff8ef'}
                groundColor={isDark ? '#243144' : '#d6c4ae'}
                intensity={isDark ? 1.05 : 1.22}
            />
            <spotLight
                position={[10, 12, 10]}
                angle={0.22}
                penumbra={1}
                intensity={isDark ? 1.1 : 1.25}
                color={isDark ? '#8ee8de' : '#ffffff'}
            />
            <directionalLight
                position={[0, 0, 10]}
                intensity={isDark ? 0.86 : 0.92}
                color={isDark ? '#e2ecff' : '#fff3e3'}
            />
            <directionalLight
                position={[-6, 5, 8]}
                intensity={isDark ? 0.38 : 0.48}
                color={isDark ? '#5f88d8' : '#f6dcc4'}
            />
            {!isMobile && isActive ? (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate
                    enableDamping={false}
                    maxPolarAngle={Math.PI / 2}
                />
            ) : null}
            <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3.2} scale={2.9} animationName={animationName} />
            </Suspense>
        </Canvas>
    );
};

ExperienceSceneCanvas.propTypes = {
    animationName: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDark: PropTypes.bool.isRequired,
    isLowPowerMode: PropTypes.bool.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default ExperienceSceneCanvas;
