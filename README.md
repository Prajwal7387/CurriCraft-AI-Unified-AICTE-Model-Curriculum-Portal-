# CurriCraft AI — Unified AICTE Model Curriculum Portal 🎓🤖

[![AICTE Approved](https://img.shields.io/badge/AICTE-Model%20Curriculum-purple?style=for-the-badge)](https://www.aicte-india.org)
[![SIH Problem Statement SIH1465](https://img.shields.io/badge/SIH--2025-SIH1465-blue?style=for-the-badge)](https://sih.gov.in)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

An enterprise-grade, AI-powered curriculum development and governance platform built for the **All India Council for Technical Education (AICTE)**. CurriCraft AI combines the collaborative authoring of Google Docs, the version control of GitHub, the structured organization of Notion, the governance workflows of Jira, and the AI assistance of Grammarly & ChatGPT into a unified portal designed specifically for National Education Policy (NEP 2020) model curriculum development.

---

## 🚀 Key Modules & System Architecture

### 1. 📖 Collaborative Curriculum Workspace
- **Google Docs Style Rich Editor**: Modular syllabus builder for Course Overview, L-T-P Credit Distribution, Module breakdowns, and Bloom's Taxonomy Course Outcomes (COs).
- **AICTE Credit Formula Engine**: Real-time credit calculation formula ($L + T + \frac{P}{2}$).
- **Inline Peer Annotations**: Threaded review comments with author role badges and resolution states.
- **Socket.io Live Presence**: Real-time collaborator presence tracking.

### 2. 🔀 Git-Style Version Control Engine
- **Branch Management**: Create working branches (`main`, `draft/*`, `review/*`).
- **Commit History & Tags**: Chronological snapshot log with commit hashes, tags (`v1.0.0`, `v2.1.0`), and author details.
- **Side-by-Side Commit Diff Viewer**: Green additions (`+`) and red deletions (`-`) modal comparing curriculum revisions.
- **Merge Requests & Rollbacks**: Jira-style pull request merge approvals and 1-click historical rollbacks.
- **GitHub Open Source Repo Sync**: 1-click retrieval and import from real open-source GitHub repositories (`jwasham/coding-interview-university`, `ossu/computer-science`, `TheAlgorithms/C-Plus-Plus`, `aicte-india/model-curriculum`).

### 3. 🤖 AI Assistant & Bloom Taxonomy Generator
- **Grammarly & ChatGPT Suite**: Prompt-driven AI engine generating structured 5-module syllabi.
- **Bloom Taxonomy CO-PO Mapping**: Automatically formats Course Outcomes mapped to *Apply*, *Analyze*, *Evaluate*, and *Create* cognitive levels.
- **1-Click Workspace Sync**: Transfer AI generated syllabi into active workspace drafts.

### 4. 🛡️ NEP 2020 Compliance Engine
- **Automated Degree Audit**: Verifies 160-credit degree cap limits for B.Tech programs.
- **Universal Human Values (UHV) Audit**: Checks mandatory inclusion of UHV-1 and UHV-2 modules.
- **Compliance Scorecard**: Live audit score (94/100) and official AICTE Compliance Certificate export.

### 5. 📚 Resource Recommendation Hub
- **Academic Repositories**: Filterable links to official NPTEL video lectures, SWAYAM MOOCs, MIT OCW problem sets, OpenStax textbooks, IEEE papers, and GitHub lab code repositories.

### 6. 📊 National Adoption Analytics
- **Telemetry Tracking**: Live analytics monitoring 10,480+ AICTE approved engineering institutes across 28 Indian States and Union Territories.

### 7. 📋 Approval Governance Board
- **Jira-Style Kanban Board**: Multi-stage approval workflow (`Draft Phase` → `Peer Review` → `Bureau Approved` → `Published`).

### 8. 🌐 Public Model Curriculum Portal
- **National Repository**: Instant search and department filter for published AICTE Model Syllabi.
- **Direct Exports**: 1-click PDF & DOCX export buttons for official AICTE publications.

---

## 🔑 Demo Accounts & Role Access Matrix

The system includes pre-seeded demo accounts for instant role-based testing:

| Icon | Role Name | Demo Email | Password | Governance Permissions |
|---|---|---|---|---|
| 👑 | **AICTE Admin** | `admin@curricraft.in` | `Admin@123456` | Supreme System & User Access Control |
| 🏢 | **Bureau Head** | `bureau@curricraft.in` | `Bureau@123456` | National Publication & Expert Panel Management |
| 🎓 | **Curriculum Expert** | `expert@curricraft.in` | `Expert@123456` | Model Syllabi Authoring & AI Generation |
| 🔍 | **Peer Reviewer** | `reviewer@curricraft.in` | `Reviewer@123456` | Annotations, Pull Request Merges & NEP Audit |
| 👁️ | **Public Viewer** | `viewer@curricraft.in` | `Viewer@123456` | Search Syllabi & Download Official PDFs |

> 💡 **Instant Role Switcher**: Click the **✨ Switch Role** dropdown in the top header bar to switch between accounts in 1 click!

---

## 🛠️ Technology Stack

### Frontend Client
- **Framework**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Custom Glassmorphism, Google Fonts (*Outfit* & *Space Grotesk*)
- **Components**: Shadcn UI, Framer Motion animations, Lucide Icons
- **State Management**: Redux Toolkit, React Query

### Backend Server
- **Runtime**: Node.js, Express.js (TypeScript Clean Architecture)
- **Database**: MongoDB (with automated `MongoMemoryServer` fallback)
- **Cache & Session**: Redis (with `InMemoryRedisFallback`)
- **Realtime**: Socket.io WebSocket server
- **Security**: JWT Access/Refresh tokens, Helmet, CORS, Rate Limiting, Audit Logging

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/Prajwal7387/CurriCraft-AI-Unified-AICTE-Model-Curriculum-Portal-.git
cd CurriCraft-AI-Unified-AICTE-Model-Curriculum-Portal-

# Install dependencies for root, client, and server
npm run install:all
```

### 2. Running Locally
```bash
# Start both Backend Server (Port 5000) & Frontend Client (Port 5173) concurrently
npm start
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

---

## 📄 License & Attribution

Built for Smart India Hackathon (SIH 2025/2026) Problem Statement **SIH1465** for the **All India Council for Technical Education (AICTE)**.
