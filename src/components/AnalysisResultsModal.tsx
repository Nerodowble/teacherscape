import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MockAnalysisResults from './MockAnalysisResults';
import RemedialExercises from './RemedialExercises';
import StudentProgressChart from './dashboard/StudentProgressChart';
import CollaborationMockup from './CollaborationMockup';

interface AnalysisResultsModalProps {
  exam: {
    class: string;
    studentName: string;
    examName: string;
    file: File | null;
  };
  closeModal: () => void;
}

const AnalysisResultsModal: React.FC<AnalysisResultsModalProps> = ({ exam, closeModal }) => {
  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Analysis Results</DialogTitle>
          <DialogDescription>
            {exam.class} - {exam.studentName} - {exam.examName}
          </DialogDescription>
        </DialogHeader>
        <StudentProgressChart studentName={exam.studentName} examName={exam.examName}/>
        <MockAnalysisResults />
        <RemedialExercises />
        <CollaborationMockup />
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisResultsModal;