"use client"

import { useTemplateStore } from "@/hooks/use-template-store"
import { useDragAndDrop } from "@/hooks/use-drag-and-drop"
import type { TextElement, ImageElement } from "@/types/certificate"

export function CertificateCanvas() {
  const { currentTemplate, currentPageIndex, selectedElement, setSelectedElement, updateElement, replaceVariables } =
    useTemplateStore()

  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragAndDrop()

  if (!currentTemplate) return null

  const currentPage = currentTemplate.pages[currentPageIndex]

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative bg-white shadow-lg mx-auto"
          style={{
            width: "800px",
            height: "600px",
            background:
              currentPage.backgroundType === "color"
                ? currentPage.background
                : `url(${currentPage.background}) center/cover`,
            cursor: isDragging ? "grabbing" : "default",
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
                  element.type === "text" && (element as TextElement).textAlign === "center"
                    ? "translateX(-50%)"
                    : element.type === "text" && (element as TextElement).textAlign === "right"
                      ? "translateX(-100%)"
                      : "none",
              }}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onClick={(e) => e.stopPropagation()}
            >
              {element.type === "text" && (
                <div
                  style={{
                    fontSize: (element as TextElement).fontSize,
                    fontFamily: (element as TextElement).fontFamily,
                    color: (element as TextElement).color,
                    fontWeight: (element as TextElement).fontWeight,
                    textAlign: (element as TextElement).textAlign as any,
                    whiteSpace: "pre-wrap",
                    minWidth: "20px",
                    minHeight: "20px",
                  }}
                >
                  {replaceVariables((element as TextElement).content)}
                </div>
              )}

              {element.type === "image" && (
                <img
                  src={(element as ImageElement).src || "/placeholder.svg"}
                  alt="Certificate element"
                  style={{
                    width: (element as ImageElement).width,
                    height: (element as ImageElement).height,
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
