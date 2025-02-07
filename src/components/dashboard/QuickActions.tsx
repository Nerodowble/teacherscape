
import React from 'react';
import { Plus, Upload, Users, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

  const handleUploadExam = () => {
    toast({
      title: "Upload Initiated",
      description: "The exam upload interface would open here. Feature coming soon.",
    });
  };

  const handleNewClass = () => {
    toast({
      title: "Create New Class",
      description: "You can create a new class here. Feature coming soon.",
    });
  };

  const handleResources = () => {
    toast({
      title: "Resources Library",
      description: "Access your teaching resources here. Feature coming soon.",
    });
  };

  const handleCreate = () => {
    toast({
      title: "Create Content",
      description: "Create new educational content here. Feature coming soon.",
    });
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
          onClick={handleUploadExam}
        >
          <Upload className="h-5 w-5" />
          <span>Upload Exam</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
          onClick={handleNewClass}
        >
          <Users className="h-5 w-5" />
          <span>New Class</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
          onClick={handleResources}
        >
          <BookOpen className="h-5 w-5" />
          <span>Resources</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
          onClick={handleCreate}
        >
          <Plus className="h-5 w-5" />
          <span>Create</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
