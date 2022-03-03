export interface User {
  name: string;
  key: string;
  profileImageUrl: string;
  isOnline: boolean;
  followers?: number;
  optionalLink?: string;
  profileBannerUrl?: string;
  phone_number?: string;
  streams?: [] | any;
}
export interface Game {
  name: string;
  key: string;
  imageUrl?: string;
  bannerUrl?: string;
  productionYear?: string;
  producer?: string;
  tags?: string[];
  streaming?: boolean;
  viewerCount?: number;
  followerCount?: number;
}
export interface Stream {
  name: string;
  key: string;
  game?: Game;
  viewerCount: number;
  imageUrl?: string;
  streamer?: User;
  ended?: boolean;
  date?: Date;
  duration?: string;
}
