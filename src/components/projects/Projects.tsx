import { site, type Project } from '../../content/site';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import styles from './Projects.module.css';

type ProjectEntryProps = {
  readonly project: Project;
  readonly position: number;
};

function ProjectEntry({ project, position }: ProjectEntryProps) {
  const index = String(position + 1).padStart(2, '0');
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      className={styles.project}
      data-visible={isVisible}
      ref={ref}
    >
      <a
        className={styles.projectLink}
        href={project.href}
        rel="noreferrer"
        target="_blank"
      >
        <div className={styles.projectMeta}>
          <span>{index}</span>
          <span>{project.eyebrow}</span>
        </div>

        <div className={styles.projectTitleBlock}>
          <h2>{project.title}</h2>
          <span className={styles.chineseTitle}>{project.chineseTitle}</span>
        </div>

        <div className={styles.projectCopy}>
          <p>{project.description}</p>
          <span className={styles.proof}>{project.proof}</span>
          <ul aria-label="技术栈" className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <span aria-hidden="true" className={styles.arrowWrap}>
          <ArrowUpRight className={styles.arrow} />
        </span>
      </a>
    </article>
  );
}

export function Projects() {
  return (
    <section aria-label="项目" className={styles.projects} id="work">
      <div className={styles.projectList}>
        {site.projects.map((project, position) => (
          <ProjectEntry
            key={project.slug}
            position={position}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
