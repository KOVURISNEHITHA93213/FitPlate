import React from 'react';
import { Activity, Calendar } from 'lucide-react';
import type { WorkoutLog } from '../types';

interface Props {
  workouts: WorkoutLog[];
  targetCalories: number;
}

export const WorkoutSummary: React.FC<Props> = ({ workouts, targetCalories }) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const thisWeeksWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= startOfWeek;
  });

  const totalCaloriesBurned = thisWeeksWorkouts.reduce(
    (sum, workout) => sum + workout.totalCaloriesBurned,
    0
  );

  const adjustedCalorieTarget = targetCalories + Math.round(totalCaloriesBurned / 7);

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-102">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Weekly Workout Summary</h2>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
            const workout = thisWeeksWorkouts.find(w => w.day === day);
            return (
              <div
                key={day}
                className={`p-3 rounded-lg text-center ${
                  workout
                    ? 'bg-orange-500 bg-opacity-20 border border-orange-500'
                    : 'bg-gray-700'
                }`}
              >
                <p className="text-sm font-medium text-gray-300">{day}</p>
                {workout && (
                  <p className="text-orange-500 font-bold mt-1">
                    {workout.totalCaloriesBurned}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-gray-700 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Weekly Calories Burned:</p>
            <p className="text-orange-500 font-bold">{totalCaloriesBurned} kcal</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Daily Average:</p>
            <p className="text-orange-500 font-bold">
              {Math.round(totalCaloriesBurned / 7)} kcal
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-lg">
          <p className="text-white font-medium">Adjusted Daily Calorie Target:</p>
          <p className="text-white text-2xl font-bold">{adjustedCalorieTarget} kcal</p>
          <p className="text-white text-sm mt-2">
            Based on your activity level and workout intensity
          </p>
        </div>

        <div className="space-y-4">
          {thisWeeksWorkouts.map((workout, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">
                  {new Date(workout.date).toLocaleDateString()} ({workout.day})
                </h3>
                <span className="text-orange-500 font-bold">
                  {workout.totalCaloriesBurned} kcal
                </span>
              </div>
              <div className="space-y-2">
                {workout.exercises.map((exercise, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300">{exercise.name}</span>
                    <span className="text-gray-400">
                      {exercise.duration} mins ({exercise.caloriesBurned} kcal)
                    </span>
                  </div>
                ))}
              </div>
              {workout.notes && (
                <p className="text-sm text-gray-400 mt-2 italic">
                  "{workout.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};