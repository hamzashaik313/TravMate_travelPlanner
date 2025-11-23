// //

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useAuth } from "@/components/auth/auth-context";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff } from "lucide-react";

// interface ProfileData {
//   id?: number;
//   name: string;
//   email: string;
//   password?: string;
// }

// const initialProfileState: ProfileData = {
//   id: undefined,
//   name: "",
//   email: "",
//   password: "",
// };

// export default function ProfilePage() {
//   const { user: authUser, isAuthenticated, hydrated, setUser } = useAuth();

//   const [formData, setFormData] = useState<ProfileData>(initialProfileState);
//   const [newPassword, setNewPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [message, setMessage] = useState<{
//     text: string;
//     type: "success" | "error" | "info";
//   } | null>(null);

//   const BACKEND_BASE =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

//   // --- Fetch user profile from Spring Boot ---
//   useEffect(() => {
//     if (!hydrated || !authUser?.email) return;

//     const loadProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `${BACKEND_BASE}/api/user/email?value=${encodeURIComponent(
//             authUser?.email ?? ""
//           )}`,
//           { credentials: "include" }
//         );

//         if (!res.ok) throw new Error("Failed to load profile");

//         const data = await res.json();
//         setFormData({
//           id: data.id,
//           name: data.name || "",
//           email: data.email || authUser.email,
//         });
//       } catch (e) {
//         console.error("Profile fetch error:", e);
//         setMessage({ text: "Failed to load profile data.", type: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [authUser, hydrated]);

//   // --- Handle input changes ---
//   const handleInputChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setFormData((prev) => ({
//         ...prev,
//         [e.target.id]: e.target.value,
//       }));
//     },
//     []
//   );

//   // --- Save profile changes ---
//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.id) {
//       setMessage({ text: "Cannot save: missing user ID.", type: "error" });
//       return;
//     }

//     setIsSaving(true);
//     setMessage(null);

//     try {
//       const res = await fetch(`${BACKEND_BASE}/api/user/${formData.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to save profile");

//       const updatedUser = await res.json();
//       setFormData(updatedUser);

//       // ✅ Update global context
//       setUser({
//         ...authUser,
//         name: updatedUser.name,
//         email: updatedUser.email,
//       });

//       setMessage({ text: "Profile updated successfully!", type: "success" });
//     } catch (e) {
//       console.error("Profile save error:", e);
//       setMessage({ text: "Failed to save profile data.", type: "error" });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // --- Change password ---
//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.id) {
//       setMessage({
//         text: "Cannot update password: missing user ID.",
//         type: "error",
//       });
//       return;
//     }
//     if (!newPassword) {
//       setMessage({
//         text: "Please enter a new password.",
//         type: "error",
//       });
//       return;
//     }

//     setIsChangingPassword(true);
//     setMessage(null);

//     try {
//       const res = await fetch(`${BACKEND_BASE}/api/user/${formData.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ ...formData, password: newPassword }),
//       });

//       if (!res.ok) throw new Error("Failed to change password");

//       setMessage({
//         text: "Password changed successfully!",
//         type: "success",
//       });
//       setNewPassword("");
//     } catch (e) {
//       console.error("Password change error:", e);
//       setMessage({
//         text: "Failed to change password.",
//         type: "error",
//       });
//     } finally {
//       setIsChangingPassword(false);
//     }
//   };

//   // --- UI Rendering ---
//   if (loading || !hydrated) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         <p className="ml-3 text-lg">Loading Profile...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="container max-w-4xl mx-auto py-12 px-4 mt-16 text-center">
//         <h2 className="text-3xl font-bold mb-4 text-red-500">
//           Authentication Error
//         </h2>
//         <p className="text-muted-foreground">
//           Please log in to view your profile.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
//       <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="28"
//           height="28"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//           <circle cx="12" cy="7" r="4" />
//         </svg>
//         My Profile
//       </h2>
//       <p className="text-muted-foreground mb-10">
//         Manage your personal information and account settings.
//       </p>

