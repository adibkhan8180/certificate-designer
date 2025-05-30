"use client"

import React, { useState } from "react"

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleTabClick = (e) => {
    const value = e.target.getAttribute("data-value")
    if (value) {
      setActiveTab(value)
    }
  }

  return (
    <div onClick={handleTabClick}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab })
        }
        return child
      })}
    </div>
  )
}

export default Tabs
