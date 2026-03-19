"use client";

import { memo, useState } from "react";
import { Bookmark } from "lucide-react";
import { Post } from "../../data/posts";

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export const PostCard = memo(function PostCard({ post, onClick }: PostCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div 
      className="group cursor-pointer break-inside-avoid mb-4 animate-fade-in"
      onClick={() => onClick(post)}
    >
      <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
        {/* Image */}
        <div className="relative">
          <img
            src={post.image}
            alt={post.caption}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay save button only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4">
              <button
                onClick={handleSave}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isSaved 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
