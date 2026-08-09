type ArrowUpRightProps = {
  readonly className?: string;
  readonly title?: string;
};

export function ArrowUpRight({ className, title }: ArrowUpRightProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      role={title ? 'img' : undefined}
      viewBox="0 0 24 24"
    >
      {title ? <title>{title}</title> : null}
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
