import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import type { UserProfile, NutritionData, FoodItem } from '../types';

interface Props {
  userProfile: UserProfile | null;
  nutritionData: NutritionData;
  trackedFoods: FoodItem[];
}

export const AIAdvisor: React.FC<Props> = ({ userProfile, nutritionData, trackedFoods }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateAdvice = () => {
      if (!userProfile) return;

      setLoading(true);

      // Simulate AI response with practical nutrition advice
      const totalCalories = nutritionData.calories;
      const targetCalories = userProfile.targetCalories;
      const proteinGoal = userProfile.weight * 2; // 2g per kg of body weight
      const currentProtein = nutritionData.protein;

      let adviceText = '';

      // Calorie-based advice
      if (totalCalories > targetCalories) {
        adviceText += `You're currently ${totalCalories - targetCalories}kcal over your daily target. Consider lighter alternatives like ragi roti instead of naan. `;
      } else if (totalCalories < targetCalories * 0.7) {
        adviceText += `You're significantly under your calorie target. Consider adding nutrient-dense foods like paneer or lentils to your meals. `;
      }

      // Protein-based advice
      if (currentProtein < proteinGoal * 0.7) {
        adviceText += `Your protein intake is low. Try adding more dal, paneer, or lean meats to meet your ${proteinGoal}g daily target. `;
      }

      // Macronutrient balance advice
      const carbPercentage = (nutritionData.carbs * 4) / totalCalories * 100;
      if (carbPercentage > 60) {
        adviceText += `Your meal is very high in carbs. Consider balancing with more vegetables and protein sources. `;
      }

      // Time-based suggestions
      const hour = new Date().getHours();
      if (hour > 20 && totalCalories > 500) {
        adviceText += `Having heavy meals late at night may affect sleep quality. Consider lighter dinner options like dal soup or vegetable curry. `;
      }

      // Goal-specific advice
      if (userProfile.goal === 'lose') {
        adviceText += `For weight loss, try incorporating more fiber-rich foods like vegetables and whole grains to stay fuller longer. `;
      } else if (userProfile.goal === 'gain') {
        adviceText += `To support muscle gain, ensure you're having protein-rich foods like paneer or dal with each meal. `;
      }

      setAdvice(adviceText || 'Keep tracking your meals for personalized nutrition advice!');
      setLoading(false);
    };

    if (userProfile && trackedFoods.length > 0) {
      generateAdvice();
    }
  }, [userProfile, nutritionData, trackedFoods]);

  if (!userProfile) return null;

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">AI Nutrition Advisor</h2>
      </div>
      
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-200 leading-relaxed">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
};