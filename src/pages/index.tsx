import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import MetricCard from '@/components/dashboard/MetricCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { Users, BookOpen, FileText, TrendingUp, GraduationCap, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AnalysisResultsModal from '@/components/AnalysisResultsModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExamInfo {
  class: string;
  studentName: string;
  examName: string;
  file: File | null;
}

const Index = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [username, setUsername] = useState('Professor');
  const [uploadedExams, setUploadedExams] = useState<ExamInfo[]>([]);
  const [persistCards, setPersistCards] = useState(false);
  const [selectedExamIndex, setSelectedExamIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:${process.env.BACKEND_PORT}/profile`, {
          headers: {
            Authorization: token,
          },
        });
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    toast({
      title: t("Profile"),
      description: t("Your profile settings would open here. Feature coming soon."),
    });
  };

  const handlePersistCards = () => {
    // TODO: Implement local storage persistence
    setPersistCards(!persistCards);
    toast({
      title: "Card Persistence",
      description: `Card persistence is now ${!persistCards ? 'enabled' : 'disabled'}`,
    });
  };

  const handleDeleteCard = (index: number) => {
    // TODO: Implement card deletion
    const newExams = [...uploadedExams];
    newExams.splice(index, 1);
    setUploadedExams(newExams);
    toast({
      title: "Card Deleted",
      description: `Card deleted successfully`,
    });
  };

  const handleViewAnalysisResults = (index: number) => {
    setSelectedExamIndex(index);
  };

  const closeModal = () => {
    setSelectedExamIndex(null);
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <main className="pt-16">
        <div className="container py-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gradient mb-2">{t('Welcome back,', { username: username })}</h1>
            <p className="text-neutral">{t("Here's what's happening with your classes today.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            <MetricCard
              title={t("Total Students")}
              value="156"
              icon={<Users className="h-6 w-6" />}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title={t("Active Courses")}
              value="8"
              icon={<BookOpen className="h-6 w-6" />}
            />
            <MetricCard
              title={t("Pending Reviews")}
              value="23"
              icon={<FileText className="h-6 w-6" />}
            />
            <MetricCard
              title={t("Class Average")}
              value="85%"
              icon={<GraduationCap className="h-6 w-6" />}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          <QuickActions setUploadedExams={setUploadedExams} uploadedExams={uploadedExams}/>

          <Button onClick={handlePersistCards}>
            {persistCards ? 'Disable Card Persistence' : 'Enable Card Persistence'}
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedExams.map((exam, index) => (
              <div key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{exam.examName}</CardTitle>
                    <CardDescription>
                      {exam.class} - {exam.studentName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <Button onClick={() => handleViewAnalysisResults(index)}>View Analysis Results</Button>
                    <Button onClick={() => handleDeleteCard(index)}><Trash className="h-4 w-4"/></Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <Dialog open={selectedExamIndex !== null} onOpenChange={closeModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Analysis Results</DialogTitle>
              </DialogHeader>
              {selectedExamIndex !== null && (
                <AnalysisResultsModal exam={uploadedExams[selectedExamIndex]} closeModal={closeModal} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Index;
