"use client"
import Card from "../ui/Card"
import Button from "../ui/Button"
import { CERTIFICATE_TEMPLATES } from "../../constants/templates"

const TemplatesTab = ({ currentTemplate, handleTemplateSelect }) => {
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Certificate Templates</h3>
        <div className="space-y-2">
          {CERTIFICATE_TEMPLATES.map((template) => (
            <Button
              key={template.id}
              variant={currentTemplate.id === template.id ? "default" : "outline"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => handleTemplateSelect(template)}
            >
              <div>
                <div className="font-medium">{template.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {template.pages.length} page{template.pages.length > 1 ? "s" : ""} • {template.variables.length}{" "}
                  variables
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default TemplatesTab
