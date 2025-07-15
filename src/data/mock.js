
export const mockUsers = [
  { id: 'user-1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex', friends: 5 },
  { id: 'user-2', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=maria', friends: 12 },
  { id: 'user-3', name: 'Sam Chen', avatar: 'https://i.pravatar.cc/150?u=sam', friends: 1 },
  { id: 'user-4', name: 'Jessica Williams', avatar: 'https://i.pravatar.cc/150?u=jessica', friends: 0 },
  { id: 'user-5', name: 'Mike Brown', avatar: 'https://i.pravatar.cc/150?u=mike', friends: 2 },
];

export const mockPosts = [
  {
    id: 'post-1',
    userId: 'user-2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    content: 'Had an amazing time hiking this weekend! The views were absolutely breathtaking. 🌲🏔️ #nature #hiking',
    mediaUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&h=600&fit=crop',
    mediaType: 'image',
    likes: ['user-1', 'user-3', 'user-5'],
    comments: [
      { id: 'comment-1', userId: 'user-1', content: 'Wow, that looks incredible!', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { id: 'comment-2', userId: 'user-3', content: 'So jealous! Where is this?', timestamp: new Date(Date.now() - 3400000).toISOString() },
    ],
  },
  {
    id: 'post-2',
    userId: 'user-1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    content: 'Check out this short video I made of the city at night. The city lights are mesmerizing! 🌃✨',
    mediaUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    mediaType: 'video',
    likes: ['user-2', 'user-5'],
    comments: [
       { id: 'comment-3', userId: 'user-2', content: 'Awesome video!', timestamp: new Date(Date.now() - 86300000).toISOString() },
    ],
  },
  {
    id: 'post-3',
    userId: 'user-5',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    content: 'Just finished a great book. Highly recommend it to everyone! 📚 #reading',
    mediaUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&h=600&fit=crop',
    mediaType: 'image',
    likes: ['user-1', 'user-2', 'user-3'],
    comments: [],
  }
];
