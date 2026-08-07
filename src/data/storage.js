import sampleStudents from "./sampleStudents";

const STUDENTS_KEY = "rollcall_students";
const ATTENDANCE_KEY = "rollcall_attendance";

// ---------- Students ----------

export function loadStudents() {
  const raw = localStorage.getItem(STUDENTS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return sampleStudents;
    }
  }
  // First run: seed with sample data.
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(sampleStudents));
  return sampleStudents;
}

export function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

// ---------- Attendance ----------
// Shape: { "2026-08-05": { "S1001": "present", "S1002": "absent" }, ... }

export function loadAttendance() {
  const raw = localStorage.getItem(ATTENDANCE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

export function saveAttendance(attendance) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
}

// ---------- Helpers ----------

export function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDateLabel(dateKey) {
  const d = new Date(dateKey + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function generateId() {
  return "S" + Date.now().toString(36).toUpperCase();
}

// Percentage of days a student was marked present, out of days they
// were marked at all (present or absent).
export function attendancePercentage(studentId, attendance) {
  let present = 0;
  let total = 0;
  Object.values(attendance).forEach((dayRecord) => {
    const status = dayRecord[studentId];
    if (status === "present" || status === "absent") {
      total += 1;
      if (status === "present") present += 1;
    }
  });
  if (total === 0) return null; // no records yet
  return Math.round((present / total) * 100);
}
