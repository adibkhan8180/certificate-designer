import TemplatesTab from "./tabs/TemplatesTab"
import ElementsTab from "./tabs/ElementsTab"
import VariablesTab from "./tabs/VariablesTab"
import PagesTab from "./tabs/PagesTab"
import Tabs from "./ui/Tabs"

const Sidebar = (props) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Certificate Designer</h1>

        <Tabs defaultValue="templates">
          <div className="flex flex-col w-full space-y-2">
            <button className="tab-trigger w-full p-2 text-left rounded hover:bg-gray-100" data-value="templates">
              Templates
            </button>
            <button className="tab-trigger w-full p-2 text-left rounded hover:bg-gray-100" data-value="elements">
              Elements
            </button>
            <button className="tab-trigger w-full p-2 text-left rounded hover:bg-gray-100" data-value="variables">
              Variables
            </button>
            <button className="tab-trigger w-full p-2 text-left rounded hover:bg-gray-100" data-value="pages">
              Pages
            </button>
          </div>

          <div className="mt-4">
            <div className="tab-content" data-value="templates">
              <TemplatesTab {...props} />
            </div>
            <div className="tab-content" data-value="elements">
              <ElementsTab {...props} />
            </div>
            <div className="tab-content" data-value="variables">
              <VariablesTab {...props} />
            </div>
            <div className="tab-content" data-value="pages">
              <PagesTab {...props} />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Sidebar
