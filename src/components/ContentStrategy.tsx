import React from 'react';
import { FileText, List, Lightbulb } from 'lucide-react';
import type { ContentSuggestion } from '../types';

interface ContentStrategyProps {
  niche: string;
  suggestions: ContentSuggestion[];
}

function ContentStrategy({ niche, suggestions }: ContentStrategyProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-5 w-5 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Content Strategy</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {suggestion.title}
            </h3>

            <div className="mb-6">
              <div className="flex items-center space-x-2 text-gray-700 mb-3">
                <List className="h-4 w-4" />
                <h4 className="font-medium">Content Outline</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                {suggestion.outline.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-2 text-gray-700 mb-3">
                <Lightbulb className="h-4 w-4" />
                <h4 className="font-medium">Writing Prompt</h4>
              </div>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {suggestion.writingPrompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentStrategy;