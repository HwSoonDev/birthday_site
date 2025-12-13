"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface TiltCardProps {
  children: ReactNode;
}
export default function TiltCard({ children }: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = (-1 / 5) * x + 36;
      const rotateX = (4 / 30) * y - 20;

      container.style.transform = `
      perspective(350px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

      overlay.style.backgroundPosition = `${x / 5}% ${y / 5}%`;
    };

    const handleMouseLeave = () => {
      container.style.transform = "";
      overlay.style.backgroundPosition = "";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-fit h-fit duration-700 hover:duration-0"
    >
      <div ref={overlayRef} className="w-fit h-fit">
        {children}
      </div>
    </div>
  );
}
