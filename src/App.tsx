import { MotionConfig } from 'framer-motion';
import { About } from './components/About';
import { BackToTop, CursorGlow, Nav } from './components/Chrome';
import { Contact, Footer } from './components/Contact';
import { Experience } from './components/Experience';
import { Expertise } from './components/Expertise';
import { Hero } from './components/Hero';
import { Achievements, Leadership } from './components/Leadership';
import { HealthApps } from './components/HealthApps';
import { Projects } from './components/Projects';

function Divider() {
  return <div aria-hidden="true" className="container-x"><div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" /></div>;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[100] rounded-lg bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 z-[60]" />
      <CursorGlow />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Divider />
        <Expertise />
        <Divider />
        <Projects />
        <HealthApps />
        <Divider />
        <Experience />
        <Divider />
        <Leadership />
        <Achievements />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
