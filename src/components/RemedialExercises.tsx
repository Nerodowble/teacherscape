import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

const RemedialExercises = () => {
  const { toast } = useToast();
  const componentRef = useRef(null);
  const studentName = "John Doe";
  const examName = "Midterm Exam - Math";
  const areasOfWeakness = [
    "Algebraic Equations",
    "Geometry",
    "Calculus",
  ];

  const exercises = {
    "Algebraic Equations": [
      "Solve for x: 2x + 3 = 7",
      "Simplify: (x + 2)(x - 2)",
      "Solve the inequality: 3x - 5 > 4",
    ],
    "Geometry": [
      "Find the area of a triangle with base 10 and height 5",
      "What is the volume of a cube with side length 3?",
      "Calculate the circumference of a circle with radius 4",
    ],
    "Calculus": [
      "Find the derivative of f(x) = x^2 + 2x + 1",
      "What is the integral of f(x) = 3x^2?",
      "Determine the limit of f(x) = (x^2 - 1)/(x - 1) as x approaches 1",
    ],
  };

  const [completedExercises, setCompletedExercises] = useState<{[key: string]: boolean}>({});

  const handleCompleteExercise = (area: string, index: number) => {
    setCompletedExercises({...completedExercises, [`${area}-${index}`]: true});
  };

  const handlePrint = useCallback(() => {
    if (componentRef.current) {
      const printContent = componentRef.current.innerHTML;

      const newWindow = window.open('', '_blank', 'width=800,height=600');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Remedial Exercises - ${studentName} - ${examName}</title>
              <style>
                body {
                  font-family: sans-serif;
                }
                .exam-header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .student-info {
                  margin-bottom: 10px;
                }
                .area-title {
                  font-size: 1.2em;
                  font-weight: bold;
                  margin-bottom: 5px;
                }
                .exercise-item {
                  margin-bottom: 5px;
                }
              </style>
            </head>
            <body>
              <div class="exam-header">
                <h1>Remedial Exercises</h1>
                <div class="student-info">
                  Student: ${studentName} - Exam: ${examName}
                </div>
              </div>
              ${printContent}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
        toast({
          title: "Printing",
          description: "Printing exam...",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to open print window.",
        });
      }
    }
  }, [examName, studentName, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Remedial Exercises</CardTitle>
        <CardDescription>
          {studentName} - {examName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handlePrint}>Print Exam</Button>
        <div ref={componentRef}>
          {areasOfWeakness.map((area) => (
            <div key={area} className="space-y-2">
              <h3 className="text-lg font-semibold">{area}</h3>
              <ol className="list-decimal pl-5">
                {exercises[area].map((exercise, index) => (
                  <li key={index} className="flex items-start justify-between exercise-item">
                    {exercise}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RemedialExercises;