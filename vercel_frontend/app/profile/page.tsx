// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { getJson, putJson } from "@/lib/api";

// export default function ProfilePage() {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     bio: "",
//     preferredCurrency: "INR",
//     preferredLanguage: "English",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // ✅ Load user dynamically from JWT
//   useEffect(() => {
//     (async () => {
//       try {
//         const user = await getJson(`/api/user/me`);
//         setFormData({
//           fullName: user.name || "",
//           email: user.email || "",
//           phone: user.phone || "",
//           bio: user.bio || "",
//           preferredCurrency: user.preferredCurrency || "INR",
//           preferredLanguage: user.preferredLanguage || "English",
//         });
//       } catch (error) {
//         toast({
//           title: "Error loading profile",
//           description: "Failed to fetch user details.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await putJson(`/api/user/me`, {
//         name: formData.fullName,
//         phone: formData.phone,
//         bio: formData.bio,
//         preferredCurrency: formData.preferredCurrency,
//         preferredLanguage: formData.preferredLanguage,
//       });

//       toast({
//         title: "Profile updated successfully!",
//         description: "Your information was saved.",
//       });
//     } catch (error) {
//       toast({
//         title: "Failed to save changes",
//         description: "Something went wrong.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading Profile...</p>
//       </div>
//     );

//   return (
//     <div className="container max-w-3xl mx-auto py-12 px-4 mt-16">
//       <h2 className="text-3xl font-bold mb-6">My Profile</h2>
//       <p className="text-muted-foreground mb-8">
//         Manage your personal information.
//       </p>

//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Personal Details</CardTitle>
//           <CardDescription>
//             Update your name, contact info, and preferences.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="fullName">Full Name</Label>
//             <Input
//               id="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" value={formData.email} disabled />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone</Label>
//             <Input id="phone" value={formData.phone} onChange={handleChange} />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="bio">Bio</Label>
//             <Textarea id="bio" value={formData.bio} onChange={handleChange} />
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
    photoUrl: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Fetch current logged-in user data
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
          photoUrl: user.photoUrl || "",
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

  // ✅ Handle save
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

  // ✅ Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("travmate_token");
    const data = new FormData();
    data.append("file", file);

    setPhotoPreview(URL.createObjectURL(file));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/upload-photo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      setFormData((prev) => ({ ...prev, photoUrl: result.photoUrl }));

      toast({
        title: "Profile photo updated!",
        description: "Your new photo has been saved.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not upload the photo.",
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
        Manage your personal information and profile picture.
      </p>

      {/* Profile Picture Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload or change your profile photo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <img
            src={
              photoPreview ||
              (formData.photoUrl
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${formData.photoUrl}`
                : "/images/default-avatar.png")
            }
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </CardContent>
      </Card>

      {/* Personal Details Section */}
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
