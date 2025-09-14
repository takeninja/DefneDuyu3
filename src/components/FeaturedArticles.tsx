import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { getPosts, Post } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useAccessibility } from '../contexts/AccessibilityContext';

const FeaturedArticles = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { isLargeText } = useAccessibility();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        
        // Show the first 4 posts as featured
        // In a real implementation, you'd have a featured flag in the database
        setFeaturedPosts(fetchedPosts.slice(0, 4));
      } catch (error) {
        console.warn('Failed to load posts from database');
        setPosts([]);
        setFeaturedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Makaleler yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6">
            <span className="text-primary">Sizin İçin Hazırladığımız</span>
            <br />
            <span className="text-accent">Faydalı Makaleler</span>
          </h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Çocuk gelişimi, terapi ve ebeveynlik konularında özenle seçilmiş, 
            size rehberlik edecek değerli içeriklerimiz.
          </p>
        </div>

        {featuredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-accent/10 to-secondary/20 rounded-3xl p-12 shadow-sm">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-text mb-4">
                Özenle Seçilmiş İçerikler Geliyor
              </h3>
              <p className="text-text/70 mb-6 max-w-2xl mx-auto leading-relaxed">
                Burada seçtiğimiz en faydalı makaleleri bulabilirsiniz. 
                Yakında yeni içeriklerimizle geleceğiz. Çocuk gelişimi, terapi teknikleri 
                ve ebeveynlik konularında size rehberlik edecek değerli bilgiler paylaşacağız.
              </p>
              <Link 
                to="/blog"
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Blog Sayfasını Ziyaret Edin
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${isLargeText ? 'md:grid-cols-1 lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
              {featuredPosts.map((post) => (
                <article 
                  key={post.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 ${isLargeText ? 'p-2' : ''}`}
                >
                  {/* Featured Badge */}
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Öne Çıkan
                      </span>
                    </div>
                    {/* Placeholder for thumbnail - in a real implementation, you'd have image URLs */}
                    <div className={`${isLargeText ? 'h-32' : 'h-40'} bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center`}>
                      <BookOpen size={40} className="text-primary/30" />
                    </div>
                  </div>
                  
                  <div className={`${isLargeText ? 'p-4' : 'p-5'}`}>
                    <h3 className={`${isLargeText ? 'text-base' : 'text-lg'} font-bold text-text mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300`}>
                      <Link to={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className={`text-text/70 mb-4 line-clamp-2 leading-relaxed ${isLargeText ? 'text-xs' : 'text-sm'}`}>
                      {getExcerpt(post.content)}
                    </p>
                    
                    <div className={`flex items-center justify-between ${isLargeText ? 'text-xs' : 'text-sm'} text-text/60 mb-4`}>
                      <div className="flex items-center space-x-2">
                        <User size={isLargeText ? 10 : 12} />
                        <span className={isLargeText ? 'text-xs' : 'text-xs'}>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={isLargeText ? 10 : 12} />
                        <span className={isLargeText ? 'text-xs' : 'text-xs'}>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.slug}`}
                      className={`flex items-center space-x-2 text-primary hover:text-accent font-medium transition-colors duration-300 group ${isLargeText ? 'text-xs' : 'text-sm'}`}
                    >
                      <span>Makaleyi Oku</span>
                      <ArrowRight size={isLargeText ? 12 : 14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Articles Button */}
            <div className="text-center mt-12">
              <Link 
                to="/blog"
                className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Tüm Makaleleri Görüntüle
              </Link>
            </div>
          </>
        )}

        {/* Admin Panel Placeholder */}
        {isAuthenticated && (
          <div className="mt-16 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-text mb-2">
                Yönetici Paneli
              </h4>
              <p className="text-text/70 text-sm mb-4">
                Öne çıkan makaleleri seçmek için gelişmiş yönetim paneli yakında eklenecek.
              </p>
              <div className="text-xs text-text/60">
                Şu anda en son 4 makale otomatik olarak gösteriliyor.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;