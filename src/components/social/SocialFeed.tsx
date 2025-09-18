import React, { useState, useEffect } from 'react';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import { getSocialPosts, createSocialPost, SocialPost } from '../../lib/socialSupabase';

interface SocialFeedProps {
  user: any;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getSocialPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (content: string, imageUrl?: string) => {
    try {
      const success = await createSocialPost({
        content,
        image_url: imageUrl,
        author_email: user.email,
        author_name: user.email?.split('@')[0] || 'Kullanıcı'
      });

      if (success) {
        // Refresh posts
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Post Creator */}
      <PostCreator user={user} onPostCreated={handleNewPost} />

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz Paylaşım Yok
          </h3>
          <p className="text-gray-600 mb-6">
            İlk paylaşımı yapan siz olun! Deneyimlerinizi diğer ebeveynlerle paylaşın.
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={user} />
        ))
      )}
    </div>
  );
};

export default SocialFeed;