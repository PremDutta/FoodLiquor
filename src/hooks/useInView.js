import { useEffect, useRef, useState } from "react";

/* Replaces the unpublished "use-in-view" npm package with a local
 * IntersectionObserver hook of the same [ref, inView] shape. */
export default function useInView(offset = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: `${offset}px` }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [offset]);

  return [ref, inView];
}
