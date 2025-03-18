import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StudentProgressChartProps {
  studentName: string;
  examName: string;
}

const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ studentName, examName }) => {
  const data = [
    { name: 'Algebraic Equations', score: 70, previousScore: 60 },
    { name: 'Geometry', score: 80, previousScore: 75 },
    { name: 'Calculus', score: 65, previousScore: 50 },
    { name: 'Trigonometry', score: 90, previousScore: 85 },
  ];

  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Student Progress - {studentName}</h3>
      <h4 className="text-md font-medium mb-2">{examName}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip />
          <Legend />
          <Bar dataKey="previousScore" fill="#8884d8" name="Previous Score" />
          <Bar dataKey="score" fill="#82ca9d" name="Current Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentProgressChart;
