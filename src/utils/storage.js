export const saveToLocalStorage = (template) => {
  try {
    localStorage.setItem("certificate-template", JSON.stringify(template))
  } catch (error) {
    console.error("Failed to save template:", error)
  }
}

export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("certificate-template")
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error("Failed to load template:", error)
  }
  return null
}
