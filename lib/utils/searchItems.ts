interface SearchItemsParams<T> {
    items: T[];
    query: string;
    keys: (keyof T)[];
}

export function searchItems({ items, query, keys } : SearchItemsParams<any>) {
  if (!query.trim()) return items;

  const lowerQuery = query.toLowerCase();

  return items.filter(item =>
    keys.some(key => {
      const value = item[key];
      if (value == null) return false;
      return String(value).toLowerCase().includes(lowerQuery);
    })
  );
}
