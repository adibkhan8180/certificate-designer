"use client"

import { Button } from "@/components/ui/button"
import { Eye, FileText, Download } from "lucide-react"
import { useTemplateStore } from "@/hooks/use-template-store"
import { exportToHTML, exportTemplate, importTemplate } from "@/lib/export-utils"

export function Header() {
  const { currentTemplate, setCurrentTemplate, setCurrentPageIndex, setSelectedElement, replaceVariables } =
    useTemplateStore()

  if (!currentTemplate) return null

  const currentPage = currentTemplate.pages[0] // Assuming single page for header display

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">
        {currentTemplate.name} - {currentPage?.name || "Page 1"}
      </h2>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => exportToHTML(currentTemplate, replaceVariables)}>
          <FileText className="w-4 h-4 mr-2" />
          Export HTML
        </Button>
        <Button variant="outline" size="sm" onClick={() => exportTemplate(currentTemplate)}>
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
        <Button variant="outline" size="sm" onClick={() => document.getElementById("import-file")?.click()}>
          Import JSON
        </Button>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <input
          id="import-file"
          type="file"
          accept=".json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) {
              try {
                const template = await importTemplate(file)
                setCurrentTemplate(template)
                setCurrentPageIndex(0)
                setSelectedElement(null)
              } catch (error) {
                alert("Failed to import template. Please check the file format.")
              }
            }
          }}
        />
      </div>
    </div>
  )
}
