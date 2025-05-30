export interface TextElement {
  id: string
  type: "text"
  content: string
  x: number
  y: number
  fontSize: number
  fontFamily: string
  color: string
  fontWeight: string
  textAlign: string
}

export interface ImageElement {
  id: string
  type: "image"
  src: string
  x: number
  y: number
  width: number
  height: number
}

export interface Variable {
  name: string
  value: string
  placeholder: string
}

export interface Page {
  id: string
  name: string
  background: string
  backgroundType: "color" | "image"
  elements: (TextElement | ImageElement)[]
}

export interface Template {
  id: string
  name: string
  pages: Page[]
  variables: Variable[]
}

export interface PredefinedVariable {
  label: string
  value: string
}
