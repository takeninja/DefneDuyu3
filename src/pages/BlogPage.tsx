import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { getPosts, Post } from '../lib/supabase';
import { useAccessibility } from '../contexts/AccessibilityContext';

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLargeText } = useAccessibility();

  useEffect(() => {
    // Set page title for SEO
    document.title = 'Blog - Defne Duyu | Çocuk Gelişimi Makaleleri';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Çocuk gelişimi, ebeveynlik ve terapi konularında uzman görüşleri ve pratik bilgiler. Ergoterapi, otizm desteği ve ebeveyn koçluğu hakkında güncel makaleler.'
      );
    }

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to load posts from database:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    // Remove markdown formatting for excerpt
    const cleanContent = content
      .replace(/#{1,6}\s+/g, '') // Remove heading markers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
      .replace(/- /g, '') // Remove list markers
      .trim();
    
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Blog</span> <span className="text-accent">& Makaleler</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Çocuk gelişimi, ebeveynlik ve terapi konularında uzman görüşleri ve pratik bilgiler
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Makalelerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchTerm ? 'Arama sonucu bulunamadı' : 'Yakında Sizlerle...'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Farklı anahtar kelimeler ile tekrar deneyin.'
                  : 'Yakında çocuk gelişimi konularında faydalı makaleler paylaşacağız. Her yazımızda ailelerin hayatına dokunacak bilgiler olacak.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Tüm Makaleleri Görüntüle
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                {searchTerm ? `"${searchTerm}" için ${filteredPosts.length} sonuç bulundu` : `${filteredPosts.length} makale`}
              </p>
            </div>

            {/* Posts Grid */}
            <div className={`grid gap-8 ${isLargeText ? 'md:grid-cols-1 lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${isLargeText ? 'p-2' : ''}`}
                >
                  <div className={`${isLargeText ? 'p-6' : 'p-8'}`}>
                    <h2 className={`${isLargeText ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary-blue transition-colors duration-300`}>
                      <Link to={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className={`text-gray-600 mb-6 line-clamp-3 leading-relaxed ${isLargeText ? 'text-sm' : ''}`}>
                      {getExcerpt(post.content)}
                    </p>
                    
                    <div className={`flex items-center justify-between ${isLargeText ? 'text-xs' : 'text-sm'} text-gray-500 mb-6`}>
                      <div className="flex items-center space-x-2">
                        <User size={isLargeText ? 14 : 16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={isLargeText ? 14 : 16} />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.slug}`}
                      className={`flex items-center space-x-2 text-primary-blue hover:text-primary-green font-semibold transition-colors duration-300 group ${isLargeText ? 'text-sm' : ''}`}
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight size={isLargeText ? 14 : 16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-yellow/10 to-primary-green/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Çocuğunuzun Gelişimi İçin Destek Alın
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Uzman ekibimizle tanışmak ve çocuğunuz için en uygun destek programını belirlemek için randevu alın.
            </p>
            <Link 
              to="/#randevu"
              className="inline-block bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;