const Card = ({ children, className = "" }) => {
  const baseClasses = "rounded-lg border border-gray-200 bg-white shadow-sm"

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}

export default Card
