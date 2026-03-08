export interface Community {
  id: string;
  name: string;
  description: string;
  category: 'location' | 'event' | 'aesthetic';
  memberCount: number;
  isJoined: boolean;
  recentPosts: CommunityPost[];
  trending: boolean;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  username: string;
  userAvatar?: string;
  caption: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  comments: number;
  saves: number;
  createdAt: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface CommunityMember {
  id: string;
  username: string;
  avatar?: string;
  joinDate: string;
  postsCount: number;
  isCreator?: boolean;
}
