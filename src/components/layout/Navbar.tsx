import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
}

const Navbar = ({ onMenuClick, onProfileClick }: NavbarProps) => {
  const location = useLocation();

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
          <Link to="/">
            <Button variant="ghost" className={`nav-link ${location.pathname === '/' ? 'bg-primary/10' : ''}`}>
              Dashboard
            </Button>
          </Link>
          <Link to="/analysis">
            <Button variant="ghost" className={`nav-link ${location.pathname === '/analysis' ? 'bg-primary/10' : ''}`}>
              Analysis
            </Button>
          </Link>
          <Link to="/resources">
            <Button variant="ghost" className={`nav-link ${location.pathname === '/resources' ? 'bg-primary/10' : ''}`}>
              Resources
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="ghost" className={`nav-link ${location.pathname === '/reports' ? 'bg-primary/10' : ''}`}>
              Reports
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" className={`nav-link ${location.pathname === '/profile' ? 'bg-primary/10' : ''}`}>
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
