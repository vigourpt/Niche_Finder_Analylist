import React from 'react';
import { TrendingUp, Users, Target, GitBranch } from 'lucide-react';
import type { NicheData } from '../types';

interface NicheAnalysisProps {
  data: NicheData;
}

function NicheAnalysis({ data }: NicheAnalysisProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Niche Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-gray-900">Competition Level</h3>
          </div>
          <p className="text-gray-600">{data.competitionLevel}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-gray-900">Market Size</h3>
          </div>
          <p className="text-gray-600">{data.marketSize}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-gray-900">Growth Potential</h3>
          </div>
          <p className="text-gray-600">{data.growthPotential}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <GitBranch className="h-5 w-5 text-indigo-600" />
          <h3 className="font-medium text-gray-900">Recommended Sub-Niches</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.subNiches.map((subNiche, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{subNiche.name}</h4>
              <p className="text-gray-600 text-sm">{subNiche.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NicheAnalysis;