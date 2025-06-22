import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { indianFoods } from '../data/foods';
import type { FoodItem, NutritionData } from '../types';

interface Props {
  onNutritionUpdate: (foods: FoodItem[], totals: NutritionData) => void;
  trackedFoods: FoodItem[];
}

export const FoodTracker: React.FC<Props> = ({ onNutritionUpdate, trackedFoods }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (search.length >= 2) {
      setSuggestions(
        indianFoods.filter(food => food.name.toLowerCase().includes(search.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  }, [search]);

  useEffect(() => {
    if (!trackedFoods) return;
    const totals = trackedFoods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    onNutritionUpdate(trackedFoods, totals);
  }, [trackedFoods]);

  const addFood = (food: FoodItem) => {
    const updatedFoods = [...trackedFoods, food];

    const newTotals = updatedFoods.reduce(
      (acc, f) => ({
        calories: acc.calories + f.calories,
        protein: acc.protein + f.protein,
        carbs: acc.carbs + f.carbs,
        fat: acc.fat + f.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    onNutritionUpdate(updatedFoods, newTotals);
    setSearch('');
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Indian foods..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl z-10">
            {suggestions.map((food) => (
              <button
                key={food.id}
                onClick={() => addFood(food)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="text-white">{food.name}</span>
                <Plus size={20} className="text-orange-500" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {trackedFoods?.length > 0 ? (
          trackedFoods.map((food) => (
            <div
              key={food.id}
              className="bg-gray-800 rounded-lg p-4 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">{food.name}</h3>
                <span className="text-orange-500 font-bold">{food.calories} kcal</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-gray-400">
                <div>Protein: {food.protein}g</div>
                <div>Carbs: {food.carbs}g</div>
                <div>Fat: {food.fat}g</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No foods tracked yet.</p>
        )}
      </div>
    </div>
  );
};
