import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SpendingPieChart = ({ spending }) => {
  if (!spending || !Array.isArray(spending)) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-gray-500">No spending data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Spending by Cuisine
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={spending}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="amount"
          >
            {spending.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(${index * 70}, 70%, 50%)`}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SpendingPieChart;
