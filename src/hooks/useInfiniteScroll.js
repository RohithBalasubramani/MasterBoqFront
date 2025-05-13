import { useEffect } from "react";

export default function useInfiniteScroll(ref, hasMore, onLoadMore) {
  useEffect(() => {
    if (!hasMore || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onLoadMore(),
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, hasMore, onLoadMore]);
}
