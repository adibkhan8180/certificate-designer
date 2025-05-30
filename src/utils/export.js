import { getPageDimensions } from "./pageUtils"

export const exportToHTML = (template, replaceVariables) => {
  const generatePageHTML = (page) => {
    const dimensions = getPageDimensions(page.size)
    const elementsHTML = page.elements
      .map((element) => {
        if (element.type === "text") {
          const content = replaceVariables(element.content)

          let transform = ""
          if (element.textAlign === "center") {
            transform = "translateX(-50%)"
          } else if (element.textAlign === "right") {
            transform = "translateX(-100%)"
          }

          return `
          <div style="
            position: absolute;
            left: ${element.x}px;
            top: ${element.y}px;
            font-size: ${element.fontSize}px;
            font-family: ${element.fontFamily};
            color: ${element.color};
            font-weight: ${element.fontWeight};
            text-align: ${element.textAlign};
            white-space: pre-wrap;
            min-width: 20px;
            min-height: 20px;
            transform: ${transform};
          ">${content}</div>
        `
        } else if (element.type === "image") {
          return `
          <img 
            src="${element.src}" 
            alt="Certificate element"
            style="
              position: absolute;
              left: ${element.x}px;
              top: ${element.y}px;
              width: ${element.width}px;
              height: ${element.height}px;
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
