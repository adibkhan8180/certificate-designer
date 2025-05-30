"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { useTemplateStore } from "@/hooks/use-template-store"
import { PREDEFINED_VARIABLES } from "@/lib/constants"

export function VariablesTab() {
  const { currentTemplate, updateVariable, addTextElementWithVariable } = useTemplateStore()
  const [searchTerm, setSearchTerm] = useState("")

  if (!currentTemplate) return null

  const filteredVariables = PREDEFINED_VARIABLES.filter(
    (variable) =>
      variable.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVariableClick = (variable: (typeof PREDEFINED_VARIABLES)[0]) => {
    addTextElementWithVariable(variable.value)
  }

  return (
    <div className="space-y-4">
      {/* Current Template Variables */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Template Variables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentTemplate.variables.map((variable) => (
            <div key={variable.name}>
              <Label htmlFor={variable.name}>{variable.placeholder}</Label>
              <Input
                id={variable.name}
                value={variable.value}
                onChange={(e) => updateVariable(variable.name, e.target.value)}
                placeholder={variable.placeholder}
              />
            </div>
          ))}

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Use variables in text elements with double curly braces:</p>
            <div className="text-xs bg-gray-100 p-2 rounded">
              {currentTemplate.variables.map((variable) => (
                <div key={variable.name}>
                  {`{{${variable.name}}}`} → {variable.value}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predefined Variables */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Variables</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search variables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredVariables.map((variable, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleVariableClick(variable)}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{variable.label}</div>
                  <div className="text-xs text-gray-500 font-mono">{variable.value}</div>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {filteredVariables.length === 0 && (
            <div className="text-center py-8 text-gray-500">No variables found matching "{searchTerm}"</div>
          )}

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Tip:</strong> Click on any variable above to add it as a text element to your certificate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
