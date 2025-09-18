import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Search, ArrowLeft } from 'lucide-react';
import { getFriends, getMessages, sendMessage, Profile, Message } from '../lib/socialSupabase';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import SocialSidebar from '../components/social/SocialSidebar';
import SocialHeader from '../components/social/SocialHeader';

const MessagesPage = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Profile[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      fetchMessages(selectedFriend.id);
      subscribeToMessages(selectedFriend.id);
    }
  }, [selectedFriend]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const friendsData = await getFriends();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (friendId: string) => {
    try {
      const messagesData = await getMessages(friendId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const subscribeToMessages = (friendId: string) => {
    if (!supabase || !user) return;

    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id}))`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedFriend || sending) return;

    setSending(true);
    try {
      const success = await sendMessage(selectedFriend.id, newMessage);
      if (success) {
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SocialHeader user={user} />
      <div className="flex max-w-7xl mx-auto">
        <SocialSidebar user={user} onChatClick={() => {}} />
        <div className="flex-1 flex h-screen">
        {/* Friends Sidebar */}
        <div className={`${selectedFriend ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200`}>
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
              Mesajlar
            </h1>
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Arkadaş ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="overflow-y-auto h-full">
            {filteredFriends.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'Arkadaş bulunamadı' : 'Henüz arkadaşınız yok'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {searchTerm ? 'Farklı anahtar kelimeler deneyin.' : 'Arkadaş ekleyerek mesajlaşmaya başlayın.'}
                </p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredFriends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    className={`w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                      selectedFriend?.id === friend.id
                        ? 'bg-primary/10 border-primary/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {friend.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {friend.full_name || 'İsimsiz Kullanıcı'}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          Mesajlaşmaya başlayın...
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedFriend ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedFriend ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedFriend(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {selectedFriend.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedFriend.full_name || 'İsimsiz Kullanıcı'}
                    </h2>
                    <p className="text-sm text-gray-500">Aktif</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Henüz mesaj yok
                    </h3>
                    <p className="text-gray-600">
                      {selectedFriend.full_name} ile mesajlaşmaya başlayın!
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => {
                      const isCurrentUser = message.sender_id === user?.id;
                      const showDate = index === 0 || 
                        formatDate(message.created_at) !== formatDate(messages[index - 1].created_at);

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center my-4">
                              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                                {formatDate(message.created_at)}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isCurrentUser
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-primary-100' : 'text-gray-500'
                              }`}>
                                {formatTime(message.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="p-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-full transition-colors duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mesajlaşmaya Başlayın
                </h3>
                <p className="text-gray-600">
                  Arkadaşlarınızla sohbet etmek için birini seçin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MessagesPage;