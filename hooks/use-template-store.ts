"use client"

import { useState, useCallback } from "react"
import type { Template, TextElement, ImageElement } from "@/types/certificate"
import { DEFAULT_TEMPLATES } from "@/lib/constants"

export function useTemplateStore() {
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  const loadTemplate = useCallback(() => {
    try {
      const saved = localStorage.getItem("certificate-template")
      if (saved) {
        setCurrentTemplate(JSON.parse(saved))
      } else {
        setCurrentTemplate(DEFAULT_TEMPLATES[0])
      }
    } catch (error) {
      console.error("Failed to load template:", error)
      setCurrentTemplate(DEFAULT_TEMPLATES[0])
    }
  }, [])

  const saveTemplate = useCallback(() => {
    if (currentTemplate) {
      try {
        localStorage.setItem("certificate-template", JSON.stringify(currentTemplate))
      } catch (error) {
        console.error("Failed to save template:", error)
      }
    }
  }, [currentTemplate])

  const replaceVariables = useCallback(
    (text: string) => {
      if (!currentTemplate) return text
      let result = text
      currentTemplate.variables.forEach((variable) => {
        const regex = new RegExp(`{{${variable.name}}}`, "g")
        result = result.replace(regex, variable.value)
      })
      return result
    },
    [currentTemplate],
  )

  const updateElement = useCallback(
    (elementId: string, updates: Partial<TextElement | ImageElement>) => {
      if (!currentTemplate) return

      const updatedPages = [...currentTemplate.pages]
      const elementIndex = updatedPages[currentPageIndex].elements.findIndex((el) => el.id === elementId)
      if (elementIndex !== -1) {
        updatedPages[currentPageIndex].elements[elementIndex] = {
          ...updatedPages[currentPageIndex].elements[elementIndex],
          ...updates,
        }
        setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
      }
    },
    [currentTemplate, currentPageIndex],
  )

  const addTextElement = useCallback(() => {
    if (!currentTemplate) return

    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: "New Text",
      x: 100,
      y: 100,
      fontSize: 16,
      fontFamily: "serif",
      color: "#000000",
      fontWeight: "normal",
      textAlign: "left",
    }

    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements.push(newElement)
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(newElement.id)
  }, [currentTemplate, currentPageIndex])

  const addTextElementWithVariable = useCallback(
    (variableText: string) => {
      if (!currentTemplate) return

      const newElement: TextElement = {
        id: `text-${Date.now()}`,
        type: "text",
        content: variableText,
        x: 100,
        y: 100,
        fontSize: 16,
        fontFamily: "serif",
        color: "#000000",
        fontWeight: "normal",
        textAlign: "left",
      }

      const updatedPages = [...currentTemplate.pages]
      updatedPages[currentPageIndex].elements.push(newElement)
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
      setSelectedElement(newElement.id)
    },
    [currentTemplate, currentPageIndex],
  )

  const addImageElement = useCallback(
    (src: string) => {
      if (!currentTemplate) return

      const newElement: ImageElement = {
        id: `image-${Date.now()}`,
        type: "image",
        src,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
      }

      const updatedPages = [...currentTemplate.pages]
      updatedPages[currentPageIndex].elements.push(newElement)
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
      setSelectedElement(newElement.id)
    },
    [currentTemplate, currentPageIndex],
  )

  const deleteElement = useCallback(
    (elementId: string) => {
      if (!currentTemplate) return

      const updatedPages = [...currentTemplate.pages]
      updatedPages[currentPageIndex].elements = updatedPages[currentPageIndex].elements.filter(
        (el) => el.id !== elementId,
      )
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
      setSelectedElement(null)
    },
    [currentTemplate, currentPageIndex],
  )

  const updateVariable = useCallback(
    (name: string, value: string) => {
      if (!currentTemplate) return

      const updatedVariables = currentTemplate.variables.map((variable) =>
        variable.name === name ? { ...variable, value } : variable,
      )
      setCurrentTemplate({ ...currentTemplate, variables: updatedVariables })
    },
    [currentTemplate],
  )

  const addPage = useCallback(() => {
    if (!currentTemplate) return

    const newPage = {
      id: `page-${Date.now()}`,
      name: `Page ${currentTemplate.pages.length + 1}`,
      background: "#ffffff",
      backgroundType: "color" as const,
      elements: [],
    }
    setCurrentTemplate({
      ...currentTemplate,
      pages: [...currentTemplate.pages, newPage],
    })
    setCurrentPageIndex(currentTemplate.pages.length)
  }, [currentTemplate])

  const deletePage = useCallback(
    (pageIndex: number) => {
      if (!currentTemplate || currentTemplate.pages.length <= 1) return

      const updatedPages = currentTemplate.pages.filter((_, index) => index !== pageIndex)
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
      if (currentPageIndex >= updatedPages.length) {
        setCurrentPageIndex(updatedPages.length - 1)
      }
    },
    [currentTemplate, currentPageIndex],
  )

  const updatePageName = useCallback(
    (name: string) => {
      if (!currentTemplate) return

      const updatedPages = [...currentTemplate.pages]
      updatedPages[currentPageIndex].name = name
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    },
    [currentTemplate, currentPageIndex],
  )

  const updatePageBackground = useCallback(
    (background: string, backgroundType: "color" | "image") => {
      if (!currentTemplate) return

      const updatedPages = [...currentTemplate.pages]
      updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        background,
        backgroundType,
      }
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    },
    [currentTemplate, currentPageIndex],
  )

  const getSelectedElementData = useCallback(() => {
    if (!currentTemplate || !selectedElement) return null
    return currentTemplate.pages[currentPageIndex].elements.find((el) => el.id === selectedElement) || null
  }, [currentTemplate, currentPageIndex, selectedElement])

  return {
    currentTemplate,
    setCurrentTemplate,
    currentPageIndex,
    setCurrentPageIndex,
    selectedElement,
    setSelectedElement,
    loadTemplate,
    saveTemplate,
    replaceVariables,
    updateElement,
    addTextElement,
    addTextElementWithVariable,
    addImageElement,
    deleteElement,
    updateVariable,
    addPage,
    deletePage,
    updatePageName,
    updatePageBackground,
    getSelectedElementData,
  }
}
