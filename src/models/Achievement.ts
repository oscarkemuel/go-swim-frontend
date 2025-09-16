export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedAt: string | null;
  unlocked: boolean;
}