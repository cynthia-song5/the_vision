"use client";

import { useState, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { PostDetail } from "../components/PostDetail";
import { Navigation } from "../components/Navigation";
import { Post } from "../../data/posts";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/database/feed');
        const data = await response.json();
        
        if (data.posts) {
          // Convert API response to Post format
          const formattedPosts: Post[] = data.posts.map((post: any) => ({
            id: post.id,
            image: post.image,
            username: post.username,
            caption: post.caption,
            tags: post.tags,
            likeCount: post.likeCount,
            timestamp: new Date(post.timestamp),
            userAvatar: post.userAvatar
          }));
          
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const loadMore = () => {
    // Placeholder for loading more posts
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4 lowercase">
            inspiration feed
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto lowercase">
            discover style inspiration from our community of fashion enthusiasts
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed lowercase"
          >
            {isLoading ? 'loading...' : 'load more'}
          </button>
        </div>
      </main>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
