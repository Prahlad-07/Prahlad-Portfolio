import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import DemoComputer from './DemoComputer.jsx';
import PropTypes from 'prop-types';

const ProjectSceneCanvas = ({ texture, isActive, isMobile }) => {
    return (
        <Canvas
            dpr={isMobile ? [0.7, 1] : [0.85, 1.2]}
            frameloop={isActive ? 'always' : 'never'}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
        >
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
                <Suspense fallback={<CanvasLoader />}>
                    <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                        <DemoComputer texture={texture} />
                    </group>
                </Suspense>
            </Center>
            <OrbitControls
                maxPolarAngle={Math.PI / 2}
                enableZoom={false}
                enablePan={false}
                enableRotate={!isMobile && isActive}
            />
        </Canvas>
    );
};

ProjectSceneCanvas.propTypes = {
    texture: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default ProjectSceneCanvas;
