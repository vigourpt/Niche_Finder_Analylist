import React from 'react';
import { Search } from 'lucide-react';
import type { Keyword } from '../types';

interface KeywordSuggestionsProps {
  keywords: Keyword[];
}

function KeywordSuggestions({ keywords }: KeywordSuggestionsProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="h-5 w-5 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Keyword Opportunities</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Search Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keywords.map((keyword, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {keyword.term}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.searchVolume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${keyword.difficulty}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{keyword.difficulty}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KeywordSuggestions;