import React, { useMemo, useState } from "react";
import StudentFormModal from "../components/StudentFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { attendancePercentage, generateId } from "../data/storage";

export default function StudentManagement({ students, setStudents, attendance }) {
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        (s.department || "").toLowerCase().includes(q)
    );
  }, [students, search]);

  function handleAdd(form) {
    const newStudent = { id: generateId(), ...form };
    setStudents((prev) => [...prev, newStudent]);
    setShowAddForm(false);
  }

  function handleEditSave(form) {
    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? { ...s, ...form } : s))
    );
    setEditingStudent(null);
  }

  function handleDeleteConfirmed() {
    setStudents((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  return (
    <div className="page">
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, roll no. or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn--primary" onClick={() => setShowAddForm(true)}>
          + Add student
        </button>
      </div>

      <section className="panel">
        {filtered.length === 0 ? (
          <p className="empty-state">
            {students.length === 0
              ? "No students yet. Click \u201cAdd student\u201d to create one."
              : "No students match your search."}
          </p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Attendance</th>
                  <th className="table__actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const pct = attendancePercentage(s.id, attendance);
                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.rollNo}</td>
                      <td>{s.department || "—"}</td>
                      <td>{s.email || "—"}</td>
                      <td>
                        {pct === null ? (
                          <span className="pct pct--muted">No data</span>
                        ) : (
                          <span className={`pct ${pct < 75 ? "pct--low" : "pct--good"}`}>
                            {pct}%
                          </span>
                        )}
                      </td>
                      <td className="table__actions-col">
                        <button
                          className="icon-btn"
                          onClick={() => setEditingStudent(s)}
                          aria-label={`Edit ${s.name}`}
                        >
                          Edit
                        </button>
                        <button
                          className="icon-btn icon-btn--danger"
                          onClick={() => setPendingDelete(s)}
                          aria-label={`Delete ${s.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showAddForm && (
        <StudentFormModal onCancel={() => setShowAddForm(false)} onSave={handleAdd} />
      )}

      {editingStudent && (
        <StudentFormModal
          initial={editingStudent}
          onCancel={() => setEditingStudent(null)}
          onSave={handleEditSave}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete student?"
          message={`This will remove ${pendingDelete.name} and cannot be undone. Their past attendance records will remain in history under their name.`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
