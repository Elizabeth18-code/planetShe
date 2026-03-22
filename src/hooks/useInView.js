import { useRef, useState, useEffect } from "react";

/**
 * Hook que detecta quando um elemento entra na viewport.
 * @param {number} threshold - Percentagem do elemento visível para disparar (0 a 1)
 * @returns {[React.RefObject, boolean]} - [ref para o elemento, booleano se está visível]
 */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default useInView;
