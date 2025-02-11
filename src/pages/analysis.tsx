import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const performanceData = [
  { month: 'Jan', average: 78, attendance: 92 },
  { month: 'Feb', average: 82, attendance: 94 },
  { month: 'Mar', average: 80, attendance: 91 },
  { month: 'Apr', average: 85, attendance: 95 },
  { month: 'May', average: 83, attendance: 93 },
];

const gradeDistribution = [
  { grade: 'A', students: 45, percentage: '29%' },
  { grade: 'B', students: 52, percentage: '33%' },
  { grade: 'C', students: 38, percentage: '24%' },
  { grade: 'D', students: 15, percentage: '10%' },
  { grade: 'F', students: 6, percentage: '4%' },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 82, students: 156, instructor: 'Dr. Johnson' },
  { subject: 'Physics', score: 78, students: 142, instructor: 'Prof. Smith' },
  { subject: 'Chemistry', score: 85, students: 128, instructor: 'Dr. Williams' },
  { subject: 'Biology', score: 76, students: 134, instructor: 'Prof. Davis' },
  { subject: 'Computer Science', score: 90, students: 98, instructor: 'Dr. Anderson' },
];

const studentsList = [
  { id: '001', name: 'Emma Thompson', grade: 'A', attendance: '95%', subjects: 5 },
  { id: '002', name: 'James Wilson', grade: 'B', attendance: '88%', subjects: 4 },
  { id: '003', name: 'Sophia Chen', grade: 'A', attendance: '98%', subjects: 5 },
  { id: '004', name: 'Lucas Garcia', grade: 'C', attendance: '82%', subjects: 5 },
  { id: '005', name: 'Olivia Brown', grade: 'B', attendance: '90%', subjects: 4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analysis = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <main className="pt-16">
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
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Academic Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="average" stroke="#8884d8" name="Grade Average" />
                      <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Attendance Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

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
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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

                <Card className="p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Performance by Subject</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subjects">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Subject Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Instructor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectPerformance.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subject.subject}</TableCell>
                        <TableCell>{subject.score}%</TableCell>
                        <TableCell>{subject.students}</TableCell>
                        <TableCell>{subject.instructor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Student Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Enrolled Subjects</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsList.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>{student.subjects}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
