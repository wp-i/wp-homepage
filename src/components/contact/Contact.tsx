import { site } from '../../content/site';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import styles from './Contact.module.css';

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      className={styles.contact}
      data-visible={isVisible}
      id="contact"
      ref={ref}
    >
      <a
        className={styles.github}
        href={site.githubUrl}
        rel="noreferrer"
        target="_blank"
      >
        <span className={styles.githubLabel}>GitHub</span>
        <h2>查看全部代码</h2>
        <span aria-hidden="true" className={styles.arrowWrap}>
          <ArrowUpRight className={styles.arrow} />
        </span>
      </a>

      <footer className={styles.footer}>
        <span>© 2026 WP</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </section>
  );
}
