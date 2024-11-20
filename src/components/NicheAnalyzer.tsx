import React, { useState } from 'react';
import { Search, ArrowRight, Wrench, Download, GitBranch, Loader2 } from 'lucide-react';
import { NicheData } from '../types';

interface NicheAnalyzerProps {
  onAnalyze: (niche: string) => Promise<void>;
  result: NicheData | null;
  isLoading: boolean;
  error: string | null;
}

export function NicheAnalyzer({ onAnalyze, result, isLoading, error }: NicheAnalyzerProps) {
  const [niche, setNiche] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (niche.trim()) {
      onAnalyze(niche.trim());
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConversionColor = (potential: string) => {
    switch (potential.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Enter your niche (e.g., credit cards, pet supplies, fitness equipment)"
            className="w-full p-4 pr-12 text-lg border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !niche.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-600">
          {error}
        </div>
      )}

      {result && !isLoading && (
        <div className="space-y-8">
          {/* Main Analysis Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Market Position</h3>
                <p className="text-gray-600">{result.position}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Suggested Focus</h3>
                <p className="text-gray-600">{result.suggestedFocus}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Keywords</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {result.keywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Content Strategy</h3>
                <p className="text-gray-600">{result.contentStrategy}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Detailed Analysis</h3>
                <p className="text-gray-600">{result.analysis}</p>
              </div>
            </div>
          </div>

          {/* Alternative Niches Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center space-x-2 mb-4">
              <GitBranch className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Alternative Niches</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {result.alternatives?.map((alternative, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{alternative.niche}</h4>
                      <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${getDifficultyColor(alternative.difficulty)}`}>
                        {alternative.difficulty} Difficulty
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alternative.rationale}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Competition:</span> {alternative.competition}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Monthly Traffic:</span> {alternative.monthlyTraffic}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Profit Potential:</span> {alternative.profitPotential}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Startup Cost:</span> {alternative.startupCost}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Time to First Sale:</span> {alternative.timeToFirstSale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Backdoors Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hidden Traffic Opportunities</h3>
            <div className="grid gap-4">
              {result.trafficBackdoors?.map((backdoor, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{backdoor.channel}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(backdoor.difficulty)}`}>
                      {backdoor.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{backdoor.strategy}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>Potential Traffic: {backdoor.potentialTraffic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Generation Tools Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Lead Generation Tools</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {result.tools?.map((tool, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{tool.name}</h4>
                      <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 mt-1">
                        {tool.type}
                      </span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${getDifficultyColor(tool.complexity)}`}>
                      {tool.complexity} to Build
                    </span>
                    <span className={`font-medium ${getConversionColor(tool.conversionPotential)}`}>
                      {tool.conversionPotential} Conversion Rate
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}