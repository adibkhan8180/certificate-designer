import type { Template, Page } from "@/types/certificate"

export const exportTemplate = (template: Template) => {
  const dataStr = JSON.stringify(template, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${template.name.replace(/\s+/g, "_")}_template.json`
  link.click()
  URL.revokeObjectURL(url)
}

export const importTemplate = (file: File): Promise<Template> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target?.result as string)
        resolve(template)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

export const exportToHTML = (template: Template, replaceVariables: (text: string) => string) => {
  const generatePageHTML = (page: Page) => {
    const elementsHTML = page.elements
      .map((element) => {
        if (element.type === "text") {
          const textElement = element as any
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
          const imageElement = element as any
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
        width: 800px;
        height: 600px;
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
            max-width: 840px;
            margin: 0 auto;
        }
        
        .certificate-page {
            background: white;
            position: relative;
        }
        
        .certificate-info {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .variables-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        .variables-table th,
        .variables-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .variables-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            
            .certificate-info {
                display: none;
            }
            
            .certificate-page {
                margin: 0;
                box-shadow: none;
                page-break-after: always;
            }
            
            .certificate-page:last-child {
                page-break-after: auto;
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
        <div class="certificate-info">
            <h1>${template.name}</h1>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Pages:</strong> ${template.pages.length}</p>
            
            ${
              template.variables.length > 0
                ? `
            <h3>Variables Used:</h3>
            <table class="variables-table">
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${template.variables
                      .map(
                        (variable) => `
                        <tr>
                            <td>{{${variable.name}}}</td>
                            <td>${variable.value}</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
            `
                : ""
            }
        </div>
        
        ${pagesHTML}
    </div>
    
    <script>
        function printCertificate() {
            window.print();
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                printCertificate();
            }
        });
        
        console.log('Certificate loaded successfully!');
        console.log('Press Ctrl+P to print');
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
