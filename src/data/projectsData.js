import { getAssetUrl } from '@/utils/url'

export const projectsData = {
  examhub: {
    title: 'ExamHub — Online Examination Platform',
    impactSuffix: 'ลดเวลาจัดชุดข้อสอบลง 70%',
    category: 'web',
    badges: ['Web Platform', 'EdTech', 'Analytics', 'Vercel'],
    image: getAssetUrl('/ExamHubpage.png'),
    overview: 'แพลตฟอร์มคลังข้อสอบและจัดการการสอบออนไลน์ ออกแบบมาเพื่อสนับสนุนการเรียนรู้ในระดับอุดมศึกษา รองรับมากกว่า 20+ สาขาวิชาในหมวด Computer Science และ Data Science พร้อมระบบตรวจคำตอบและการวิเคราะห์คะแนนแบบเรียลไทม์',
    architecture: 'สถาปัตยกรรม Full-Stack Web Application บน Vercel Cloud Platform พัฒนาด้วย JavaScript ที่เน้นความเร็วและ Accessibility เชื่อมต่อระบบ Admin CMS จัดการข้อมูลข้อสอบแบบ JSON Pipelines และสร้างระบบวิเคราะห์ข้อมูลคะแนนด้วย Recharts Data Visualizer',
    features: [
      'Interactive Examination Engine: ระบบทำข้อสอบแบบจับเวลาและตรวจผลคะแนนอัตโนมัติทันทีที่ส่ง',
      'Admin CMS Question Management: ระบบจัดการคลังข้อสอบ คัดกรอง ตรวจสอบ และนำเข้าข้อมูลข้อสอบรูปแบบ JSON แบบ Batch',
      'Score Analytics & Mastery Dashboard: แสดงกราฟสถิติการกระจายตัวของคะแนน (Score Distribution) และประเมินจุดแข็ง-จุดอ่อนของผู้เรียน',
      'Quality Feedback Workflow: เวิร์กโฟลว์สำหรับรายงานและตรวจสอบความถูกต้องของโจทย์ข้อสอบ'
    ],
    impact: 'ช่วยลดระยะเวลาในการจัดชุดข้อสอบและประเมินผลการเรียนรู้ลงกว่า 70% พร้อมยกระดับคุณภาพของคลังข้อสอบด้วยการตรวจสอบความถูกต้องอย่างเป็นระบบ',
    liveUrl: 'https://exam-hub-seven.vercel.app',
    liveLabel: 'เปิดดู Live App',
    gitHubUrl: 'https://github.com/dewdew978/ExamHub'
  },
  cmcc: {
    title: 'CMCC 2025 — Strategy & Digital Innovation (Plan B Media)',
    impactSuffix: 'โมเดล Asset Tokenization & ROI',
    category: 'business',
    badges: ['Business Strategy', 'Financial Valuation', 'Capital Market', 'Quarto'],
    image: getAssetUrl('/cmcc.png'),
    overview: 'โครงการแข่งขันวิเคราะห์เคสตลาดทุนระดับประเทศ Capital Market Case Competition 2025 สำหรับ Plan B Media เพื่อค้นหาโอกาสทางธุรกิจใหม่และวางแผนกลยุทธ์เชิงรุกสำหรับสื่อนอกบ้าน (Out-of-Home Media) ในยุคดิจิทัล',
    architecture: 'การวิเคราะห์เชิงยุทธศาสตร์ผสมผสานการสร้างแบบจำลองทางการเงิน (Financial Modeling) และการประเมินมูลค่ากิจการ (Enterprise Valuation) พร้อมนำเสนอด้วย Interactive Presentation Deck ที่พัฒนาผ่าน Quarto Framework',
    features: [
      'OOH Market Dynamics: วิเคราะห์สภาพตลาดสื่อโฆษณานอกบ้าน พฤติกรรมผู้บริโภค และความพร้อมสู่ Digital Convergence',
      'Asset Tokenization Model: แนวคิดการแปลงพื้นที่ป้ายโฆษณาเป็น Digital Asset Token เพื่อเพิ่มสภาพคล่องทางการเงินและเปิดรับนักลงทุนรายย่อย',
      'Sustainability Financing (Green Billboards): โมเดลนวัตกรรมป้ายประหยัดพลังงานเพื่อสอดรับกับเกณฑ์ ESG',
      'Sportainment Platform: แพลตฟอร์มบูรณาการสื่อกีฬาและกิจกรรมบันเทิงเพื่อสร้างการมีส่วนร่วมของแฟนคลับ (Fan Engagement)'
    ],
    impact: 'นำเสนอโมเดลรายได้ใหม่และการประเมินผลตอบแทนจากการลงทุน (ROI Projection) ที่ชัดเจน ช่วยเพิ่มมูลค่าเชิงกลยุทธ์และการแข่งขันระยะยาวขององค์กร',
    liveUrl: 'https://dewdew978.github.io/cmcc-quarto-slides/#/section',
    liveLabel: 'เปิดดู Interactive Slides',
    gitHubUrl: 'https://github.com/dewdew978/cmcc-quarto-slides'
  },
  'curriculum-system': {
    title: 'Intelligent Curriculum Information System',
    impactSuffix: 'OCR, LLM, Text-to-SQL และ Question Answering',
    category: 'analytics',
    badges: ['Intelligent System', 'OCR', 'Text-to-SQL', 'Python'],
    image: getAssetUrl('/assets/projects/intelligent-curriculum-system.png'),
    overview: 'ระบบผู้ช่วยค้นหาข้อมูลหลักสูตรที่สกัดข้อมูลจากเอกสาร มคอ.2 ครอบคลุมหลักสูตร AIT, IT, DSBA และ BIT แล้วเปิดให้ถามตอบข้อมูลด้วยภาษาธรรมชาติ',
    architecture: 'Python OCR pipeline เปรียบเทียบหลาย OCR engines ก่อนจัดโครงสร้างข้อมูลลง SQLite และให้บริการเว็บผ่าน FastAPI โดยใช้ Local LLM แปลงคำถามเป็น SQL และสังเคราะห์คำตอบจากข้อมูลที่ตรวจสอบได้',
    features: [
      'Curriculum OCR Pipeline: สกัดรายวิชา แผนการศึกษา วิชาเลือก ข้อบังคับ และคำอธิบายรายวิชาจากเอกสารหลักสูตร',
      'Text-to-SQL Question Answering: แปลงคำถามภาษาธรรมชาติเป็น SQL แล้วตอบจากฐานข้อมูลหลักสูตร',
      'Evaluation Workflow: ประเมินผลการสกัดด้วย CER, WER, Precision, Recall และ F1 พร้อมเก็บรายงานที่ตรวจสอบซ้ำได้',
      'Multi-Program Database: รวมข้อมูลหลักสูตร AIT, IT, DSBA และ BIT ในฐานข้อมูลเชิงสัมพันธ์เดียว'
    ],
    impact: 'เปลี่ยนเอกสารหลักสูตรจำนวนมากให้เป็นฐานข้อมูลที่ค้นหาและถามตอบได้ พร้อมกระบวนการประเมินคุณภาพที่ทำซ้ำได้',
    liveUrl: 'https://canva.link/tgvf3eo1finloeb',
    liveLabel: 'เปิดดู Presentation',
    gitHubUrl: 'https://github.com/dewdew978/isd-2026-luksuitpiti'
  },
  'cloud-sql-playground': {
    title: 'Cloud SQL Playground',
    impactSuffix: 'SQL workspace แบบแยก schema บน AWS',
    category: 'web',
    badges: ['Cloud Platform', 'AWS', 'PostgreSQL', 'React'],
    image: getAssetUrl('/assets/projects/cloud-sql-playground.png'),
    overview: 'ต้นแบบพื้นที่ฝึกเขียนและทดลอง SQL บน PostgreSQL โดยไม่ต้องติดตั้งฐานข้อมูล ออกแบบให้ผู้ใช้แต่ละคนมีพื้นที่แบบแยก schema พร้อมชุดข้อมูลและโจทย์ฝึกสำหรับเรียนรู้ผ่านเว็บ โดยหน้าเว็บยังไม่ได้เปิดใช้งานสาธารณะ',
    architecture: 'ต้นแบบ React และ Monaco Editor เชื่อมต่อ API Gateway กับ AWS Lambda ภายใน VPC ใช้ RDS PostgreSQL 16 เป็นฐานข้อมูล พร้อม DynamoDB, Secrets Manager, S3 และ EventBridge โดยบางส่วนยังรอการ deploy และทดสอบกับ API จริง',
    features: [
      'Isolated SQL Workspace: แยก PostgreSQL schema และ role รายผู้ใช้ พร้อมจำกัด connection และ query timeout',
      'Learning Datasets: ชุดข้อมูล school, shop และ company รวม 14 ตาราง พร้อมโจทย์ SQL 30 ข้อที่ทดสอบในเครื่องแล้ว',
      'Database Exploration: เรียกใช้ SQL ดูประวัติ query สำรวจ schema และ ER diagram ผ่านหน้าเว็บ',
      'Serverless Operations: ออกแบบการจัดการ session, authentication, secrets และ cleanup ด้วยบริการ AWS'
    ],
    impact: 'พัฒนาต้นแบบสภาพแวดล้อมฝึก SQL พร้อมมาตรการแยกข้อมูลและจำกัดคำสั่งในระดับฐานข้อมูล โดยมีชุดทดสอบสำหรับตรวจสอบการทำงานก่อนเปิดใช้งานจริง',
    liveUrl: 'https://canva.link/5mlz3o5a602axht',
    liveLabel: 'เปิดดู Presentation',
    gitHubUrl: null
  },
  'us-accidents': {
    title: 'US Accidents Analytics & Risk Modeling Report',
    impactSuffix: 'Big Data Risk Modeling ล้านเรคคอร์ด',
    category: 'analytics',
    badges: ['Data Analytics', 'Python', 'Pandas', 'EDA', 'Data Viz'],
    image: getAssetUrl('/assets/images/1.png'),
    overview: 'โครงการวิเคราะห์ชุดข้อมูลอุบัติเหตุจราจรในสหรัฐอเมริกาขนาดใหญ่ (US Accidents Dataset หลายล้านเรคคอร์ด) เพื่อค้นหาความสัมพันธ์ ปัจจัยเสี่ยง และสร้างโมเดลความรุนแรงของอุบัติเหตุในแต่ละพื้นที่',
    architecture: 'Data Pipeline พัฒนาด้วย Python (Pandas, NumPy) สำหรับการทำ Data Cleansing, Outlier Detection, Feature Engineering และสร้างรายงานข้อมูลเชิงลึกแบบ Interactive Web Report',
    features: [
      'Temporal Risk Analysis: วิเคราะห์ช่วงเวลาเกิดอุบัติเหตุสูงสุด (Peak Traffic Hours) และความผันผวนตามวันในสัปดาห์',
      'Environmental Impact Modeling: ศึกษาผลกระทบของสภาพอากาศ (Weather, Visibility, Precipitation) และสภาพพื้นผิวถนนต่อระดับความรุนแรง (Severity Levels 1-4)',
      'Spatial Clustering & Hotspots: จัดกลุ่มพื้นที่และรัฐที่มีความหนาแน่นของอุบัติเหตุสูง เพื่อระบุจุดเสี่ยงอันตราย',
      'Interactive Data Report: นำเสนอผลลัพธ์ผ่านเว็บอินเทอร์แอคทีฟที่สามารถดูภาพรวมและตัวเลขสถิติได้อย่างสะดวก'
    ],
    impact: 'ผลการวิเคราะห์ให้ข้อเสนอแนะเชิงประจักษ์ในการวางแผนจัดสรรหน่วยกู้ภัยเชิงรุก และการจัดทำนโยบายลดอุบัติเหตุในพื้นที่เสี่ยงสูงได้อย่างตรงจุด',
    liveUrl: getAssetUrl('/assets/us.html'),
    liveLabel: 'เปิดดู Interactive Slides',
    gitHubUrl: 'https://github.com/dewdew978'
  }
}
