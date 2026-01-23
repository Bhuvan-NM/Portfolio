import { useEffect, useRef, type CSSProperties } from "react";

type LoaderProps = {
  durationMs?: number;
};

const Loader = ({ durationMs = 30000 }: LoaderProps) => {
  const centerRef = useRef<HTMLDivElement>(null);
  const snakeDelayMs = Math.round(durationMs * 0.6);
  const snakeDurationMs = Math.max(1, durationMs - snakeDelayMs);

  useEffect(() => {
    const updateTarget = () => {
      const target = document.querySelector<HTMLElement>(".header-logo-dot");
      const center = centerRef.current;
      if (!target || !center) return;

      const rect = target.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      const viewportX = window.innerWidth / 2;
      const viewportY = window.innerHeight / 2;
      const deltaX = targetX - viewportX;
      const deltaY = targetY - viewportY;
      const midX = deltaX * 0.55;
      const midY = deltaY * 0.25;
      const wiggleX = deltaX * 0.8;
      const wiggleY = deltaY * 0.6;

      center.style.setProperty("--loader-target-x", `${deltaX}px`);
      center.style.setProperty("--loader-target-y", `${deltaY}px`);
      center.style.setProperty("--loader-mid-x", `${midX}px`);
      center.style.setProperty("--loader-mid-y", `${midY}px`);
      center.style.setProperty("--loader-wiggle-x", `${wiggleX}px`);
      center.style.setProperty("--loader-wiggle-y", `${wiggleY}px`);
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    const timeout = window.setTimeout(updateTarget, 120);

    return () => {
      window.removeEventListener("resize", updateTarget);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className="loader"
      style={
        {
          "--loader-duration": `${durationMs}ms`,
          "--loader-snake-delay": `${snakeDelayMs}ms`,
          "--loader-snake-duration": `${snakeDurationMs}ms`,
        } as CSSProperties
      }
    >
      <div
        className="loaderCenter"
        ref={centerRef}
      >
        <div className="loaderOrbit" />
        <div className="loaderSnake" />
      </div>
    </div>
  );
};

export default Loader;
