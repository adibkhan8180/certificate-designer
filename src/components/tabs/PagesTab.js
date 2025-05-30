"use client"
import Card from "../ui/Card"
import Input from "../ui/Input"
import Label from "../ui/Label"
import Select from "../ui/Select"
import { PAGE_SIZES } from "../../constants/pageSizes"

const PagesTab = ({ currentTemplate, currentPageIndex, setCurrentTemplate, updatePageBackground, updatePageSize }) => {
  const currentPage = currentTemplate.pages[currentPageIndex]

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Page Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="page-name">Page Name</Label>
            <Input
              id="page-name"
              value={currentPage.name}
              onChange={(e) => {
                const updatedPages = [...currentTemplate.pages]
                updatedPages[currentPageIndex].name = e.target.value
                setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
              }}
            />
          </div>

          <div>
            <Label>Page Size</Label>
            <Select
              value={currentPage.size}
              onChange={updatePageSize}
              options={PAGE_SIZES.map((size) => ({
                value: size.value,
                label: `${size.label} (${size.width} × ${size.height})`,
              }))}
            />
          </div>

          <div>
            <Label>Background Type</Label>
            <Select
              value={currentPage.backgroundType}
              onChange={(value) => updatePageBackground(currentPage.background, value)}
              options={[
                { value: "color", label: "Color" },
                { value: "image", label: "Image" },
              ]}
            />
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
        </div>
      </div>
    </Card>
  )
}

export default PagesTab
