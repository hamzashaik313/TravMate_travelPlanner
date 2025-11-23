// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";
// import { putJson, del } from "@/lib/api";

// export default function SettingsPage() {
//   const { theme, setTheme } = useTheme();
//   const { toast } = useToast();
//   const [newPassword, setNewPassword] = useState("");

//   const handlePasswordChange = async () => {
//     try {
//       await putJson("/api/user/me/password", { newPassword });
//       toast({
//         title: "Password updated successfully!",
//         description: "Your password has been changed.",
//       });
//       setNewPassword("");
//     } catch (error) {
//       toast({
//         title: "Failed to update password",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (!confirm("Are you sure you want to permanently delete your account?"))
//       return;
//     try {
//       await del("/api/user/me");
//       toast({
//         title: "Account deleted",
//         description: "Your account has been permanently removed.",
//       });
//       localStorage.clear();
//       window.location.href = "/"; // Redirect to home
//     } catch {
//       toast({
//         title: "Failed to delete account",
//         description: "Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
//       <h2 className="text-3xl font-bold mb-6">Settings</h2>
//       <p className="text-muted-foreground mb-8">
//         Manage your preferences and security settings.
//       </p>

//       {/* Appearance */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Appearance</CardTitle>
//           <CardDescription>Switch between light and dark mode.</CardDescription>
//         </CardHeader>
//         <CardContent className="flex items-center justify-between">
//           <Label>Dark Mode</Label>
//           <Switch
//             checked={theme === "dark"}
//             onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
//           />
//         </CardContent>
//       </Card>

//       {/* Change Password */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Change Password</CardTitle>
//           <CardDescription>Update your account password.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="newPassword">New Password</Label>
//             <Input
//               id="newPassword"
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </div>
//           <Button onClick={handlePasswordChange}>Change Password</Button>
//         </CardContent>
//       </Card>

//       {/* Delete Account */}
//       <Card className="border-red-500">
//         <CardHeader>
//           <CardTitle className="text-red-600">Danger Zone</CardTitle>
//           <CardDescription>
//             Permanently delete your account and all associated data.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Button variant="destructive" onClick={handleDeleteAccount}>
//             Delete Account
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { putJson } from "@/lib/api";

export default function SettingsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    tripReminders: true,
    joinRequests: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    allowRequests: false,
  });

  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    toast({
      title: "Settings saved successfully!",
      description: "Your preferences were updated.",
    });
  };

  const handlePasswordChange = async () => {
    try {
      await putJson("/api/user/me/password", { newPassword });
      setNewPassword("");
      toast({
        title: "Password updated successfully!",
        description: "Your password has been changed.",
      });
    } catch {
      toast({
        title: "Failed to change password",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <p className="text-muted-foreground mb-8">
        Manage your notifications, privacy, and account settings.
      </p>

      {/* Notifications */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you get updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            email: "Email Notifications",
            tripReminders: "Trip Reminders",
            joinRequests: "Trip Join Requests",
          }).map(([id, label]) => (
            <div key={id} className="flex justify-between items-center">
              <Label>{label}</Label>
              <Switch
                checked={(notifications as any)[id]}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, [id]: checked })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control who can see your profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            showProfile: "Show my profile publicly",
            allowRequests: "Allow trip requests from anyone",
          }).map(([id, label]) => (
            <div key={id} className="flex justify-between items-center">
              <Label>{label}</Label>
              <Switch
                checked={(privacy as any)[id]}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, [id]: checked })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </CardContent>
      </Card>

      <Button className="mt-6" onClick={handleSave}>
        Save All Changes
      </Button>
    </div>
  );
}
