const Label = ({ children, htmlFor, className = "" }) => {
  const baseClasses = "text-sm font-medium text-gray-700"

  return (
    <label htmlFor={htmlFor} className={`${baseClasses} ${className}`}>
      {children}
    </label>
  )
}

export default Label
