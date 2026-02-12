"use client"

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { IndianRupee } from "lucide-react";

interface Transaction {
    id: string;
    name: string;
    avatar?: string;
    amount: number;
    category: string;
    date: string;
}

interface Props {
    transactions: Transaction[]
}

const COLORS = [
    "#2F7F7B",
    "#7ECED4",
    "#64748b",
    "#F0C7A2",
    "#6B7280",
];

export default function ExpenseByCategoryChart({ transactions }: Props) {

    const data = Object.entries(
        transactions
            .filter((tx) => tx.category.toLowerCase() !== "general")
            .reduce<Record<string, number>>((acc, tx) => {
                acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount)
                return acc
            }, {})
    ).map(([category, value]) => ({
        name: category,
        value,
    }))
        .sort((a, b) => b.value - a.value) // Sort descending by value
        .slice(0, 4); // Top 5 categories

    const totalSpent = data.reduce((sum, entry) => sum + entry.value, 0).toFixed(2);

    if (data.length === 0) return null

    return (
        <div className="min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
            <h3 className="text-preset-2 font-bold text-grey-900">
                Spending by Category
            </h3>

            <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-[180px] h-[180px]">
                    <PieChart width={180} height={180}>
                        <Pie
                            data={data}
                            innerRadius={65}
                            outerRadius={85}
                            dataKey="value"
                            paddingAngle={4}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-semibold"><IndianRupee className="inline-block w-4 h-4 mr-1" />{totalSpent}</p>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="space-y-3">
                    {data.map(item => (
                        <div key={item.name} className="flex items-center gap-3">
                            <span
                                className="w-2 h-8 rounded-full"
                                style={{ backgroundColor: COLORS[data.indexOf(item) % COLORS.length] }}
                            />
                            <div className="text-sm">
                                <p className="text-gray-500">{item.name}</p>
                                <p className="font-medium"><IndianRupee className="inline-block w-3 h-3" />{item.value.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}