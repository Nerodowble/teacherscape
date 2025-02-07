
import React from 'react';
import { X, LayoutDashboard, PieChart, BookOpen, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <span className="text-xl font-semibold text-gradient">EducaIA</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          <a href="#dashboard" className="flex items-center gap-3 nav-link p-3 rounded-lg hover:bg-primary-light">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>
          <a href="#analysis" className="flex items-center gap-3 nav-link p-3 rounded-lg hover:bg-primary-light">
            <PieChart className="h-5 w-5" />
            Analysis
          </a>
          <a href="#resources" className="flex items-center gap-3 nav-link p-3 rounded-lg hover:bg-primary-light">
            <BookOpen className="h-5 w-5" />
            Resources
          </a>
          <a href="#reports" className="flex items-center gap-3 nav-link p-3 rounded-lg hover:bg-primary-light">
            <FileText className="h-5 w-5" />
            Reports
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
