export interface MoodEntry {
  id: string;
  timestamp: number;
  mood: string;
  intensity: number; // 1-10
  note?: string;
}

export interface FoodEntry {
  id: string;
  timestamp: number;
  meal: string;
  energyLevel: number; // 1-10
  cravings: string[];
  moodShift?: string;
}

export interface DailyWin {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'mind' | 'fuel' | 'body';
}

export interface GlucoseHack {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface DailyDozenItem {
  id: string;
  title: string;
  count: number;
  target: number;
}

export interface SOSExercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  steps: { text: string; duration: number }[];
  source?: string;
}
