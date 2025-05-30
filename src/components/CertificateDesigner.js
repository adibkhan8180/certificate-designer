"use client"

import { useState, useRef, useEffect } from "react"
import Sidebar from "./Sidebar"
import Canvas from "./Canvas"
import Header from "./Header"
import { CERTIFICATE_TEMPLATES } from "../constants/templates"
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage"

const CertificateDesigner = () => {
  const [currentTemplate, setCurrentTemplate] = useState(CERTIFICATE_TEMPLATES[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [selectedElement, setSelectedElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const fileInputRef = useRef(null)

  // Load template on mount
  useEffect(() => {
    const savedTemplate = loadFromLocalStorage()
    if (savedTemplate) {
      setCurrentTemplate(savedTemplate)
    }
  }, [])

  // Auto-save template changes
  useEffect(() => {
    saveToLocalStorage(currentTemplate)
  }, [currentTemplate])

  const replaceVariables = (text) => {
    let result = text
    currentTemplate.variables.forEach((variable) => {
      const regex = new RegExp(`{{${variable.name}}}`, "g")
      result = result.replace(regex, variable.value)
    })
    return result
  }

  const addTextElement = () => {
    const newElement = {
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
  }

  const addTextElementWithVariable = (variableText) => {
    const newElement = {
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
  }

  const addImageElement = (src) => {
    const newElement = {
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
  }

  const updateElement = (elementId, updates) => {
    const updatedPages = [...currentTemplate.pages]
    const elementIndex = updatedPages[currentPageIndex].elements.findIndex((el) => el.id === elementId)
    if (elementIndex !== -1) {
      updatedPages[currentPageIndex].elements[elementIndex] = {
        ...updatedPages[currentPageIndex].elements[elementIndex],
        ...updates,
      }
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    }
  }

  const deleteElement = (elementId) => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements = updatedPages[currentPageIndex].elements.filter(
      (el) => el.id !== elementId,
    )
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(null)
  }

  const updateVariable = (name, value) => {
    const updatedVariables = currentTemplate.variables.map((variable) =>
      variable.name === name ? { ...variable, value } : variable,
    )
    setCurrentTemplate({ ...currentTemplate, variables: updatedVariables })
  }

  const updatePageBackground = (background, backgroundType) => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      background,
      backgroundType,
    }
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
  }

  const updatePageSize = (size) => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      size,
    }
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
  }

  const handleTemplateSelect = (template) => {
    setCurrentTemplate(template)
    setCurrentPageIndex(0)
    setSelectedElement(null)
  }

  const props = {
    currentTemplate,
    setCurrentTemplate,
    currentPageIndex,
    setCurrentPageIndex,
    selectedElement,
    setSelectedElement,
    isDragging,
    setIsDragging,
    dragOffset,
    setDragOffset,
    searchTerm,
    setSearchTerm,
    fileInputRef,
    replaceVariables,
    addTextElement,
    addTextElementWithVariable,
    addImageElement,
    updateElement,
    deleteElement,
    updateVariable,
    updatePageBackground,
    updatePageSize,
    handleTemplateSelect,
  }

  return (
    <div className="flex h-screen">
      <Sidebar {...props} />
      <div className="flex-1 flex flex-col">
        <Header {...props} />
        <Canvas {...props} />
      </div>
    </div>
  )
}

export default CertificateDesigner
