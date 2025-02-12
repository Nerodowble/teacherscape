import React, { useState, useEffect } from 'react';
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:${process.env.BACKEND_PORT}/profile`, {
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    try {
      fetchProfile();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <div className="flex h-screen bg-neutral-light">
      <div className="flex-1 overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen bg-neutral-light pt-16">
          <main className="container py-8">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gradient mb-2">Profile</h1>
              <p className="text-neutral">Manage your profile information and settings.</p>
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input type="text" id="name" defaultValue={user.name} />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" defaultValue={user.name} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" defaultValue={user.email} />
                </div>
                <div>
                  <Label htmlFor="bio">Biography</Label>
                  <textarea
                    id="bio"
                    className="w-full border rounded-md p-2"
                    defaultValue={user.bio}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label htmlFor="password">Change Password</Label>
                  <Input type="password" id="password" placeholder="New Password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input type="password" id="confirmPassword" placeholder="Confirm New Password" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <Switch id="twoFactorAuth" />
                </div>
                <div>
                  <Label>Manage Devices</Label>
                  {/* List of connected devices */}
                  <p className="text-sm text-neutral-muted">No devices connected.</p>
                </div>
                <div>
                  <Label>Notification Settings</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect to other services.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button>Connect to Google</Button>
                <Button>Connect to Facebook</Button>
                <Button variant="outline">Generate API Key</Button>
              </CardContent>
            </Card>

            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>User Actions</CardTitle>
                <CardDescription>Perform actions related to your account.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button>Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers. Please enter your password to confirm.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        try {
                          axios.delete(`http://localhost:${process.env.BACKEND_PORT}/profile`, {
                            headers: {
                              Authorization: localStorage.getItem('token'),
                            },
                            data: {
                              password: password,
                            },
                          })
                            .then(() => {
                              localStorage.removeItem('token');
                              window.location.href = '/login';
                            })
                            .catch(error => {
                              console.error('Error deleting account:', error);
                            });
                        } catch (error) {
                          console.error("An error occurred:", error);
                        }
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" onClick={() => {
                  axios.post(`http://localhost:${process.env.BACKEND_PORT}/logout`)
                    .then(() => {
                      localStorage.removeItem('token');
                      window.location.href = '/login';
                    })
                    .catch(error => {
                      console.error('Error logging out:', error);
                    });
                }}>Logout</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
