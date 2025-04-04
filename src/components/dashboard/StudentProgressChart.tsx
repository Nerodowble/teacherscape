import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StudentProgressChartProps {
  studentName: string;
  examName: string;
}

const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ studentName, examName }) => {
  const data = [
    { name: 'Algebraic Equations', score: 70, previousScore: 60, previousGrades: [50, 60, 70], topicPerformance: { equations: 70, algebra: 80 }, timeSpent: 60 },
    { name: 'Geometry', score: 80, previousScore: 75, previousGrades: [60, 70, 80], topicPerformance: { shapes: 70, angles: 80 }, timeSpent: 70 },
    { name: 'Calculus', score: 65, previousScore: 50, previousGrades: [70, 80, 60], topicPerformance: { derivatives: 70, integrals: 80 }, timeSpent: 80 },
    { name: 'Trigonometry', score: 90, previousScore: 85, previousGrades: [80, 60, 70], topicPerformance: { sine: 70, cosine: 80 }, timeSpent: 90 },
  ];

  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Student Progress - {studentName}</h3>
      <h4 className="text-md font-medium mb-2">{examName}</h4>
      <PredictionChart data={data} />
    </div>
  );
};

interface RecommendationsProps {
  data: { name: string; score: number; previousScore: number; previousGrades: number[]; topicPerformance: { [key: string]: number }; timeSpent: number }[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ data }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.name}>
          <h4>Recomendações para {item.name}:</h4>
          <ul>
            {getRecommendations(item.score).map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const predictFutureScore = (previousGrades: number[]): number => {
  const sum = previousGrades.reduce((a, b) => a + b, 0);
  const average = sum / previousGrades.length;
  return average;
};

import { useEffect, useState } from 'react';

interface PredictionChartProps {
  data: { name: string; score: number; previousScore: number; previousGrades: number[]; topicPerformance: { [key: string]: number }; timeSpent: number }[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({ data }) => {
  const [predictedScores, setPredictedScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const predictions: { [key: string]: number } = {};
    data.forEach(item => {
      predictions[item.name] = predictFutureScore(item.previousGrades);
    });
    setPredictedScores(predictions);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="previousScore" fill="#3182CE" name="Previous Score" />
        <Bar dataKey="score" fill="#63B3ED" name="Current Score" />
        {Object.entries(predictedScores).map(([name, score]) => (
          <Bar key={name} dataKey={name} fill="#2ecc71" name={`Predicted Score`}  />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const getRecommendations = (score: number): string[] => {
  if (score < 60) {
    return [
      "Revisar os conceitos básicos.",
      "Fazer exercícios adicionais.",
      "Procurar ajuda de um tutor."
    ];
  } else if (score < 80) {
    return [
      "Praticar com exercícios mais desafiadores.",
      "Participar de grupos de estudo.",
      "Revisar os tópicos com maior dificuldade."
    ];
  } else {
    return [
      "Continuar praticando para manter o bom desempenho.",
      "Ajudar outros alunos com dificuldades.",
      "Explorar tópicos avançados."
    ];
  }
};

export { StudentProgressChart, Recommendations };
