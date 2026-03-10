import {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "../components/CanvasLoader.jsx";
import HackerRoom from "../components/HackerRoom.jsx";
import {PerspectiveCamera} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {
    const heroRef = useRef(null);
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const isSmall = useMediaQuery({ maxWidth: 440});
    const isMobile = useMediaQuery({ maxWidth: 768});
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024});

    const sizes = useMemo(
        () => calculateSizes(isSmall, isMobile, isTablet),
        [isSmall, isMobile, isTablet],
    );

    useEffect(() => {
        const section = heroRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            { threshold: 0.15 },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={heroRef} className="min-h-[100svh] w-full flex flex-col relative hero-surface overflow-hidden" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-24 c-space gap-3 relative z-20">
                <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
                    Hi, I am Prahlad <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">
                    Software Engineer
                </p>
            </div>
            <div className="w-full h-full absolute inset-0 hero-canvas-shell">
                <Canvas
                    className="w-full h-full"
                    dpr={isMobile ? [0.8, 1.05] : [1, 1.35]}
                    frameloop={isHeroVisible ? 'always' : 'demand'}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                    performance={{ min: 0.5 }}
                    camera={{ fov: isMobile ? 48 : 45, near: 0.1, far: 1000 }}
                >
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 23]}/>
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                position={sizes.deskPosition}
                                rotation={[0, -Math.PI, 0]}
                                scale={sizes.deskScale}
                            />
                        </HeroCamera>
                        {!isMobile && (
                            <group>
                                <Target position={sizes.targetPosition}/>
                                <ReactLogo position={sizes.reactLogoPosition}/>
                                <Cube position={sizes.cubePosition}/>
                                <Rings position={sizes.ringPosition}/>
                            </group>
                        )}
                            <ambientLight intensity={isMobile ? 0.95 : 1}/>
                            <directionalLight position={[10, 10, 10]} intensity={isMobile ? 0.45 : 0.55}/>
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 w-full z-20 c-space mb-5">
                <a href="#about" className="w-fit">
                    <Button name="Let's work together" isBeam containerClas="sm:w-fit w-full sm:min-w-96"/>
                </a>
            </div>
        </section>
    )
}
export default Hero
