import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { todayKey, attendancePercentage } from "../data/storage";

export default function Dashboard({ students, attendance }) {
  const today = todayKey();
  const todayRecord = useMemo(() => attendance[today] || {}, [attendance, today]);

  const { presentCount, absentCount, unmarkedCount } = useMemo(() => {
    let present = 0;
    let absent = 0;
    students.forEach((s) => {
      const status = todayRecord[s.id];
      if (status === "present") present += 1;
      else if (status === "absent") absent += 1;
    });
    return {
      presentCount: present,
      absentCount: absent,
      unmarkedCount: students.length - present - absent,
    };
  }, [students, todayRecord]);

  const overallRate = useMemo(() => {
    const withRecords = students
      .map((s) => attendancePercentage(s.id, attendance))
      .filter((p) => p !== null);
    if (withRecords.length === 0) return null;
    return Math.round(
      withRecords.reduce((sum, p) => sum + p, 0) / withRecords.length
    );
  }, [students, attendance]);

  const lowAttendance = useMemo(() => {
    return students
      .map((s) => ({ ...s, pct: attendancePercentage(s.id, attendance) }))
      .filter((s) => s.pct !== null && s.pct < 75)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 5);
  }, [students, attendance]);

  return (
    <div className="page">
      <div className="stat-grid">
        <StatCard label="Total students" value={students.length} tone="default" />
        <StatCard label="Present today" value={presentCount} tone="present" />
        <StatCard label="Absent today" value={absentCount} tone="absent" />
        <StatCard
          label="Overall attendance"
          value={overallRate !== null ? `${overallRate}%` : "—"}
          tone="accent"
          hint={unmarkedCount > 0 ? `${unmarkedCount} not marked today` : "All marked today"}
        />
      </div>

      <div className="panel-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>Today's roll call</h2>
            <Link to="/attendance" className="btn btn--primary btn--small">
              Mark attendance
            </Link>
          </div>
          {students.length === 0 ? (
            <p className="empty-state">No students yet. Add your first student to get started.</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 6).map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.rollNo}</td>
                      <td>
                        <StatusBadge status={todayRecord[s.id]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Needs attention</h2>
            <span className="panel__hint">Below 75% attendance</span>
          </div>
          {lowAttendance.length === 0 ? (
            <p className="empty-state">Nobody is below 75% yet — nice work.</p>
          ) : (
            <ul className="alert-list">
              {lowAttendance.map((s) => (
                <li key={s.id} className="alert-list__item">
                  <span className="alert-list__name">{s.name}</span>
                  <span className="alert-list__pct">{s.pct}%</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
