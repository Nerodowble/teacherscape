import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Folder, Video, FileText, Audio, Presentation, Link as LinkIcon, BookOpen } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Introduction to Physics",
    type: "document",
    subject: "Physics",
    author: "Dr. Smith",
    date: "2024-03-15",
    downloads: 156,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Chemical Reactions Lab Guide",
    type: "video",
    subject: "Chemistry",
    author: "Prof. Johnson",
    date: "2024-03-14",
    views: 328,
    rating: 4.8,
  },
  {
    id: 3,
    title: "World History Podcast",
    type: "audio",
    subject: "History",
    author: "Dr. Williams",
    date: "2024-03-13",
    listens: 423,
    rating: 4.2,
  },
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload Resource",
      description: "The upload functionality will be implemented soon.",
    });
  };

  const handleDownload = (resourceId: number) => {
    toast({
      title: "Download Resource",
      description: `Downloading resource ${resourceId}...`,
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "audio":
        return <Audio className="h-5 w-5 text-green-500" />;
      case "presentation":
        return <Presentation className="h-5 w-5 text-yellow-500" />;
      default:
        return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light pt-16">
      <main className="container py-8 lg:pl-64">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient mb-2">Resources Library</h1>
          <p className="text-neutral">Access and manage all your educational resources in one place.</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Upload Resource
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getResourceIcon(resource.type)}
                      <div>
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                        <p className="text-sm text-gray-500">
                          {resource.subject} • By {resource.author} • {resource.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(resource.id)}>
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Other tab contents will show filtered resources based on type */}
          <TabsContent value="documents">
            {mockResources.filter(r => r.type === "document").map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getResourceIcon(resource.type)}
                      <div>
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                        <p className="text-sm text-gray-500">
                          {resource.subject} • By {resource.author} • {resource.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(resource.id)}>
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResourcesPage;
