import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Timeline from "../components/Timeline/Timeline";
import Publications from "../components/Publications/Publications";
import Projects from "../components/Projects/Projects";
import Awards from "../components/Awards/Awards";
import Gallery from "../components/Gallery/Gallery";
import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Divider = () => (
  <div className="w-full flex justify-center items-center my-0">
    <svg height="48" width="100%" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <path d="M0 24 Q 360 48 720 24 T 1440 24 V48 H0V24Z" fill="url(#neon-gradient)" opacity="0.7" />
      <defs>
        <linearGradient id="neon-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ffe7" />
          <stop offset="0.5" stopColor="#00ff85" />
          <stop offset="1" stopColor="#00aaff" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>
        <Divider />
        <section id="about" className="py-20">
          <About />
        </section>
        <Divider />
        <section id="timeline" className="py-20">
          <Timeline />
        </section>
        <Divider />
        <section id="publications" className="py-20">
          <Publications />
        </section>
        <Divider />
        <section id="projects" className="py-20">
          <Projects />
        </section>
        <Divider />
        <section id="awards" className="py-20">
          <Awards />
        </section>
        <Divider />
        <section id="gallery" className="py-20">
          <Gallery />
        </section>
        <Divider />
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
