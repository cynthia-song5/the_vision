export interface Post {
  id: string;
  image: string;
  username: string;
  caption: string;
  tags: string[];
  likeCount: number;
  timestamp: Date;
  userAvatar?: string;
}

export const posts: Post[] = [
  {
    id: "1",
    image: "/database/outfits/outfit-005.jpg",
    username: "alexchen",
    caption: "Minimalist street style for the urban explorer",
    tags: ["minimal", "streetwear", "urban"],
    likeCount: 234,
    timestamp: new Date("2024-03-07T10:00:00Z"),
    userAvatar: "/database/communities/minimal-street.jpg"
  },
  {
    id: "2", 
    image: "/database/outfits/outfit-006.jpg",
    username: "sophiestyle",
    caption: "Quiet luxury speaks volumes without saying a word",
    tags: ["luxury", "elegant", "timeless"],
    likeCount: 567,
    timestamp: new Date("2024-03-07T12:30:00Z"),
    userAvatar: "/database/communities/quiet-luxury.jpg"
  },
  {
    id: "3",
    image: "/database/outfits/outfit-007.jpg",
    username: "techwear_pro",
    caption: "Business casual with a tech edge",
    tags: ["business", "tech", "professional"],
    likeCount: 189,
    timestamp: new Date("2024-03-07T14:15:00Z"),
    userAvatar: "/database/communities/tech-conference.jpg"
  },
  {
    id: "4",
    image: "/database/outfits/outfit-008.jpg",
    username: "nycfashion",
    caption: "New York meetings call for sharp tailoring",
    tags: ["business", "nyc", "tailoring"],
    likeCount: 445,
    timestamp: new Date("2024-03-07T16:45:00Z"),
    userAvatar: "/database/communities/nyc-meeting.jpg"
  },
  {
    id: "5",
    image: "/database/outfits/outfit-005.jpg",
    username: "monochrome_mood",
    caption: "Less is more in monochrome",
    tags: ["minimal", "monochrome", "clean"],
    likeCount: 892,
    timestamp: new Date("2024-03-06T09:30:00Z"),
    userAvatar: "/database/communities/osu-game-day.jpg"
  },
  {
    id: "6",
    image: "/database/outfits/outfit-006.jpg",
    username: "luxury_living",
    caption: "Investment pieces that last forever",
    tags: ["luxury", "investment", "quality"],
    likeCount: 734,
    timestamp: new Date("2024-03-06T11:45:00Z"),
    userAvatar: "/database/communities/library-study.jpg"
  },
  {
    id: "7",
    image: "/database/outfits/outfit-007.jpg",
    username: "college_style",
    caption: "Game day ready with campus spirit",
    tags: ["casual", "college", "sportswear"],
    likeCount: 321,
    timestamp: new Date("2024-03-07T18:20:00Z"),
    userAvatar: "/database/communities/minimal-street.jpg"
  },
  {
    id: "8",
    image: "/database/outfits/outfit-008.jpg",
    username: "academic_chic",
    caption: "Study session aesthetics",
    tags: ["academic", "casual", "cozy"],
    likeCount: 278,
    timestamp: new Date("2024-03-07T20:10:00Z"),
    userAvatar: "/database/communities/quiet-luxury.jpg"
  }
];
