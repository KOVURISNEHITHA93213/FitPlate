export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WorkoutLog {
  date: string;
  day: string;
  exercises: string[];
  totalCaloriesBurned: number;
  notes: string;
  duration: number;
}

export interface Exercise {
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
}

export interface UserProfile {
  name: string;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose' | 'maintain' | 'gain';
  targetCalories: number;
}

export interface WeightLog {
  date: string;
  weight: number;
}

export interface FoodLog {
  date: string;
  foods: FoodItem[];
  totals: NutritionData;
}