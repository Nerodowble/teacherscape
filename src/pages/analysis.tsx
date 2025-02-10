
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { month: 'Jan', average: 78 },
  { month: 'Feb', average: 82 },
  { month: 'Mar', average: 80 },
  { month: 'Apr', average: 85 },
  { month: 'May', average: 83 },
];

const gradeDistribution = [
  { grade: 'A', students: 45 },
  { grade: 'B', students: 52 },
  { grade: 'C', students: 38 },
  { grade: 'D', students: 15 },
  { grade: 'F', students: 6 },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 82 },
  { subject: 'Science', score: 78 },
  { subject: 'English', score: 85 },
  { subject: 'History', score: 76 },
  { subject: 'Art', score: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analysis = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} onProfileClick={() => {}} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-gradient mb-6">Performance Analysis</h1>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Performance Trend */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Overall Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="average" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Grade Distribution */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        dataKey="students"
                        nameKey="grade"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                {/* Subject Performance */}
                <Card className="p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Performance by Subject</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subjects">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Subject Analysis</h3>
                <p className="text-neutral">Detailed subject analysis coming soon...</p>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Student Analysis</h3>
                <p className="text-neutral">Individual student analysis coming soon...</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
