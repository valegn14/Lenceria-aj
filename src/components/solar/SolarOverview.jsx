import React from 'react';
import { Sun, Leaf, DollarSign } from 'lucide-react';

export function SolarOverview() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Solar Energy: Powering a Sustainable Future
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-md">
            <Sun className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">How It Works</h3>
            <p className="text-gray-600">
              Solar panels convert sunlight into electricity through photovoltaic cells, 
              providing clean, renewable energy directly from the sun.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-md">
            <Leaf className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
            <p className="text-gray-600">
              Solar energy reduces carbon emissions, requires minimal water usage, 
              and helps combat climate change with zero pollution during operation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md">
            <DollarSign className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Economic Benefits</h3>
            <p className="text-gray-600">
              Investing in solar power reduces electricity bills, provides energy independence, 
              and often comes with tax incentives and rebates.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Statistics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-yellow-500">1,000+ GW</p>
              <p className="text-gray-600">Global Solar Capacity</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-yellow-500">3%</p>
              <p className="text-gray-600">Global Electricity Share</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-yellow-500">70%</p>
              <p className="text-gray-600">Cost Reduction Since 2010</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-yellow-500">25+ Years</p>
              <p className="text-gray-600">Average Panel Lifespan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
