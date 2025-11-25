"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { postJson } from "@/lib/api";
import { useAuth } from "./auth-context";

export function AuthCard() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await postJson(
        "/auth/register",
        { name, email, password },
        { withAuth: false }
      );
      toast({ title: "Account created", description: "You can now log in." });
      resetFields();
      setTab("login");
    } catch (e: any) {
      toast({
        title: "Login failed 😕",
        description: "Invalid email or password. Please try again.",
        duration: 4000,
        className:
          "bg-gradient-to-r from-red-500 to-red-600 text-white font-medium border-none shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await postJson<{
  //       token: string;
  //       displayName: string;
  //       email: string;
  //     }>("/auth/login", { email, password }, { withAuth: false });

  //     const user = {
  //       name: res.displayName || res.email.split("@")[0],
  //       email: res.email,
  //     };

  //     login(res.token, user);

  //     toast({
  //       title: "Welcome",
  //       description: `Logged in as ${user.name}`,
  //     });

  //     router.push("/dashboard");
  //   } catch (e: any) {
  //     toast({
  //       title: "Login failed",
  //       description: e.message || "Invalid email or password",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await postJson<{
        token: string;
        displayName: string;
        email: string;
      }>("/auth/login", { email, password }, { withAuth: false });

      const user = {
        name: res.displayName || res.email.split("@")[0],
        email: res.email,
      };

      login(res.token, user);

      toast({
        title: "Welcome 👋",
        description: `Logged in as ${user.name}`,
        className:
          "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium border-none shadow-lg",
      });

      router.push("/dashboard");
    } catch (e: any) {
      toast({
        title: "Invalid credentials 😕",
        description: "Wrong email or password. Please try again.",
        duration: 4000,
        className:
          "bg-gradient-to-r from-red-500 to-red-600 text-white font-medium border-none shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border border-border">
      <CardHeader>
        <CardTitle className="text-center text-balance">
          Welcome to Travmate
        </CardTitle>
        <CardDescription className="text-center">
          Plan, track, and explore your trips with ease.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Traveler"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="login" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
