import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers, mockPosts } from '@/data/mock';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const PublicSpace = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('publicSpacePosts')) || mockPosts;
    setPosts(savedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

    const savedUser = JSON.parse(localStorage.getItem('publicSpaceCurrentUser'));
    if (savedUser) {
      setCurrentUser(savedUser);
    } else {
      const defaultUser = mockUsers[0];
      setCurrentUser(defaultUser);
      localStorage.setItem('publicSpaceCurrentUser', JSON.stringify(defaultUser));
    }
  }, []);

  const handlePostCreated = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('publicSpacePosts', JSON.stringify(updatedPosts));
    toast({ title: 'Post Published! 🚀', description: 'Your post is now live for everyone to see.' });
  };

  const handleLikeToggle = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const liked = post.likes.includes(currentUser.id);
        const newLikes = liked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('publicSpacePosts', JSON.stringify(updatedPosts));
  };

  const handleCommentAdded = (postId, comment) => {
     const updatedPosts = posts.map(post => {
        if (post.id === postId) {
            return { ...post, comments: [...post.comments, comment] };
        }
        return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('publicSpacePosts', JSON.stringify(updatedPosts));
    toast({ title: 'Comment Added! 💬', description: 'Your comment has been posted.' });
  };
  
  const handleUserChange = (userId) => {
    const selectedUser = mockUsers.find(u => u.id === userId);
    setCurrentUser(selectedUser);
    localStorage.setItem('publicSpaceCurrentUser', JSON.stringify(selectedUser));
    toast({ title: `Switched User! 👋`, description: `You are now browsing as ${selectedUser.name}.` });
  };

  return (
    <>
      <Helmet>
        <title>Public Space - ConnectSphere</title>
        <meta name="description" content="A place to connect with others, share your moments, and engage with the community." />
      </Helmet>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-slate-700">
           <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Public Space</h1>
           {currentUser && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300">Viewing as:</span>
              <Select onValueChange={handleUserChange} defaultValue={currentUser.id}>
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-600">
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-600">
                  {mockUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <Link to="/profile"><AvatarImage src={user.avatar} /></Link>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {currentUser && (
          <CreatePost
            currentUser={currentUser}
            onPostCreated={handlePostCreated}
          />
        )}

        <div className="space-y-8">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PostCard
                  post={post}
                  currentUser={currentUser}
                  onLikeToggle={handleLikeToggle}
                  onCommentAdded={handleCommentAdded}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default PublicSpace;