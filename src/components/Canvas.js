"use client"
import { getPageDimensions } from "../utils/pageUtils"

const Canvas = ({
  currentTemplate,
  currentPageIndex,
  selectedElement,
  setSelectedElement,
  isDragging,
  setIsDragging,
  dragOffset,
  setDragOffset,
  updateElement,
  replaceVariables,
}) => {
  if (!currentTemplate) return null

  const currentPage = currentTemplate.pages[currentPageIndex]
  const pageDimensions = getPageDimensions(currentPage.size)

  const handleMouseDown = (e, elementId) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedElement(elementId)
    setIsDragging(true)

    const element = currentPage.elements.find((el) => el.id === elementId)
    if (element) {
      const canvasRect = e.currentTarget.parentElement?.getBoundingClientRect()
      if (canvasRect) {
        setDragOffset({
          x: e.clientX - canvasRect.left - element.x,
          y: e.clientY - canvasRect.top - element.y,
        })
      }
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && selectedElement) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const newX = e.clientX - canvasRect.left - dragOffset.x
      const newY = e.clientY - canvasRect.top - dragOffset.y

      const constrainedX = Math.max(0, Math.min(newX, pageDimensions.width - 50))
      const constrainedY = Math.max(0, Math.min(newY, pageDimensions.height - 20))

      updateElement(selectedElement, { x: constrainedX, y: constrainedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div className="max-w-full mx-auto">
        <div
          className="relative bg-white shadow-lg mx-auto"
          style={{
            width: `${pageDimensions.width}px`,
            height: `${pageDimensions.height}px`,
            background:
              currentPage.backgroundType === "color"
                ? currentPage.background
                : `url(${currentPage.background}) center/cover`,
            cursor: isDragging ? "grabbing" : "default",
            transform: "scale(0.7)",
            transformOrigin: "top center",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {currentPage.elements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-pointer select-none ${
                selectedElement === element.id ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                left: element.x,
                top: element.y,
                transform:
                  element.type === "text" && element.textAlign === "center"
                    ? "translateX(-50%)"
                    : element.type === "text" && element.textAlign === "right"
                      ? "translateX(-100%)"
                      : "none",
              }}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onClick={(e) => e.stopPropagation()}
            >
              {element.type === "text" && (
                <div
                  style={{
                    fontSize: element.fontSize,
                    fontFamily: element.fontFamily,
                    color: element.color,
                    fontWeight: element.fontWeight,
                    textAlign: element.textAlign,
                    whiteSpace: "pre-wrap",
                    minWidth: "20px",
                    minHeight: "20px",
                  }}
                >
                  {replaceVariables(element.content)}
                </div>
              )}

              {element.type === "image" && (
                <img
                  src={element.src || "/placeholder.svg"}
                  alt="Certificate element"
                  style={{
                    width: element.width,
                    height: element.height,
                    objectFit: "cover",
                  }}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas
