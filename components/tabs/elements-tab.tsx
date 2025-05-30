"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Type, ImageIcon, Trash2 } from "lucide-react"
import { useRef } from "react"
import { useTemplateStore } from "@/hooks/use-template-store"
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_ALIGNMENTS } from "@/lib/constants"
import type { TextElement, ImageElement } from "@/types/certificate"

export function ElementsTab() {
  const { selectedElement, getSelectedElementData, addTextElement, addImageElement, updateElement, deleteElement } =
    useTemplateStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result as string
        addImageElement(src)
      }
      reader.readAsDataURL(file)
    }
  }

  const selectedElementData = getSelectedElementData()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={addTextElement} className="w-full justify-start">
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} className="w-full justify-start">
            <ImageIcon className="w-4 h-4 mr-2" />
            Add Image
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </CardContent>
      </Card>

      {selectedElementData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Element Properties
              <Button size="sm" variant="outline" onClick={() => deleteElement(selectedElement!)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedElementData.type === "text" && (
              <>
                <div>
                  <Label htmlFor="text-content">Content</Label>
                  <Textarea
                    id="text-content"
                    value={(selectedElementData as TextElement).content}
                    onChange={(e) => updateElement(selectedElement!, { content: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="font-size">Font Size</Label>
                    <Input
                      id="font-size"
                      type="number"
                      value={(selectedElementData as TextElement).fontSize}
                      onChange={(e) => updateElement(selectedElement!, { fontSize: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="text-color">Color</Label>
                    <Input
                      id="text-color"
                      type="color"
                      value={(selectedElementData as TextElement).color}
                      onChange={(e) => updateElement(selectedElement!, { color: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Font Family</Label>
                  <Select
                    value={(selectedElementData as TextElement).fontFamily}
                    onValueChange={(value) => updateElement(selectedElement!, { fontFamily: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_FAMILIES.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Font Weight</Label>
                  <Select
                    value={(selectedElementData as TextElement).fontWeight}
                    onValueChange={(value) => updateElement(selectedElement!, { fontWeight: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHTS.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value}>
                          {weight.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Text Align</Label>
                  <Select
                    value={(selectedElementData as TextElement).textAlign}
                    onValueChange={(value) => updateElement(selectedElement!, { textAlign: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEXT_ALIGNMENTS.map((align) => (
                        <SelectItem key={align.value} value={align.value}>
                          {align.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedElementData.type === "image" && (
              <>
                <div>
                  <Label htmlFor="image-src">Image URL</Label>
                  <Input
                    id="image-src"
                    value={(selectedElementData as ImageElement).src}
                    onChange={(e) => updateElement(selectedElement!, { src: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="image-width">Width</Label>
                    <Input
                      id="image-width"
                      type="number"
                      value={(selectedElementData as ImageElement).width}
                      onChange={(e) => updateElement(selectedElement!, { width: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image-height">Height</Label>
                    <Input
                      id="image-height"
                      type="number"
                      value={(selectedElementData as ImageElement).height}
                      onChange={(e) => updateElement(selectedElement!, { height: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="element-x">X Position</Label>
                <Input
                  id="element-x"
                  type="number"
                  value={selectedElementData.x}
                  onChange={(e) => updateElement(selectedElement!, { x: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="element-y">Y Position</Label>
                <Input
                  id="element-y"
                  type="number"
                  value={selectedElementData.y}
                  onChange={(e) => updateElement(selectedElement!, { y: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
