"use client";

import { useState } from "react";
import { X, Bookmark, Share2 } from "lucide-react";
import { Post } from "../../data/posts";

interface PostDetailProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export function PostDetail({ post, isOpen, onClose }: PostDetailProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // Placeholder for share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Style Inspiration',
        text: post.caption,
        url: window.location.href
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
          <X size={20} />
        </button>
        
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image section */}
          <div className="lg:w-3/5 bg-black flex items-center justify-center">
            <img src={post.image} alt={post.caption} className="max-w-full max-h-[60vh] lg:max-h-[80vh] object-contain" />
          </div>
          
          {/* Content section */}
          <div className="lg:w-2/5 flex flex-col h-full">
            {/* Simple header */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-lg lowercase">style inspiration</h3>
              <p className="text-sm text-gray-500 lowercase">
                {post.timestamp.toLocaleDateString()}
              </p>
            </div>
            
            {/* Caption only */}
            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-gray-800 mb-4 lowercase">{post.caption}</p>
            </div>
            
            {/* Actions */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button onClick={handleSave} className={`p-2 rounded-lg transition-all duration-200 ${isSaved ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <Bookmark size={18} className={isSaved ? 'fill-current' : ''} />
                  </button>
                  <button onClick={handleShare} className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <button className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors lowercase">
                view profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
