"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

interface Props {
  currentMonth: { day: number; total: number }[]
  previousMonth: { day: number; total: number }[]
}

export default function SpendingVelocityChart({
  currentMonth,
  previousMonth
}: Props) {
  const mergedData = currentMonth.map((item, index) => ({
    day: item.day,
    current: item.total,
    previous: previousMonth[index]?.total ?? 0
  }))

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4">
        Spending Velocity
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="current"
            stroke="#111827"
            strokeWidth={2}
            dot={false}
            name="This Month"
          />

          <Line
            type="monotone"
            dataKey="previous"
            stroke="#9CA3AF"
            strokeWidth={2}
            dot={false}
            name="Last Month"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
