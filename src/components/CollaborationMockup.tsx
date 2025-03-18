import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CollaborationMockup = () => {
  const teachers = [
    { name: "Jane Smith", subject: "Math" },
    { name: "John Doe", subject: "Science" },
    { name: "Emily Brown", subject: "English" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Teacher Collaboration</CardTitle>
        <CardDescription>
          Share insights and resources with other teachers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">Participating Teachers</h4>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.name} className="flex items-center justify-between">
                {teacher.name} ({teacher.subject})
                <Button variant="ghost">View Profile</Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Add Notes</h4>
          <Textarea placeholder="Enter your notes here..." className="mb-2"/>
          <Button>Add Note</Button>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Share Resources</h4>
          <Input type="text" placeholder="Enter resource URL" className="mb-2"/>
          <Button>Share Resource</Button>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Discussion Forum</h4>
          <p>This section will display a discussion forum where teachers can share insights and strategies.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationMockup;