import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  Folder,
  Video,
  FileText,
  Music,
  Presentation,
  Link as LinkIcon,
  BookOpen,
  Star,
  MessageSquare,
  Download,
  Tags,
  BookmarkPlus
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const mockResources = [
  {
    id: 1,
    title: "Introduction to Physics",
    type: "document",
    category: "Science",
    subCategory: "Physics",
    topic: "Mechanics",
    description: "Comprehensive guide covering basic physics concepts and principles",
    format: "PDF",
    author: "Dr. Smith",
    date: "2024-03-15",
    downloads: 156,
    rating: 4.5,
    difficulty: "Intermediate",
    language: "English",
    tags: ["physics", "mechanics", "introduction"],
    comments: 12,
  },
  {
    id: 2,
    title: "Chemical Reactions Lab Guide",
    type: "video",
    category: "Science",
    subCategory: "Chemistry",
    topic: "Chemical Reactions",
    description: "Video demonstration of common chemical reactions with detailed explanations",
    format: "MP4",
    author: "Prof. Johnson",
    date: "2024-03-14",
    views: 328,
    rating: 4.8,
    difficulty: "Advanced",
    language: "English",
    tags: ["chemistry", "lab", "reactions"],
    comments: 24,
  },
  {
    id: 3,
    title: "World History Podcast",
    type: "audio",
    category: "History",
    subCategory: "World History",
    topic: "Ancient Civilizations",
    description: "Engaging podcast series covering major historical events and civilizations",
    format: "MP3",
    author: "Dr. Williams",
    date: "2024-03-13",
    listens: 423,
    rating: 4.2,
    difficulty: "Beginner",
    language: "English",
    tags: ["history", "podcast", "ancient"],
    comments: 18,
  },
  {
    id: 4,
    title: "Mathematics Fundamentals",
    type: "presentation",
    category: "Mathematics",
    subCategory: "Algebra",
    topic: "Basic Operations",
    description: "Interactive presentation covering essential mathematical concepts",
    format: "PPTX",
    author: "Ms. Anderson",
    date: "2024-03-12",
    downloads: 245,
    rating: 4.6,
    difficulty: "Beginner",
    language: "English",
    tags: ["math", "algebra", "basics"],
    comments: 15,
  },
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
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

  const handleBookmark = (resourceId: number) => {
    toast({
      title: "Bookmark Added",
      description: "Resource added to your favorites.",
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "audio":
        return <Music className="h-5 w-5 text-green-500" />;
      case "presentation":
        return <Presentation className="h-5 w-5 text-yellow-500" />;
      default:
        return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-light">
      <Sidebar isOpen={true} onClose={() => {}} />
      <div className="flex-1 overflow-x-hidden">
        <Navbar onMenuClick={() => {}} onProfileClick={() => {}} />
        <div className="min-h-screen bg-neutral-light pt-16">
          <main className="container py-8 lg:pl-64">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gradient mb-2">Resources Library</h1>
              <p className="text-neutral">Access and manage all your educational resources in one place.</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, author, topic..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Tags className="h-4 w-4" />
                  Categories
                </Button>
                <Button onClick={handleUpload} className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  Upload
                </Button>
              </div>
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
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                          {getResourceIcon(resource.type)}
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                              <span>{resource.category} • {resource.subCategory}</span>
                              <span>By {resource.author}</span>
                              <span>{resource.date}</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {resource.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {resource.comments}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {resource.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookmark(resource.id)}
                            className="flex items-center gap-2"
                          >
                            <BookmarkPlus className="h-4 w-4" />
                            Save
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleDownload(resource.id)}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

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
                              By {resource.author} • {resource.date}
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

              <TabsContent value="videos">
                {mockResources.filter(r => r.type === "video").map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getResourceIcon(resource.type)}
                          <div>
                            <h3 className="font-semibold text-lg">{resource.title}</h3>
                            <p className="text-sm text-gray-500">
                               By {resource.author} • {resource.date}
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

              <TabsContent value="audio">
                {mockResources.filter(r => r.type === "audio").map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getResourceIcon(resource.type)}
                          <div>
                            <h3 className="font-semibold text-lg">{resource.title}</h3>
                            <p className="text-sm text-gray-500">
                               By {resource.author} • {resource.date}
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

              <TabsContent value="presentations">
                {mockResources.filter(r => r.type === "presentation").map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getResourceIcon(resource.type)}
                          <div>
                            <h3 className="font-semibold text-lg">{resource.title}</h3>
                            <p className="text-sm text-gray-500">
                               By {resource.author} • {resource.date}
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
      </div>
    </div>
  );
};

export default ResourcesPage;
