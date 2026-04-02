import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

const Cube = ({ ...props }) => {
    const { nodes } = useGLTF('/models/cube.glb');

    const texture = useTexture('/textures/cube.png');

    const cubeRef = useRef();

    useGSAP(() => {
        if (!cubeRef.current) return undefined;

        const timeline = gsap
            .timeline({
                repeat: -1,
                repeatDelay: 0.5,
                defaults: {
                    ease: 'none',
                },
            })
            .to(cubeRef.current.rotation, {
                y: `+=${Math.PI * 2}`,
                x: `-=${Math.PI * 2}`,
                duration: 2.5,
            });

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <Float floatIntensity={1.5}>
            <group position={[9, -4, 0]} rotation={[2.6, 0.8, -1.8]} scale={0.74} dispose={null} {...props}>
                <mesh
                    ref={cubeRef}
                    geometry={nodes.Cube.geometry}
                    material={nodes.Cube.material}
                >
                    <meshMatcapMaterial matcap={texture} toneMapped={false} />
                </mesh>
            </group>
        </Float>
    );
};

export default Cube;
