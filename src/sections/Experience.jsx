import {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas} from "@react-three/fiber";
import {workExperiences} from "../constants/index.js";
import {OrbitControls} from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import Developer from "../components/Developer.jsx";
import {useMediaQuery} from "react-responsive";

const Experience = () => {
    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [animationName, setAnimationName] = useState('idle');
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionVisible(entry.isIntersecting);
            },
            { threshold: 0.2 },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="c-space my-24 section-wrap" id="experience">
            <div className="w-full text-white-600">
                <h3 className="head-text">
                    My Work Experience
                </h3>
                <div className="work-container">
                    <div className="work-canvas">
                        <Canvas
                            dpr={isMobile ? [0.85, 1.05] : [1, 1.3]}
                            frameloop={isSectionVisible ? 'always' : 'demand'}
                            gl={{ antialias: false, powerPreference: 'high-performance' }}
                            performance={{ min: 0.55 }}
                        >
                            <ambientLight intensity={7} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <directionalLight position={[0, 0, 10]} intensity={1}/>
                            <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} maxPolarAngle={Math.PI/2}/>
                            <Suspense fallback={<CanvasLoader/>}>
                                <Developer position-y={-3} scale={3} animationName={animationName}/>
                            </Suspense>
                        </Canvas>
                    </div>
                    <div className="work-content">
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {workExperiences.map(({id, name, pos, icon, duration, title, animation}, index) => (
                                <div
                                    key={id}
                                    className="work-content_container group"
                                    onClick={()=> setAnimationName(animation.toLowerCase())}
                                    onPointerOver={()=> setAnimationName(animation.toLowerCase())}
                                    onPointerOut={()=> setAnimationName('idle')}
                                >
                                    <div className="work-timeline">
                                        <div className="work-content_logo">
                                            <img src={icon} alt="logo" className="w-full h-full" loading="lazy" decoding="async"/>
                                        </div>
                                        {index !== workExperiences.length - 1 && <div className="work-content_bar"/>}
                                    </div>
                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className="font-bold text-white-800">
                                            {name}
                                        </p>
                                        <p className="text-sm mb-5">
                                            {pos} -- {duration}
                                        </p>
                                        <p className="group-hover:text-white transition ease-in-out duration-500">
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Experience
