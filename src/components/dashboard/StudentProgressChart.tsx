
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { course: 'Math', progress: 85 },
  { course: 'Science', progress: 72 },
  { course: 'History', progress: 90 },
  { course: 'English', progress: 78 },
  { course: 'Art', progress: 95 },
];

const StudentProgressChart = () => {
  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Student Progress by Course</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" fill="#2A5C82" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentProgressChart;
