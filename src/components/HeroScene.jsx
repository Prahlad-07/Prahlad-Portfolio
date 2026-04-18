import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import HackerRoom from './HackerRoom.jsx';
import Target from './Target.jsx';
import ReactLogo from './ReactLogo.jsx';
import Cube from './Cube.jsx';
import Rings from './Rings.jsx';
import HeroCamera from './HeroCamera.jsx';
import PropTypes from 'prop-types';

const HeroScene = ({ isMobile, isActive, showDecor, sizes }) => {
    return (
        <Canvas
            className="w-full h-full"
            dpr={isMobile ? [0.7, 1] : [0.85, 1.2]}
            frameloop={isActive ? 'always' : 'never'}
            gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
            performance={{ min: 0.5 }}
            camera={{ fov: isMobile ? 48 : 45, near: 0.1, far: 1000 }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <PerspectiveCamera makeDefault position={[0, 0, 23]} />
                <HeroCamera isMobile={isMobile}>
                    <HackerRoom
                        position={sizes.deskPosition}
                        rotation={[0, -Math.PI, 0]}
                        scale={sizes.deskScale}
                    />
                </HeroCamera>

                {showDecor && (
                    <group>
                        <Target position={sizes.targetPosition} />
                        <ReactLogo position={sizes.reactLogoPosition} />
                        <Cube position={sizes.cubePosition} />
                        <Rings position={sizes.ringPosition} />
                    </group>
                )}

                <ambientLight intensity={isMobile ? 0.95 : 1} />
                <directionalLight position={[10, 10, 10]} intensity={isMobile ? 0.45 : 0.55} />
            </Suspense>
        </Canvas>
    );
};

HeroScene.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    showDecor: PropTypes.bool.isRequired,
    sizes: PropTypes.shape({
        deskPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        deskScale: PropTypes.number.isRequired,
        targetPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        reactLogoPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        cubePosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        ringPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
};

export default HeroScene;
