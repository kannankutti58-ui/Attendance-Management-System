import React, { useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { formatDateLabel, todayKey, attendancePercentage } from "../data/storage";

export default function AttendanceHistory({ students, attendance }) {
  const dates = useMemo(
    () => Object.keys(attendance).sort((a, b) => (a < b ? 1 : -1)),
    [attendance]
  );
  const [selectedDate, setSelectedDate] = useState(dates[0] || todayKey());
  const [search, setSearch] = useState("");

  const activeDate = dates.includes(selectedDate) ? selectedDate : dates[0];
  const dayRecord = attendance[activeDate] || {};

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => s.name.toLowerCase().includes(q));
  }, [students, search]);

  return (
    <div className="page">
      <div className="history-layout">
        <section className="panel history-layout__dates">
          <div className="panel__header">
            <h2>Dates</h2>
          </div>
          {dates.length === 0 ? (
            <p className="empty-state">No attendance marked yet.</p>
          ) : (
            <ul className="date-list">
              {dates.map((d) => (
                <li key={d}>
                  <button
                    className={`date-list__item ${
                      d === activeDate ? "date-list__item--active" : ""
                    }`}
                    onClick={() => setSelectedDate(d)}
                  >
                    {formatDateLabel(d)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel history-layout__records">
          <div className="panel__header">
            <h2>{dates.length ? formatDateLabel(activeDate) : "No records"}</h2>
            <input
              className="search-input search-input--compact"
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {dates.length === 0 ? (
            <p className="empty-state">
              Once you mark attendance, records will appear here by date.
            </p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>Status on this date</th>
                    <th>Overall attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.rollNo}</td>
                      <td>
                        <StatusBadge status={dayRecord[s.id]} />
                      </td>
                      <td>
                        {(() => {
                          const pct = attendancePercentage(s.id, attendance);
                          return pct === null ? "—" : `${pct}%`;
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
