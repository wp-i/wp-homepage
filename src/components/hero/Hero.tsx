import { site } from '../../content/site';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import { HeroKinetic } from './HeroKinetic';
import styles from './Hero.module.css';
export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroInner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> 独立开发 · 开源实验</p>
          <h1 className={styles.title}>{site.identity.headline}</h1>
          <p className={styles.intro}>从日常里的小问题出发，<br />做一些有用、有意思的尝试。</p>
          <a className={styles.primaryAction} href="#work">查看作品 <ArrowUpRight /></a>
        </div>
        <div className={styles.visual}>
          <HeroKinetic />
        </div>
      </div>
    </section>
  );
}
