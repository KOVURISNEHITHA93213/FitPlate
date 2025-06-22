import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { NutritionData } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: NutritionData;
}

export const NutritionChart: React.FC<Props> = ({ data = { calories: 0, protein: 0, carbs: 0, fat: 0 } }) => {
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [
          (data?.protein || 0) * 4,
          (data?.carbs || 0) * 4,
          (data?.fat || 0) * 9
        ],
        backgroundColor: [
          '#FF4D4D',
          '#00FF88',
          '#FFB800'
        ],
        borderColor: [
          '#FF4D4D80',
          '#00FF8880',
          '#FFB80080'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Pie data={chartData} options={options} />
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="bg-[#FF4D4D20] p-4 rounded-lg">
          <p className="text-[#FF4D4D] font-bold">{data?.protein || 0}g</p>
          <p className="text-sm text-gray-300">Protein</p>
        </div>
        <div className="bg-[#00FF8820] p-4 rounded-lg">
          <p className="text-[#00FF88] font-bold">{data?.carbs || 0}g</p>
          <p className="text-sm text-gray-300">Carbs</p>
        </div>
        <div className="bg-[#FFB80020] p-4 rounded-lg">
          <p className="text-[#FFB800] font-bold">{data?.fat || 0}g</p>
          <p className="text-sm text-gray-300">Fat</p>
        </div>
      </div>
    </div>
  );
};