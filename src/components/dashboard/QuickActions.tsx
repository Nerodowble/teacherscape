
import React from 'react';
import { Plus, Upload, Users, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const QuickActions = () => {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `Successfully uploaded: ${file.name}`,
      });
    }
  };

  const handleNewClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast({
      title: "Class Created",
      description: `New class "${formData.get('className')}" created successfully.`,
    });
  };

  const handleResources = () => {
    toast({
      title: "Resources Accessed",
      description: "Opening resource library...",
    });
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast({
      title: "Content Created",
      description: `New ${formData.get('contentType')} content created.`,
    });
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light w-full"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Exam</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Exam</DialogTitle>
              <DialogDescription>
                Choose an exam file to upload. Supported formats: PDF, DOC, DOCX
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light w-full"
            >
              <Users className="h-5 w-5" />
              <span>New Class</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Enter the details for your new class
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewClass} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input id="className" name="className" required />
              </div>
              <Button type="submit">Create Class</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light w-full"
            >
              <BookOpen className="h-5 w-5" />
              <span>Resources</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resource Library</DialogTitle>
              <DialogDescription>
                Access and manage your teaching resources
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">
              <p>Resource library content will be implemented here.</p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 hover:bg-primary-light w-full"
            >
              <Plus className="h-5 w-5" />
              <span>Create</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Content</DialogTitle>
              <DialogDescription>
                Create new educational content
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <select 
                  id="contentType" 
                  name="contentType"
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="material">Learning Material</option>
                </select>
              </div>
              <Button type="submit">Create Content</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default QuickActions;

