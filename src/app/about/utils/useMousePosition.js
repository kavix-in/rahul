import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const center = () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    setMousePosition(center());

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onResize = () => setMousePosition(center());

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;