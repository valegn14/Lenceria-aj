import React, { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';
import { calculateRenewableShare } from '../../services/energyData';

export function EnergyCalculator() {
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const totalKwh = parseFloat(consumption);
    if (!isNaN(totalKwh)) {
      setResult(calculateRenewableShare(totalKwh));
    }
  };

  return (
    <section className="py-16 bg-transparent" id="calculator">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-8 w-8 text-sky-500" />
              <h2 className="text-3xl font-bold text-gray-800">Energy Calculator</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Consumption (kWh)
                </label>
                <input
                  type="number"
                  id="consumption"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500focus:border-transparent"
                  placeholder="Enter your monthly consumption"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Calculate Renewable Share
              </button>

              {result !== null && (
                <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                  <h3 className="text-lg font-semibold sky-500 mb-2">Results</h3>
                  <p className="text-gray-700">
                    Estimated renewable energy contribution:{' '}
                    <span className="font-bold text-sky-500">{result.toFixed(2)} kWh</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on current global renewable energy production data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
