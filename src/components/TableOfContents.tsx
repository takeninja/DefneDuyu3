import React, { useState, useEffect } from 'react';
import { List, ChevronRight, ChevronDown } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
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

      items.push({ id, title, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Set up intersection observer for active section tracking
    const headingElements = tocItems.map(item => 
      document.getElementById(item.id)
    ).filter(Boolean);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    headingElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  useEffect(() => {
    // Track reading progress
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.round((scrollTop / docHeight) * 100) || 0;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <List className="h-5 w-5 text-primary-blue" />
          <h3 className="font-bold text-gray-900">İçindekiler</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Table of Contents */}
      {!isCollapsed && (
        <nav className="space-y-1">
          {tocItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(item.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm
                ${item.level === 3 ? 'ml-4' : ''}
                ${activeId === item.id 
                  ? 'bg-primary-blue text-white shadow-sm' 
                  : 'text-gray-600 hover:text-primary-blue hover:bg-gray-50'
                }
              `}
            >
              <span className={`
                ${item.level === 2 ? 'font-semibold' : 'font-medium'}
                ${item.level === 3 ? 'text-xs' : 'text-sm'}
              `}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      )}

      {/* Reading Progress */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Okuma İlerlemesi</span>
          <span>{readingProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-blue to-primary-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;