import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  } | null;
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

export interface PostsPage {
  posts: Post[];
  nextCursor?: string;
  hasMore: boolean;
}

// Mock data for development with more posts for virtual scrolling testing
const generateMockPosts = (page: number, pageSize: number): PostsPage => {
  const posts: Post[] = [];
  const startIndex = page * pageSize;
  
  for (let i = 0; i < pageSize; i++) {
    const postIndex = startIndex + i;
    const profiles = [
      {
        full_name: 'Sarah Johnson',
        avatar_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      {
        full_name: 'Mike Chen',
        avatar_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      {
        full_name: 'Emma Wilson',
        avatar_url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      {
        full_name: 'David Kim',
        avatar_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      {
        full_name: 'Lisa Wang',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face'
      }
    ];

    const images = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
    ];

    const contents = [
      'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
      'Beautiful sunset from my evening walk. Sometimes you need to step away from the screen and enjoy nature! 🌅',
      'Excited to share my latest project! Working on a social media platform with some amazing features. Can\'t wait to show you all what we\'ve been building! 💻✨',
      'Had an incredible day at the tech conference! So many inspiring talks and amazing people. The future of technology looks bright! 🌟',
      'Weekend coding session complete! There\'s something magical about solving complex problems with elegant code. #CodeLife #Programming',
      'Just discovered this amazing new library that makes development so much easier. Love how the tech community constantly innovates! 🔧',
      'Reflecting on the journey so far. Every challenge has been a learning opportunity. Grateful for this amazing community! 🙏',
      'Late night debugging session turned into a breakthrough moment. Sometimes the best solutions come when you least expect them! 💡'
    ];

    const profile = profiles[postIndex % profiles.length];
    const content = contents[postIndex % contents.length];
    const hasImage = Math.random() > 0.4; // 60% chance of having an image
    const image = hasImage ? images[postIndex % images.length] : undefined;

    posts.push({
      id: `post_${postIndex}`,
      user_id: `user_${postIndex % 5}`,
      content: `${content} (Post #${postIndex + 1})`,
      image_url: image,
      created_at: new Date(Date.now() - (postIndex * 60 * 60 * 1000)).toISOString(),
      updated_at: new Date(Date.now() - (postIndex * 60 * 60 * 1000)).toISOString(),
      profiles: profile,
      likes_count: Math.floor(Math.random() * 200) + 10,
      comments_count: Math.floor(Math.random() * 50) + 2,
      user_has_liked: Math.random() > 0.7
    });
  }

  return {
    posts,
    nextCursor: page < 49 ? `page_${page + 1}` : undefined, // Generate 50 pages (1000 posts total)
    hasMore: page < 49
  };
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching mock posts...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = generateMockPosts(0, 20);
      return mockData.posts;
    },
    staleTime: 30000,
    retry: 1,
  });
};

export const useInfinitePosts = (pageSize: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`Fetching posts page ${pageParam}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return generateMockPosts(pageParam, pageSize);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 30000,
    retry: 1,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, imageUrl }: { content: string; imageUrl?: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: Post = {
        id: `post_${Date.now()}`,
        user_id: 'current_user',
        content: content.trim(),
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profiles: {
          full_name: 'John Doe',
          avatar_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
        },
        likes_count: 0,
        comments_count: 0,
        user_has_liked: false
      };

      return newPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
      toast.success('Post created successfully! (Mock mode)');
    },
    onError: (error) => {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Mock ${isLiked ? 'unlike' : 'like'} for post ${postId}`);
      return { postId, isLiked: !isLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
    },
    onError: (error) => {
      console.error('Error updating like:', error);
      toast.error('Failed to update like. Please try again.');
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Mock delete for post ${postId}`);
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
      toast.success('Post deleted successfully! (Mock mode)');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  });
};