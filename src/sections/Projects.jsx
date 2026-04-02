import {lazy, Suspense, useEffect, useRef, useState} from 'react'
import {myProjects} from "../constants/index.js";
import {Canvas} from "@react-three/fiber";
import {Center, OrbitControls} from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {useMediaQuery} from "react-responsive";

const projectCount = myProjects.length;
const DemoComputer = lazy(() => import('../components/DemoComputer.jsx'));

const Projects = () => {
    const sectionRef = useRef(null);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const currentProject = myProjects[selectedProjectIndex];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    setShouldRenderCanvas(true);
                }
            },
            { threshold: 0.16, rootMargin: '220px 0px' },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if(direction === 'prev'){
                return prevIndex === 0 ? projectCount-1 : prevIndex-1;
            }
            else{
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        })
    }

    return (
        <section ref={sectionRef} className="c-space my-24 section-wrap" id="projects">
            <p className="head-text">
                My Projects
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="project-panel flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                    <div className="absolute top-0 right-0">
                        <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" loading="lazy" decoding="async"/>
                    </div>

                    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm" loading="lazy" decoding="async"/>
                    </div>

                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold animatedText">
                            {currentProject.title}
                        </p>
                        <p className="animatedText">
                            {currentProject.desc}
                        </p>
                        <p className="animatedText">
                            {currentProject.subdesc}
                        </p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className="tech-logo">
                                    <img src={tag.path} alt={tag.name} loading="lazy" decoding="async"/>
                                </div>
                            ))}
                        </div>

                        <a className="flex items-center gap-2 cursor-pointer text-white-600" href={currentProject.href} target="_blank" rel="noreferrer">
                            <p>
                                Github Repo
                            </p>
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3"/>
                        </a>
                    </div>

                    <div className="flex justify-between items-center mt-7">
                        <button className="arrow-btn" onClick={()=> handleNavigation('prev')}>
                            <img src="/assets/left-arrow.png" alt="left-arrow" className="w-4 h-4"/>
                        </button>
                        <button className="arrow-btn" onClick={()=> handleNavigation('next')}>
                            <img src="/assets/right-arrow.png" alt="right-arrow" className="w-4 h-4"/>
                        </button>
                    </div>
                </div>

                <div className="project-panel h-96 md:h-full">
                    {shouldRenderCanvas ? (
                        <Canvas
                            dpr={isMobile ? [0.72, 1] : [0.9, 1.2]}
                            frameloop={isSectionVisible ? 'always' : 'never'}
                            gl={{ antialias: false, powerPreference: 'high-performance' }}
                            performance={{ min: 0.5 }}
                        >
                            <ambientLight intensity={Math.PI}/>
                            <directionalLight position={[10, 10, 5]}/>
                            <Center>
                                <Suspense fallback={<CanvasLoader/>}>
                                    <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                        <DemoComputer texture={currentProject.texture}/>
                                    </group>
                                </Suspense>
                            </Center>
                            <OrbitControls maxPolarAngle={Math.PI/2} enableZoom={false} enablePan={false} enableRotate={!isMobile}/>
                        </Canvas>
                    ) : (
                        <div className="canvas-placeholder">
                            <p className="canvas-placeholder_text">Loading 3D preview on scroll...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Projects
