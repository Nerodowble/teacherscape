
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', average: 82 },
  { month: 'Feb', average: 84 },
  { month: 'Mar', average: 83 },
  { month: 'Apr', average: 86 },
  { month: 'May', average: 85 },
  { month: 'Jun', average: 88 },
];

const GradeTrendChart = () => {
  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Grade Trends Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[60, 100]} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="average" 
            stroke="#2A5C82" 
            strokeWidth={2}
            dot={{ fill: '#2A5C82' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeTrendChart;
