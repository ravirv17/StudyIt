
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ImagePlus, Video, Send, AlertTriangle, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CreatePost = ({ currentUser, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [postLimit, setPostLimit] = useState(0);
  const [postsToday, setPostsToday] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const friends = currentUser.friends;
    if (friends === 0) setPostLimit(0);
    else if (friends === 1) setPostLimit(1);
    else if (friends >= 2 && friends <= 9) setPostLimit(2);
    else if (friends >= 10) setPostLimit(Infinity);

    const userPosts = JSON.parse(localStorage.getItem('publicSpacePosts')) || [];
    const today = new Date().toISOString().slice(0, 10);
    const count = userPosts.filter(
      (p) => p.userId === currentUser.id && p.timestamp.startsWith(today)
    ).length;
    setPostsToday(count);
  }, [currentUser]);

  const handlePost = () => {
    if (!content.trim()) {
      toast({ title: 'Empty Post', description: 'Please write something to post.', variant: 'destructive' });
      return;
    }
    
    if (postsToday >= postLimit) {
        toast({ title: 'Post Limit Reached', description: 'You have reached your daily posting limit.', variant: 'destructive' });
        return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      content: content.trim(),
      mediaUrl: media,
      mediaType: mediaType,
      likes: [],
      comments: [],
    };
    onPostCreated(newPost);
    setContent('');
    setMedia(null);
    setMediaType('');
    setPostsToday(postsToday + 1);
  };
  
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result);
        setMediaType(type);
      };
      reader.readAsDataURL(file);
    }
  };

  const remainingPosts = postLimit === Infinity ? 'Unlimited' : postLimit - postsToday;

  if (currentUser.friends === 0) {
    return (
        <Card className="bg-slate-800/70 border-slate-700">
            <CardContent className="p-6 flex items-center justify-center gap-4 text-slate-400">
                <Lock className="w-8 h-8 text-yellow-500" />
                <p className="font-semibold text-center">You need at least 1 friend to post in the Public Space. Go make some connections!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-slate-800/70 border-slate-700">
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.name}?`}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500"
          />
        </div>
        
        {media && (
            <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} className="relative">
                {mediaType === 'image' 
                    ? <img  src={media} alt="Preview" class="rounded-lg max-h-80 w-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" /> 
                    : <video src={media} controls className="rounded-lg max-h-80 w-full"></video>
                }
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => {setMedia(null); setMediaType('')}}>X</Button>
            </motion.div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
            <Button variant="ghost" size="sm" onClick={() => document.getElementById('imageUpload').click()}><ImagePlus className="w-5 h-5 mr-2 text-green-400"/>Image</Button>
            
            <input type="file" id="videoUpload" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, 'video')} />
            <Button variant="ghost" size="sm" onClick={() => document.getElementById('videoUpload').click()}><Video className="w-5 h-5 mr-2 text-blue-400"/>Video</Button>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-400">Posts left today: {remainingPosts}</span>
             <Button onClick={handlePost} disabled={postsToday >= postLimit || !content.trim()} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
               <Send className="w-4 h-4 mr-2"/>
               Post
             </Button>
          </div>
        </div>
        {postsToday >= postLimit && (
             <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-yellow-900/50 text-yellow-300">
                <AlertTriangle className="h-5 w-5" /> You have reached your daily posting limit.
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatePost;
