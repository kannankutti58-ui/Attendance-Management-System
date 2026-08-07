import React from "react";

export default function ConfirmDialog({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal modal--small"
        role="alertdialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p className="modal__message">{message}</p>
        <div className="form__actions">
          <button className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
