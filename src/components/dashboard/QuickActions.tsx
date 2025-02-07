
import React from 'react';
import { Plus, Upload, Users, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Exam</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
        >
          <Users className="h-5 w-5" />
          <span>New Class</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
        >
          <BookOpen className="h-5 w-5" />
          <span>Resources</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light"
        >
          <Plus className="h-5 w-5" />
          <span>Create</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
