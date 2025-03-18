import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MockAnalysisResults = () => {
  const studentName = "John Doe";
  const examName = "Midterm Exam - Math";
  const overallScore = 75;
  const correctAnswers = 15;
  const incorrectAnswers = 5;
  const areasOfWeakness = [
    "Algebraic Equations",
    "Geometry",
    "Calculus",
  ];
  const suggestedTopics = [
    "Solving Linear Equations",
    "Area and Volume",
    "Differentiation Rules",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Analysis Results</CardTitle>
        <CardDescription>
          {studentName} - {examName}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Overall Score:</p>
          <p className="text-2xl font-semibold">{overallScore}%</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Correct Answers:</p>
            <p className="text-lg">{correctAnswers}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Incorrect Answers:</p>
            <p className="text-lg">{incorrectAnswers}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Areas of Weakness:</p>
          <ul className="list-disc pl-5">
            {areasOfWeakness.map((area) => (
              <li key={area}>{area}</li>
            ))}</ul>
        </div>
        <div>
          <p className="text-sm font-medium">Suggested Topics:</p>
          <ul className="list-disc pl-5">
            {suggestedTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}</ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockAnalysisResults;