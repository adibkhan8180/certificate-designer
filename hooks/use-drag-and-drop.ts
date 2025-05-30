"use client"

import type React from "react"

import { useState } from "react"
import { useTemplateStore } from "./use-template-store"

export function useDragAndDrop() {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const { currentTemplate, currentPageIndex, selectedElement, setSelectedElement, updateElement } = useTemplateStore()

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedElement(elementId)
    setIsDragging(true)

    if (!currentTemplate) return

    const element = currentTemplate.pages[currentPageIndex].elements.find((el) => el.id === elementId)
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const newX = e.clientX - canvasRect.left - dragOffset.x
      const newY = e.clientY - canvasRect.top - dragOffset.y

      // Constrain to canvas bounds
      const constrainedX = Math.max(0, Math.min(newX, 800 - 50))
      const constrainedY = Math.max(0, Math.min(newY, 600 - 20))

      updateElement(selectedElement, { x: constrainedX, y: constrainedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
