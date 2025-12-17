import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const [launching, setLaunching] = useState(false);
  const [boost, setBoost] = useState(false);
  const [firstName, setFirstName] = useState(null);

  /* ---------------------------------
     Read name AFTER mount (Option C)
  ----------------------------------*/
  useEffect(() => {
    if (window.APP_USER?.firstName) {
      setFirstName(window.APP_USER.firstName);
    }
  }, []);

  const handleLaunch = (e) => {
    e.preventDefault();

    setBoost(true);

    setTimeout(() => {
      setLaunching(true);
    }, 120);

    setTimeout(() => {
      window.location.href = "/exec";
    }, 750);
  };

  return (
    <div className={`launch-bg ${launching ? "launching" : ""}`}>
      {/* SHAKE LAYER (isolates transform conflicts) */}
      <div className={`shake-layer ${boost ? "shake" : ""}`}>
        {/* STARFIELDS */}
        <div className="stars stars-slow" />
        <div className="stars stars-medium" />
        <div className="stars stars-fast" />

        {/* WELCOME TEXT (only after client mount) */}
        {firstName && (
          <div className="welcome-text">
            Welcome, {firstName}
          </div>
        )}

        {/* LOGO + GLOW */}
        <div className={`logo-glow-wrapper ${boost ? "boost" : ""}`}>
          <img
            src="/img/mbmc_logo.png"
            alt="Mission Control"
            className="logo-img"
          />
          <div className="logo-thrust" />
        </div>

        {/* LAUNCH CTA */}
        <a href="/exec" className="launch-cta" onClick={handleLaunch}>
          <span className="launch-text">LAUNCH</span>
          <ArrowDown className="launch-arrow" size={24} />
        </a>
      </div>

      {/* =============================
         STYLES
      ==============================*/}
      <style>{`
        /* =============================
           PAGE SLIDE
        ==============================*/
        .launch-bg {
          position: relative;
          height: 100vh;
          width: 100vw;
          background-image:
            linear-gradient(
              rgba(15, 35, 80, 0.45),
              rgba(10, 25, 60, 0.45)
            ),
            url('/img/launch_bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          color: #ffffff;
          transition:
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease;
        }

        .launch-bg.launching {
          transform: translateY(-100vh);
          opacity: 0;
        }

        /* =============================
           SHAKE LAYER
        ==============================*/
        .shake-layer {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .shake-layer.shake {
          animation: cameraShake 0.12s linear;
        }

        @keyframes cameraShake {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-1px, 1px); }
          50%  { transform: translate(1px, -1px); }
          75%  { transform: translate(-1px, 0); }
          100% { transform: translate(0, 0); }
        }

        /* =============================
           STARFIELDS
        ==============================*/
        .stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .launching .stars-slow   { animation-duration: 6s; }
        .launching .stars-medium { animation-duration: 3s; }
        .launching .stars-fast   { animation-duration: 1.5s; }

        .stars-slow {
          background-image:
            radial-gradient(2px 7px at 20% 20%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 6px at 60% 70%, rgba(212,175,55,0.8), transparent);
          animation: starsRiseSlow 22s linear infinite;
          opacity: 0.3;
        }

        .stars-medium {
          background-image:
            radial-gradient(1.5px 9px at 35% 50%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1px 8px at 75% 15%, rgba(212,175,55,0.85), transparent);
          animation: starsRiseMedium 12s linear infinite;
          opacity: 0.4;
        }

        .stars-fast {
          background-image:
            radial-gradient(1px 14px at 50% 30%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 16px at 85% 55%, rgba(212,175,55,0.9), transparent);
          animation: starsRiseFast 6s linear infinite;
          opacity: 0.5;
        }

        @keyframes starsRiseSlow   { to { background-position: 0 -180px; } }
        @keyframes starsRiseMedium { to { background-position: 0 -320px; } }
        @keyframes starsRiseFast   { to { background-position: 0 -520px; } }

        /* =============================
           WELCOME TEXT
        ==============================*/
        .welcome-text {
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 0.75rem;
        }

        /* =============================
           LOGO + GLOW
        ==============================*/
        .logo-glow-wrapper {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .logo-glow-wrapper::before {
          content: "";
          position: absolute;
          inset: -35%;
          background: radial-gradient(
            circle,
            rgba(212,175,55,0.4) 0%,
            rgba(212,175,55,0.2) 35%,
            rgba(212,175,55,0.1) 55%,
            transparent 70%
          );
          filter: blur(40px);
        }

        .logo-img {
          width: 420px;
          max-width: 80vw;
          animation: logoLift 10s ease-in-out infinite alternate;
        }

        @keyframes logoLift {
          from { transform: translateY(0); }
          to   { transform: translateY(-4px); }
        }

        /* =============================
           EXHAUST
        ==============================*/
        .logo-thrust {
          position: absolute;
          top: 100%;
          left: 50%;
          width: 120px;
          height: 220px;
          transform: translateX(-50%);
          background: radial-gradient(
            ellipse at top,
            rgba(212,175,55,0.45),
            rgba(212,175,55,0.25),
            transparent 70%
          );
          filter: blur(28px);
          animation: thrustIdle 1.2s ease-in-out infinite;
        }

        .boost .logo-thrust {
          animation: thrustBoost 0.2s ease-out forwards;
        }

        @keyframes thrustIdle {
          0%   { opacity: 0.65; }
          50%  { opacity: 0.85; }
          100% { opacity: 0.65; }
        }

        @keyframes thrustBoost {
          from { opacity: 0.7; transform: translateX(-50%) scaleY(1); }
          to   { opacity: 1;   transform: translateX(-50%) scaleY(1.4); }
        }

        /* =============================
           CTA + ARROW
        ==============================*/
        .launch-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
          text-decoration: none;
        }

        .launch-text {
          letter-spacing: 0.2em;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .launch-arrow {
          animation: launchBob 1.8s ease-in-out infinite;
        }

        @keyframes launchBob {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
