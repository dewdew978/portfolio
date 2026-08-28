export const projectsData = {
  examhub: {
    title: 'ExamHub — Online Examination Platform',
    impactSuffix: '— ลดเวลาจัดชุดข้อสอบลง 70%',
    category: 'web',
    badges: ['Web Platform', 'EdTech', 'Analytics', 'Vercel'],
    image: '/ExamHubpage.png',
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
    impactSuffix: '— โมเดล Asset Tokenization & ROI',
    category: 'business',
    badges: ['Business Strategy', 'Financial Valuation', 'Capital Market', 'Quarto'],
    image: '/cmcc.png',
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
  'us-accidents': {
    title: 'US Accidents Analytics & Risk Modeling Report',
    impactSuffix: '— Big Data Risk Modeling ล้านเรคคอร์ด',
    category: 'analytics',
    badges: ['Data Analytics', 'Python', 'Pandas', 'EDA', 'Data Viz'],
    image: '/assets/images/1.png',
    overview: 'โครงการวิเคราะห์ชุดข้อมูลอุบัติเหตุจราจรในสหรัฐอเมริกาขนาดใหญ่ (US Accidents Dataset หลายล้านเรคคอร์ด) เพื่อค้นหาความสัมพันธ์ ปัจจัยเสี่ยง และสร้างโมเดลความรุนแรงของอุบัติเหตุในแต่ละพื้นที่',
    architecture: 'Data Pipeline พัฒนาด้วย Python (Pandas, NumPy) สำหรับการทำ Data Cleansing, Outlier Detection, Feature Engineering และสร้างรายงานข้อมูลเชิงลึกแบบ Interactive Web Report',
    features: [
      'Temporal Risk Analysis: วิเคราะห์ช่วงเวลาเกิดอุบัติเหตุสูงสุด (Peak Traffic Hours) และความผันผวนตามวันในสัปดาห์',
      'Environmental Impact Modeling: ศึกษาผลกระทบของสภาพอากาศ (Weather, Visibility, Precipitation) และสภาพพื้นผิวถนนต่อระดับความรุนแรง (Severity Levels 1-4)',
      'Spatial Clustering & Hotspots: จัดกลุ่มพื้นที่และรัฐที่มีความหนาแน่นของอุบัติเหตุสูง เพื่อระบุจุดเสี่ยงอันตราย',
      'Interactive Data Report: นำเสนอผลลัพธ์ผ่านเว็บอินเทอร์แอคทีฟที่สามารถดูภาพรวมและตัวเลขสถิติได้อย่างสะดวก'
    ],
    impact: 'ผลการวิเคราะห์ให้ข้อเสนอแนะเชิงประจักษ์ในการวางแผนจัดสรรหน่วยกู้ภัยเชิงรุก และการจัดทำนโยบายลดอุบัติเหตุในพื้นที่เสี่ยงสูงได้อย่างตรงจุด',
    liveUrl: '/assets/us.html',
    liveLabel: 'เปิดดู Interactive Report',
    gitHubUrl: 'https://github.com/dewdew978'
  }
}
