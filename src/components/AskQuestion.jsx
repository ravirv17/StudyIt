import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Video, Mail, Key, UploadCloud, Film, X, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AskQuestion = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const isUploadAllowed = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 14 && currentHour < 19;
  };

  useEffect(() => {
    if (!isUploadAllowed()) {
      toast({
        title: "Upload Window Closed ⏰",
        description: "Video uploads are only allowed between 2 PM and 7 PM.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setError('');

    // --- MOCK OTP SENT ---
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: "OTP Sent! 📧",
        description: `An OTP has been sent to ${email}. (Hint: use 123456). To enable real emails, connect a backend.`,
      });
    }, 1500);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (otp === '123456') {
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
        toast({
          title: "Authenticated! ✅",
          description: "You're verified. You can now upload your video.",
        });
      }, 1000);
    } else {
      setIsLoading(false);
      setError('Invalid OTP. Please try again.');
      toast({
        title: "Authentication Failed",
        description: "The OTP you entered is incorrect.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 50MB. Please choose a smaller video.');
      toast({ title: "File Too Large!", description: 'Maximum size is 50MB.', variant: "destructive" });
      setVideoFile(null);
      setVideoPreview(null);
      return;
    }

    setVideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };
  
  const handleVideoMetadata = (e) => {
      const duration = e.currentTarget.duration;
      if (duration > 120) {
        setError('Video duration exceeds 2 minutes. Please upload a shorter video.');
        toast({ title: "Video Too Long!", description: 'Maximum duration is 2 minutes.', variant: "destructive" });
        setVideoFile(null);
        setVideoPreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        return;
      }
  }

  const handleUpload = () => {
    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    if (!isUploadAllowed()) {
      setError('Sorry, video uploads are only allowed between 2 PM and 7 PM.');
      toast({ title: "Upload Window Closed ⏰", description: 'Please try again between 2 PM and 7 PM.', variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Upload Successful! 🚀",
        description: "Your question has been submitted.",
      });
      setVideoFile(null);
      setVideoPreview(null);
      setStep(1);
      setEmail('');
      setOtp('');
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" /> Step 1: Verify Your Email
              </CardTitle>
              <CardDescription>We'll send a one-time password to your email.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
                 <div className="text-center text-xs text-slate-400 pt-2">
                    To send real emails, <Link to="/connect-backend" className="underline text-yellow-400 hover:text-yellow-300">connect to a backend.</Link>
                </div>
              </form>
            </CardContent>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Key className="w-6 h-6" /> Step 2: Enter OTP
              </CardTitle>
              <CardDescription>Enter the 6-digit code sent to {email}.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <Input id="otp" type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify & Proceed'}
                </Button>
                <Button variant="link" onClick={() => setStep(1)} className="w-full text-slate-400">Back to email</Button>
              </form>
            </CardContent>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Video className="w-6 h-6" /> Step 3: Upload Your Question
              </CardTitle>
              <CardDescription>Select a video file (max 2 mins, 50MB).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="relative border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-slate-800/50 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <UploadCloud className="w-12 h-12 text-purple-400" />
                  <span className="font-semibold">Click to upload or drag and drop</span>
                  <span>MP4, MOV, WebM (Max 50MB)</span>
                </div>
              </div>

              {videoPreview && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  <h3 className="font-semibold text-white">Video Preview:</h3>
                  <div className="relative">
                    <video src={videoPreview} controls className="w-full rounded-lg" onLoadedMetadata={handleVideoMetadata}></video>
                    <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 rounded-full h-8 w-8" onClick={() => { setVideoFile(null); setVideoPreview(null); setError(''); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {videoFile && <p className="text-sm text-slate-400 flex items-center gap-2"><Film className="h-4 w-4"/> {videoFile.name}</p>}
                </motion.div>
              )}

              {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/50 text-red-300"><AlertTriangle className="h-5 w-5" /> <p className="text-sm">{error}</p></div>}
              {!error && videoFile && <div className="flex items-center gap-2 p-3 rounded-lg bg-green-900/50 text-green-300"><CheckCircle className="h-5 w-5" /> <p className="text-sm">Video checks passed. Ready to upload!</p></div>}

              <Button onClick={handleUpload} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg py-6" disabled={isLoading || !videoFile || !!error || !isUploadAllowed()}>
                {isLoading ? 'Uploading...' : 'Submit Question'}
              </Button>
            </CardContent>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Ask a Question - ConnectSphere</title>
        <meta name="description" content="Submit a question by uploading a short video after verifying your email." />
      </Helmet>
       <div className="max-w-md mx-auto">
         <Card className="w-full bg-slate-800/50 backdrop-blur-lg border-slate-700 text-white shadow-2xl">
           <AnimatePresence mode="wait">
             {renderStep()}
           </AnimatePresence>
         </Card>
       </div>
    </>
  );
};

export default AskQuestion;