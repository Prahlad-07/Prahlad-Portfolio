import {useEffect, useRef, useState} from 'react'
import Globe from "react-globe.gl";
import ButtonResume from "../components/ButtonResume.jsx";
import { personalInfo } from "../constants/index.js";
import {useMediaQuery} from "react-responsive";

const About = () => {

    const globeRef = useRef();
    const aboutRef = useRef();
    const [hasCopied, setHasCopied] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const globe = globeRef.current;
        const section = aboutRef.current;
        if (!globe || !section) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let intervalId = null;

        const rotateStep = () => {
            if (!globeRef.current) return;
            const currentPoint = globe.pointOfView();
            globe.pointOfView(
                { lat: currentPoint.lat, lng: currentPoint.lng + 0.22 },
                140
            );
        };

        const startRotation = () => {
            if (intervalId) return;
            intervalId = window.setInterval(rotateStep, 180);
        };

        const stopRotation = () => {
            if (!intervalId) return;
            clearInterval(intervalId);
            intervalId = null;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) startRotation();
                    else stopRotation();
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            stopRotation();
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(personalInfo.email);
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false);
        }, 2000)
    }

    return (
        <section ref={aboutRef} className="c-space my-24 section-wrap" id="about">
            <div className="about-top-grid">
                <div className="about-top-card">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid-1" className="about-top-image" loading="lazy" decoding="async"/>

                        <div className="about-card-body">
                            <p className="grid-headtext">
                                Hi, I am Prahlad
                            </p>
                            <ul className="about-list">
                                <li>B.Tech in Information Technology at Government Engineering College Bilaspur (2022-2026), CGPA: 8.1/10.0.</li>
                                <li>Relevant coursework: OOPs, DBMS, DSA, Operating Systems, Computer Networks, System Design, Backend Engineering.</li>
                                <li>Software engineer focused on Spring Boot backend systems, scalable APIs, and production-ready products.</li>
                                <li>Strong competitive programmer with consistent performance across major coding platforms.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-top-card">
                    <div className="grid-container">
                        <img src="/assets/Grid2New.png" alt="grid-2" className="about-top-image" loading="lazy" decoding="async"/>
                        <div className="about-card-body">
                            <p className="grid-headtext">
                                Achievements
                            </p>
                            <ul className="about-list">
                                <li>AIR 311 in ICPC Kanpur Preliminary Round among top competitive programming teams in India.</li>
                                <li>Ranked 1446 out of 25,000+ teams (82,000+ participants) in Amazon ML Challenge 2025.</li>
                                <li>Secured 2nd position in CSVTU Coding Onsite Round and won Algo-War 2K26 and Tech-Nova 2024.</li>
                                <li>LeetCode: Guardian (max rating 2140), CodeChef: 4-star (max 1950+), Codeforces: Expert (max 1680).</li>
                                <li>HackerRank: 6-star in Problem Solving.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-top-card md:col-span-2 xl:col-span-1">
                    <div className="grid-container">
                        <div className="about-globe-wrap">
                            <Globe
                                ref={globeRef}
                                height={isMobile ? 220 : 250}
                                width={isMobile ? 220 : 250}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere={true}
                                showGraticules
                                labelsData={[{ lat: 28.6139, lng: 77.2090, text: 'Delhi, India', color: 'white', size: 15 }]}
                            />
                        </div>
                        <div className="about-card-body">
                            <p className="grid-headtext">
                                Open to SDE Opportunities
                            </p>
                            <ul className="about-list">
                                <li>Currently working as an SDE + SME Intern at Newton School, building the Jack compilation pipeline and runtime abstractions.</li>
                                <li>I am open to full-time software engineering roles, internships, and impactful backend-focused opportunities.</li>
                                <li>Based in India and comfortable collaborating across remote and on-site teams.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-bottom-grid">
                <div className="xl:col-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" loading="lazy" decoding="async"/>

                        <div>
                            <p className="grid-headtext">
                                Technical Skills
                            </p>
                            <p className="grid-subtext">
                                • Languages: Java, Kotlin, C/C++, JavaScript, SQL, HTML, Tailwind CSS.
                            </p>
                            <p className="grid-subtext">
                                • Cloud and dev tools: Git/GitHub, AWS, Docker, Maven, Gradle, Postman.
                            </p>
                            <p className="grid-subtext">
                                • Backend ecosystem: Spring Boot, Spring Security, Hibernate, REST APIs, JWT, Microservices, Low-Level Design.
                            </p>
                            <p className="grid-subtext">
                                • Built production-oriented projects including BookMySalon and Bg-Removal with secure auth and payment integration.
                            </p>
                            <p className="grid-subtext">
                                • My latest resume is available instantly from the button below.
                            </p>
                            <ButtonResume
                                name="Resume"
                                isBeam
                                containerClas="w-full mt-10"
                                onClick={() =>
                                    window.open(
                                        personalInfo.resumeUrl,
                                        '_blank'
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid-4" className="w-full sm:h-[276px] h-fit object-contain" loading="lazy" decoding="async"/>

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">
                                Contact Me
                            </p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? '/assets/icons8-checkmark.svg' : '/assets/copy.svg'} alt="copy"/>
                                <p className="xl:text-xl md:text-md font-medium text-gray_gradient text-white">
                                    {personalInfo.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default About
