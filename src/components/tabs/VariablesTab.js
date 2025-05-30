"use client"
import Card from "../ui/Card"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Label from "../ui/Label"
import { PREDEFINED_VARIABLES } from "../../constants/variables"

const VariablesTab = ({ currentTemplate, updateVariable, addTextElementWithVariable, searchTerm, setSearchTerm }) => {
  const filteredVariables = PREDEFINED_VARIABLES.filter(
    (variable) =>
      variable.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVariableClick = (variable) => {
    addTextElementWithVariable(variable.value)
  }

  return (
    <div className="space-y-4">
      {/* Current Template Variables */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Template Variables</h3>
          <div className="space-y-4">
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
          </div>
        </div>
      </Card>

      {/* Predefined Variables */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Available Variables</h3>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <Input
              placeholder="Search variables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

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
                  ➕
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
        </div>
      </Card>
    </div>
  )
}

export default VariablesTab
