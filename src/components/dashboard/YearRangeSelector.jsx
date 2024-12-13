import React from 'react';
import { Calendar } from 'lucide-react';

export default function YearRangeSelector({
  startYear,
  endYear,
  minYear,
  maxYear,
  onStartYearChange,
  onEndYearChange,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-6 w-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-800">Select Year Range</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-2">
            Start Year
          </label>
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => onStartYearChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
              <option key={year} value={year} disabled={year > endYear}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-2">
            End Year
          </label>
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => onEndYearChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
              <option key={year} value={year} disabled={year < startYear}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
