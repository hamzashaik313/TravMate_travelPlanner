// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { putJson, del } from "@/lib/api";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import type { TripDetail } from "@/types/TripDetail";

// export function TripSummary({
//   trip,
//   onChanged,
// }: {
//   trip: TripDetail;
//   onChanged: () => void;
// }) {
//   const router = useRouter();
//   const { toast } = useToast();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: trip.title,
//     destination: trip.destination,
//     startDate: trip.startDate.substring(0, 10),
//     endDate: trip.endDate.substring(0, 10),
//   });

//   const save = async () => {
//     setLoading(true);
//     try {
//       await putJson(`/api/trips/${trip.id}`, {
//         title: form.title,
//         destination: form.destination,
//         startDate: form.startDate,
//         endDate: form.endDate,
//       });
//       toast({ title: "Trip updated" });
//       setOpen(false);
//       onChanged();
//     } catch (e: any) {
//       toast({
//         title: "Failed to update",
//         description: e.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remove = async () => {
//     if (!confirm("Delete this trip?")) return;
//     try {
//       await del(`/api/trips/${trip.id}`);
//       toast({ title: "Trip deleted" });
//       router.push("/dashboard");
//     } catch (e: any) {
//       toast({
//         title: "Failed to delete",
//         description: e.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-balance">{trip.title}</CardTitle>

//         {/* Budget removed completely */}
//         <CardDescription>
//           {trip.destination} • {new Date(trip.startDate).toLocaleDateString()} →{" "}
//           {new Date(trip.endDate).toLocaleDateString()}
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="flex gap-2">
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button>Edit</Button>
//           </DialogTrigger>

//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Trip</DialogTitle>
//               <DialogDescription>
//                 Update trip details and save.
//               </DialogDescription>
//             </DialogHeader>

//             <div className="grid gap-4 py-2">
//               <div className="grid gap-2">
//                 <Label htmlFor="title">Title</Label>
//                 <Input
//                   id="title"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="destination">Destination</Label>
//                 <Input
//                   id="destination"
//                   value={form.destination}
//                   onChange={(e) =>
//                     setForm({ ...form, destination: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div className="grid gap-2">
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={form.startDate}
//                     onChange={(e) =>
//                       setForm({ ...form, startDate: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="grid gap-2">
//                   <Label htmlFor="endDate">End Date</Label>
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={form.endDate}
//                     onChange={(e) =>
//                       setForm({ ...form, endDate: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={save} disabled={loading}>
//                 {loading ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Button variant="destructive" onClick={remove}>
//           Delete
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { putJson, del } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { TripDetail } from "@/types/TripDetail";

export function TripSummary({
  trip,
  onChanged,
}: {
  trip: TripDetail;
  onChanged: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: trip.title,
    destination: trip.destination,
    startDate: trip.startDate.substring(0, 10),
    endDate: trip.endDate.substring(0, 10),
  });

  const save = async () => {
    setLoading(true);
    try {
      await putJson(`/api/trips/${trip.id}`, {
        title: form.title,
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
      });
      toast({ title: "Trip updated" });
      setOpen(false);
      onChanged();
    } catch (e: any) {
      toast({
        title: "Failed to update",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this trip?")) return;
    try {
      await del(`/api/trips/${trip.id}`);
      toast({ title: "Trip deleted" });
      router.push("/dashboard");
    } catch (e: any) {
      toast({
        title: "Failed to delete",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <CardTitle className="text-lg md:text-2xl font-bold">
            {trip.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {trip.destination} • {new Date(trip.startDate).toLocaleDateString()}{" "}
            → {new Date(trip.endDate).toLocaleDateString()}
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="px-4 py-2">Edit</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Trip</DialogTitle>
                <DialogDescription>
                  Update trip details and save.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={form.destination}
                    onChange={(e) =>
                      setForm({ ...form, destination: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={save} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" onClick={remove}>
            Delete
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="text-sm text-gray-700">
          {/* keep room for other meta or quick actions in future */}
          Click <strong>Edit</strong> to modify trip details, or Delete to
          remove.
        </div>
      </CardContent>
    </Card>
  );
}
