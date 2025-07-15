
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Camera, Upload, Shuffle, User, Sparkles, Heart, Star } from 'lucide-react';

const ProfileManager = () => {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('');

  // Avatar API options
  const avatarStyles = [
    { name: 'Adventurer', value: 'adventurer', icon: '🏃‍♂️' },
    { name: 'Avataaars', value: 'avataaars', icon: '😊' },
    { name: 'Big Ears', value: 'big-ears', icon: '👂' },
    { name: 'Big Smile', value: 'big-smile', icon: '😄' },
    { name: 'Bottts', value: 'bottts', icon: '🤖' },
    { name: 'Croodles', value: 'croodles', icon: '🎨' },
    { name: 'Fun Emoji', value: 'fun-emoji', icon: '🎭' },
    { name: 'Identicon', value: 'identicon', icon: '🔷' },
    { name: 'Initials', value: 'initials', icon: '📝' },
    { name: 'Lorelei', value: 'lorelei', icon: '👩' },
    { name: 'Micah', value: 'micah', icon: '👨' },
    { name: 'Miniavs', value: 'miniavs', icon: '🎪' },
    { name: 'Open Peeps', value: 'open-peeps', icon: '👥' },
    { name: 'Personas', value: 'personas', icon: '🎭' },
    { name: 'Pixel Art', value: 'pixel-art', icon: '🎮' },
    { name: 'Shapes', value: 'shapes', icon: '🔸' }
  ];

  // Predefined cool avatars
  const predefinedAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  ];

  // Load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setCurrentAvatar(profile.avatar || '');
      setUserName(profile.name || '');
    }
  }, []);

  // Save profile data
  const saveProfile = (avatar, name) => {
    const profile = { avatar, name };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentAvatar(avatar);
    setUserName(name);
  };

  // Generate avatar from API
  const generateApiAvatar = (style) => {
    const seed = userName || 'user' + Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=150`;
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatarUrl) => {
    saveProfile(avatarUrl, userName);
    setIsDialogOpen(false);
    toast({
      title: "Avatar Updated! ✨",
      description: "Your new avatar looks amazing!",
    });
  };

  // Handle custom image upload
  const handleCustomImage = () => {
    if (!customImageUrl.trim()) {
      toast({
        title: "Oops! 📸",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
      return;
    }
    
    handleAvatarSelect(customImageUrl);
    setCustomImageUrl('');
  };

  // Handle API avatar generation
  const handleApiAvatarSelect = (style) => {
    if (!userName.trim()) {
      toast({
        title: "Name Required! 📝",
        description: "Please enter your name to generate an avatar",
        variant: "destructive"
      });
      return;
    }
    
    const avatarUrl = generateApiAvatar(style);
    handleAvatarSelect(avatarUrl);
  };

  // Handle random avatar
  const handleRandomAvatar = () => {
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    const seed = 'random' + Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle.value}/svg?seed=${seed}&size=150`;
    handleAvatarSelect(avatarUrl);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Current Profile Display */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Avatar className="w-32 h-32 border-4 border-white/30 shadow-xl">
              <AvatarImage src={currentAvatar} alt="Profile Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                {userName ? userName.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
              </AvatarFallback>
            </Avatar>
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Camera className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              {userName || 'Your Name'}
            </h2>
            <p className="text-white/70">
              {currentAvatar ? 'Looking great! 🌟' : 'Ready to set up your avatar?'}
            </p>
          </div>

          <div className="flex gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Customize Avatar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-lg border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white text-center">
                    Choose Your Perfect Avatar ✨
                  </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="predefined" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10 rounded-xl">
                    <TabsTrigger value="predefined" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Gallery
                    </TabsTrigger>
                    <TabsTrigger value="api" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <Shuffle className="w-4 h-4 mr-2" />
                      Generate
                    </TabsTrigger>
                    <TabsTrigger value="custom" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Custom
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="name" className="text-white text-lg font-semibold">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg p-4 rounded-xl"
                      />
                      <Button 
                        onClick={() => saveProfile(currentAvatar, userName)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Predefined Avatars */}
                  <TabsContent value="predefined" className="space-y-6">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {predefinedAvatars.map((avatar, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => handleAvatarSelect(avatar)}
                        >
                          <Avatar className="w-20 h-20 border-2 border-white/30 hover:border-purple-400 transition-all duration-200 shadow-lg">
                            <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                            <AvatarFallback>A{index + 1}</AvatarFallback>
                          </Avatar>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* API Generated Avatars */}
                  <TabsContent value="api" className="space-y-6">
                    <div className="text-center space-y-4">
                      <Button 
                        onClick={handleRandomAvatar}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl"
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Random Avatar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {avatarStyles.map((style) => (
                        <motion.div
                          key={style.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/10 rounded-xl p-4 cursor-pointer border border-white/20 hover:border-purple-400 transition-all duration-200"
                          onClick={() => handleApiAvatarSelect(style.value)}
                        >
                          <div className="text-center space-y-2">
                            <div className="text-2xl">{style.icon}</div>
                            <div className="text-white text-sm font-medium">{style.name}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Custom Image Upload */}
                  <TabsContent value="custom" className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="customUrl" className="text-white text-lg font-semibold">
                        Custom Image URL
                      </Label>
                      <Input
                        id="customUrl"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://example.com/your-image.jpg"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg p-4 rounded-xl"
                      />
                      <Button 
                        onClick={handleCustomImage}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Use This Image
                      </Button>
                    </div>
                    
                    {customImageUrl && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="text-white/70 mb-4">Preview:</p>
                        <Avatar className="w-24 h-24 mx-auto border-2 border-white/30">
                          <AvatarImage src={customImageUrl} alt="Custom Avatar Preview" />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )}
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <Button 
              onClick={handleRandomAvatar}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Surprise Me!
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileManager;