//       {message && (
//         <div
//           className={`p-4 rounded-lg mb-6 ${
//             message.type === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       {/* Personal Info */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Personal Details</CardTitle>
//           <CardDescription>Update your name and email.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleUpdateProfile} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" value={formData.email} disabled />
//             </div>

//             <Button type="submit" disabled={isSaving}>
//               {isSaving ? "Saving..." : "Save Changes"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Change Password */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Password & Security</CardTitle>
//           <CardDescription>Change your account password.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleChangePassword} className="space-y-4">
//             <div className="space-y-2 relative">
//               <Label htmlFor="newPassword">New Password</Label>
//               <div className="relative">
//                 <Input
//                   id="newPassword"
//                   type={showPassword ? "text" : "password"}
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>
//             <Button type="submit" disabled={isChangingPassword}>
//               {isChangingPassword ? "Updating..." : "Change Password"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

//gpt

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";

// export default function ProfilePage() {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "anas@gmail.com",
//     phone: "",
//     bio: "",
//     preferredCurrency: "INR",
//     preferredLanguage: "English",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSave = () => {
//     toast({
//       title: "Profile updated successfully!",
//       description: "Your personal details were saved.",
//     });
//   };

//   return (
//     <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
//       <h2 className="text-3xl font-bold mb-6">My Profile</h2>
//       <p className="text-muted-foreground mb-8">
//         Manage your personal information and preferences.
//       </p>

//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Personal Details</CardTitle>
//           <CardDescription>Update your name, contact info, and bio.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="fullName">Full Name</Label>
//             <Input id="fullName" value={formData.fullName} onChange={handleChange} />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" value={formData.email} disabled />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone</Label>
//             <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="bio">Bio</Label>
//             <Textarea
//               id="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               placeholder="Write something about yourself"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="preferredCurrency">Preferred Currency</Label>
//               <select
//                 id="preferredCurrency"
//                 value={formData.preferredCurrency}
//                 onChange={handleChange}
//                 className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//               >
//                 <option value="INR">INR - Indian Rupee</option>
//                 <option value="USD">USD - US Dollar</option>
//                 <option value="EUR">EUR - Euro</option>
//                 <option value="GBP">GBP - British Pound</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="preferredLanguage">Preferred Language</Label>
//               <select
//                 id="preferredLanguage"
//                 value={formData.preferredLanguage}
//                 onChange={handleChange}
//                 className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//               >
//                 <option value="English">English</option>
//                 <option value="Hindi">Hindi</option>
//                 <option value="French">French</option>
//                 <option value="Spanish">Spanish</option>
//               </select>
//             </div>
//           </div>

//           <Button className="mt-4" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getJson, putJson } from "@/lib/api";

export default function ProfilePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    preferredCurrency: "INR",
    preferredLanguage: "English",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Load user dynamically from JWT
  useEffect(() => {
    (async () => {
      try {
        const user = await getJson(`/api/user/me`);
        setFormData({
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          bio: user.bio || "",
          preferredCurrency: user.preferredCurrency || "INR",
          preferredLanguage: user.preferredLanguage || "English",
        });
      } catch (error) {
        toast({
          title: "Error loading profile",
          description: "Failed to fetch user details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      await putJson(`/api/user/me`, {
        name: formData.fullName,
        phone: formData.phone,
        bio: formData.bio,
        preferredCurrency: formData.preferredCurrency,
        preferredLanguage: formData.preferredLanguage,
      });

      toast({
        title: "Profile updated successfully!",
        description: "Your information was saved.",
      });
    } catch (error) {
      toast({
        title: "Failed to save changes",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Profile...</p>
      </div>
    );

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <p className="text-muted-foreground mb-8">
        Manage your personal information.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            Update your name, contact info, and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={formData.email} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={formData.bio} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredCurrency">Preferred Currency</Label>
              <select
                id="preferredCurrency"
                value={formData.preferredCurrency}
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredLanguage">Preferred Language</Label>
              <select
                id="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>

          <Button className="mt-4" onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
