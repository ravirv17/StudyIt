
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { mockUsers } from '@/data/mock';
import { useToast } from '@/components/ui/use-toast';

const PostCard = ({ post, currentUser, onLikeToggle, onCommentAdded }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();

  const user = mockUsers.find((u) => u.id === post.userId);
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`);
    toast({ title: 'Link Copied! 🔗', description: 'Post link copied to your clipboard.' });
  };
  
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
        id: `comment-${Date.now()}`,
        userId: currentUser.id,
        content: commentText.trim(),
        timestamp: new Date().toISOString()
    };
    onCommentAdded(post.id, newComment);
    setCommentText('');
  }

  return (
    <Card className="bg-slate-800/70 border-slate-700 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-white">{user.name}</p>
          <p className="text-sm text-slate-400">{timeAgo(post.timestamp)}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      {post.mediaUrl && (
        <div className="px-4 pb-4">
          {post.mediaType === 'image' ? (
            <img src={post.mediaUrl} alt="Post media" className="rounded-lg w-full object-cover max-h-[500px]" />
          ) : (
            <video src={post.mediaUrl} controls className="rounded-lg w-full" />
          )}
        </div>
      )}
      <CardFooter className="flex justify-between items-center p-2 px-4 border-t border-slate-700">
        <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onLikeToggle(post.id)} className="flex items-center gap-2 hover:bg-slate-700">
                <motion.div whileTap={{ scale: 1.2 }}>
                   <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
                </motion.div>
                <span className="text-slate-300">{post.likes.length}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 hover:bg-slate-700">
                <MessageCircle className="w-5 h-5 text-slate-400"/>
                <span className="text-slate-300">{post.comments.length}</span>
            </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-2 hover:bg-slate-700">
            <Share2 className="w-5 h-5 text-slate-400"/>
        </Button>
      </CardFooter>

      <AnimatePresence>
        {showComments && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-800 px-4 py-2"
            >
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {post.comments.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp)).map(comment => {
                        const commentUser = mockUsers.find(u => u.id === comment.userId);
                        return (
                            <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={commentUser.avatar} />
                                    <AvatarFallback>{commentUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-slate-700 rounded-lg p-2 flex-1">
                                    <span className="font-semibold text-sm text-white">{commentUser.name}</span>
                                    <p className="text-sm text-slate-300">{comment.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-2 items-center mt-4">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Input 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 bg-slate-700 border-slate-600 focus-visible:ring-purple-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button size="icon" onClick={handleAddComment} className="bg-purple-600 hover:bg-purple-700">
                        <Send className="w-4 h-4"/>
                    </Button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PostCard;
