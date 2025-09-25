export interface Sprint {
  timeInSeconds: number;
  meters: number;
}

export interface Workout {
  id: number;
  date: string;
  meters: number;
  fatigueLevel: number;
  timeInSeconds: number;
  style: string;
  sprints: Sprint[];
}
