// src/hooks/useProducts.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts, fetchFiltered } from "../api/products";

export default function useProducts(filters, search) {
  const endpoint = filters ? "filter" : "list";
  const queryKey = ["products", endpoint, filters, search];

  // note: v5 queryFn signature takes a single param object
  const queryFn = async ({
    pageParam = filters
      ? "/product/filter/"
      : search
      ? `/product/?search=${encodeURIComponent(search)}`
      : "/product/",
  }) => {
    if (filters) {
      return fetchFiltered(filters, pageParam);
    }
    return fetchProducts(pageParam);
  };

  const query = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    // you can add other v5 options here, e.g. staleTime, cacheTime, etc.
  });

  const items = query.data?.pages.flatMap((p) => p.results) || [];
  const total = query.data?.pages[0]?.count || 0;

  return {
    ...query,
    items,
    total,
  };
}
