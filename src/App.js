import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import AttendanceHistory from "./pages/AttendanceHistory";
import { loadStudents, saveStudents, loadAttendance, saveAttendance } from "./data/storage";
import "./App.css";

const PAGE_META = {
  "/": { title: "Dashboard", subtitle: "Today's attendance at a glance" },
  "/students": { title: "Student Management", subtitle: "Add, edit and remove students" },
  "/attendance": { title: "Mark Attendance", subtitle: "Record today's roll call" },
  "/history": { title: "Attendance History", subtitle: "Browse past attendance by date" },
};

export default function App() {
  const [students, setStudents] = useState(() => loadStudents());
  const [attendance, setAttendance] = useState(() => loadAttendance());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    saveAttendance(attendance);
  }, [attendance]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const meta = PAGE_META[location.pathname] || PAGE_META["/"];

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="app-main">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />

        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard students={students} attendance={attendance} />}
            />
            <Route
              path="/students"
              element={
                <StudentManagement
                  students={students}
                  setStudents={setStudents}
                  attendance={attendance}
                />
              }
            />
            <Route
              path="/attendance"
              element={
                <AttendanceManagement
                  students={students}
                  attendance={attendance}
                  setAttendance={setAttendance}
                />
              }
            />
            <Route
              path="/history"
              element={
                <AttendanceHistory students={students} attendance={attendance} />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
