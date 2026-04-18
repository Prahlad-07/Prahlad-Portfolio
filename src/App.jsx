import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Experience from './sections/Experience.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const App = () => {
    return (
        <main className="portfolio-app">
            <Navbar />
            <ErrorBoundary fallbackText="Hero section failed to load.">
                <Hero />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Experience section failed to load.">
                <Experience />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="About section failed to load.">
                <About />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Skills section failed to load.">
                <Skills />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Projects section failed to load.">
                <Projects />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Recommendations section failed to load.">
                <Testimonials />
            </ErrorBoundary>
            <ErrorBoundary fallbackText="Contact section failed to load.">
                <Contact />
            </ErrorBoundary>
            <Footer />
        </main>
    );
};

export default App;
