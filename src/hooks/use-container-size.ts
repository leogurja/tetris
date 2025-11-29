import { useEffect, useRef, useState } from "react";

export const useContainerSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);

    const handleResize = () => {
      if (!ref.current) return;
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height, ref };
};
