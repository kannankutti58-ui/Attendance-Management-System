import React from "react";

export default function Header({ title, subtitle, onMenuClick }) {
  return (
    <header className="header">
      <button
        className="header__menu-btn"
        onClick={onMenuClick}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="header__titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header__date">
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </header>
  );
}
