"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  type: "leaf" | "petal";
  side: "left" | "right";
}

export function InteractiveLeaves() {
  const { themeConfig } = useTheme();
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate leaves for sides only
  useEffect(() => {
    const generateLeaves = () => {
      const newLeaves: Leaf[] = [];
      let leafId = 0;

      // Left side leaves
      for (let i = 0; i < 8; i++) {
        newLeaves.push({
          id: leafId++,
          x: Math.random() * 15 + 5, // 5-20% from left
          y: Math.random() * 80 + 10, // 10-90% from top
          size: Math.random() * 40 + 60, // 60-100px (larger)
          rotation: Math.random() * 360,
          duration: Math.random() * 8 + 12,
          delay: Math.random() * 5,
          type: Math.random() > 0.5 ? "leaf" : "petal",
          side: "left",
        });
      }

      // Right side leaves
      for (let i = 0; i < 8; i++) {
        newLeaves.push({
          id: leafId++,
          x: Math.random() * 15 + 80, // 80-95% from left
          y: Math.random() * 80 + 10, // 10-90% from top
          size: Math.random() * 40 + 60, // 60-100px (larger)
          rotation: Math.random() * 360,
          duration: Math.random() * 8 + 12,
          delay: Math.random() * 5,
          type: Math.random() > 0.5 ? "leaf" : "petal",
          side: "right",
        });
      }

      setLeaves(newLeaves);
    };

    generateLeaves();
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Only show for special theme
  if (themeConfig.name !== "special") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {leaves.map((leaf) => {
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - leaf.x, 2) +
            Math.pow(mousePosition.y - leaf.y, 2),
        );
        const maxDistance = 20; // Smaller interaction radius
        const influence = Math.max(0, 1 - distance / maxDistance);
        const offsetX = influence * 8;
        const offsetY = influence * 8;
        const scale = 1 + influence * 0.15;
        const opacity = 0.2 + influence * 0.3;

        return (
          <div
            key={leaf.id}
            className="absolute transition-all duration-700 ease-out"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${leaf.rotation}deg) scale(${scale})`,
              opacity,
              animation: `float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite`,
            }}
          >
            {leaf.type === "leaf" ? (
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  filter: "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15))",
                }}
              >
                <path
                  d="M12 2C12 2 7 6 7 12C7 18 12 22 12 22C12 22 17 18 17 12C17 6 12 2 12 2Z"
                  fill="rgba(16, 185, 129, 0.4)"
                  stroke="rgba(6, 95, 70, 0.6)"
                  strokeWidth="1"
                />
                <path
                  d="M12 2L12 22"
                  stroke="rgba(6, 95, 70, 0.4)"
                  strokeWidth="0.5"
                />
                <path
                  d="M12 8C10 8 8 10 8 12C8 14 10 16 12 16C14 16 16 14 16 12C16 10 14 8 12 8Z"
                  fill="rgba(34, 211, 153, 0.3)"
                />
              </svg>
            ) : (
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  filter: "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15))",
                }}
              >
                <ellipse
                  cx="12"
                  cy="12"
                  rx="8"
                  ry="4"
                  fill="rgba(167, 243, 208, 0.3)"
                  stroke="rgba(16, 185, 129, 0.5)"
                  strokeWidth="1"
                  transform={`rotate(${leaf.rotation} 12 12)`}
                />
                <path
                  d="M12 8L12 16"
                  stroke="rgba(6, 95, 70, 0.4)"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-15px) rotate(3deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(8px) rotate(-3deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-8px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
