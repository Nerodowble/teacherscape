
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => {
  return (
    <div className="glass-card hover-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-neutral">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && (
            <p className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
