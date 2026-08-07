import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/students", label: "Students", icon: StudentsIcon },
  { to: "/attendance", label: "Mark Attendance", icon: CheckIcon },
  { to: "/history", label: "History", icon: HistoryIcon },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <span className="sidebar__mark">●</span>
        <span className="sidebar__brand-text">
          Roll<strong>Call</strong>
        </span>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__footer-dot" />
        <span>Local data only — nothing leaves this device</span>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="2.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5"/></svg>
  );
}
function StudentsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.2" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3.5 17c0-3 3-5 6.5-5s6.5 2 6.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 10.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}
function HistoryIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10.5" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6.5v4l2.6 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.2 2.6L3 4.4M13.8 2.6L17 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  );
}
