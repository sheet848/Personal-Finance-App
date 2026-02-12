import { IndianRupee } from "lucide-react";

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
        <IndianRupee className="inline-block w-5 h-5 mr-1" />
        {value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}
