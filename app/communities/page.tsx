"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, MapPin, Calendar, Palette, Heart, MessageCircle, Bookmark, Plus } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Community, CommunityPost } from "../lib/community-types";
import Link from "next/link";

export default function Communities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'location' | 'event' | 'aesthetic'>('all');
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load communities from hardcoded data
    const loadCommunities = async () => {
      const communityData: Community[] = [
        {
          id: "location-ohio-state",
          name: "Ohio State Students",
          description: "Fashion and outfit inspiration from Ohio State University students. Share your campus style!",
          category: "location",
          memberCount: 2847,
          isJoined: false,
          recentPosts: [
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
            }
          ],
          trending: true,
          createdAt: "2024-01-15T08:00:00Z"
        },
        {
          id: "location-nyc-creatives",
          name: "NYC Creatives",
          description: "Street style and professional looks from New York City's creative professionals.",
          category: "location",
          memberCount: 5234,
          isJoined: false,
          recentPosts: [
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
            }
          ],
          trending: true,
          createdAt: "2024-01-20T09:00:00Z"
        },
        {
          id: "event-tech-conference",
          name: "Tech Conference Fits",
          description: "Outfit inspiration for tech conferences, hackathons, and networking events.",
          category: "event",
          memberCount: 1834,
          isJoined: false,
          recentPosts: [
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
            }
          ],
          trending: false,
          createdAt: "2024-02-01T11:00:00Z"
        },
        {
          id: "aesthetic-minimalist-streetwear",
          name: "Minimalist Streetwear",
          description: "Clean lines, neutral colors, and modern street style aesthetics.",
          category: "aesthetic",
          memberCount: 3421,
          isJoined: false,
          recentPosts: [
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
            }
          ],
          trending: true,
          createdAt: "2024-01-10T07:00:00Z"
        },
        {
          id: "aesthetic-quiet-luxury",
          name: "Quiet Luxury",
          description: "Understated elegance, quality fabrics, and timeless sophistication.",
          category: "aesthetic",
          memberCount: 2756,
          isJoined: false,
          recentPosts: [
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
          ],
          trending: false,
          createdAt: "2024-01-25T10:00:00Z"
        }
      ];

      setCommunities(communityData);
    };

    loadCommunities();
  }, []);

  const handleJoinCommunity = (communityId: string) => {
    setJoinedCommunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(communityId)) {
        newSet.delete(communityId);
      } else {
        newSet.add(communityId);
      }
      return newSet;
    });

    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, isJoined: !community.isJoined, memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1 }
        : community
    ));
  };

  const filteredCommunities = communities.filter(community => 
    selectedCategory === 'all' || community.category === selectedCategory
  );

  const trendingCommunities = communities.filter(community => community.trending);
  const locationCommunities = communities.filter(community => community.category === 'location');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'location': return <MapPin size={16} />;
      case 'event': return <Calendar size={16} />;
      case 'aesthetic': return <Palette size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'location': return { bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.2)", text: "#000000" };
      case 'event': return { bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.2)", text: "#000000" };
      case 'aesthetic': return { bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.2)", text: "#000000" };
      default: return { bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.2)", text: "#000000" };
    }
  };

  return (
    <div className="min-h-screen font-body bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border border-gray-300 bg-gray-50 text-gray-700 lowercase"
          >
            <Users size={12} />
            fashion communities
          </div>
          <h1 className="text-4xl font-bold text-black mb-4 lowercase">
            find your community.
            <br />
            <em className="not-italic text-gray-600 lowercase">share your style.</em>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium lowercase">
            connect with fashion lovers who share your location, events, and aesthetic preferences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            { id: 'all', label: 'all communities', icon: <Users size={16} /> },
            { id: 'location', label: 'location-based', icon: <MapPin size={16} /> },
            { id: 'event', label: 'event-based', icon: <Calendar size={16} /> },
            { id: 'aesthetic', label: 'style-based', icon: <Palette size={16} /> }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-medium transition-all ${
                selectedCategory === id
                  ? 'text-white'
                  : 'border hover:opacity-80'
              }`}
              style={{
                backgroundColor: selectedCategory === id ? "#000000" : "transparent",
                borderColor: selectedCategory === id ? "transparent" : "#DDE2EE",
                color: selectedCategory === id ? "#FFFFFF" : "#626F8C"
              }}
            >
              {icon}
              <span className="lowercase">{label}</span>
            </button>
          ))}
        </div>

        {/* Trending Communities */}
        {selectedCategory === 'all' && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp size={20} style={{ color: "#7EB8D4" }} />
              <h2 className="text-2xl font-bold text-black lowercase">trending communities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCommunities.map(community => (
                <CommunityCard 
                  key={community.id} 
                  community={community} 
                  isJoined={joinedCommunities.has(community.id)}
                  onJoin={handleJoinCommunity}
                  getCategoryColor={getCategoryColor}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </div>
          </section>
        )}

        {/* Communities Near You (Location-based) */}
        {selectedCategory === 'all' && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <MapPin size={20} style={{ color: "#7EB8D4" }} />
              <h2 className="text-2xl font-bold text-black lowercase">communities near you</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationCommunities.map(community => (
                <CommunityCard 
                  key={community.id} 
                  community={community} 
                  isJoined={joinedCommunities.has(community.id)}
                  onJoin={handleJoinCommunity}
                  getCategoryColor={getCategoryColor}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Communities / Filtered */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-8 lowercase">
            {selectedCategory === 'all' ? 'all communities' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} communities`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map(community => (
              <CommunityCard 
                key={community.id} 
                community={community} 
                isJoined={joinedCommunities.has(community.id)}
                onJoin={handleJoinCommunity}
                getCategoryColor={getCategoryColor}
                getCategoryIcon={getCategoryIcon}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CommunityCard({ 
  community, 
  isJoined, 
  onJoin, 
  getCategoryColor, 
  getCategoryIcon 
}: {
  community: Community;
  isJoined: boolean;
  onJoin: (id: string) => void;
  getCategoryColor: (category: string) => any;
  getCategoryIcon: (category: string) => React.ReactNode;
}) {
  const categoryColors = getCategoryColor(community.category);

  return (
    <Link href={`/communities/${community.id}`}>
      <div className="rounded-2xl border overflow-hidden transition-all hover:shadow-lg cursor-pointer" style={{ borderColor: "#DDE2EE", backgroundColor: "#FFFFFF" }}>
        {/* Preview Image */}
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
          {community.recentPosts.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={community.recentPosts[0].imageUrl} 
              alt={community.recentPosts[0].caption}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full border" style={{ backgroundColor: categoryColors.bg, borderColor: categoryColors.border }}>
            {getCategoryIcon(community.category)}
            <span className="text-xs font-medium" style={{ color: categoryColors.text }}>
              {community.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-display text-lg mb-1" style={{ color: "#0E1117" }}>{community.name}</h3>
              <p className="font-body text-sm mb-3 line-clamp-2" style={{ color: "#626F8C" }}>
                {community.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Users size={14} style={{ color: "#8F9BB8" }} />
              <span className="text-xs font-body font-medium" style={{ color: "#8F9BB8" }}>
                {community.memberCount.toLocaleString()} members
              </span>
            </div>
            {community.trending && (
              <div className="flex items-center gap-1">
                <TrendingUp size={14} style={{ color: "#22c55e" }} />
                <span className="text-xs font-body font-medium" style={{ color: "#22c55e" }}>
                  Trending
                </span>
              </div>
            )}
          </div>

          {/* Recent Post Preview */}
          {community.recentPosts.length > 0 && (
            <div className="border-t pt-3" style={{ borderColor: "#F0F2F7" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#E4EAF4" }} />
                <span className="text-xs font-body font-medium" style={{ color: "#0E1117" }}>
                  {community.recentPosts[0].username}
                </span>
              </div>
              <p className="text-xs font-body line-clamp-2 mb-2" style={{ color: "#626F8C" }}>
                {community.recentPosts[0].caption}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart size={12} style={{ color: "#8F9BB8" }} />
                  <span className="text-xs font-body" style={{ color: "#8F9BB8" }}>
                    {community.recentPosts[0].likes}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={12} style={{ color: "#8F9BB8" }} />
                  <span className="text-xs font-body" style={{ color: "#8F9BB8" }}>
                    {community.recentPosts[0].comments}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Join Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onJoin(community.id);
            }}
            className={`w-full mt-4 py-2 px-4 rounded-xl font-body text-sm font-medium transition-all ${
              isJoined 
                ? 'border hover:opacity-80' 
                : 'text-white hover:opacity-90'
            }`}
            style={{
              backgroundColor: isJoined ? "transparent" : "#0E1117",
              borderColor: isJoined ? "#DDE2EE" : "transparent",
              color: isJoined ? "#626F8C" : "#FFFFFF"
            }}
          >
            {isJoined ? 'Joined' : 'Join Community'}
          </button>
        </div>
      </div>
    </Link>
  );
}
