"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, Heart, MessageCircle, Bookmark, Plus, TrendingUp, Award, Star, ArrowLeft } from "lucide-react";
import { Navigation } from "../../components/Navigation";
import { Community, CommunityPost, CommunityMember } from "../../lib/community-types";
import Link from "next/link";

export default function CommunityPage() {
  const params = useParams();
  const router = useRouter();
  const communityId = params.id as string;

  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [activeTab, setActiveTab] = useState<'latest' | 'top' | 'members'>('latest');
  const [isJoined, setIsJoined] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    // Load community data
    const loadCommunityData = async () => {
      // Hardcoded community data
      const communities: Record<string, Community> = {
        "location-ohio-state": {
          id: "location-ohio-state",
          name: "Ohio State Students",
          description: "Fashion and outfit inspiration from Ohio State University students. Share your campus style!",
          category: "location",
          memberCount: 2847,
          isJoined: false,
          trending: true,
          createdAt: "2024-01-15T08:00:00Z",
          recentPosts: []
        },
        "location-nyc-creatives": {
          id: "location-nyc-creatives",
          name: "NYC Creatives",
          description: "Street style and professional looks from New York City's creative professionals.",
          category: "location",
          memberCount: 5234,
          isJoined: false,
          trending: true,
          createdAt: "2024-01-20T09:00:00Z",
          recentPosts: []
        },
        "event-tech-conference": {
          id: "event-tech-conference",
          name: "Tech Conference Fits",
          description: "Outfit inspiration for tech conferences, hackathons, and networking events.",
          category: "event",
          memberCount: 1834,
          isJoined: false,
          trending: false,
          createdAt: "2024-02-01T11:00:00Z",
          recentPosts: []
        },
        "aesthetic-minimalist-streetwear": {
          id: "aesthetic-minimalist-streetwear",
          name: "Minimalist Streetwear",
          description: "Clean lines, neutral colors, and modern street style aesthetics.",
          category: "aesthetic",
          memberCount: 3421,
          isJoined: false,
          trending: true,
          createdAt: "2024-01-10T07:00:00Z",
          recentPosts: []
        },
        "aesthetic-quiet-luxury": {
          id: "aesthetic-quiet-luxury",
          name: "Quiet Luxury",
          description: "Understated elegance, quality fabrics, and timeless sophistication.",
          category: "aesthetic",
          memberCount: 2756,
          isJoined: false,
          trending: false,
          createdAt: "2024-01-25T10:00:00Z",
          recentPosts: []
        }
      };

      // Hardcoded posts data
      const allPosts: CommunityPost[] = [
        {
          id: "post-001",
          communityId: "location-ohio-state",
          username: "buckeye_fashion",
          caption: "Game day fit! 🧡⚪️ Perfect for the tailgate!",
          imageUrl: "/database/communities/osu-game-day.jpg",
          tags: ["game day", "casual", "osu", "football"],
          likes: 234,
          comments: 18,
          saves: 45,
          createdAt: "2024-03-08T14:30:00Z",
          isLiked: false,
          isSaved: false
        },
        {
          id: "post-002",
          communityId: "location-ohio-state",
          username: "campus_style_23",
          caption: "Library study fit - comfy but cute",
          imageUrl: "/database/communities/library-study.jpg",
          tags: ["study", "casual", "cozy", "academic"],
          likes: 156,
          comments: 12,
          saves: 28,
          createdAt: "2024-03-08T10:15:00Z",
          isLiked: false,
          isSaved: false
        },
        {
          id: "post-003",
          communityId: "location-nyc-creatives",
          username: "soho_styler",
          caption: "Monday meeting vibes in the financial district",
          imageUrl: "/database/communities/nyc-meeting.jpg",
          tags: ["business", "professional", "nyc", "minimalist"],
          likes: 412,
          comments: 34,
          saves: 89,
          createdAt: "2024-03-08T09:45:00Z",
          isLiked: false,
          isSaved: false
        },
        {
          id: "post-004",
          communityId: "event-tech-conference",
          username: "tech_chic",
          caption: "Ready for the keynote! Smart casual with a tech twist",
          imageUrl: "/database/communities/tech-conference.jpg",
          tags: ["conference", "tech", "professional", "smart casual"],
          likes: 189,
          comments: 23,
          saves: 67,
          createdAt: "2024-03-07T16:20:00Z",
          isLiked: false,
          isSaved: false
        },
        {
          id: "post-005",
          communityId: "aesthetic-minimalist-streetwear",
          username: "minimal_mood",
          caption: "Less is more. Monochrome moment downtown.",
          imageUrl: "/database/communities/minimal-street.jpg",
          tags: ["minimalist", "monochrome", "streetwear", "clean"],
          likes: 567,
          comments: 41,
          saves: 123,
          createdAt: "2024-03-08T12:00:00Z",
          isLiked: false,
          isSaved: false
        },
        {
          id: "post-006",
          communityId: "aesthetic-quiet-luxury",
          username: "luxury_living",
          caption: "Investment pieces that never go out of style",
          imageUrl: "/database/communities/quiet-luxury.jpg",
          tags: ["luxury", "timeless", "elegant", "investment"],
          likes: 423,
          comments: 28,
          saves: 156,
          createdAt: "2024-03-07T18:30:00Z",
          isLiked: false,
          isSaved: false
        }
      ];

      // Hardcoded members data
      const allMembers: CommunityMember[] = [
        {
          id: "member-001",
          username: "buckeye_fashion",
          joinDate: "2024-01-20T00:00:00Z",
          postsCount: 12,
          isCreator: true
        },
        {
          id: "member-002",
          username: "campus_style_23",
          joinDate: "2024-02-15T00:00:00Z",
          postsCount: 8
        },
        {
          id: "member-003",
          username: "soho_styler",
          joinDate: "2024-01-25T00:00:00Z",
          postsCount: 24,
          isCreator: true
        },
        {
          id: "member-004",
          username: "minimal_mood",
          joinDate: "2024-01-10T00:00:00Z",
          postsCount: 31
        }
      ];

      const communityData = communities[communityId];
      if (!communityData) {
        router.push('/communities');
        return;
      }

      setCommunity(communityData);
      setPosts(allPosts.filter(post => post.communityId === communityId));
      setMembers(allMembers);
    };

    loadCommunityData();
  }, [communityId, router]);

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
    if (community) {
      setCommunity({
        ...community,
        isJoined: !isJoined,
        memberCount: isJoined ? community.memberCount - 1 : community.memberCount + 1
      });
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSavePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved, saves: post.isSaved ? post.saves - 1 : post.saves + 1 }
        : post
    ));
  };

  const getTopPosts = () => {
    return [...posts].sort((a, b) => (b.likes + b.saves) - (a.likes + a.saves));
  };

  const getRisingCreators = () => {
    return members
      .filter(member => member.postsCount > 0)
      .sort((a, b) => b.postsCount - a.postsCount)
      .slice(0, 3);
  };

  if (!community) {
    return (
      <div className="min-h-screen font-body" style={{ backgroundColor: "#F2F5FA" }}>
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="font-body text-sm" style={{ color: "#8F9BB8" }}>Loading community...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/communities')}
            className="flex items-center gap-2 text-sm font-body font-medium mb-4 transition-colors hover:opacity-80 text-gray-600"
          >
            <ArrowLeft size={16} />
            Back to Communities
          </button>

          <div className="rounded-2xl p-8 border bg-white border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="font-display text-3xl mb-3 text-black">
                  {community.name}
                </h1>
                <p className="font-body text-base mb-4 text-gray-600">
                  {community.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-500" />
                    <span className="font-body font-medium text-gray-500">
                      {community.memberCount.toLocaleString()} members
                    </span>
                  </div>
                  {community.trending && (
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-600" />
                      <span className="font-body font-medium text-green-600">
                        Trending
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleJoinCommunity}
                  className={`px-6 py-3 rounded-xl font-body text-sm font-medium transition-all ${
                    isJoined 
                      ? 'border hover:opacity-80' 
                      : 'text-white hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: isJoined ? "transparent" : "#000000",
                    borderColor: isJoined ? "#d1d5db" : "transparent",
                    color: isJoined ? "#6b7280" : "#FFFFFF"
                  }}
                >
                  {isJoined ? 'Leave Community' : 'Join Community'}
                </button>
                
                {isJoined && (
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="px-6 py-3 rounded-xl font-body text-sm font-medium text-white transition-all hover:opacity-90 bg-black"
                  >
                    <Plus size={16} className="inline mr-2" />
                    Post Outfit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8 border-gray-200">
          <div className="flex gap-8">
            {[
              { id: 'latest', label: 'Latest Posts' },
              { id: 'top', label: 'Top Looks' },
              { id: 'members', label: 'Members' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-1 font-body text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'latest' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onLike={handleLikePost}
                  onSave={handleSavePost}
                />
              ))}
            </div>
          )}

          {activeTab === 'top' && (
            <div>
              {/* Top Looks Section */}
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Award size={20} style={{ color: "#7EB8D4" }} />
                  <h2 className="font-display text-xl" style={{ color: "#0E1117" }}>Weekly Top Looks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getTopPosts().slice(0, 6).map((post, index) => (
                    <div key={post.id} className="relative">
                      <PostCard 
                        post={post} 
                        onLike={handleLikePost}
                        onSave={handleSavePost}
                      />
                      {index < 3 && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-body text-xs font-bold" style={{ backgroundColor: "#0E1117" }}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Rising Creators Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Star size={20} style={{ color: "#7EB8D4" }} />
                  <h2 className="font-display text-xl" style={{ color: "#0E1117" }}>Rising Creators</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getRisingCreators().map((member, index) => (
                    <div key={member.id} className="rounded-xl p-4 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#DDE2EE" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E4EAF4" }}>
                          <span className="font-display text-sm" style={{ color: "#0E1117" }}>
                            {member.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-body text-sm font-medium" style={{ color: "#0E1117" }}>
                            {member.username}
                          </h3>
                          <p className="font-body text-xs" style={{ color: "#8F9BB8" }}>
                            {member.postsCount} posts
                          </p>
                        </div>
                        {index < 3 && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-body text-xs" style={{ backgroundColor: "#7EB8D4" }}>
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </div>
                      {member.isCreator && (
                        <div className="flex items-center gap-1">
                          <Award size={12} style={{ color: "#7EB8D4" }} />
                          <span className="text-xs font-body font-medium" style={{ color: "#7EB8D4" }}>
                            Community Creator
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => (
                <div key={member.id} className="rounded-xl p-4 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#DDE2EE" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E4EAF4" }}>
                      <span className="font-display text-sm" style={{ color: "#0E1117" }}>
                        {member.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-body text-sm font-medium" style={{ color: "#0E1117" }}>
                        {member.username}
                      </h3>
                      <p className="font-body text-xs" style={{ color: "#8F9BB8" }}>
                        {member.postsCount} posts • Joined {new Date(member.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {member.isCreator && (
                    <div className="flex items-center gap-1 mt-3">
                      <Award size={12} style={{ color: "#7EB8D4" }} />
                      <span className="text-xs font-body font-medium" style={{ color: "#7EB8D4" }}>
                        Community Creator
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Post Modal */}
      {showPostModal && (
        <PostModal 
          onClose={() => setShowPostModal(false)}
          communityId={communityId}
          onPost={(newPost) => {
            setPosts(prev => [newPost, ...prev]);
            setShowPostModal(false);
          }}
        />
      )}
    </div>
  );
}

function PostCard({ post, onLike, onSave }: {
  post: CommunityPost;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "#FFFFFF", borderColor: "#DDE2EE" }}>
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* User */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E4EAF4" }}>
            <span className="font-display text-xs" style={{ color: "#0E1117" }}>
              {post.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-body text-sm font-medium" style={{ color: "#0E1117" }}>
            {post.username}
          </span>
        </div>

        {/* Caption */}
        <p className="font-body text-sm mb-3 line-clamp-2" style={{ color: "#626F8C" }}>
          {post.caption}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: "#F0F2F7", color: "#626F8C" }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1 transition-colors hover:opacity-80"
            >
              <Heart 
                size={14} 
                fill={post.isLiked ? "#0E1117" : "none"}
                style={{ color: post.isLiked ? "#0E1117" : "#8F9BB8" }}
              />
              <span className="text-xs font-body" style={{ color: "#8F9BB8" }}>
                {post.likes}
              </span>
            </button>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} style={{ color: "#8F9BB8" }} />
              <span className="text-xs font-body" style={{ color: "#8F9BB8" }}>
                {post.comments}
              </span>
            </div>
          </div>
          <button
            onClick={() => onSave(post.id)}
            className="transition-colors hover:opacity-80"
          >
            <Bookmark 
              size={14} 
              fill={post.isSaved ? "#0E1117" : "none"
              }
              style={{ color: post.isSaved ? "#0E1117" : "#8F9BB8" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function PostModal({ onClose, communityId, onPost }: {
  onClose: () => void;
  communityId: string;
  onPost: (post: CommunityPost) => void;
}) {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage || !caption.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      communityId,
      username: "current_user",
      caption: caption.trim(),
      imageUrl: selectedImage,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      likes: 0,
      comments: 0,
      saves: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
      isSaved: false
    };

    onPost(newPost);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(14,17,23,0.5)" }}>
      <div className="w-full max-w-2xl rounded-2xl p-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl" style={{ color: "#0E1117" }}>Post to Community</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
          >
            <span className="text-xl" style={{ color: "#626F8C" }}>×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-6">
            <div 
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-[#7EB8D4]"
              style={{ borderColor: "#DDE2EE", backgroundColor: "#F8F9FA" }}
              onClick={() => document.getElementById('post-image')?.click()}
            >
              {selectedImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div>
                  <Plus size={32} style={{ color: "#7EB8D4", margin: "0 auto 1rem" }} />
                  <p className="font-body text-sm" style={{ color: "#626F8C" }}>
                    Click to upload outfit image
                  </p>
                </div>
              )}
              <input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Caption */}
          <div className="mb-4">
            <label className="block font-body text-sm font-medium mb-2" style={{ color: "#0E1117" }}>
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your outfit details..."
              className="w-full px-4 py-3 rounded-xl border resize-none"
              style={{ backgroundColor: "#F8F9FA", borderColor: "#DDE2EE", color: "#0E1117" }}
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block font-body text-sm font-medium mb-2" style={{ color: "#0E1117" }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="casual, summer, streetwear"
              className="w-full px-4 py-3 rounded-xl border"
              style={{ backgroundColor: "#F8F9FA", borderColor: "#DDE2EE", color: "#0E1117" }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-body text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "#DDE2EE", color: "#626F8C" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedImage || !caption.trim()}
              className="flex-1 px-4 py-3 rounded-xl font-body text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#0E1117" }}
            >
              Post Outfit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
