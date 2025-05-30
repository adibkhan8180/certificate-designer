"use client"
import Button from "./ui/Button"
import { exportToHTML } from "../utils/export"

const Header = ({ currentTemplate, replaceVariables }) => {
  if (!currentTemplate) return null

  const currentPage = currentTemplate.pages[0]

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <h2 className="text-lg font-medium">
        {currentTemplate.name} - {currentPage?.name || "Page 1"}
      </h2>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => exportToHTML(currentTemplate, replaceVariables)}>
          📄 Export HTML
        </Button>
        <Button variant="outline" size="sm">
          👁️ Preview
        </Button>
      </div>
    </div>
  )
}

export default Header
