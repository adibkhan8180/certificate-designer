"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplatesTab } from "./tabs/templates-tab"
import { PagesTab } from "./tabs/pages-tab"
import { ElementsTab } from "./tabs/elements-tab"
import { VariablesTab } from "./tabs/variables-tab"

export function Sidebar() {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Certificate Designer</h1>

        <Tabs defaultValue="variables" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="variables">Variables</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <TemplatesTab />
          </TabsContent>

          <TabsContent value="pages">
            <PagesTab />
          </TabsContent>

          <TabsContent value="elements">
            <ElementsTab />
          </TabsContent>

          <TabsContent value="variables">
            <VariablesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
