import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the feed directory - check if it exists first
    const feedDir = path.join(process.cwd(), 'public', 'database', 'feed');
    
    // Check if feed directory exists
    if (!fs.existsSync(feedDir)) {
      console.error('Feed directory does not exist:', feedDir);
      return NextResponse.json(
        { error: 'Feed directory not found. Images should be placed in /public/database/feed/' },
        { status: 404 }
      );
    }
    
    // Read all files in feed directory
    const files = fs.readdirSync(feedDir);
    
    // Filter for image files (JPG, HEIC, etc.)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|heic|png|webp)$/i.test(file)
    );
    
    if (imageFiles.length === 0) {
      console.log('No images found in feed directory');
      return NextResponse.json({ posts: [] });
    }
    
    // Create posts from image files
    const posts = imageFiles.map((file, index) => {
      const fileName = file.split('.')[0]; // Remove extension
      const fileExt = path.extname(file).toLowerCase();
      
      return {
        id: `feed-${index + 1}`,
        image: `/database/feed/${file}`,
        username: `style_${fileName.replace(/[^a-zA-Z0-9]/g, '')}`,
        caption: `Style inspiration from ${fileName.replace(/[^a-zA-Z0-9]/g, ' ')}`,
        tags: ['style', 'fashion', 'inspiration'],
        likeCount: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
        userAvatar: `/database/feed/${imageFiles[index % imageFiles.length]}`
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error reading database feed:', error);
    return NextResponse.json(
      { error: 'Failed to load feed data' },
      { status: 500 }
    );
  }
}
