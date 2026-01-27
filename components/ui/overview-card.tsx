type Props = {
  title: string;
  value: number;
  variant?: "dark" | "light";
};

export function OverviewCard({ title, value, variant = "light" }: Props) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-xl p-6 ${
        isDark ? "bg-zinc-900 text-white" : "bg-white"
      }`}
    >
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-3xl font-bold mt-2">
        ${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}
