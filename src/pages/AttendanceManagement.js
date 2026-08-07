import React, { useMemo, useState } from "react";
import { todayKey, formatDateLabel } from "../data/storage";

export default function AttendanceManagement({ students, attendance, setAttendance }) {
  const [search, setSearch] = useState("");
  const today = todayKey();
  const todayRecord = useMemo(() => attendance[today] || {}, [attendance, today]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
    );
  }, [students, search]);

  function setStatus(studentId, status) {
    setAttendance((prev) => {
      const dayRecord = { ...(prev[today] || {}) };
      // Clicking the already-selected status un-marks it.
      if (dayRecord[studentId] === status) {
        delete dayRecord[studentId];
      } else {
        dayRecord[studentId] = status;
      }
      return { ...prev, [today]: dayRecord };
    });
  }

  function markAll(status) {
    setAttendance((prev) => {
      const dayRecord = { ...(prev[today] || {}) };
      students.forEach((s) => {
        dayRecord[s.id] = status;
      });
      return { ...prev, [today]: dayRecord };
    });
  }

  const markedCount = Object.keys(todayRecord).length;

  return (
    <div className="page">
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search students to mark..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="toolbar__group">
          <button className="btn btn--ghost btn--small" onClick={() => markAll("present")}>
            Mark all present
          </button>
          <button className="btn btn--ghost btn--small" onClick={() => markAll("absent")}>
            Mark all absent
          </button>
        </div>
      </div>

      <section className="panel">
        <div className="panel__header">
          <h2>{formatDateLabel(today)}</h2>
          <span className="panel__hint">
            {markedCount} of {students.length} marked
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="empty-state">
            {students.length === 0
              ? "Add students first from Student Management."
              : "No students match your search."}
          </p>
        ) : (
          <ul className="roll-list">
            {filtered.map((s) => {
              const status = todayRecord[s.id];
              return (
                <li key={s.id} className="roll-list__item">
                  <div className="roll-list__info">
                    <span className="roll-list__name">{s.name}</span>
                    <span className="roll-list__roll">{s.rollNo}</span>
                  </div>
                  <div className="roll-list__actions">
                    <button
                      className={`toggle-btn toggle-btn--present ${
                        status === "present" ? "toggle-btn--active" : ""
                      }`}
                      onClick={() => setStatus(s.id, "present")}
                    >
                      Present
                    </button>
                    <button
                      className={`toggle-btn toggle-btn--absent ${
                        status === "absent" ? "toggle-btn--active" : ""
                      }`}
                      onClick={() => setStatus(s.id, "absent")}
                    >
                      Absent
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
