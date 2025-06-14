
import React, { useState } from 'react';
import { Camera, MapPin, Briefcase, GraduationCap, Heart, Edit3, MessageCircle, UserPlus, MoreHorizontal } from 'lucide-react';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibleButton from '../components/AccessibleButton';
import FunctionalPost from '../components/FunctionalPost';
import { toast } from 'sonner';

const EnhancedProfile = () => {
  const [isOwnProfile] = useState(true); // Simulate current user's profile

  const userInfo = {
    name: 'John Doe',
    bio: 'Software Developer passionate about creating amazing user experiences. Love to travel and explore new technologies.',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
    location: 'San Francisco, CA',
    work: 'Software Engineer at Tech Corp',
    education: 'Computer Science, Stanford University',
    relationship: 'Single',
    joinDate: 'Joined March 2020',
    friendsCount: 342,
    followersCount: 1256
  };

  const photos = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop'
  ];

  const friends = [
    { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face' },
    { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face' },
    { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face' },
    { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face' }
  ];

  const userPosts = [
    {
      id: 1,
      author: {
        name: userInfo.name,
        avatar: userInfo.avatar,
        verified: false
      },
      content: 'Had an amazing day at the beach! The weather was perfect and the sunset was breathtaking. Sometimes you need to take a break from coding and enjoy nature. 🌅',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      timestamp: '3h',
      likes: 45,
      comments: 12,
      shares: 4
    },
    {
      id: 2,
      author: {
        name: userInfo.name,
        avatar: userInfo.avatar,
        verified: false
      },
      content: 'Just shipped a new feature at work! Really proud of the team and what we accomplished. The future of tech is looking bright! 🚀',
      timestamp: '1d',
      likes: 78,
      comments: 23,
      shares: 8
    }
  ];

  const handleEditProfile = () => {
    toast.info('Edit profile feature coming soon!');
  };

  const handleAddFriend = () => {
    toast.success('Friend request sent!');
  };

  const handleMessage = () => {
    toast.info('Opening message...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-80 bg-gray-200 rounded-b-lg overflow-hidden">
          <img
            src={userInfo.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {isOwnProfile && (
            <AccessibleButton
              variant="ghost"
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Edit Cover
            </AccessibleButton>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-b-lg shadow-sm px-4 pb-4">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl">{userInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-2 right-2 bg-gray-100 rounded-full p-2"
                >
                  <Camera className="w-4 h-4" />
                </AccessibleButton>
              )}
            </div>

            <div className="flex space-x-2 mb-4">
              {isOwnProfile ? (
                <Button onClick={handleEditProfile}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleAddFriend}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Friend
                  </Button>
                  <Button variant="outline" onClick={handleMessage}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <AccessibleButton variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </AccessibleButton>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600">{userInfo.bio}</p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="font-medium">{userInfo.friendsCount} friends</span>
              <span className="font-medium">{userInfo.followersCount} followers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>{userInfo.work}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>{userInfo.education}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{userInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>{userInfo.relationship}</span>
              </div>
              <div className="md:col-span-2">
                <span>{userInfo.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Photos */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Photos</h3>
                  <Button variant="ghost" size="sm">See all</Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {photos.slice(0, 9).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Friends */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Friends</h3>
                  <Button variant="ghost" size="sm">See all</Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {friends.map((friend, index) => (
                    <div key={index} className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-2">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-gray-900 truncate">{friend.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                {userPosts.map((post) => (
                  <FunctionalPost key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Work and Education</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.work}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.education}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Contact Info</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Basic Info</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.relationship}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedProfile;
