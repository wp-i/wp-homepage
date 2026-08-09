import { ArrowUpRight } from '../icons/ArrowUpRight';
import { site, type SectionId } from '../../content/site';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  readonly activeSection: SectionId;
};

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  return (
    <header
      className={styles.header}
      data-elevated={activeSection !== 'top'}
    >
      <a className={styles.mark} href="#top" title="回到首页">
        {site.identity.mark}
      </a>

      <nav aria-label="主要导航" className={styles.navigation}>
        {site.navigation.map((item) => (
          <a
            aria-current={activeSection === item.id ? 'location' : undefined}
            className={styles.navLink}
            href={`#${item.id}`}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className={styles.githubLink}
        href={site.githubUrl}
        rel="noreferrer"
        target="_blank"
      >
        <span>GitHub</span>
        <ArrowUpRight className={styles.githubIcon} />
      </a>
    </header>
  );
}
