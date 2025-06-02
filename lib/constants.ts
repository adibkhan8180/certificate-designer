import { Template_Type } from "@/components/ui/TemplateType";
import type { Template, PredefinedVariable } from "@/types/certificate";

export const PREDEFINED_VARIABLES: PredefinedVariable[] = [
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
];

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "academic-certificate",
    name: "Academic Certificate",
    variables: [
      { name: "StudentName", value: "John Doe", placeholder: "Student Name" },
      {
        name: "CourseName",
        value: "Computer Science",
        placeholder: "Course Name",
      },
      {
        name: "DegreeDate",
        value: new Date().toLocaleDateString(),
        placeholder: "Degree Date",
      },
      {
        name: "SchoolName",
        value: "University of Excellence",
        placeholder: "School Name",
      },
    ],
    pages: [
      {
        id: "page1",
        name: "Certificate Page",
        background: "#ffffff",
        backgroundType: "color",
        elements: [
          {
            id: "title",
            type: "text",
            content: "Certificate of Completion",
            x: 400,
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
            x: 400,
            y: 180,
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
            x: 400,
            y: 230,
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
            x: 400,
            y: 280,
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
            x: 400,
            y: 380,
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
];

export const FONT_FAMILIES = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
  { value: "fantasy", label: "Fantasy" },
];

export const FONT_WEIGHTS = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "100", label: "Thin" },
  { value: "300", label: "Light" },
  { value: "500", label: "Medium" },
  { value: "700", label: "Bold" },
  { value: "900", label: "Black" },
];

