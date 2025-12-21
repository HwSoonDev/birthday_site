"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface TiltCardProps {
  useOverlay?: boolean;
  children: ReactNode;
  trigger?: boolean; //resize 트리거(컨텐츠 변경 시 리사이징)
}
export default function TiltCard({
  useOverlay = false,
  trigger = true,
  children,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay || !trigger) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxAngle = 10000 / width;
      const rotateX = (y * maxAngle * 2) / height - maxAngle;
      const rotateY = -(x * maxAngle * 2) / width + maxAngle;

      // console.log(maxAngle);
      // console.log(
      //   `x: ${x / width} \n y: ${
      //     y / height
      //   } \n rx: ${rotateX} \n ry: ${rotateY} \n w: ${width} \n h: ${height}`
      // );

      container.style.transform = `
        perspective(350px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;

      const offsetX = x - width / 2;
      const offsetY = y - height / 2;
      overlay.style.background = `radial-gradient(circle at ${offsetX}% ${offsetY}%, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.03) 70%, rgba(0, 0, 0, 0.3) 100%)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = "";
      overlay.style.background =
        "radial-gradient(circle at 0% 0%, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.03) 70%, rgba(0, 0, 0, 0.2) 100%)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="relative w-fit h-fit duration-700 hover:duration-50 text-black"
    >
      <div
        ref={overlayRef}
        className={`absolute inset-0 z-10 pointer-events-none duration-50 ${
          !useOverlay && "hidden"
        }`}
      />
      <div className="w-fit h-fit">{children}</div>
    </div>
  );
}
