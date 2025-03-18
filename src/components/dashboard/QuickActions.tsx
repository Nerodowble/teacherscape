import React, { useState, useCallback } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface ExamInfo {
  class: string;
  studentName: string;
  examName: string;
  file: File | null;
}

interface QuickActionsProps {
  setUploadedExams: (value: ExamInfo[]) => void;
  uploadedExams: ExamInfo[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ setUploadedExams, uploadedExams }) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [examFormat, setExamFormat] = useState('image');
  const [classValue, setClassValue] = useState('');
  const [studentNameValue, setStudentNameValue] = useState('');
  const [examNameValue, setExamNameValue] = useState('');
  const [classList, setClassList] = useState(['Class A', 'Class B', 'Class C']);
  const [studentList, setStudentList] = useState(['Student A', 'Student B', 'Student C']);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  }, []);

  const handleExamFormatChange = useCallback((value: string) => {
    setExamFormat(value);
  }, []);

  const handleFileUpload = useCallback(() => {
    if (!selectedFile || !classValue || !studentNameValue || !examNameValue) {
      alert('Please select a file and enter the exam information.');
      return;
    }

    // Mock upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        toast({
          title: "File Uploaded",
          description: `Successfully uploaded: ${selectedFile?.name}`,
        });
        setUploadedExams([...uploadedExams, {
          class: classValue,
          studentName: studentNameValue,
          examName: examNameValue,
          file: selectedFile
        }]);
        setSelectedFile(null);
        setUploadProgress(0);
        setClassValue('');
        setStudentNameValue('');
        setExamNameValue('');
      }
    }, 200);
  }, [classValue, examNameValue, selectedFile, setUploadedExams, studentNameValue, toast, uploadedExams]);

  const handleNewClass = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast({
      title: "Class Created",
      description: `New class "${formData.get('className')}" created successfully.`,
    });
  }, [toast]);

  const handleResources = useCallback(() => {
    toast({
      title: "Resources Accessed",
      description: "Opening resource library...",
    });
  }, [toast]);

  const handleCreate = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast({
      title: "Content Created",
      description: `New ${formData.get('contentType')} content created.`,
    });
  }, [toast]);

  const handleClassChange = useCallback((value: string) => {
    setClassValue(value);
  }, []);

  const handleStudentNameChange = useCallback((value: string) => {
    setStudentNameValue(value);
  }, []);

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
                Choose an exam file to upload.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Label htmlFor="class">Class</Label>
              <Select onValueChange={handleClassChange}>
                <SelectTrigger id="class">
                  Select class
                </SelectTrigger>
                <SelectContent className="max-h-40 overflow-y-auto">
                  {classList.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="studentName">Student Name</Label>
              <Select onValueChange={handleStudentNameChange}>
                <SelectTrigger id="studentName">
                  Select student
                </SelectTrigger>
                <SelectContent className="max-h-40 overflow-y-auto">
                  {studentList.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="examName">Exam Name</Label>
              <Input type="text" id="examName" value={examNameValue} onChange={(e) => setExamNameValue(e.target.value)}/>

              <Label htmlFor="exam-format">Exam Format</Label>
              <Select onValueChange={handleExamFormatChange}>
                <SelectTrigger id="exam-format">
                  Select format
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="file"
                id="exam-upload"
                onChange={handleFileChange}
                accept="image/*,text/*,.pdf,.json"
              />
              {selectedFile && (
                <div>
                  <p>Selected file: {selectedFile?.name}</p>
                  <Progress value={uploadProgress} />
                  <Button onClick={handleFileUpload} disabled={uploadProgress > 0 && uploadProgress < 100}>
                    {uploadProgress === 0 ? 'Upload' : uploadProgress === 100 ? 'Uploaded' : `Uploading... ${uploadProgress}%`}
                  </Button>
                </div>
              )}
            </div>
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