export const TEXT_ALIGNMENTS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export const TEMPLATES: Template_Type[] = [
  {
    _id: "627e023261ea4b597674ea9a",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg4.png",
          orientationId: 7928816004,
        },
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/orgData/5f80bdb33234820a45d9a405/1630996240_testing.jpeg",
          orientationId: 7928816034,
        },
      ],
      rndElemSet: {
        "388930831": {
          elementType: "QRCODE",
          elementId: 388930831,
          rndProps: {
            position: { x: 347.8812561035156, y: 421 },
            size: { width: 90, height: 90 },
          },
          rndStyle: { zIndex: 0 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
            orientationId: 7928816034,
        },
        "2332322078": {
          elementType: "TEXT",
          elementId: 2332322078,
          rndProps: { position: { x: 269.4687271118164, y: 207 } },
          rndStyle: { zIndex: 2 },
          id: "font-button-roboto",
          html: "This certificate is awarded to&nbsp;{{StudentName}}&nbsp;",
          fontId: "roboto",
          textStyle: {
            display: "block",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "normal",
            textDecoration: "none",
            orientationId: 7928816034,
          },
        },
        "5705561554": {
          elementType: "TEXT",
          elementId: 5705561554,
          rndProps: {
            position: { x: 254.03125, y: 102.68749237060547 },
          },
          rndStyle: { zIndex: 1 },
          id: "font-button-sacramento",
          html: "Certificate of Excellence",
          fontId: "sacramento",
          textStyle: {
            display: "block",
            fontSize: 44,
            fontWeight: 900,
            fontStyle: "normal",
            textDecoration: "none",
            fontFamily: "Sacramento",
          },
          orientationId: 7928816034,
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1652425265.png",
  },
  {
    _id: "61c585b6edbc921e18e518d8",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg63.png",
        },
      ],
      rndElemSet: {
        "4670637859": {
          elementType: "QRCODE",
          elementId: 4670637859,
          rndProps: {
            position: { x: 0, y: 165 },
            size: { width: 90, height: 90 },
          },
          rndStyle: { zIndex: 1 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1640334770.png",
  },
  {
    _id: "61c586bfedbc921e18e5190e",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/orgData/5f80bdb33234820a45d9a405/1630996240_testing.jpeg",
        },
      ],
      rndElemSet: {
        "6782550967": {
          elementType: "QRCODE",
          elementId: 6782550967,
          rndProps: {
            position: { x: 100, y: 100 },
            size: { width: 90, height: 90 },
          },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1640335030.png",
  },
  {
    _id: "61c6b07cf539980ffae03b80",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg59.png",
        },
      ],
      rndElemSet: {
        "2560113135": {
          elementType: "TEXT",
          elementId: 2560113135,
          rndProps: { position: { x: 184.3203125, y: 317 } },
          rndStyle: { zIndex: 0 },
          id: "font-button-roboto",
          html: "for participating in the course&nbsp;{{CourseName}} starting from&nbsp;{{CourseStartDate}}<div>to {{CourseEndDate}}</div>",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "2762764743": {
          elementType: "VARIABLE",
          elementId: 2762764743,
          rndProps: { position: { x: 259.515625, y: 500 } },
          rndStyle: { zIndex: 2 },
          id: "font-button-roboto",
          html: "{{IssuedDate}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "3528359838": {
          elementType: "QRCODE",
          elementId: 3528359838,
          rndProps: {
            position: { x: 680, y: 14 },
            size: { width: 90, height: 90 },
          },
          rndStyle: { zIndex: 5 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
        },
        "3887391048": {
          elementType: "VARIABLE",
          elementId: 3887391048,
          rndProps: { position: { x: 39.53125, y: 517.15625 } },
          rndStyle: { zIndex: 3 },
          id: "font-button-roboto",
          html: "{{AuthorizedSignatories.0.designation}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 10,
          },
        },
        "5866485611": {
          elementType: "VARIABLE",
          elementId: 5866485611,
          rndProps: { position: { x: 272.515625, y: 253.9140625 } },
          rndStyle: { zIndex: 6 },
          id: "font-button-pacifico",
          html: "{{StudentName}}",
          fontId: "pacifico",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Pacifico",
            textDecoration: "none",
            color: "#000000",
            fontSize: 32,
          },
        },
        "8474633636": {
          elementType: "VARIABLE",
          elementId: 8474633636,
          rndProps: { position: { x: 39, y: 500 } },
          rndStyle: { zIndex: 4 },
          id: "font-button-roboto",
          html: "{{AuthorizedSignatories.0.name}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "4604543378": {
          elementType: "TEXT",
          elementId: 4604543378,
          rndProps: { position: { x: 286.3828125, y: 515.15625 } },
          rndStyle: { zIndex: 1 },
          id: "font-button-roboto",
          html: "Date",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 10,
          },
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1640411258.png",
  },
  {
    _id: "630701314c766a16cbdf9ea3",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            previewScale: 0.16,
            displayScale: 0.7,
          },
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg59.png",
        },
      ],
      rndElemSet: {
        "2560113135": {
          elementType: "TEXT",
          elementId: 2560113135,
          rndProps: { position: { x: 184.3203125, y: 317 } },
          rndStyle: { zIndex: 0 },
          id: "font-button-roboto",
          html: "for participating in the course&nbsp;{{CourseName}} starting from&nbsp;{{CourseStartDate}}<div>to {{CourseEndDate}}</div>",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "2762764743": {
          elementType: "VARIABLE",
          elementId: 2762764743,
          rndProps: { position: { x: 259.515625, y: 500 } },
          rndStyle: { zIndex: 2 },
          id: "font-button-roboto",
          html: "{{IssuedDate}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "3528359838": {
          elementType: "QRCODE",
          elementId: 3528359838,
          rndProps: {
            position: { x: 680, y: 14 },
            size: { width: 90, height: 90 },
          },
          rndStyle: { zIndex: 5 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
        },
        "3887391048": {
          elementType: "VARIABLE",
          elementId: 3887391048,
          rndProps: { position: { x: 39.53125, y: 517.15625 } },
          rndStyle: { zIndex: 3 },
          id: "font-button-roboto",
          html: "{{AuthorizedSignatories.0.designation}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 10,
          },
        },
        "5866485611": {
          elementType: "VARIABLE",
          elementId: 5866485611,
          rndProps: { position: { x: 272.515625, y: 253.9140625 } },
          rndStyle: { zIndex: 6 },
          id: "font-button-pacifico",
          html: "{{StudentName}}",
          fontId: "pacifico",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Pacifico",
            textDecoration: "none",
            color: "#000000",
            fontSize: 32,
          },
        },
        "8474633636": {
          elementType: "VARIABLE",
          elementId: 8474633636,
          rndProps: { position: { x: 39, y: 500 } },
          rndStyle: { zIndex: 4 },
          id: "font-button-roboto",
          html: "{{AuthorizedSignatories.0.name}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 12,
          },
        },
        "4604543378": {
          elementType: "TEXT",
          elementId: 4604543378,
          rndProps: { position: { x: 286.3828125, y: 515.15625 } },
          rndStyle: { zIndex: 1 },
          id: "font-button-roboto",
          html: "Date",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 10,
          },
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1661403441.png",
  },
  {
    _id: "642e77dd15dd28203f91020b",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 LANDSCAPE",
            backgrounds: [""],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            backgroundColor: "#FFFFFF",
            previewScale: 0.16,
            displayScale: 0.75,
          },
          orientationId: 7928816004,
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg27.png",
        },
      ],
      rndElemSet: {
        "1783043651": {
          elementType: "VARIABLE",
          elementId: 1783043651,
          orientationId: 7928816004,
          rndProps: {
            position: { x: 427.65625, y: 334 },
            size: { width: "298px", height: "auto" },
          },
          rndStyle: { zIndex: 0 },
          id: "font-button-roboto",
          html: "{{StudentName}}",
          fontId: "roboto",
          textStyle: {
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Roboto",
            textDecoration: "none",
            color: "#000000",
            fontSize: 20,
            letterSpacing: 0,
            lineHeight: 1,
            textAlign: "center",
          },
        },
        "7938674834": {
          elementType: "QRCODE",
          elementId: 7938674834,
          rndProps: {
            position: { x: 980, y: 10 },
            size: { width: 125, height: 125 },
          },
          rndStyle: { zIndex: 2 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
          orientationId: 7928816004,
        },
        "9386959569": {
          elementType: "IMAGE",
          elementId: 9386959569,
          rndProps: {
            position: { x: 100, y: 100 },
            size: { width: 100, height: "auto" },
          },
          rndStyle: { zIndex: 1 },
          imgUrl:
            "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/images/badge2.png",
          orientationId: 7928816004,
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1680766941.png",
  },
  {
    _id: "642e76a115dd28203f9101df",
    templateJson: {
      background: [
        {
          orientation: {
            id: "A4LANDSCAPE",
            label: "A4 Landscape",
            backgrounds: [""],
            dimensions: { widthCm: 29.7, heightCm: 21 },
            backgroundColor: "#FFFFFF",
            previewScale: 0.16,
            displayScale: 0.75,
          },
          orientationId: 6504269158,
          img: "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg1.png",
        },
      ],
      rndElemSet: {
        "1020005172": {
          elementType: "TEXT",
          elementId: 1020005172,
          orientationId: 6504269158,
          rndProps: {
            position: { x: 166.75, y: 378.6875 },
            size: { width: "795px", height: "auto" },
          },
          rndStyle: { zIndex: 0 },
          id: "font-button-roboto",
          html: "Certificate Issued By<div>{{OrgName}}<br></div>",
          fontId: "roboto",
          textStyle: {
            display: "block",
            fontSize: 24,
            fontWeight: 900,
            fontStyle: "normal",
            textDecoration: "none",
          },
        },
        "6546881867": {
          elementType: "QRCODE",
          elementId: 6546881867,
          rndProps: {
            position: { x: 914, y: 78 },
            size: { width: 125, height: 125 },
          },
          rndStyle: { zIndex: 2 },
          imgUrl:
            "https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png",
          orientationId: 6504269158,
        },
        "9321974440": {
          elementType: "TEXT",
          elementId: 9321974440,
          orientationId: 6504269158,
          rndProps: {
            position: { x: 327.8203125, y: 234 },
            size: { width: "451px", height: "auto" },
          },
          rndStyle: { zIndex: 3 },
          id: "font-button-roboto",
          html: "Certificate Issue To<div>{{StudentName}}<br></div>",
          fontId: "roboto",
          textStyle: {
            display: "block",
            fontSize: 24,
            fontWeight: 900,
            fontStyle: "normal",
            textDecoration: "none",
          },
        },
        "9576118162": {
          elementType: "IMAGE",
          elementId: 9576118162,
          rndProps: {
            position: { x: 89, y: 78 },
            size: { width: "134px", height: "175px" },
          },
          imgUrl:
            "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/images/badge2.png",
          orientationId: 6504269158,
        },
      },
    },
    variant: "A4LANDSCAPE",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/email/orgData/common/1680766625.png",
  },
];

export const BACKGROUND_IMG = [
  {
    _id: "60523e60e3493807bc079a74",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg1.png",
    variant: "A4LANDSCAPE",
    created: 1647252953,
  },
  {
    _id: "6229eae36d1b7b540cfa6620",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/Green+And+Yellow+Employee+Of+The+Month+Award+Certificate+(25).png",
    variant: "A4LANDSCAPE",
    created: 1647252898,
  },
  {
    _id: "612fa0ccca3ea6742a6d1258",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/orgData/612236bdafc8333ea3516e6e/1630511300_Untitled%20design%20%286%29.png",
    variant: "A4LANDSCAPE",
    created: 1630511308,
    __v: 0,
  },
  {
    _id: "61ea875e1571b71fd71f83cc",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.ama…16e6e/1642759801_download%20%281%29%20%281%29.png",
    variant: "BADGE",
  },
  {
    _id: "60965fa6be5ceb7c86037897",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg51.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037876",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg18.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603787f",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg27.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603787c",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg24.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60770e1c7e8f910556293fb0",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4portrait/bg3.png",
    variant: "A4PORTRAIT",
  },
  {
    _id: "60965f1bbe5ceb7c8603786b",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg7.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603789d",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg57.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603788c",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg40.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60543dfb05a3893a6281f549",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/badgebases/base1.png",
    variant: "BADGE",
  },
  {
    _id: "61eb8c8daae0d6c5e54d15ec",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/orgData/612236bdafc8333ea3516e6e/1642759801_download%20%281%29%20%281%29.png",
    variant: "BADGE",
  },
  {
    _id: "607d4b2be514cf319ea937ef",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg4.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037888",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg36.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603786f",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg11.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037899",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg53.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037880",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg28.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603788d",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg41.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60523e69e3493807bc079a75",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg2.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "622b194465e4d7f5c2ae4442",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/back2n.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037875",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg17.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "607d4a0ce514cf319ea937ee",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4portrait/bg4.png",
    variant: "A4PORTRAIT",
  },
  {
    _id: "60965fa6be5ceb7c86037883",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg31.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603786c",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg8.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037886",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg34.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603789b",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg55.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037893",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg47.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60770dac7e8f910556293faf",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4portrait/bg2.png",
    variant: "A4PORTRAIT",
  },
  {
    _id: "60965fa6be5ceb7c86037890",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg44.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037891",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg45.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037870",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg12.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603787e",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg26.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c86037882",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg30.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "605233ac5d4303102d76f78b",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4portrait/bg1.png",
    variant: "A4PORTRAIT",
  },
  {
    _id: "60965fa6be5ceb7c86037884",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg32.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603789c",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg56.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965fa6be5ceb7c8603786d",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg9.png",
    variant: "A4LANDSCAPE",
  },
  {
    _id: "60965f1bbe5ceb7c8603786a",
    imgUrl:
      "https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/certificateeditor/background/a4landscape/bg6.png",
    variant: "A4LANDSCAPE",
  },
];
