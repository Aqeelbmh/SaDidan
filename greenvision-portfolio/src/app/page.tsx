import Hero from "../components/Hero/Hero";
import Timeline from "../components/Timeline/Timeline";
import Language from "../components/Language/Language";
import Publications from "../components/Publications/Publications";
import Projects from "../components/Projects/Projects";
import Awards from "../components/Awards/Awards";
import Gallery from "../components/Gallery/Gallery";
import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBackground from "../components/ui/PageBackground";
import { getAllContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { settings, sections } = await getAllContent();

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navbar name={settings.hero.name} />
      <main className="relative z-10">
        <section id="hero">
          <Hero hero={settings.hero} contact={settings.contact} />
        </section>
        <section id="timeline">
          <Timeline items={sections.timeline} />
        </section>
        <section id="language">
          <Language items={sections.language} />
        </section>
        <section id="publications">
          <Publications items={sections.publications} />
        </section>
        <section id="awards">
          <Awards items={sections.awards} />
        </section>
        <section id="projects">
          <Projects items={sections.projects} />
        </section>
        <section id="gallery">
          <Gallery items={sections.gallery} cvUrl={settings.hero.cvUrl} />
        </section>
        <section id="contact">
          <Contact contact={settings.contact} />
        </section>
      </main>
      <Footer footer={settings.footer} contact={settings.contact} />
    </div>
  );
}
