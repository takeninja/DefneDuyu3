import React, { useState } from 'react';
import { Image, Smile, MapPin, Users } from 'lucide-react';

interface PostCreatorProps {
  user: any;
  onPostCreated: (content: string, imageUrl?: string) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ user, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onPostCreated(content);
      setContent('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Deneyimlerinizi paylaşın..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                    >
                      <Image className="h-5 w-5" />
                      <span className="text-sm">Fotoğraf</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                    >
                      <Smile className="h-5 w-5" />
                      <span className="text-sm">Duygu</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm">Konum</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                    >
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Etiketle</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={!content.trim() || isSubmitting}
                      className="px-6 py-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      {isSubmitting ? 'Paylaşılıyor...' : 'Paylaş'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;