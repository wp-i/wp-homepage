import { site } from '../../content/site';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import { HeroKinetic } from './HeroKinetic';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroInner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>独立开发 · 开源项目</p>

          <h1 className={styles.title}>{site.identity.headline}</h1>

          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#work">
              <span>查看项目</span>
              <ArrowUpRight />
            </a>
            <a
              className={styles.secondaryAction}
              href={site.githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span>GitHub</span>
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <HeroKinetic />
      </div>

      <div aria-hidden="true" className={styles.bottomMeta}>
        <span className={styles.scrollCue}>向下浏览</span>
      </div>
    </section>
  );
}
