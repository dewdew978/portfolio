# Pixel Orb Click Reaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้ Pixel Orb เปลี่ยนเป็นหน้าตื่นเต้นพร้อมประกายเมื่อกด แล้วกลับหน้าปกติภายในประมาณ 700 มิลลิวินาที

**Architecture:** เพิ่ม state และ timer ภายใน `PixelOrb` โดยไม่เปลี่ยน API ที่ Navbar และ Hero ใช้อยู่ SVG จะมี face/excitement layer และ CSS animation ที่เปิดด้วย modifier class เดียว รองรับการกดด้วยเมาส์และคีย์บอร์ดผ่าน semantic button

**Tech Stack:** React, SVG, CSS animations, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-27-pixel-orb-click-reaction-design.md`

## Global Constraints

- ใช้เวลา reaction ประมาณ 700 มิลลิวินาทีและเล่นซ้ำได้หลังจบ
- ไม่เปลี่ยน layout หรือตำแหน่งของ Orb
- รองรับ keyboard และ screen reader
- Reduced Motion ต้องเปลี่ยนสีหน้าโดยไม่มีการเคลื่อนไหว
- ไม่เพิ่ม dependency

## Review Focus

- กดซ้ำระหว่าง reaction ต้องเริ่มรอบใหม่อย่างเสถียร
- timer ต้องถูกยกเลิกเมื่อ component unmount
- Navbar button ต้องไม่ทำให้ layout หรือขนาดเปลี่ยน
- Enter และ Space ต้องกระตุ้น reaction ผ่าน native button behavior
- Reduced Motion ต้องไม่มี bounce, ring burst หรือ sparkle animation

---

### Task 1: Clickable excited reaction

**Files:**
- Modify: `src/components/brand/PixelOrb.jsx`
- Modify: `src/components/brand/PixelOrb.css`
- Test: `tests/pixel-orb.test.mjs`

**Interfaces:**
- Consumes: `PixelOrb({ size, interactive, className })`
- Produces: API เดิม พร้อม native button และคลาส `pixel-orb--excited` ที่คงอยู่ 700ms

- [ ] **Step 1: Write the failing tests**

เพิ่ม assertions ว่า component มี state/timer cleanup, native button label, excited modifier, excited eye/spark layer และ CSS keyframes/reduced-motion override

- [ ] **Step 2: Run focused tests to verify failure**

Run: `node --test tests/pixel-orb.test.mjs`
Expected: FAIL เพราะ click reaction ยังไม่มี

- [ ] **Step 3: Implement the minimal reaction**

เพิ่ม `useState`, timeout ref/cleanup, click handler 700ms, semantic button, excited SVG elements และ CSS animation โดยไม่เปลี่ยนการวางตำแหน่งเดิม

- [ ] **Step 4: Run focused and full tests**

Run: `node --test tests/pixel-orb.test.mjs` และ `node --test`
Expected: PASS ทั้งหมด

- [ ] **Step 5: Verify production build and local visuals**

Run: `npm run build`
Expected: Vite build สำเร็จ จากนั้นกด Orb ใน Navbar และ Hero บน local page เพื่อตรวจภาพจริง

