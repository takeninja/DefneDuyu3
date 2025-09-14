import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getPosts, Post } from '../lib/supabase';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.warn('Failed to load posts from database, using fallback content');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const blogPosts = [
    {
      title: 'Çocuklarda Motor Beceri Gelişimi: Yaşa Göre Beklentiler',
      excerpt: 'Motor becerilerin yaş gruplarına göre nasıl geliştiğini ve bu süreçte ailelerin nasıl destek olabileceğini inceleyen kapsamlı rehber.',
      author: 'Dr. Ayşe Kaya',
      date: '15 Aralık 2024',
      image: 'https://images.pexels.com/photos/1094072/pexels-photo-1094072.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      category: 'Gelişim'
    },
    {
      title: 'Otizmli Çocukların Sosyal Becerilerini Destekleme Yolları',
      excerpt: 'Otizm spektrum bozukluğu olan çocukların sosyal becerilerini geliştirmek için ebeveynlerin uygulayabileceği pratik stratejiler.',
      author: 'Uzm. Mehmet Demir',
      date: '12 Aralık 2024',
      image: 'https://images.pexels.com/photos/8617606/pexels-photo-8617606.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      category: 'Otizm'
    },
    {
      title: 'Evde Ergoterapi: Günlük Aktivitelerle Beceri Geliştirme',
      excerpt: 'Evde kolayca uygulanabilecek ergoterapi tekniklerini ve çocuğunuzun gelişimini destekleyecek aktivite önerilerini keşfedin.',
      author: 'Erg. Fatma Şen',
      date: '10 Aralık 2024',
      image: 'https://images.pexels.com/photos/8542052/pexels-photo-8542052.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      category: 'Ergoterapi'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary-green">Blog</span> <span className="text-primary-blue">& Makaleler</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Çocuk gelişimi, ebeveynlik ve terapi konularında uzman görüşleri ve pratik bilgiler.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-blue transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="flex items-center space-x-2 text-primary-blue hover:text-primary-green font-semibold transition-colors duration-300 group"
                >
                  <span>Devamını Oku</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-block bg-primary-green hover:bg-primary-green/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;