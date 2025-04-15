# 📅 Interview Scheduler

The **Interview Scheduler** is a React-based web application that simplifies the interview scheduling process. It allows HR personnel or interviewers to upload Excel/CSV files containing candidate availability and generates an optimized interview schedule across multiple sessions.

---

## 🚀 Features

- 📁 **File Upload**: Supports `.xlsx`, `.xls`, and `.csv` files.
- 📊 **Smart Scheduling**: Assigns candidates based on availability and balances sessions.
- 📥 **CSV Export**: Download the generated schedule for easy sharing and printing.
- 🖥️ **Modern UI**: Drag-and-drop file upload, session grid view, responsive design.

---

## 🎯 Purpose

- Efficiently schedule interviews based on candidate availability.
- Reduce manual effort through smart assignment and session balancing.
- Provide downloadable output for practical use.

---

## 👥 Target Audience

- HR teams and interview coordinators.
- Developers integrating scheduling logic into React projects.

---

## 🛠 Tech Stack

**Frontend:**
- React
- JavaScript (ES6+)

**Libraries:**
- [`xlsx`](https://www.npmjs.com/package/xlsx): Excel file parsing
- [`papaparse`](https://www.npmjs.com/package/papaparse): CSV file parsing

**Styling:**
- CSS (in `App.css`, `FileUploader.css`)

---

## 🧠 Core Concepts

### 1. File Parsing
- Parses Excel/CSV files into normalized JavaScript objects.
- Normalizes columns (e.g., `april_14` → `April 14`).
- Validates required fields like `Name`.

### 2. Interview Scheduling
- Assigns candidates to sessions (e.g., `April 14-M`, `April 14-A`) using a greedy algorithm.
- Limits sessions to 8 candidates.
- Sorts by availability count to schedule constrained candidates first.
- Balances session sizes to avoid major discrepancies.

### 3. CSV Generation
- Converts the schedule into a CSV format: `Date, Session, Candidates`.
- Provides a download option for spreadsheet tools.

### 4. User Interface
- Drag-and-drop or manual file upload.
- Displays session-wise candidate lists.
- Error and loading indicators for smooth UX.

---

## 📁 Project Structure

```bash
├── components/
│   ├── FileUploader.jsx       # File upload + parsing logic
│   └── ScheduleTable.jsx      # Displays schedule, handles CSV download
├── utils/
│   └── scheduler.js           # Scheduling logic and CSV generator
├── App.jsx                    # Main logic and state management
├── App.css                    # Global styles
└── README.md

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
