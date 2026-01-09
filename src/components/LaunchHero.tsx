import React from "react";

export default function LaunchHero() {
  const handleLaunch = () => {
    document
      .getElementById("front-end")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/img/launch_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <img
        src="/img/mission_control_logo.png"
        alt="Mission Control"
        style={{
          width: "420px",
          maxWidth: "80%",
          marginBottom: "3rem",
          filter: "drop-shadow(0 0 40px rgba(212,175,55,0.35))",
        }}
      />

      {/* Launch CTA */}
      <button
        onClick={handleLaunch}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Launch
        </span>

        <span className="launch-arrow">↓</span>
      </button>

      {/* Arrow animation */}
      <style>{`
        .launch-arrow {
          display: inline-block;
          font-size: 2rem;
          animation: launchBob 2s ease-in-out infinite;
        }

        @keyframes launchBob {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
