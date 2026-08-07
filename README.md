# RollCall — Attendance Management System

A simple, clean attendance management system built with React (functional components + Hooks). No backend — everything is stored in the browser's `localStorage`.

## Features

- **Dashboard** — today's present/absent counts, overall attendance rate, and a "needs attention" list of students below 75%.
- **Student Management** — add, edit, and delete students; search by name, roll number, or department.
- **Mark Attendance** — mark each student Present/Absent for today; "mark all" shortcuts.
- **Attendance History** — browse every past date and see who was present/absent, plus each student's running attendance percentage.

## Getting started

```bash
npm install
npm start
```

The app opens at `http://localhost:3000`.

To create a production build:

```bash
npm run build
```

## Project structure

```
src/
  components/   Reusable UI pieces (Sidebar, Header, StatCard, badges, modals)
  pages/        One file per page (Dashboard, StudentManagement, AttendanceManagement, AttendanceHistory)
  data/         localStorage helpers + sample seed data
  App.js        Routes and shared state
  index.js      React entry point
  App.css       Plain CSS — no Tailwind/Bootstrap
```

## Data & storage

- Students are stored under the `rollcall_students` key in `localStorage`.
- Attendance is stored under `rollcall_attendance`, keyed by date (`YYYY-MM-DD`) and then by student id.
- On first run, the app seeds itself with 8 sample students so the UI isn't empty.
- Clearing your browser's site data resets the app back to the sample data.
