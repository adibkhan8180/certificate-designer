"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { useTemplateStore } from "@/hooks/use-template-store"

export function PagesTab() {
  const {
    currentTemplate,
    currentPageIndex,
    setCurrentPageIndex,
    setSelectedElement,
    addPage,
    deletePage,
    updatePageName,
    updatePageBackground,
  } = useTemplateStore()

  if (!currentTemplate) return null

  const currentPage = currentTemplate.pages[currentPageIndex]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Pages
            <Button size="sm" onClick={addPage}>
              <Plus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentTemplate.pages.map((page, index) => (
            <div key={page.id} className="flex items-center gap-2">
              <Button
                variant={currentPageIndex === index ? "default" : "outline"}
                className="flex-1 justify-start"
                onClick={() => {
                  setCurrentPageIndex(index)
                  setSelectedElement(null)
                }}
              >
                {page.name}
              </Button>
              {currentTemplate.pages.length > 1 && (
                <Button size="sm" variant="outline" onClick={() => deletePage(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Page Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="page-name">Page Name</Label>
            <Input id="page-name" value={currentPage.name} onChange={(e) => updatePageName(e.target.value)} />
          </div>

          <div>
            <Label>Background Type</Label>
            <Select
              value={currentPage.backgroundType}
              onValueChange={(value: "color" | "image") => {
                updatePageBackground(currentPage.background, value)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {currentPage.backgroundType === "color" && (
            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <Input
                id="background-color"
                type="color"
                value={currentPage.background.startsWith("#") ? currentPage.background : "#ffffff"}
                onChange={(e) => updatePageBackground(e.target.value, "color")}
              />
            </div>
          )}

          {currentPage.backgroundType === "image" && (
            <div>
              <Label htmlFor="background-image">Background Image URL</Label>
              <Input
                id="background-image"
                value={currentPage.background}
                onChange={(e) => updatePageBackground(e.target.value, "image")}
                placeholder="Enter image URL"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
