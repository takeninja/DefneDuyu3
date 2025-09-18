import React, { useState, useEffect } from 'react';
import { Bookmark, Calendar, User, Trash2 } from 'lucide-react';
import { getSavedPosts, unsavePost, SavedPost } from '../lib/socialSupabase';
import SocialSidebar from '../components/social/SocialSidebar';
import SocialHeader from '../components/social/SocialHeader';
import { useAuth } from '../hooks/useAuth';

const SavedPostsPage = () => {
  const { user } = useAuth();
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    setLoading(true);
    try {
      const data = await getSavedPosts();
      setSavedPosts(data);
    } catch (error) {
      console.error('Error fetching saved posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsavePost = async (postId: string) => {
    const success = await unsavePost(postId);
    if (success) {
      setSavedPosts(prev => prev.filter(saved => saved.post_id !== postId));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SocialHeader user={user} />
      <div className="flex max-w-7xl mx-auto">
        <SocialSidebar user={user} onChatClick={() => {}} />
        <div className="flex-1 px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bookmark className="h-6 w-6 mr-2 text-primary" />
            Kaydedilen Gönderiler
          </h1>
          <p className="text-gray-600 mt-2">
            Kaydettiğiniz gönderileri burada bulabilirsiniz.
          </p>
        </div>

        {/* Saved Posts */}
        {savedPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz kaydedilen gönderi yok
            </h3>
            <p className="text-gray-600">
              Beğendiğiniz gönderileri kaydetmek için gönderi üzerindeki kaydet butonunu kullanın.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedPosts.map((savedPost) => {
              const post = savedPost.social_posts;
              if (!post) return null;

              return (
                <div key={savedPost.id} className="bg-white rounded-xl shadow-sm">
                  {/* Post Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {post.author_name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author_name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Bookmark className="h-4 w-4" />
                              <span>Kaydedildi: {formatDate(savedPost.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnsavePost(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Kaydetmekten çıkar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {getExcerpt(post.content)}
                    </p>
                    
                    {post.image_url && (
                      <div className="mt-4">
                        <img
                          src={post.image_url}
                          alt="Post image"
                          className="w-full rounded-lg object-cover max-h-96"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Stats */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>{post.likes_count || 0} beğeni</span>
                        <span>{post.comments_count || 0} yorum</span>
                        <span>{post.shares_count || 0} paylaşım</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default SavedPostsPage;