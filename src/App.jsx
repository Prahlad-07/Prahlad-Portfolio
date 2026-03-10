import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Contact from "./sections/Contact.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import CodingProfiles from "./sections/CodingProfiles.jsx";


const App = () => {
    return (
        <main className="max-w-[1200px] mx-auto pb-12">
            <Navbar/>
            <ErrorBoundary fallbackText="Hero section failed to load.">
                <Hero/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="About section failed to load.">
                <About/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Projects section failed to load.">
                <Projects/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Experience section failed to load.">
                <Experience/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Coding profiles section failed to load.">
                <CodingProfiles/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Highlights section failed to load.">
                <Testimonials/>
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Contact section failed to load.">
                <Contact/>
            </ErrorBoundary>
            <Footer/>
        </main>
    )
}
export default App
