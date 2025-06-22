import React from 'react';
import { History } from 'lucide-react';
import type { FoodLog } from '../types';

interface Props {
  foodLogs: FoodLog[];
}

export const FoodHistory: React.FC<Props> = ({ foodLogs }) => {
  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <History className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Food History</h2>
      </div>

      <div className="space-y-4">
        {foodLogs.map((log, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                {new Date(log.date).toLocaleDateString()}
              </h3>
              <span className="text-orange-500 font-bold">
                {log.totals.calories} kcal
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-4">
              <div>Protein: {log.totals.protein}g</div>
              <div>Carbs: {log.totals.carbs}g</div>
              <div>Fat: {log.totals.fat}g</div>
            </div>

            <div className="space-y-2">
              {log.foods.map((food, foodIndex) => (
                <div key={foodIndex} className="text-sm text-gray-300 flex justify-between">
                  <span>{food.name}</span>
                  <span>{food.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};