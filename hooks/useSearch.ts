import { useEffect, useState } from "react";

export default function useSearch(delay = 400) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  return {
    search,
    debouncedSearch,
    setSearch,
  };
}
