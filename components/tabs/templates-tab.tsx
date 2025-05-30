"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTemplateStore } from "@/hooks/use-template-store"
import { DEFAULT_TEMPLATES } from "@/lib/constants"

export function TemplatesTab() {
  const { currentTemplate, setCurrentTemplate, setCurrentPageIndex, setSelectedElement } = useTemplateStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {DEFAULT_TEMPLATES.map((template) => (
          <Button
            key={template.id}
            variant={currentTemplate?.id === template.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setCurrentTemplate(template)
              setCurrentPageIndex(0)
              setSelectedElement(null)
            }}
          >
            {template.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
