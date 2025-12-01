
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    anime: any;
  }
}

export const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logic extracted exactly from the provided script
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!window.anime) {
        console.warn('AnimeJS not loaded');
        return;
    }

    const { animate } = window.anime;
    // Using getElementById to match the provided snippet logic, 
    // ensuring we target the specific container rendered by this component.
    const container = document.getElementById('animated-rings');
    if (!container) return;

    const circles = container.querySelectorAll(".ring-circle");
    if (circles.length === 0) return;

    const circleData = Array.from(circles).map((circle) => {
        const el = circle as SVGElement;
        const radius = parseFloat(el.getAttribute("r") || "0");
        const circumference = 2 * Math.PI * radius;

        (el as unknown as HTMLElement).style.strokeDasharray = String(circumference);
        (el as unknown as HTMLElement).style.strokeDashoffset = String(circumference);
        
        return { element: el, circumference, radius };
    });

    circleData.sort((a: any, b: any) => a.radius - b.radius);

    // Speed adjustment: 2x faster than previous (which was 25800)
    // 25800 / 2 = 12900
    const baseDuration = 12900;
    const staggerOffset = 200;

    // 1. Draw/Undraw Loop
    const animations = circleData.map((data: any, i: number) =>
        animate(data.element, {
            keyframes: [
                { strokeDashoffset: data.circumference, duration: 0 }, // start hidden
                {
                    strokeDashoffset: 0,
                    duration: baseDuration * (1 + i * 0.12),
                    easing: "linear",
                }, // draw
                {
                    strokeDashoffset: -data.circumference,
                    duration: baseDuration * (1 + i * 0.12) * 1.1,
                    easing: "linear",
                }, // erase
            ],
            delay: i * staggerOffset,
            loop: true,
        })
    );

    // 2. Pulse/Float Loop
    let tick = 0;
    let animationFrameId: number;

    const tickFn = () => {
        // Speed adjustment: 2x faster than previous (which was 0.0023)
        // 0.0023 * 2 = 0.0046
        tick += 0.0046;

        circleData.forEach((data: any, i: number) => {
            const speed = 1 + i * 0.02;
            const phase = tick * speed + i * 0.6;
            
            const scaleVal = 1.0 + Math.sin(phase) * 0.05;
            const translateVal = Math.sin(phase) * 1.5;
            
            (data.element as unknown as HTMLElement).style.transform = `scale(${scaleVal}) translateY(${translateVal}%)`;
        });

        animationFrameId = requestAnimationFrame(tickFn);
    };

    requestAnimationFrame(tickFn);

    // Cleanup to prevent memory leaks in React
    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animations.forEach((anim: any) => anim.pause());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .animation-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            transform: translateZ(0);
        }

        .rings-svg {
            width: 110vmin;
            height: 110vmin;
            opacity: 0.6;
            display: block;
            min-width: 110vmin;
            min-height: 110vmin;
        }

        .ring-circle {
            fill: none;
            stroke: #D4B58C;
            opacity: 0.8;
            stroke-linecap: round;
            stroke-width: 0.75; /* 2x Thinner lines */
            shape-rendering: geometricPrecision;
            transform-box: fill-box;
            transform-origin: center;
            vector-effect: non-scaling-stroke; /* Keeps stroke width constant during scale transforms */
        }
      `}} />

      <div className="animation-container" id="animated-rings" ref={containerRef}>
        <svg className="rings-svg" viewBox="0 0 1800 1800" xmlns="http://www.w3.org/2000/svg">
            <circle className="ring-circle" cx="900" cy="900" r="150" />
            <circle className="ring-circle" cx="900" cy="900" r="400" />
            <circle className="ring-circle" cx="900" cy="900" r="650" />
            <circle className="ring-circle" cx="900" cy="900" r="850" />
        </svg>
      </div>
    </>
  );
};
