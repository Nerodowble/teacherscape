
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'A (90-100%)', value: 30 },
  { name: 'B (80-89%)', value: 25 },
  { name: 'C (70-79%)', value: 20 },
  { name: 'D (60-69%)', value: 15 },
  { name: 'F (Below 60%)', value: 10 },
];

const COLORS = ['#2A5C82', '#4A90E2', '#D3E4FD', '#BAE6FD', '#F1F1F1'];

const GradeDistributionChart = () => {
  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Grade Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistributionChart;
