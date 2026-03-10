import {useRef} from 'react'
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";

const HeroCamera = ({children, isMobile}) => {
    const groupRef = useRef();
    const targetCameraPosition = isMobile ? [0, 0, 17.8] : [0, 0, 20];

    useFrame((state, delta) => {
        easing.damp3(state.camera.position, targetCameraPosition, 0.25, delta);

        if (groupRef.current && !isMobile) {
            easing.dampE(groupRef.current.rotation, [-state.pointer.y/3, -state.pointer.x/5, 0], 0.25, delta)
        }
    })

    return (
        <group ref={groupRef} scale={isMobile ? 1.22 : 1.2}>
            {children}
        </group>
    )
}
export default HeroCamera
