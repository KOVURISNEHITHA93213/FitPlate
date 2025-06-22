import React, { useState } from 'react';
import { Dumbbell, Plus, Trash2 } from 'lucide-react';
import type { WorkoutLog, Exercise } from '../types';

interface Props {
  onWorkoutSave: (workout: WorkoutLog) => void;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const EXERCISE_CALORIES: Record<string, number> = {
  'Running': 11.4,         // calories per minute
  'Cycling': 8.5,
  'Swimming': 10,
  'Weight Training': 6,
  'HIIT': 12.5,
  'Yoga': 4,
  'Walking': 5,
  'Boxing': 9.3,
  'Dancing': 7.8,
  'Basketball': 9.3
};

export const WorkoutTracker: React.FC<Props> = ({ onWorkoutSave }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState('Running');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  
  const calculateCaloriesBurned = (exercise: string, minutes: number): number => {
    return Math.round(EXERCISE_CALORIES[exercise] * minutes);
  };

  const handleAddExercise = () => {
    if (duration && selectedExercise) {
      const durationNum = parseInt(duration);
      const caloriesBurned = calculateCaloriesBurned(selectedExercise, durationNum);
      
      setExercises(prev => [...prev, {
        name: selectedExercise,
        duration: durationNum,
        caloriesBurned
      }]);
      
      setDuration('');
    }
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const totalCaloriesBurned = exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
    const today = new Date();
    
    onWorkoutSave({
      date: today.toISOString(),
      day: DAYS[today.getDay()],
      exercises,
      totalCaloriesBurned,
      notes
    });

    setExercises([]);
    setNotes('');
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Dumbbell className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Workout Tracker</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {Object.keys(EXERCISE_CALORIES).map(exercise => (
              <option key={exercise} value={exercise}>{exercise}</option>
            ))}
          </select>

          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Minutes"
            className="w-24 px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          <button
            onClick={handleAddExercise}
            className="bg-orange-500 p-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg animate-fade-in"
            >
              <div>
                <h3 className="text-white font-medium">{exercise.name}</h3>
                <p className="text-sm text-gray-400">{exercise.duration} minutes</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-orange-500 font-bold">{exercise.caloriesBurned} kcal</span>
                <button
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add workout notes..."
          className="w-full h-24 px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
        />

        {exercises.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300">
                Total Calories Burned: 
                <span className="text-orange-500 font-bold ml-2">
                  {exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0)} kcal
                </span>
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-md hover:from-red-600 hover:to-orange-600 transition-colors"
            >
              Save Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};