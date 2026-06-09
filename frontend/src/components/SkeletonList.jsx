function SkeletonList({ rows = 3, lines = 3 }) {
  return (
    <div className="list-stack" aria-hidden="true">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-card">
          <div className="skeleton skeleton__line skeleton__line--title" />
          {Array.from({ length: lines }).map((__, lineIndex) => (
            <div
              key={lineIndex}
              className={`skeleton skeleton__line ${lineIndex === lines - 1 ? 'skeleton__line--short' : ''}`}
            />
          ))}
          <div className="skeleton__actions">
            <div className="skeleton skeleton__pill" />
            <div className="skeleton skeleton__pill" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonList
