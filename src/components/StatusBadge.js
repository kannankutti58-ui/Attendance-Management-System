import React from "react";

export default function StatusBadge({ status }) {
  if (status === "present") {
    return <span className="badge badge--present">Present</span>;
  }
  if (status === "absent") {
    return <span className="badge badge--absent">Absent</span>;
  }
  return <span className="badge badge--unmarked">Not marked</span>;
}
