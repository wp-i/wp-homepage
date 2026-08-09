import { Contact } from '../components/contact/Contact';
import { Hero } from '../components/hero/Hero';
import { Projects } from '../components/projects/Projects';
import { SiteHeader } from '../components/header/SiteHeader';
import { useActiveSection } from '../hooks/useActiveSection';

export function App() {
  const activeSection = useActiveSection();

  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <SiteHeader activeSection={activeSection} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
