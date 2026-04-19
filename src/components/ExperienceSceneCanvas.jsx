import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import Developer from './Developer.jsx';
import PropTypes from 'prop-types';

const ExperienceSceneCanvas = ({ animationName, isActive, isLowPowerMode, isScrolling, isMobile }) => {
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
            <color attach="background" args={['#f3e8d8']} />
            <ambientLight intensity={4.45} />
            <hemisphereLight
                skyColor="#fff8ef"
                groundColor="#d6c4ae"
                intensity={1.22}
            />
            <spotLight position={[10, 12, 10]} angle={0.22} penumbra={1} intensity={1.25} />
            <directionalLight position={[0, 0, 10]} intensity={0.92} color="#fff3e3" />
            <directionalLight position={[-6, 5, 8]} intensity={0.48} color="#f6dcc4" />
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
                <Developer position-y={-3} scale={3} animationName={animationName} />
            </Suspense>
        </Canvas>
    );
};

ExperienceSceneCanvas.propTypes = {
    animationName: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isLowPowerMode: PropTypes.bool.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default ExperienceSceneCanvas;
