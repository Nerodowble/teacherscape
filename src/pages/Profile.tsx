import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LanguageContext } from "@/context/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
 const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    bio: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }
        const response = await axios.get(`http://localhost:${process.env.BACKEND_PORT}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Profile data:', response.data);
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access - possibly invalid token');
          navigate('/login');
        } else {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();

    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleSaveLanguage = () => {
    localStorage.setItem('language', language);
    alert('Language saved!');
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (password && password === confirmPassword) {
        // Send the new password to the backend
        await axios.put(`http://localhost:${process.env.BACKEND_PORT}/profile`, { ...user, password }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Profile saved successfully!');
      } else if (password && password !== confirmPassword) {
        alert('Passwords do not match!');
      } else {
        // Only update profile information
        await axios.put(`http://localhost:${process.env.BACKEND_PORT}/profile`, user, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Profile saved successfully!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('Please enter your password to confirm account deletion:');
    if (password) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:${process.env.BACKEND_PORT}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: { password }, // Send password in the request body
        });
        alert('Account deleted!');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please check your password and try again.');
      }
    } else {
      alert('Password confirmation is required to delete your account.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Profile Information')}</CardTitle>
              <CardDescription>{t('Manage your personal information.')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{t('Full Name')}</Label>
                <Input type="text" name="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">{t('Email')}</Label>
                <Input type="email" name="email" value={user.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="bio">{t('Biography')}</Label>
                <Input type="text" name="bio" value={user.bio} onChange={handleInputChange} />
              </div>
              <Button onClick={handleSaveProfile}>{t('Save Changes')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Password')}</CardTitle>
              <CardDescription>{t('Change your password.')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">{t('New Password')}</Label>
                <Input type="password" id="password" placeholder={t('New Password')} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="confirmPassword">{t('Confirm New Password')}</Label>
                <Input type="password" id="confirmPassword" placeholder={t('Confirm New Password')} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <Button onClick={handleSaveProfile}>{t('Change Password')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Settings')}</CardTitle>
              <CardDescription>{t('Manage your account settings.')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="twoFactorAuth">{t('Two-Factor Authentication')}</Label>
                <Switch id="twoFactorAuth" />
              </div>

              <div>
                <Label htmlFor="language">{t('Language')}</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('Select a language')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('English')}</SelectItem>
                    <SelectItem value="pt">{t('Português')}</SelectItem>
                    <SelectItem value="es">{t('Español')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleSaveLanguage()}>{t('Save Language')}</Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">{t('Delete Account')}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('Are you absolutely sure?')}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                    <AlertDialogAction className="destructive" onClick={handleDeleteAccount}>{t('Continue')}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline">{t('Logout')}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
