import React, { useState, useEffect } from 'react';
import { Save, User } from 'lucide-react';
import type { UserProfile } from '../types';

interface Props {
  onProfileSave: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

const calculateBMR = (profile: UserProfile): number => {
  // Mifflin-St Jeor Equation
  const s = profile.gender === 'male' ? 5 : -161;
  return (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + s;
};

const calculateTDEE = (bmr: number, activityLevel: UserProfile['activityLevel']): number => {
  const multipliers = {
    sedentary: 1.2,    // Little or no exercise
    light: 1.375,      // Light exercise 1-3 days/week
    moderate: 1.55,    // Moderate exercise 3-5 days/week
    very: 1.725,       // Heavy exercise 6-7 days/week
    extra: 1.9         // Very heavy exercise, physical job
  };
  return Math.round(bmr * multipliers[activityLevel]);
};

export const UserProfileForm: React.FC<Props> = ({ onProfileSave, initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    name: '',
    gender: 'male',
    weight: 0,
    height: 0,
    age: 0,
    activityLevel: 'moderate',
    goal: 'maintain',
    targetCalories: 2000
  });

  useEffect(() => {
    const bmr = calculateBMR(profile);
    const tdee = calculateTDEE(bmr, profile.activityLevel);
    
    let targetCalories = tdee;
    if (profile.goal === 'lose') targetCalories -= 500;
    if (profile.goal === 'gain') targetCalories += 500;
    
    setProfile(prev => ({ ...prev, targetCalories }));
  }, [profile.weight, profile.height, profile.age, profile.gender, profile.activityLevel, profile.goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileSave(profile);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Your Profile</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Gender
          </label>
          <select
            value={profile.gender}
            onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as UserProfile['gender'] }))}
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Age
          </label>
          <input
            type="number"
            value={profile.age || ''}
            onChange={(e) => setProfile(prev => ({ ...prev, age: Number(e.target.value) }))}
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={profile.weight || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={profile.height || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, height: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Activity Level
          </label>
          <select
            value={profile.activityLevel}
            onChange={(e) => setProfile(prev => ({ ...prev, activityLevel: e.target.value as UserProfile['activityLevel'] }))}
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="very">Very Active (exercise 6-7 days/week)</option>
            <option value="extra">Extra Active (very intense exercise/physical job)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Goal
          </label>
          <select
            value={profile.goal}
            onChange={(e) => setProfile(prev => ({ ...prev, goal: e.target.value as UserProfile['goal'] }))}
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300">Daily Calorie Target: <span className="text-orange-500 font-bold">{profile.targetCalories}</span></p>
          <p className="text-sm text-gray-400 mt-1">Automatically calculated based on your profile</p>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-orange-600 transition-colors"
        >
          <Save size={20} />
          Save Profile
        </button>
      </form>
    </div>
  );
};