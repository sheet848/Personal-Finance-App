'use client'

import { useEffect, useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {

    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value);
        }, 400);

        return () => clearTimeout(timer);
    }, [value]);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) =>setValue(e.target.value)}
            placeholder="Search transaction"
            className="border rounded-md px-3 py-2 text-sm w-64"
        />
    )
}