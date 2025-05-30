"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Type, ImageIcon, Eye, FileText, Search } from "lucide-react"
import { BACKGROUND_IMG } from "@/lib/constants"

// Types
interface TextElement {
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

interface ImageElement {
  id: string
  type: "image"
  src: string
  x: number
  y: number
  width: number
  height: number
}

interface Variable {
  name: string
  value: string
  placeholder: string
}

interface Page {
  id: string
  name: string
  background: string
  backgroundType: "color" | "image"
  elements: (TextElement | ImageElement)[]
  size: string
}

interface Template {
  id: string
  name: string
  pages: Page[]
  variables: Variable[]
}

interface PredefinedVariable {
  label: string
  value: string
}

// Constants
const PREDEFINED_VARIABLES: PredefinedVariable[] = [
  { label: "Student Name", value: "{{StudentName}}" },
  { label: "Mother's Name", value: "{{motherName}}" },
  { label: "Father's Name", value: "{{fatherName}}" },
  { label: "Enrollment No", value: "{{EnrollmentNo}}" },
  { label: "Aadhaar No.", value: "{{AadhaarNo}}" },
  { label: "Religion", value: "{{Religion}}" },
  { label: "Caste", value: "{{Caste}}" },
  { label: "Transcript ID", value: "{{TranscriptID}}" },
  { label: "Obtained Marks", value: "{{ObtainedMarks}}" },
  { label: "Obtained Grades", value: "{{ObtainedGrades}}" },
  { label: "Total Marks", value: "{{TotalMarks}}" },
  { label: "SGPA", value: "{{SGPA}}" },
  { label: "CGPA", value: "{{CGPA}}" },
  { label: "Percentage", value: "{{Percentage}}" },
  { label: "EvaluatedBy", value: "{{EvaluatedBy}}" },
  { label: "ApprovedBy", value: "{{ApprovedBy}}" },
  { label: "Program Name", value: "{{ProgramName}}" },
  { label: "Program Duration", value: "{{programDuration}}" },
  { label: "Course Name", value: "{{CourseName}}" },
  { label: "Batch Name", value: "{{NewBatchName}}" },
  { label: "Batch Code", value: "{{BatchCode}}" },
  { label: "Batch Start Date", value: "{{BatchStartDate}}" },
  { label: "Batch End Date", value: "{{BatchEndDate}}" },
  { label: "Batch Duration", value: "{{BatchDuration}}" },
  { label: "Modules", value: "{{Modules}}" },
  { label: "Hall Admit Number", value: "{{HallAdmitNumber}}" },
  { label: "Serial No.", value: "{{serialNo}}" },
  { label: "Registration No.", value: "{{registrationNo}}" },
  { label: "Division", value: "{{Division}}" },
  { label: "DivisionInRegional", value: "{{DivisionInRegional}}" },
  { label: "Stream Name", value: "{{DepartmentName}}" },
  { label: "Stream Code", value: "{{DepartmentCode}}" },
  { label: "School Name", value: "{{SchoolName}}" },
  { label: "Student Name(Regional)", value: "{{regionalName}}" },
  { label: "Mother Name(Regional)", value: "{{regionalMotherName}}" },
  { label: "Father Name(Regional)", value: "{{regionalFatherName}}" },
  { label: "School Name(Regional)", value: "{{schoolRegionalName}}" },
  { label: "Stream Name(Regional)", value: "{{deptNameRegional}}" },
  { label: "Program Name(Regional)", value: "{{programNameInRegional}}" },
  { label: "Examination Centre", value: "{{ExamCentre}}" },
  { label: "State", value: "{{State}}" },
  { label: "District", value: "{{District}}" },
  { label: "Date of Birth", value: "{{DateOfBirth}}" },
  { label: "Exam Date", value: "{{ExamDate}}" },
  { label: "Exam Date (Regional)", value: "{{ExamDateRegional}}" },
  { label: "Degree Date", value: "{{DegreeDate}}" },
  { label: "Degree Date (Regional)", value: "{{DegreeDateRegional}}" },
  { label: "Academic Year", value: "{{AcademicYear}}" },
  { label: "Digilocker Id", value: "{{DigilockerId}}" },
  { label: "Certificate No", value: "{{certificateNo}}" },
  { label: "Total Credits", value: "{{TotalCredits}}" },
  { label: "Obtained Credits", value: "{{ObtainedCredits}}" },
  { label: "Credit Point", value: "{{CreditPoint}}" },
  { label: "Grade Point", value: "{{GradePoint}}" },
  { label: "Percentile", value: "{{Percentile}}" },
  { label: "Rank", value: "{{Rank}}" },
  { label: "Result", value: "{{Result}}" },
  { label: "Remarks", value: "{{Remarks}}" },
  { label: "Email", value: "{{Email}}" },
  { label: "Phone Number", value: "{{PhoneNumber}}" },
  { label: "Specialization", value: "{{Specialization}}" },
]

const PAGE_SIZES = [
  { value: "a4-landscape", label: "A4 Landscape", width: 1122, height: 794 },
  { value: "a4-portrait", label: "A4 Portrait", width: 794, height: 1122 },
  { value: "a3-landscape", label: "A3 Landscape", width: 1587, height: 1122 },
  { value: "a3-portrait", label: "A3 Portrait", width: 1122, height: 1587 },
  { value: "legal-landscape", label: "Legal Landscape", width: 1344, height: 864 },
  { value: "legal-portrait", label: "Legal Portrait", width: 864, height: 1344 },
]

const CERTIFICATE_TEMPLATES: Template[] = [
  {
    id: "academic-certificate",
    name: "Academic Certificate",
    variables: [
      { name: "StudentName", value: "John Doe", placeholder: "Student Name" },
      { name: "CourseName", value: "Computer Science", placeholder: "Course Name" },
      { name: "DegreeDate", value: new Date().toLocaleDateString(), placeholder: "Degree Date" },
      { name: "SchoolName", value: "University of Excellence", placeholder: "School Name" },
    ],
    pages: [
      {
        id: "page1",
        name: "Certificate Page",
        background: "#ffffff",
        backgroundType: "color",
        size: "a4-landscape",
        elements: [
          {
            id: "title",
            type: "text",
            content: "Certificate of Completion",
            x: 561,
            y: 80,
            fontSize: 36,
            fontFamily: "serif",
            color: "#1a365d",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "student-name",
            type: "text",
            content: "This is to certify that {{StudentName}}",
            x: 561,
            y: 200,
            fontSize: 24,
            fontFamily: "serif",
            color: "#2d3748",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "course",
            type: "text",
            content: "has successfully completed {{CourseName}}",
            x: 561,
            y: 260,
            fontSize: 20,
            fontFamily: "serif",
            color: "#2d3748",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "school",
            type: "text",
            content: "at {{SchoolName}}",
            x: 561,
            y: 320,
            fontSize: 18,
            fontFamily: "serif",
            color: "#4a5568",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "date",
            type: "text",
            content: "Date: {{DegreeDate}}",
            x: 561,
            y: 450,
            fontSize: 16,
            fontFamily: "serif",
            color: "#4a5568",
            fontWeight: "normal",
            textAlign: "center",
          },
        ],
      },
    ],
  },
  {
    id: "achievement-award",
    name: "Achievement Award",
    variables: [
      { name: "StudentName", value: "Jane Smith", placeholder: "Student Name" },
      { name: "Achievement", value: "Outstanding Performance", placeholder: "Achievement" },
      { name: "AwardDate", value: new Date().toLocaleDateString(), placeholder: "Award Date" },
      { name: "Organization", value: "Excellence Academy", placeholder: "Organization" },
    ],
    pages: [
      {
        id: "page1",
        name: "Award Page",
        background: "#f8f9fa",
        backgroundType: "color",
        size: "a4-landscape",
        elements: [
          {
            id: "award-title",
            type: "text",
            content: "CERTIFICATE OF ACHIEVEMENT",
            x: 561,
            y: 60,
            fontSize: 32,
            fontFamily: "sans-serif",
            color: "#d4af37",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "presented-to",
            type: "text",
            content: "Presented to",
            x: 561,
            y: 150,
            fontSize: 18,
            fontFamily: "serif",
            color: "#666",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "recipient-name",
            type: "text",
            content: "{{StudentName}}",
            x: 561,
            y: 200,
            fontSize: 28,
            fontFamily: "cursive",
            color: "#2c3e50",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "achievement-text",
            type: "text",
            content: "For {{Achievement}}",
            x: 561,
            y: 280,
            fontSize: 20,
            fontFamily: "serif",
            color: "#34495e",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "organization",
            type: "text",
            content: "{{Organization}}",
            x: 561,
            y: 380,
            fontSize: 18,
            fontFamily: "serif",
            color: "#7f8c8d",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "award-date",
            type: "text",
            content: "{{AwardDate}}",
            x: 561,
            y: 450,
            fontSize: 16,
            fontFamily: "serif",
            color: "#95a5a6",
            fontWeight: "normal",
            textAlign: "center",
          },
        ],
      },
    ],
  },
  {
    id: "participation-certificate",
    name: "Participation Certificate",
    variables: [
      { name: "ParticipantName", value: "Alex Johnson", placeholder: "Participant Name" },
      { name: "EventName", value: "Annual Science Fair", placeholder: "Event Name" },
      { name: "EventDate", value: new Date().toLocaleDateString(), placeholder: "Event Date" },
      { name: "Organizer", value: "Science Academy", placeholder: "Organizer" },
    ],
    pages: [
      {
        id: "page1",
        name: "Participation Page",
        background: "#e8f4fd",
        backgroundType: "color",
        size: "a4-landscape",
        elements: [
          {
            id: "cert-title",
            type: "text",
            content: "Certificate of Participation",
            x: 561,
            y: 70,
            fontSize: 34,
            fontFamily: "serif",
            color: "#2980b9",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "this-certifies",
            type: "text",
            content: "This certifies that",
            x: 561,
            y: 160,
            fontSize: 16,
            fontFamily: "serif",
            color: "#34495e",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "participant",
            type: "text",
            content: "{{ParticipantName}}",
            x: 561,
            y: 210,
            fontSize: 26,
            fontFamily: "serif",
            color: "#e74c3c",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "participated-in",
            type: "text",
            content: "has participated in {{EventName}}",
            x: 561,
            y: 280,
            fontSize: 18,
            fontFamily: "serif",
            color: "#2c3e50",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "event-organizer",
            type: "text",
            content: "organized by {{Organizer}}",
            x: 561,
            y: 330,
            fontSize: 16,
            fontFamily: "serif",
            color: "#7f8c8d",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "event-date",
            type: "text",
            content: "on {{EventDate}}",
            x: 561,
            y: 420,
            fontSize: 14,
            fontFamily: "serif",
            color: "#95a5a6",
            fontWeight: "normal",
            textAlign: "center",
          },
        ],
      },
    ],
  },
  {
    id: "graduation-diploma",
    name: "Graduation Diploma",
    variables: [
      { name: "GraduateName", value: "Michael Brown", placeholder: "Graduate Name" },
      { name: "DegreeName", value: "Bachelor of Science", placeholder: "Degree Name" },
      { name: "Major", value: "Computer Engineering", placeholder: "Major" },
      { name: "University", value: "Tech University", placeholder: "University" },
      { name: "GraduationDate", value: new Date().toLocaleDateString(), placeholder: "Graduation Date" },
    ],
    pages: [
      {
        id: "page1",
        name: "Diploma Page",
        background: "#fff8dc",
        backgroundType: "color",
        size: "a4-landscape",
        elements: [
          {
            id: "university-name",
            type: "text",
            content: "{{University}}",
            x: 561,
            y: 50,
            fontSize: 24,
            fontFamily: "serif",
            color: "#8b4513",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "diploma-title",
            type: "text",
            content: "DIPLOMA",
            x: 561,
            y: 100,
            fontSize: 40,
            fontFamily: "serif",
            color: "#8b0000",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "conferred-upon",
            type: "text",
            content: "This diploma is conferred upon",
            x: 561,
            y: 180,
            fontSize: 16,
            fontFamily: "serif",
            color: "#2f4f4f",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "graduate-name",
            type: "text",
            content: "{{GraduateName}}",
            x: 561,
            y: 230,
            fontSize: 30,
            fontFamily: "cursive",
            color: "#000080",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "degree-info",
            type: "text",
            content: "who has fulfilled the requirements for the degree of",
            x: 561,
            y: 290,
            fontSize: 14,
            fontFamily: "serif",
            color: "#2f4f4f",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "degree-name",
            type: "text",
            content: "{{DegreeName}} in {{Major}}",
            x: 561,
            y: 330,
            fontSize: 20,
            fontFamily: "serif",
            color: "#8b0000",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "graduation-date",
            type: "text",
            content: "Granted this {{GraduationDate}}",
            x: 561,
            y: 420,
            fontSize: 14,
            fontFamily: "serif",
            color: "#696969",
            fontWeight: "normal",
            textAlign: "center",
          },
        ],
      },
    ],
  },
  {
    id: "training-completion",
    name: "Training Completion",
    variables: [
      { name: "TraineeName", value: "Sarah Wilson", placeholder: "Trainee Name" },
      { name: "TrainingProgram", value: "Digital Marketing Bootcamp", placeholder: "Training Program" },
      { name: "Duration", value: "6 weeks", placeholder: "Duration" },
      { name: "Institute", value: "Digital Skills Institute", placeholder: "Institute" },
      { name: "CompletionDate", value: new Date().toLocaleDateString(), placeholder: "Completion Date" },
    ],
    pages: [
      {
        id: "page1",
        name: "Training Page",
        background: "#f0f8ff",
        backgroundType: "color",
        size: "a4-landscape",
        elements: [
          {
            id: "training-title",
            type: "text",
            content: "CERTIFICATE OF TRAINING COMPLETION",
            x: 561,
            y: 60,
            fontSize: 28,
            fontFamily: "sans-serif",
            color: "#4169e1",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "certify-that",
            type: "text",
            content: "We hereby certify that",
            x: 561,
            y: 140,
            fontSize: 16,
            fontFamily: "serif",
            color: "#2f4f4f",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "trainee-name",
            type: "text",
            content: "{{TraineeName}}",
            x: 561,
            y: 190,
            fontSize: 26,
            fontFamily: "serif",
            color: "#ff6347",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "completed-training",
            type: "text",
            content: "has successfully completed the {{TrainingProgram}}",
            x: 561,
            y: 250,
            fontSize: 18,
            fontFamily: "serif",
            color: "#2c3e50",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "training-duration",
            type: "text",
            content: "Duration: {{Duration}}",
            x: 561,
            y: 300,
            fontSize: 16,
            fontFamily: "serif",
            color: "#7f8c8d",
            fontWeight: "normal",
            textAlign: "center",
          },
          {
            id: "training-institute",
            type: "text",
            content: "{{Institute}}",
            x: 561,
            y: 370,
            fontSize: 18,
            fontFamily: "serif",
            color: "#34495e",
            fontWeight: "bold",
            textAlign: "center",
          },
          {
            id: "completion-date",
            type: "text",
            content: "Completed on: {{CompletionDate}}",
            x: 561,
            y: 430,
            fontSize: 14,
            fontFamily: "serif",
            color: "#95a5a6",
            fontWeight: "normal",
            textAlign: "center",
          },
        ],
      },
    ],
  },
]

const FONT_FAMILIES = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
  { value: "fantasy", label: "Fantasy" },
]

