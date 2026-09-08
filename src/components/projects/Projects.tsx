import { useRef, useState } from 'react';
import { site, type Project } from '../../content/site';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import styles from './Projects.module.css';

type ProjectProps = {
  readonly project: Project;
  readonly position: number;
};

function ProjectLinks({ project }: Pick<ProjectProps, 'project'>) {
  return (
    <div aria-label={`${project.title} 相关链接`} className={styles.projectsLinks}>
      {project.links.map((link) => (
        <a
          className={link.primary ? styles.projectsLinkPrimary : styles.projectsLink}
          href={link.href}
          key={`${project.slug}-${link.href}`}
          rel="noreferrer"
          target="_blank"
        >
          <span>{link.label}</span>
          <ArrowUpRight className={styles.projectsLinkIcon} />
        </a>
      ))}
      {project.slug === 'tft-trait-atlas' && <ProjectDemo project={project} />}
    </div>
  );
}

function ProjectDemo({ project }: Pick<ProjectProps, 'project'>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const demoUrl = project.links.find((link) => link.primary)?.href;
  if (!demoUrl) return null;
  return (
    <>
      <button type="button" className={styles.projectsLink} onClick={(event) => {
        event.currentTarget.focus();
        setDemoOpen(true);
        dialog.current?.showModal();
      }}>页内体验 <ArrowUpRight className={styles.projectsLinkIcon} /></button>
      <dialog ref={dialog} className={styles.projectsDialog} onClose={() => setDemoOpen(false)} aria-label="羁绊天梯在线体验">
        <div className={styles.projectsDialogHeader}>
          <span>羁绊天梯 · 在线体验</span>
          <a href={demoUrl} rel="noreferrer" target="_blank">新窗口打开 ↗</a>
          <button type="button" onClick={() => dialog.current?.close()}>关闭 ✕</button>
        </div>
        {demoOpen && <iframe title="羁绊天梯解算器" src={demoUrl} allow="clipboard-write" referrerPolicy="no-referrer" />}
      </dialog>
    </>
  );
}

function ProjectEntry({ project, position }: ProjectProps) {
  return (
    <article className={styles.projectsItem} id={project.slug}>
      <span className={styles.projectsNumber} aria-hidden="true">{String(position + 1).padStart(2, '0')}</span>
      <header className={styles.projectsTitleGroup}>
        <h3>{project.title}</h3>
        <p>{project.chineseTitle}</p>
      </header>
      <div className={styles.projectsBody}>
        <div className={styles.projectsMeta}>
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <p className={styles.projectsDescription}>{project.description}</p>
        <ul aria-label="项目特点" className={styles.projectsFacts}>
          {project.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
      </div>
      <ProjectLinks project={project} />
    </article>
  );
}

export function Projects() {
  return (
    <section aria-labelledby="projects-heading" className={styles.projectsRoot} id="work">
      <header className={styles.projectsHeader}>
        <h2 id="projects-heading">作品</h2>
      </header>
      <div className={styles.projectsList}>
        {site.projects.map((project, position) => (
          <ProjectEntry key={project.slug} position={position} project={project} />
        ))}
      </div>
    </section>
  );
}
