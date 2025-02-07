
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="container h-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="text-xl font-semibold text-gradient">EducaIA</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="nav-link">Dashboard</a>
          <a href="#analysis" className="nav-link">Analysis</a>
          <a href="#resources" className="nav-link">Resources</a>
          <a href="#reports" className="nav-link">Reports</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">Profile</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