const FONT_WEIGHTS = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "100", label: "Thin" },
  { value: "300", label: "Light" },
  { value: "500", label: "Medium" },
  { value: "700", label: "Bold" },
  { value: "900", label: "Black" },
]

const TEXT_ALIGNMENTS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
]

// Utility functions
const saveToLocalStorage = (template: Template) => {
  try {
    localStorage.setItem("certificate-template", JSON.stringify(template))
  } catch (error) {
    console.error("Failed to save template:", error)
  }
}

const loadFromLocalStorage = (): Template | null => {
  try {
    const saved = localStorage.getItem("certificate-template")
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error("Failed to load template:", error)
  }
  return null
}

const getPageDimensions = (size: string) => {
  const pageSize = PAGE_SIZES.find((s) => s.value === size)
  return pageSize ? { width: pageSize.width, height: pageSize.height } : { width: 1122, height: 794 }
}

const exportToHTML = (template: Template, replaceVariables: (text: string) => string) => {
  const generatePageHTML = (page: Page) => {
    const dimensions = getPageDimensions(page.size)
    const elementsHTML = page.elements
      .map((element) => {
        if (element.type === "text") {
          const textElement = element as TextElement
          const content = replaceVariables(textElement.content)

          let transform = ""
          if (textElement.textAlign === "center") {
            transform = "translateX(-50%)"
          } else if (textElement.textAlign === "right") {
            transform = "translateX(-100%)"
          }

          return `
          <div style="
            position: absolute;
            left: ${textElement.x}px;
            top: ${textElement.y}px;
            font-size: ${textElement.fontSize}px;
            font-family: ${textElement.fontFamily};
            color: ${textElement.color};
            font-weight: ${textElement.fontWeight};
            text-align: ${textElement.textAlign};
            white-space: pre-wrap;
            min-width: 20px;
            min-height: 20px;
            transform: ${transform};
          ">${content}</div>
        `
        } else if (element.type === "image") {
          const imageElement = element as ImageElement
          return `
          <img 
            src="${imageElement.src}" 
            alt="Certificate element"
            style="
              position: absolute;
              left: ${imageElement.x}px;
              top: ${imageElement.y}px;
              width: ${imageElement.width}px;
              height: ${imageElement.height}px;
              object-fit: cover;
            "
          />
        `
        }
        return ""
      })
      .join("")

    const backgroundStyle =
      page.backgroundType === "color"
        ? `background: ${page.background};`
        : `background: url('${page.background}') center/cover;`

    return `
      <div class="certificate-page" style="
        position: relative;
        width: ${dimensions.width}px;
        height: ${dimensions.height}px;
        ${backgroundStyle}
        margin: 20px auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        page-break-after: always;
      ">
        ${elementsHTML}
      </div>
    `
  }

  const pagesHTML = template.pages.map(generatePageHTML).join("")

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        
        .certificate-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .certificate-page {
            background: white;
            position: relative;
        }
        
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            
            .certificate-page {
                margin: 0;
                box-shadow: none;
                page-break-after: always;
            }
        }
        
        @page {
            size: A4 landscape;
            margin: 0.5in;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        ${pagesHTML}
    </div>
    
    <script>
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
    </script>
</body>
</html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${template.name.replace(/\s+/g, "_")}_certificate.html`
  link.click()
  URL.revokeObjectURL(url)
}

export function CertificateDesigner() {
  const [currentTemplate, setCurrentTemplate] = useState<Template>(CERTIFICATE_TEMPLATES[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load template on mount
  useEffect(() => {
    const savedTemplate = loadFromLocalStorage()
    if (savedTemplate) {
      setCurrentTemplate(savedTemplate)
    }
  }, [])

  // Auto-save template changes
  useEffect(() => {
    saveToLocalStorage(currentTemplate)
  }, [currentTemplate])

  const currentPage = currentTemplate.pages[currentPageIndex]
  const pageDimensions = getPageDimensions(currentPage.size)

  const replaceVariables = (text: string) => {
    let result = text
    currentTemplate.variables.forEach((variable) => {
      const regex = new RegExp(`{{${variable.name}}}`, "g")
      result = result.replace(regex, variable.value)
    })
    return result
  }

  const addTextElement = () => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: "New Text",
      x: 100,
      y: 100,
      fontSize: 16,
      fontFamily: "serif",
      color: "#000000",
      fontWeight: "normal",
      textAlign: "left",
    }

    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements.push(newElement)
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(newElement.id)
  }

  const addTextElementWithVariable = (variableText: string) => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: variableText,
      x: 100,
      y: 100,
      fontSize: 16,
      fontFamily: "serif",
      color: "#000000",
      fontWeight: "normal",
      textAlign: "left",
    }

    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements.push(newElement)
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(newElement.id)
  }

  const addImageElement = (src: string) => {
    const newElement: ImageElement = {
      id: `image-${Date.now()}`,
      type: "image",
      src,
      x: 100,
      y: 100,
      width: 200,
      height: 150,
    }

    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements.push(newElement)
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(newElement.id)
  }

  const updateElement = (elementId: string, updates: Partial<TextElement | ImageElement>) => {
    const updatedPages = [...currentTemplate.pages]
    const elementIndex = updatedPages[currentPageIndex].elements.findIndex((el) => el.id === elementId)
    if (elementIndex !== -1) {
      updatedPages[currentPageIndex].elements[elementIndex] = {
        ...updatedPages[currentPageIndex].elements[elementIndex],
        ...updates,
      }
      setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    }
  }

  const deleteElement = (elementId: string) => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex].elements = updatedPages[currentPageIndex].elements.filter(
      (el) => el.id !== elementId,
    )
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
    setSelectedElement(null)
  }

  const updateVariable = (name: string, value: string) => {
    const updatedVariables = currentTemplate.variables.map((variable) =>
      variable.name === name ? { ...variable, value } : variable,
    )
    setCurrentTemplate({ ...currentTemplate, variables: updatedVariables })
  }

  const updatePageBackground = (background: string, backgroundType: "color" | "image") => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      background,
      backgroundType,
    }
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
  }

  const updatePageSize = (size: string) => {
    const updatedPages = [...currentTemplate.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      size,
    }
    setCurrentTemplate({ ...currentTemplate, pages: updatedPages })
  }

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

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedElement(elementId)
    setIsDragging(true)

    const element = currentPage.elements.find((el) => el.id === elementId)
    if (element) {
      const canvasRect = e.currentTarget.parentElement?.getBoundingClientRect()
      if (canvasRect) {
        setDragOffset({
          x: e.clientX - canvasRect.left - element.x,
          y: e.clientY - canvasRect.top - element.y,
        })
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const newX = e.clientX - canvasRect.left - dragOffset.x
      const newY = e.clientY - canvasRect.top - dragOffset.y

      const constrainedX = Math.max(0, Math.min(newX, pageDimensions.width - 50))
      const constrainedY = Math.max(0, Math.min(newY, pageDimensions.height - 20))

      updateElement(selectedElement, { x: constrainedX, y: constrainedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const selectedElementData = selectedElement ? currentPage.elements.find((el) => el.id === selectedElement) : null

  const filteredVariables = PREDEFINED_VARIABLES.filter(
    (variable) =>
      variable.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVariableClick = (variable: PredefinedVariable) => {
    addTextElementWithVariable(variable.value)
  }

  const handleTemplateSelect = (template: Template) => {
    setCurrentTemplate(template)
    setCurrentPageIndex(0)
    setSelectedElement(null)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Certificate Designer</h1>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="flex flex-col w-full h-auto">
              <TabsTrigger value="templates" className="w-full">
                Templates
              </TabsTrigger>
              <TabsTrigger value="elements" className="w-full">
                Elements
              </TabsTrigger>
              <TabsTrigger value="variables" className="w-full">
                Variables
              </TabsTrigger>
              <TabsTrigger value="pages" className="w-full">
                Pages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certificate Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
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
                          {template.pages.length} page{template.pages.length > 1 ? "s" : ""} •{" "}
                          {template.variables.length} variables
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="elements" className="space-y-4">
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
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
                              onChange={(e) =>
                                updateElement(selectedElement!, { fontSize: Number.parseInt(e.target.value) })
                              }
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
                              onChange={(e) =>
                                updateElement(selectedElement!, { width: Number.parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="image-height">Height</Label>
                            <Input
                              id="image-height"
                              type="number"
                              value={(selectedElementData as ImageElement).height}
                              onChange={(e) =>
                                updateElement(selectedElement!, { height: Number.parseInt(e.target.value) })
                              }
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
            </TabsContent>

            <TabsContent value="variables" className="space-y-4">
              {/* Current Template Variables */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Variables</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentTemplate.variables.map((variable) => (
                    <div key={variable.name}>
                      <Label htmlFor={variable.name}>{variable.placeholder}</Label>
                      <Input
                        id={variable.name}
                        value={variable.value}
                        onChange={(e) => updateVariable(variable.name, e.target.value)}
                        placeholder={variable.placeholder}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Predefined Variables */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Variables</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search variables..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredVariables.map((variable, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleVariableClick(variable)}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{variable.label}</div>
                          <div className="text-xs text-gray-500 font-mono">{variable.value}</div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {filteredVariables.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No variables found matching "{searchTerm}"</div>
                  )}

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Click on any variable above to add it as a text element to your certificate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Page Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Select value={currentPage.size} onValueChange={updatePageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAGE_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label} ({size.width} × {size.height})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                       {BACKGROUND_IMG?.map((template) => {
                        return (
                          <Button
                            key={template._id}
                            variant={
                              currentTemplate.id === template._id
                                ? "default"
                                : "outline"
                            }
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => updatePageBackground(template.imgUrl, "image")}
                          >
                            <div
                              style={{
                                backgroundImage: `url("${template.imgUrl}")`,
                                backgroundSize: "cover",
                                marginTop: 5,
                                marginBottom: 5,
                                width: "100%",
                                height: 150,
                              }}
                            />
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {currentTemplate.name} - {currentPage.name}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => exportToHTML(currentTemplate, replaceVariables)}>
              <FileText className="w-4 h-4 mr-2" />
              Export HTML
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <div className="max-w-full mx-auto">
            <div
              className="relative bg-white shadow-lg mx-auto"
              style={{
                width: `${pageDimensions.width}px`,
                height: `${pageDimensions.height}px`,
                background:
                  currentPage.backgroundType === "color"
                    ? currentPage.background
                    : `url("${currentPage.background}") center/cover`,
                cursor: isDragging ? "grabbing" : "default",
                transform: "scale(0.7)",
                transformOrigin: "top center",
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {currentPage.elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-pointer select-none ${
                    selectedElement === element.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    left: element.x,
                    top: element.y,
                    transform:
                      element.type === "text" && (element as TextElement).textAlign === "center"
                        ? "translateX(-50%)"
                        : element.type === "text" && (element as TextElement).textAlign === "right"
                          ? "translateX(-100%)"
                          : "none",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {element.type === "text" && (
                    <div
                      style={{
                        fontSize: (element as TextElement).fontSize,
                        fontFamily: (element as TextElement).fontFamily,
                        color: (element as TextElement).color,
                        fontWeight: (element as TextElement).fontWeight,
                        textAlign: (element as TextElement).textAlign as any,
                        whiteSpace: "pre-wrap",
                        minWidth: "20px",
                        minHeight: "20px",
                      }}
                    >
                      {replaceVariables((element as TextElement).content)}
                    </div>
                  )}

                  {element.type === "image" && (
                    <img
                      src={(element as ImageElement).src || "/placeholder.svg"}
                      alt="Certificate element"
                      style={{
                        width: (element as ImageElement).width,
                        height: (element as ImageElement).height,
                        objectFit: "cover",
                      }}
                      draggable={false}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
