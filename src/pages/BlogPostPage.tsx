import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { getPostBySlug, getPosts, Post } from '../lib/supabase';
import TableOfContents from '../components/TableOfContents';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isTocCollapsed, setIsTocCollapsed] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await getPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Set SEO meta tags
          document.title = `${fetchedPost.title} - CocukGeliyor Blog`;
          
          // Create meta description from first 160 characters of content
          const cleanContent = fetchedPost.content
            .replace(/#{1,6}\s+/g, '') // Remove heading markers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
            .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
            .replace(/- /g, '') // Remove list markers
            .trim();
          
          const metaDescription = cleanContent.substring(0, 160).trim() + '...';
          
          const metaDescElement = document.querySelector('meta[name="description"]');
          if (metaDescElement) {
            metaDescElement.setAttribute('content', metaDescription);
          }
          
          // Add Open Graph tags for social sharing
          let ogTitleElement = document.querySelector('meta[property="og:title"]');
          if (!ogTitleElement) {
            ogTitleElement = document.createElement('meta');
            ogTitleElement.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitleElement);
          }
          ogTitleElement.setAttribute('content', fetchedPost.title);
          
          let ogDescElement = document.querySelector('meta[property="og:description"]');
          if (!ogDescElement) {
            ogDescElement = document.createElement('meta');
            ogDescElement.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescElement);
          }
          ogDescElement.setAttribute('content', metaDescription);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const posts = await getPosts();
        // Filter out current post and get latest 4
        const filtered = posts.filter(p => p.slug !== slug).slice(0, 4);
        setRecentPosts(filtered);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setRecentPosts([]);
      }
    };

    fetchPost();
    fetchRecentPosts();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.replace(/#{1,6}\s+/g, '').substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Makale linki panoya kopyalandı!');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Makale linki panoya kopyalandı!');
    }
  };

  const formatContent = (content: string) => {
    // Enhanced content formatting with heading support
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Match ## or ### headings with or without space after hashes
      const h2Match = trimmedLine.match(/^##\s*(.+)$/);
      const h3Match = trimmedLine.match(/^###\s*(.+)$/);
      
      if (h3Match) {
        // H3 heading (check h3 first since it has more hashes)
        const title = h3Match[1].trim();
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöçĞÜŞIÖÇ\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[ğĞ]/g, 'g')
          .replace(/[üÜ]/g, 'u')
          .replace(/[şŞ]/g, 's')
          .replace(/[ıI]/g, 'i')
          .replace(/[öÖ]/g, 'o')
          .replace(/[çÇ]/g, 'c');
        
        elements.push(
          <h3 
            key={index} 
            id={id}
            className="text-xl md:text-2xl font-bold text-gray-800 mt-8 mb-4 scroll-mt-24"
          >
            {title}
          </h3>
        );
      } else if (h2Match) {
        // H2 heading
        const title = h2Match[1].trim();
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöçĞÜŞIÖÇ\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[ğĞ]/g, 'g')
          .replace(/[üÜ]/g, 'u')
          .replace(/[şŞ]/g, 's')
          .replace(/[ıI]/g, 'i')
          .replace(/[öÖ]/g, 'o')
          .replace(/[çÇ]/g, 'c');
        
        elements.push(
          <h2 
            key={index} 
            id={id}
            className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0 scroll-mt-24"
          >
            {title}
          </h2>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        // Bold text
        const text = trimmedLine.substring(2, trimmedLine.length - 2);
        elements.push(
          <p key={index} className="mb-4 font-bold text-gray-900 leading-relaxed">
            {text}
          </p>
        );
      } else if (trimmedLine.startsWith('- ')) {
        // List item - collect consecutive list items
        const listItems = [trimmedLine.substring(2)];
        let nextIndex = index + 1;
        
        while (nextIndex < lines.length && lines[nextIndex].trim().startsWith('- ')) {
          listItems.push(lines[nextIndex].trim().substring(2));
          nextIndex++;
        }
        
        elements.push(
          <ul key={index} className="mb-6 space-y-2 ml-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <div className="w-2 h-2 bg-primary-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );
        
        // Skip the processed list items
        for (let i = index + 1; i < nextIndex; i++) {
          lines[i] = '';
        }
      } else if (trimmedLine.length > 0) {
        // Regular paragraph
        elements.push(
          <p key={index} className="mb-6 leading-relaxed text-gray-700">
            {trimmedLine}
          </p>
        );
      }
    });
    
    return elements;
  };

  const getExcerpt = (content: string, maxLength: number = 80) => {
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
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Makale yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-blue hover:text-primary-green transition-colors duration-300 font-medium"
          >
            <ArrowLeft size={20} />
            <span>Blog'a Dön</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-primary-blue hover:text-white text-gray-700 px-4 py-2 rounded-full transition-all duration-300"
                >
                  <Share2 size={16} />
                  <span>Paylaş</span>
                </button>
              </div>
              
              <div className="h-1 bg-gradient-to-r from-primary-yellow via-primary-green to-primary-blue rounded-full"></div>
            </header>

            {/* Collapsed Table of Contents */}
            <div className="mb-8">
              <button
                onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">İçindekiler</h3>
                {isTocCollapsed ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {!isTocCollapsed && (
                <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4">
                  <TableOfContents content={post.content} />
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed">
                {formatContent(post.content)}
              </div>
            </article>
          </div>

          {/* Recent Posts Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Son Yazılar</h3>
              
              {recentPosts.length === 0 ? (
                <p className="text-gray-500 text-sm">Henüz başka yazı bulunmuyor.</p>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <article key={recentPost.id} className="group">
                      <Link 
                        to={`/blog/${recentPost.slug}`}
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-blue mb-2 text-sm line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {getExcerpt(recentPost.content)}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1" />
                          <span>{formatDate(recentPost.created_at)}</span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link 
                  to="/blog"
                  className="block text-center bg-primary-blue hover:bg-primary-blue/90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200"
                >
                  Tüm Yazıları Gör
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-primary-yellow/10 to-primary-green/10 rounded-2xl p-8">
            <div className="text-center">
              <Heart className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bu makale faydalı oldu mu?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Çocuğunuzun gelişimi hakkında daha fazla bilgi almak ve uzman desteği için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#randevu"
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Randevu Al
                </Link>
                <Link 
                  to="/blog"
                  className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Diğer Makaleleri Gör
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostPage;