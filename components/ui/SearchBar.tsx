'use client'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
    value,
    onChange,
    placeholder = "Search bills...", }: SearchBarProps) {

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border rounded-md px-3 py-2 text-sm w-64"
        />
    )
}