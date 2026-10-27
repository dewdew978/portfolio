# Clean Showcase Titles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** แสดงชื่อโปรเจกต์แบบสั้นบน Featured Projects Showcase โดยรักษาชื่อเต็มในหน้ารวมโปรเจกต์และ Modal

**Architecture:** เพิ่มฟิลด์ `showcaseTitle` ในข้อมูล localized project และให้ `ProjectShowcaseCard` เลือกใช้ฟิลด์นี้ก่อน `title` การ์ดประเภทอื่นยังอ่าน `title` เหมือนเดิม

**Tech Stack:** React, JavaScript, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-27-clean-showcase-titles-design.md`

## Global Constraints

- ไม่เปลี่ยนชื่อเต็ม รายละเอียด URL หรือ layout
- ชื่อ Showcase คือ `ExamHub`, `CMCC 2025`, `US Accident Analytics`
- รองรับภาษาไทยและอังกฤษ
- ไม่เพิ่ม dependency

## Review Focus

- โปรเจกต์ที่ไม่มี `showcaseTitle` ต้อง fallback ไป `title`
- หน้ารวมโปรเจกต์และ Modal ต้องยังใช้ `title`
- ข้อมูลทั้งสองภาษาต้องมีชื่อสั้นครบสามรายการ
- ชื่อสั้นต้องไม่ซ้ำกับ impact text
- การ์ดต้องไม่เกิดข้อความว่างเมื่อข้อมูลเก่าไม่มีฟิลด์ใหม่

---

### Task 1: Showcase-only project titles

**Files:**
- Modify: `src/locales/translations.js`
- Modify: `src/components/projects/ProjectShowcaseCard.jsx`
- Test: `tests/project-showcase.test.mjs`

**Interfaces:**
- Consumes: localized project object containing `title`
- Produces: optional `showcaseTitle` with fallback expression `project.showcaseTitle || project.title`

- [ ] **Step 1: Add failing tests for all three short names, fallback behavior, and full-title consumers**
- [ ] **Step 2: Run `node --test tests/project-showcase.test.mjs` and verify failure**
- [ ] **Step 3: Add localized `showcaseTitle` values and use the fallback in `ProjectShowcaseCard`**
- [ ] **Step 4: Run focused tests, then `node --test`**
- [ ] **Step 5: Run `npm run build` and inspect the Showcase locally**
