import React, { useState } from "react";

const emptyForm = { name: "", rollNo: "", department: "", email: "" };

export default function StudentFormModal({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [error, setError] = useState("");
  const isEdit = Boolean(initial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.rollNo.trim()) {
      setError("Name and roll number are required.");
      return;
    }
    onSave(form);
  }

  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2>{isEdit ? "Edit Student" : "Add Student"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="form__field">
            <span>Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              autoFocus
            />
          </label>
          <label className="form__field">
            <span>Roll number</span>
            <input
              name="rollNo"
              value={form.rollNo}
              onChange={handleChange}
              placeholder="e.g. 21CS009"
            />
          </label>
          <label className="form__field">
            <span>Department</span>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
            />
          </label>
          <label className="form__field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. name@example.edu"
            />
          </label>

          {error && <p className="form__error">{error}</p>}

          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEdit ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
