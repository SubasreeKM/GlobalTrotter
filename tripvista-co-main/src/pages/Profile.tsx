import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Bell,
  Globe,
  Trash2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";

/* =====================
   LocalStorage Keys
===================== */
const AUTH_KEY = "globetrotter_auth";
const USERS_KEY = "globetrotter_users";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  /* =====================
     LOAD LOGGED-IN USER
  ===================== */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(AUTH_KEY));

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    setProfile({
      name: user.name,
      email: user.email,
      language: user.language || "en",
      currency: user.currency || "USD",
      notifications:
        user.notifications !== undefined ? user.notifications : true,
    });
  }, []);

  if (!profile) return null;

  /* =====================
     SAVE PROFILE
  ===================== */
  const saveChanges = () => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const updatedUsers = users.map((u) =>
      u.email === profile.email ? { ...u, ...profile } : u
    );

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(AUTH_KEY, JSON.stringify(profile));

    alert("Profile updated successfully!");
  };

  /* =====================
     LOGOUT
  ===================== */
  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/auth";
  };

  /* =====================
     DELETE ACCOUNT
  ===================== */
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const updatedUsers = users.filter(
      (u) => u.email !== profile.email
    );

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.removeItem(AUTH_KEY);

    alert("Account deleted successfully");
    window.location.href = "/auth";
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-semibold">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences
          </p>
        </div>

        {/* PROFILE CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-primary text-3xl font-display font-semibold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-background border rounded-full">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {profile.name}
                  </h3>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PERSONAL INFO */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" value={profile.email} disabled />
              </div>
            </div>

            <Button variant="gold" onClick={saveChanges}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* PREFERENCES */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between">
              <Label>Language</Label>
              <Select
                value={profile.language}
                onValueChange={(value) =>
                  setProfile({ ...profile, language: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between">
              <Label>Currency</Label>
              <Select
                value={profile.currency}
                onValueChange={(value) =>
                  setProfile({ ...profile, currency: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between">
              <Label>Notifications</Label>
              <Switch
                checked={profile.notifications}
                onCheckedChange={(checked) =>
                  setProfile({ ...profile, notifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* DANGER ZONE */}
        <Card variant="elevated" className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
