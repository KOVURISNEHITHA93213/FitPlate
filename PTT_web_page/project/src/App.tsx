import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import { FoodTracker } from './components/FoodTracker';
import { NutritionChart } from './components/NutritionChart';
import { UserProfileForm } from './components/UserProfile';
import { WeightTracker } from './components/WeightTracker';
import { FoodHistory } from './components/FoodHistory';
import { AIAdvisor } from './components/AIAdvisor';
import { WorkoutTracker } from './components/WorkoutTracker';
import { WorkoutSummary } from './components/WorkoutSummary';
import type { NutritionData, UserProfile, WeightLog, FoodLog, FoodItem, WorkoutLog } from './types';

// ✅ Corrected Image URLs
const BACKGROUND_IMAGES = [
  
  'https://i.pinimg.com/736x/43/c2/1f/43c21f0be0246c6aa6f7da0708a00ff8.jpg',  // This is the first page image
  'https://wallpapers.com/images/hd/chris-bumstead-lifting-heavy-dumbbell-5hy47wmggeb8vmie.jpg',
  'https://pumpx.app/wp-content/uploads/2024/01/sam-sulek-photo-pumpx-1.jpg' 
];

function App() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [nutritionData, setNutritionData] = useState<NutritionData>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [trackedFoods, setTrackedFoods] = useState<FoodItem[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ Fixed scrolling logic for background change
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = scrollPosition / (documentHeight - windowHeight);
      const newSection = Math.floor(progress * BACKGROUND_IMAGES.length);

      if (newSection !== currentSection && newSection < BACKGROUND_IMAGES.length) {
        setIsTransitioning(true);
        setCurrentSection(newSection);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    if (weightLogs.length === 0) {
      handleWeightAdd(profile.weight);
    }
  };

  const handleWeightAdd = (weight: number) => {
    const newLog: WeightLog = {
      date: new Date().toISOString(),
      weight
    };
    setWeightLogs(prev => [...prev, newLog]);
  };

  const handleFoodUpdate = (foods: FoodItem[], totals: NutritionData) => {
    setTrackedFoods(foods);
    setNutritionData(totals);
  };

  const handleWorkoutSave = (workout: WorkoutLog) => {
    setWorkoutLogs(prev => [...prev, workout]);
  };

  const handleSaveDay = () => {
    if (trackedFoods.length > 0) {
      const newLog: FoodLog = {
        date: new Date().toISOString(),
        foods: trackedFoods,
        totals: nutritionData
      };
      setFoodLogs(prev => [...prev, newLog]);
      setTrackedFoods([]);
      setNutritionData({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* ✅ Fixed background logic */}
      <div 
        className={`fixed inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-160'}`}
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGES[currentSection]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          
        }}
      />
      
      <div className="min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
        {!isTracking ? (
          <Hero onStartTracking={() => setIsTracking(true)} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              
              {/* ✅ User Profile Form */}
              <div className="lg:col-span-3">
                <UserProfileForm 
                  onProfileSave={handleProfileSave}
                  initialProfile={userProfile || undefined}
                />
              </div>
              
              {/* ✅ Food Tracker */}
              <div className="space-y-8">
                <FoodTracker 
                  onNutritionUpdate={handleFoodUpdate}
                  trackedFoods={trackedFoods}
                />
                <button
                  onClick={handleSaveDay}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-md hover:from-red-600 hover:to-orange-600 transition-colors"
                >
                  Save Day's Log
                </button>
              </div>

              {/* ✅ Nutrition Chart */}
              <div>
                <NutritionChart data={nutritionData} />
              </div>

              {/* ✅ Weight Tracker */}
              <div>
                <WeightTracker 
                  weightLogs={weightLogs}
                  onWeightAdd={handleWeightAdd}
                />
              </div>

              {/* ✅ Workout Tracker */}
              <div className="lg:col-span-3">
                <WorkoutTracker onWorkoutSave={handleWorkoutSave} />
              </div>

              {/* ✅ Workout Summary */}
              {userProfile && (
                <div className="lg:col-span-3">
                  <WorkoutSummary 
                    workouts={workoutLogs}
                    targetCalories={userProfile.targetCalories}
                  />
                </div>
              )}

              {/* ✅ AI Advisor */}
              <div className="lg:col-span-3">
                <AIAdvisor 
                  userProfile={userProfile}
                  nutritionData={nutritionData}
                  trackedFoods={trackedFoods}
                />
              </div>

              {/* ✅ Food History */}
              <div className="lg:col-span-3">
                <FoodHistory foodLogs={foodLogs} />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
