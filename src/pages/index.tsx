import React from 'react';
import Navbar from '@/components/layout/Navbar';
import MetricCard from '@/components/dashboard/MetricCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { Users, BookOpen, FileText, TrendingUp, GraduationCap } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Your profile settings would open here. Feature coming soon.",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <main className="pt-16">
        <div className="container py-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, Professor Smith</h1>
            <p className="text-neutral">Here's what's happening with your classes today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            <MetricCard
              title="Total Students"
              value="156"
              icon={<Users className="h-6 w-6" />}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Active Courses"
              value="8"
              icon={<BookOpen className="h-6 w-6" />}
            />
            <MetricCard
              title="Pending Reviews"
              value="23"
              icon={<FileText className="h-6 w-6" />}
            />
            <MetricCard
              title="Class Average"
              value="85%"
              icon={<GraduationCap className="h-6 w-6" />}
              trend={{ value: 5, isPositive: true }}
            />
          </div>
          
          <div className="mb-8 animate-fade-in" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
