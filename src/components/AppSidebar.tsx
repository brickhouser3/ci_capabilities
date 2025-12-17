import React from "react";
import Link from "@docusaurus/Link";

export default function AppSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {  return (
    <aside
      style={{
        width: collapsed ? "72px" : "240px",
	transition: "width 0.2s ease",
        padding: "1.75rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        color: "#ffffff",

        /* Atmospheric Navy / Gold Nebula */
        background: `
          /* Soft gold dust glow */
          radial-gradient(
            600px 600px at -10% 20%,
            rgba(212, 175, 55, 0.18),
            transparent 60%
          ),

          /* Upper navy cloud */
          radial-gradient(
            500px 500px at 80% -10%,
            rgba(40, 70, 120, 0.35),
            transparent 65%
          ),

          /* Lower deep navy cloud */
          radial-gradient(
            700px 700px at 60% 90%,
            rgba(15, 35, 70, 0.55),
            transparent 70%
          ),

          /* Base gradient */
          linear-gradient(
            180deg,
            #0b1e3a 0%,
            #08162b 100%
          )
        `,
      }}
    >
    <button
  	onClick={onToggle}
  	style={{
    	  background: "none",
    	  border: "none",
    	  color: "#ffffff",
    	  cursor: "pointer",
    	  marginBottom: "1rem",
    	  fontSize: "1.1rem",
  	}}
     >
  {collapsed ? "☰" : "←"}
</button>

      {/* Navigation */}
      <NavItem to="/mission-control" label="Dashboard" />
      <NavItem to="/exec" label="Executive View" />
      <NavItem to="/geo" label="Geography" />
    </aside>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      style={{
        color: "#ffffff",
        textDecoration: "none",
        padding: "0.6rem 0.85rem",
        borderRadius: "10px",
        fontSize: "0.9rem",
        fontWeight: 500,
        transition: "background 0.2s ease",
      }}
      activeStyle={{
        background: `
          linear-gradient(
            90deg,
            rgba(212, 175, 55, 0.28),
            rgba(212, 175, 55, 0.05)
          )
        `,
      }}
    >
      {label}
    </Link>
  );
}
