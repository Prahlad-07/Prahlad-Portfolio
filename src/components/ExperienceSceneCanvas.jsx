import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import Developer from './Developer.jsx';
import PropTypes from 'prop-types';

const ExperienceSceneCanvas = ({ animationName, isActive, isMobile }) => {
    return (
        <Canvas
            dpr={isMobile ? [0.7, 1] : [0.85, 1.2]}
            frameloop={isActive ? 'always' : 'never'}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
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
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={!isMobile && isActive}
                maxPolarAngle={Math.PI / 2}
            />
            <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3} scale={3} animationName={animationName} />
            </Suspense>
        </Canvas>
    );
};

ExperienceSceneCanvas.propTypes = {
    animationName: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default ExperienceSceneCanvas;
