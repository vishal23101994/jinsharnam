import { NextResponse } from "next/server";

export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (!data.items) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube fetch failed", error);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}
