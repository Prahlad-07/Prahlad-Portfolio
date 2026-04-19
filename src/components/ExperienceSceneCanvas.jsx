import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import Developer from './Developer.jsx';
import PropTypes from 'prop-types';

const ExperienceSceneCanvas = ({ animationName, isActive, isLowPowerMode, isMobile }) => {
    const dprRange = isLowPowerMode ? [0.55, 0.85] : isMobile ? [0.65, 0.95] : [0.85, 1];

    return (
        <Canvas
            dpr={dprRange}
            frameloop={isActive ? 'always' : 'never'}
            resize={{ scroll: false, debounce: { scroll: 60, resize: 0 } }}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: isLowPowerMode ? 'default' : 'high-performance',
                stencil: false,
            }}
            performance={{ min: isLowPowerMode ? 0.35 : 0.5, debounce: 200 }}
        >
            <color attach="background" args={['#f3e8d8']} />
            <ambientLight intensity={4.2} />
            <hemisphereLight
                skyColor="#fff8ef"
                groundColor="#d6c4ae"
                intensity={1.15}
            />
            <spotLight position={[10, 12, 10]} angle={0.22} penumbra={1} intensity={1.15} />
            <directionalLight position={[0, 0, 10]} intensity={0.8} color="#fff3e3" />
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
    isMobile: PropTypes.bool.isRequired,
};

export default ExperienceSceneCanvas;
