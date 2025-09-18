import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { SocialPost } from '../../lib/socialSupabase';

interface PostCardProps {
  post: SocialPost;
  currentUser: any;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} gün önce`;
    
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement like functionality with database
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // TODO: Implement comment functionality with database
    console.log('Comment:', comment);
    setComment('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {post.author_name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{post.author_name}</h4>
              <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        
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
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes_count || 0}</span>
            </span>
            <span>{post.comments_count || 0} yorum</span>
          </div>
          <span>{post.shares_count || 0} paylaşım</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              liked 
                ? 'text-primary bg-primary/10' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">Beğen</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Yorum</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
            <Share className="h-5 w-5" />
            <span className="font-medium">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Comment Form */}
          <div className="p-4">
            <form onSubmit={handleComment} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Yorum yazın..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="px-4 pb-4">
            <div className="text-center text-gray-500 text-sm py-4">
              Henüz yorum yapılmamış. İlk yorumu siz yapın!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;