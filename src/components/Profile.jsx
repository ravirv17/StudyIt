import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Shuffle, Check, Bot } from 'lucide-react';

const avatarApis = [
  { name: 'Adorable Avatars', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=' },
  { name: 'Pixel Art', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=' },
  { name: 'Miniavs', url: 'https://api.dicebear.com/7.x/miniavs/svg?seed=' },
];

const Profile = () => {
  const [username, setUsername] = useState('User');
  const [avatarSrc, setAvatarSrc] = useState('https://api.dicebear.com/7.x/adventurer/svg?seed=user');
  const { toast } = useToast();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedAvatar = localStorage.getItem('avatarSrc');
    if (savedUsername) setUsername(savedUsername);
    if (savedAvatar) setAvatarSrc(savedAvatar);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
        toast({ title: 'Avatar Updated!', description: 'Your new custom avatar is set.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomAvatar = () => {
    const randomApi = avatarApis[Math.floor(Math.random() * avatarApis.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatarUrl = `${randomApi.url}${randomSeed}`;
    setAvatarSrc(newAvatarUrl);
    toast({ title: 'Avatar Randomized!', description: `Generated a new avatar using ${randomApi.name}.` });
  };
  
  const generateApiAvatar = (apiUrl) => {
    const seed = username || 'user';
    const newAvatarUrl = `${apiUrl}${seed}`;
    setAvatarSrc(newAvatarUrl);
    toast({ title: 'Avatar Generated!', description: `Created a new avatar for ${username}.` });
  }

  const saveProfile = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('avatarSrc', avatarSrc);
    toast({ title: 'Profile Saved! ✅', description: 'Your changes have been saved successfully.' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Profile - ConnectSphere</title>
        <meta name="description" content="Customize your profile, change your avatar, and update your username." />
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Your Profile</CardTitle>
              <CardDescription className="text-slate-400">Customize your public appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <Avatar className="w-32 h-32 border-4 border-purple-500">
                    <AvatarImage src={avatarSrc} alt={username} />
                    <AvatarFallback className="text-4xl bg-slate-700">{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button asChild size="icon" className="absolute bottom-0 right-0 rounded-full bg-pink-500 hover:bg-pink-600">
                    <label htmlFor="avatar-upload" className="cursor-pointer"><Upload className="w-5 h-5" /></label>
                  </Button>
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </motion.div>
                <div className="flex-1 w-full space-y-4">
                    <h3 className="text-lg font-semibold">Choose Your Look</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {avatarApis.map(api => (
                            <Button key={api.name} variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600" onClick={() => generateApiAvatar(api.url)}>
                                <Bot className="w-4 h-4 mr-2"/> {api.name}
                            </Button>
                        ))}
                         <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600" onClick={generateRandomAvatar}>
                            <Shuffle className="w-4 h-4 mr-2"/> Random
                        </Button>
                    </div>
                    <div>
                        <label htmlFor="username" className="text-lg font-semibold">Display Name</label>
                        <Input id="username" type="text" value={username} onChange={handleUsernameChange} className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-lg" />
                    </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={saveProfile} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg px-8 py-6">
                  <Check className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;