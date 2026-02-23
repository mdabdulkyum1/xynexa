"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Camera, Mail, User, ShieldCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { uploadImage } from "@/lib/utils";
import useUserStore from "@/store/useUserStore";
import useAxiosSecure from "@/hooks/AxiosSecure/useAxiosSecure";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const { user: storeUser, fetchUserByEmail, updateUser } = useUserStore();
  const axiosSecure = useAxiosSecure();
  
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const userEmail = session?.user?.email;

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (userEmail) {
      console.log("SettingsPage: Fetching user for", userEmail);
      fetchUserByEmail(userEmail);
    }
  }, [userEmail, fetchUserByEmail]);

  useEffect(() => {
    if (storeUser) {
      console.log("SettingsPage: storeUser keys:", Object.keys(storeUser));
      console.log("SettingsPage: storeUser data:", JSON.stringify(storeUser, null, 2));
      setValue("firstName", storeUser.firstName || "");
      setValue("lastName", storeUser.lastName || "");
    }
  }, [storeUser, setValue]);

  const onUpdateProfile = async (data) => {
    const userId = storeUser.id || storeUser._id;
    if (!userId) {
      toast.error("User ID not found. Please refresh.");
      return;
    }
    try {
      const updatedUser = await updateUser(userId, data);
      toast.success("Profile updated successfully");
      await updateSession({ ...session, user: { ...session.user, name: `${data.firstName} ${data.lastName}` } });
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userId = storeUser.id || storeUser._id;
    if (!userId) {
      toast.error("User ID not found. Please refresh.");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      await updateUser(userId, { imageUrl });
      toast.success("Profile picture updated");
      await updateSession({ ...session, user: { ...session.user, image: imageUrl } });
      await fetchUserByEmail(userEmail);
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendOTP = async () => {
    setIsVerifying(true);
    try {
      await axiosSecure.post("/auth/send-verification-otp", { email: userEmail });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!otp) return toast.error("Please enter OTP");
    setIsVerifying(true);
    try {
      const res = await axiosSecure.post("/auth/verify-email", { email: userEmail, otp });
      if (res.data.success) {
        toast.success("Email verified successfully");
        setOtpSent(false);
        setOtp("");
        await fetchUserByEmail(userEmail);
      } else {
        toast.error(res.data.message || "Verification failed");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!storeUser) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and profile preferences.
        </p>
      </div>
      <Separator className="bg-primary/10" />

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 pt-0">
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl border-2 border-primary/20">
                  <AvatarImage src={storeUser.imageUrl || storeUser.image} />
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {storeUser.firstName?.[0]}{storeUser.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Camera className="h-5 w-5" />
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </Label>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{storeUser.firstName} {storeUser.lastName}</p>
                <p className="text-xs text-muted-foreground">{storeUser.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-secondary">
                <span className="text-sm font-medium">Verification</span>
                {storeUser.isEmailVerified ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">
                    <XCircle className="h-3.5 w-3.5" />
                    Unverified
                  </div>
                )}
              </div>
              {!storeUser.isEmailVerified && !otpSent && (
                <Button 
                  variant="outline" 
                  className="w-full h-11 font-semibold border-primary/20 hover:bg-primary/5" 
                  onClick={handleSendOTP}
                  disabled={isVerifying}
                >
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify Now
                </Button>
              )}
              {otpSent && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <Label htmlFor="otp">Enter Verification Code</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="h-11 tracking-[0.5em] text-center font-bold"
                      maxLength={6}
                    />
                  </div>
                  <Button 
                    className="w-full h-11 font-bold" 
                    onClick={handleVerifyEmail}
                    disabled={isVerifying}
                  >
                    {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Verification
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your name and personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name</Label>
                    <Input 
                      id="firstName" 
                      {...register("firstName")} 
                      className="h-11 focus-visible:ring-primary/30"
                      placeholder="Jhon" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold">Last Name</Label>
                    <Input 
                      id="lastName" 
                      {...register("lastName")} 
                      className="h-11 focus-visible:ring-primary/30"
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-muted-foreground">Email Address (Cannot be changed)</Label>
                  <Input 
                    id="email" 
                    value={storeUser.email} 
                    disabled 
                    className="h-11 bg-muted/30 cursor-not-allowed opacity-70"
                  />
                </div>
                <Button type="submit" className="h-11 px-8 font-bold text-base shadow-lg shadow-primary/20">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
             <div className="h-2 bg-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-primary/10 hover:border-primary/30 transition-colors cursor-pointer bg-primary/5">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="ghost" size="sm" className="font-bold text-primary">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-primary/10 hover:border-primary/30 transition-colors cursor-pointer bg-primary/5">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Password Reset</p>
                  <p className="text-xs text-muted-foreground">Regularly update your password for better security.</p>
                </div>
                <Button variant="ghost" size="sm" className="font-bold text-primary">Change</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
