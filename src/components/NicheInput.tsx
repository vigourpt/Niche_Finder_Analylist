import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface NicheInputProps {
  onSubmit: (niche: string) => void;
  loading: boolean;
}

function NicheInput({ onSubmit, loading }: NicheInputProps) {
  const [niche, setNiche] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (niche.trim()) {
      onSubmit(niche.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Find Your Perfect Affiliate Marketing Niche
      </h1>
      <p className="text-gray-600 mb-8">
        Enter your interest area and we'll help you discover profitable opportunities
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., vegan recipes for kids"
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            disabled={loading}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Niche'
          )}
        </button>
      </form>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {['Research', 'Analyze', 'Succeed'].map((step, index) => (
          <div key={step} className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
              {index + 1}
            </div>
            <h3 className="font-medium text-gray-900">{step}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NicheInput;