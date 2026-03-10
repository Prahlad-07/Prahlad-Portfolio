import {useRef} from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";


const Target = (props) => {
    const targetRef = useRef()

    useGSAP(() => {
       if (!targetRef.current) return undefined;
       const tween = gsap.to(targetRef.current.position, {
           y: targetRef.current.position.y + 0.5,
           duration: 1.5,
           repeat: -1,
           yoyo: true,
           ease: 'sine.inOut',
       })

       return () => {
           tween.kill();
       };
    }, []);

    return (
        <group {...props} ref={targetRef} rotation={[0, Math.PI/5, 0]} scale={1.5}>
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
                <meshStandardMaterial color="#8b8f99" metalness={0.3} roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.55, 0.08, 24, 64]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.35, 0.08, 24, 64]} />
                <meshStandardMaterial color="#ff3b30" />
            </mesh>
            <mesh position={[0, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.16, 0.08, 24, 64]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.45, 0.55, 0.18, 24]} />
                <meshStandardMaterial color="#1f2430" metalness={0.35} roughness={0.55} />
            </mesh>
        </group>
    )
}

export default Target
