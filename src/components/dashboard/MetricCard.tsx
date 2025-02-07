
import React from 'react';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: `${title} Details`,
      description: `View detailed analytics for ${title.toLowerCase()}. Current value: ${value}${trend ? ` (${trend.isPositive ? '+' : '-'}${Math.abs(trend.value)}%)` : ''}`
    });
  };

  return (
    <div 
      className="glass-card hover-card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
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
