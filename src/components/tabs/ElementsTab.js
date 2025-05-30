"use client"
import Card from "../ui/Card"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Label from "../ui/Label"
import Textarea from "../ui/Textarea"
import Select from "../ui/Select"
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_ALIGNMENTS } from "../../constants/options"

const ElementsTab = ({
  selectedElement,
  currentTemplate,
  currentPageIndex,
  addTextElement,
  addImageElement,
  updateElement,
  deleteElement,
  fileInputRef,
}) => {
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result
        addImageElement(src)
      }
      reader.readAsDataURL(file)
    }
  }

  const selectedElementData = selectedElement
    ? currentTemplate.pages[currentPageIndex].elements.find((el) => el.id === selectedElement)
    : null

  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Add Elements</h3>
          <div className="space-y-2">
            <Button onClick={addTextElement} className="w-full justify-start">
              📝 Add Text
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} className="w-full justify-start">
              🖼️ Add Image
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        </div>
      </Card>

      {selectedElementData && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Element Properties</h3>
              <Button size="sm" variant="outline" onClick={() => deleteElement(selectedElement)}>
                🗑️
              </Button>
            </div>

            <div className="space-y-4">
              {selectedElementData.type === "text" && (
                <>
                  <div>
                    <Label htmlFor="text-content">Content</Label>
                    <Textarea
                      id="text-content"
                      value={selectedElementData.content}
                      onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="font-size">Font Size</Label>
                      <Input
                        id="font-size"
                        type="number"
                        value={selectedElementData.fontSize}
                        onChange={(e) => updateElement(selectedElement, { fontSize: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="text-color">Color</Label>
                      <Input
                        id="text-color"
                        type="color"
                        value={selectedElementData.color}
                        onChange={(e) => updateElement(selectedElement, { color: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Font Family</Label>
                    <Select
                      value={selectedElementData.fontFamily}
                      onChange={(value) => updateElement(selectedElement, { fontFamily: value })}
                      options={FONT_FAMILIES}
                    />
                  </div>

                  <div>
                    <Label>Font Weight</Label>
                    <Select
                      value={selectedElementData.fontWeight}
                      onChange={(value) => updateElement(selectedElement, { fontWeight: value })}
                      options={FONT_WEIGHTS}
                    />
                  </div>

                  <div>
                    <Label>Text Align</Label>
                    <Select
                      value={selectedElementData.textAlign}
                      onChange={(value) => updateElement(selectedElement, { textAlign: value })}
                      options={TEXT_ALIGNMENTS}
                    />
                  </div>
                </>
              )}

              {selectedElementData.type === "image" && (
                <>
                  <div>
                    <Label htmlFor="image-src">Image URL</Label>
                    <Input
                      id="image-src"
                      value={selectedElementData.src}
                      onChange={(e) => updateElement(selectedElement, { src: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="image-width">Width</Label>
                      <Input
                        id="image-width"
                        type="number"
                        value={selectedElementData.width}
                        onChange={(e) => updateElement(selectedElement, { width: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image-height">Height</Label>
                      <Input
                        id="image-height"
                        type="number"
                        value={selectedElementData.height}
                        onChange={(e) => updateElement(selectedElement, { height: Number.parseInt(e.target.value) })}
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
                    onChange={(e) => updateElement(selectedElement, { x: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="element-y">Y Position</Label>
                  <Input
                    id="element-y"
                    type="number"
                    value={selectedElementData.y}
                    onChange={(e) => updateElement(selectedElement, { y: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ElementsTab
