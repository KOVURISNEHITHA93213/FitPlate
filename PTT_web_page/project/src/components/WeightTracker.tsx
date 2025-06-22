import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Scale } from 'lucide-react';
import type { WeightLog } from '../types';

interface Props {
  weightLogs: WeightLog[];
  onWeightAdd: (weight: number) => void;
}

export const WeightTracker: React.FC<Props> = ({ weightLogs, onWeightAdd }) => {
  const [newWeight, setNewWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWeight) {
      onWeightAdd(Number(newWeight));
      setNewWeight('');
    }
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Weight Tracker</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Enter weight (kg)"
          className="flex-1 px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          step="0.1"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-6 rounded-md hover:from-red-600 hover:to-orange-600 transition-colors"
        >
          Log Weight
        </button>
      </form>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightLogs}>
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ fill: '#f97316' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};