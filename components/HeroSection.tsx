"use client";
import React, { useState, useEffect, useRef } from "react";
import { Gamepad2, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ActiveSection = "gamers" | "orgs" | null;

const DiagonalLandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [particles, setParticles] = useState<
    { x: number; y: number; color: string }[]
  >([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const createParticles = (e: React.MouseEvent, color: string) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array(20)
      .fill(null)
      .map(() => ({
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        color,
      }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const cleanupTimer = setTimeout(() => {
      setParticles((prev) => prev.slice(-50));
    }, 2000);

    return () => clearTimeout(cleanupTimer);
  }, [particles]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#F7F3E9] to-[#FFF8E1] 
      flex items-center justify-center"
    >
      {/* Particle Effect */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            width: `${Math.random() * 10}px`,
            height: `${Math.random() * 10}px`,
            border: "1px solid rgba(0,0,0,0.1)", // Added border to particles
            opacity: Math.random(),
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        />
      ))}

      <div
        className="relative w-full max-w-6xl h-[80vh] overflow-hidden 
        transform transition-all duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: activeSection
            ? `rotate3d(0, 1, 0, ${activeSection === "gamers" ? -15 : 15}deg)`
            : "rotate3d(0, 1, 0, 0deg)",
        }}
      >
        {/* Diagonal Split */}
        <div className="absolute inset-0 transform -skew-x-12 overflow-hidden">
          {/* Gamers Section */}
          <div
            className={`absolute left-0 w-1/2 h-full transition-all duration-700 
            ${
              activeSection === "gamers"
                ? "bg-[#ECE2D0] text-black"
                : "bg-[#F7F3E9] text-gray-700"
            }`}
            onMouseEnter={() => setActiveSection("gamers")}
            onMouseLeave={() => setActiveSection(null)}
            onClick={(e) => createParticles(e, "rgba(255, 165, 0, 0.5)")}
          >
            <div
              className="absolute inset-0 flex flex-col justify-center items-center 
              p-8 m-4 border-4 rounded-lg transform transition-all duration-700"
              style={{
                borderColor: activeSection === "gamers" ? "#FFA500" : "#DDC9A3",
                boxShadow:
                  activeSection === "gamers"
                    ? "0px 0px 10px rgba(255, 165, 0, 0.6)"
                    : "none",
                transform:
                  activeSection === "gamers"
                    ? "translateZ(50px) scale(1.05)"
                    : "translateZ(0) scale(1)",
              }}
            >
              <Gamepad2
                size={100}
                className={`mb-8 transition-all duration-700 
                ${
                  activeSection === "gamers"
                    ? "opacity-100 scale-110 text-[#FFA500]"
                    : "opacity-50"
                }`}
              />
              <h2
                className={`text-4xl font-bold mb-4 uppercase tracking-wide 
                transition-all duration-700 
                ${activeSection === "gamers" ? "text-black" : "text-gray-700"}`}
              >
                Gamers
              </h2>
              <p
                className={`text-center transition-all duration-700 font-serif italic
                ${
                  activeSection === "gamers"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Elevate your gaming experience with nostalgic games and
                community connections.
              </p>
              <button
                onClick={() => router.push("/publicroom")}
                className={`mt-6 px-6 py-3 border-4 rounded-lg 
                transition-all duration-700 uppercase tracking-wider font-bold
                ${
                  activeSection === "gamers"
                    ? "opacity-100 scale-100 bg-[#FFA500] text-white hover:bg-transparent hover:text-[#FFA500]"
                    : "opacity-0 scale-75"
                }`}
                style={{
                  boxShadow:
                    activeSection === "gamers"
                      ? "0px 0px 10px rgba(255, 165, 0, 0.6)"
                      : "none",
                }}
              >
                Explore Gaming
              </button>
            </div>
          </div>

          {/* Organizations Section */}
          <div
            className={`absolute right-0 w-1/2 h-full transition-all duration-700 
            ${
              activeSection === "orgs"
                ? "bg-[#ECE2D0] text-black"
                : "bg-[#F7F3E9] text-gray-700"
            }`}
            onMouseEnter={() => setActiveSection("orgs")}
            onMouseLeave={() => setActiveSection(null)}
            onClick={(e) => createParticles(e, "rgba(255, 165, 0, 0.5)")}
          >
            <div
              className="absolute inset-0 flex flex-col justify-center items-center 
              p-8 m-4 border-4 rounded-lg transform transition-all duration-700"
              style={{
                borderColor: activeSection === "orgs" ? "#FFA500" : "#DDC9A3",
                boxShadow:
                  activeSection === "orgs"
                    ? "0px 0px 10px rgba(255, 165, 0, 0.6)"
                    : "none",
                transform:
                  activeSection === "orgs"
                    ? "translateZ(50px) scale(1.05)"
                    : "translateZ(0) scale(1)",
              }}
            >
              <Building2
                size={100}
                className={`mb-8 transition-all duration-700 
                ${
                  activeSection === "orgs"
                    ? "opacity-100 scale-110 text-[#FFA500]"
                    : "opacity-50"
                }`}
              />
              <h2
                className={`text-4xl font-bold mb-4 uppercase tracking-wide 
                transition-all duration-700 
                ${activeSection === "orgs" ? "text-black" : "text-gray-700"}`}
              >
                Organizations
              </h2>
              <p
                className={`text-center transition-all duration-700 font-serif italic
                ${
                  activeSection === "orgs"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Streamline your team&apos;s performance with vintage-inspired
                organizational games.
              </p>
              <button
                onClick={() => router.push("/createSession")}
                className={`mt-6 px-6 py-3 border-4 rounded-lg 
                transition-all duration-700 uppercase tracking-wider font-bold
                ${
                  activeSection === "orgs"
                    ? "opacity-100 scale-100 bg-[#FFA500] text-white hover:bg-transparent hover:text-[#FFA500]"
                    : "opacity-0 scale-75"
                }`}
                style={{
                  boxShadow:
                    activeSection === "orgs"
                      ? "0px 0px 10px rgba(255, 165, 0, 0.6)"
                      : "none",
                }}
              >
                Elevate Your Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagonalLandingPage;
