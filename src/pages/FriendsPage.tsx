import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Check, X, Search } from 'lucide-react';
import { getAllUsers, sendFriendRequest, getFriendRequests, respondToFriendRequest, getFriends, Profile, Friend } from '../lib/socialSupabase';
import { useAuth } from '../hooks/useAuth';
import SocialSidebar from '../components/social/SocialSidebar';
import SocialHeader from '../components/social/SocialHeader';

const FriendsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'friends' | 'requests'>('all');
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [friends, setFriends] = useState<Profile[]>([]);
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, friendsData, requestsData] = await Promise.all([
        getAllUsers(),
        getFriends(),
        getFriendRequests()
      ]);
      
      // Filter out current user from all users
      const filteredUsers = usersData.filter(u => u.id !== user?.id);
      setAllUsers(filteredUsers);
      setFriends(friendsData);
      setFriendRequests(requestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (userId: string) => {
    const success = await sendFriendRequest(userId);
    if (success) {
      // Remove user from all users list temporarily
      setAllUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleRespondToRequest = async (friendId: string, status: 'accepted' | 'declined') => {
    const success = await respondToFriendRequest(friendId, status);
    if (success) {
      setFriendRequests(prev => prev.filter(r => r.id !== friendId));
      if (status === 'accepted') {
        fetchData(); // Refresh all data
      }
    }
  };

  const filteredUsers = allUsers.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFriends = friends.filter(friend =>
    friend.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            Arkadaşlar
          </h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Arkadaş ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'all'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tüm Kullanıcılar ({filteredUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'friends'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Arkadaşlarım ({filteredFriends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 relative ${
                activeTab === 'requests'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Arkadaşlık İstekleri ({friendRequests.length})
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {friendRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* All Users Tab */}
          {activeTab === 'all' && (
            <>
              {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'Kullanıcı bulunamadı' : 'Henüz kullanıcı yok'}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Farklı anahtar kelimeler deneyin.' : 'Yeni kullanıcılar katıldığında burada görünecek.'}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredUsers.map((profile) => (
                    <div key={profile.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {profile.full_name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {profile.full_name || 'İsimsiz Kullanıcı'}
                          </h3>
                          {profile.bio && (
                            <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>
                          )}
                          {profile.location && (
                            <p className="text-xs text-gray-500 mt-1">{profile.location}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleSendFriendRequest(profile.id)}
                          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Ekle</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <>
              {filteredFriends.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'Arkadaş bulunamadı' : 'Henüz arkadaşınız yok'}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Farklı anahtar kelimeler deneyin.' : 'Arkadaşlık istekleri göndererek arkadaş ekleyin.'}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredFriends.map((friend) => (
                    <div key={friend.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {friend.full_name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {friend.full_name || 'İsimsiz Kullanıcı'}
                          </h3>
                          {friend.bio && (
                            <p className="text-sm text-gray-600 mt-1">{friend.bio}</p>
                          )}
                          {friend.location && (
                            <p className="text-xs text-gray-500 mt-1">{friend.location}</p>
                          )}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Arkadaş
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Friend Requests Tab */}
          {activeTab === 'requests' && (
            <>
              {friendRequests.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Arkadaşlık isteği yok
                  </h3>
                  <p className="text-gray-600">
                    Yeni arkadaşlık istekleri burada görünecek.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">U</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Arkadaşlık İsteği
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(request.created_at).toLocaleDateString('tr-TR')} tarihinde gönderildi
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleRespondToRequest(request.id, 'accepted')}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            <Check className="h-4 w-4" />
                            <span>Kabul Et</span>
                          </button>
                          <button
                            onClick={() => handleRespondToRequest(request.id, 'declined')}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                            <span>Reddet</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default FriendsPage;