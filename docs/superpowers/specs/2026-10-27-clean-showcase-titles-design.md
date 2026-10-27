# Clean Showcase Titles Design

## Intent

ลดความรกของข้อความบนการ์ด Featured Projects โดยไม่ทำให้ข้อมูลชื่อโปรเจกต์เต็มสูญหายจากส่วนอื่นของเว็บไซต์

## Selected Approach

เพิ่ม `showcaseTitle` แยกจาก `title` ในข้อมูลโปรเจกต์ และให้ `ProjectShowcaseCard` ใช้ชื่อสั้นดังนี้:

- ExamHub
- CMCC 2025
- US Accident Analytics

พิจารณาทางเลือกการแก้ `title` เดิมทั้งระบบแล้วไม่เลือก เพราะจะทำให้ชื่อในหน้ารวมโปรเจกต์และ Modal สั้นตามไปด้วย ส่วนการตัดข้อความด้วย CSS ไม่เลือกเพราะชื่ออาจจบกลางคำ

## Scope

- เปลี่ยนเฉพาะชื่อบน Featured Projects Showcase
- หน้ารวมโปรเจกต์ Modal คำอธิบาย และ URL ใช้ข้อมูลเดิม
- รองรับทั้งภาษาไทยและอังกฤษด้วยชื่อสั้นชุดเดียวกัน
