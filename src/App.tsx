import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './components/Settings';
import { NicheAnalyzer } from './components/NicheAnalyzer';
import type { Settings, NicheData } from './types';

export default function App() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      apiKey: '',
      apiType: 'openrouter',
      model: 'anthropic/claude-3-opus'
    };
  });

  const [result, setResult] = useState<NicheData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const parseAIResponse = (content: string): NicheData => {
    try {
      return JSON.parse(content);
    } catch (e) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Could not parse AI response as JSON');
    }
  };

  const analyzeNiche = async (niche: string) => {
    if (!settings.apiKey) {
      setError('Please set your API key in settings first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (settings.apiType === 'openai') {
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${settings.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: settings.model,
            messages: [{
              role: 'user',
              content: `Analyze this niche market: "${niche}". Focus on beginner-friendly opportunities with low competition. If the niche is too competitive, suggest 3 closely related but easier alternatives. Return ONLY a JSON object with this structure:
{
  "position": "Brief description of current market position",
  "suggestedFocus": "Specific focus area recommendation for beginners",
  "keywords": ["keyword1", "keyword2", ...],
  "contentStrategy": "Content strategy overview focused on beginner-friendly approach",
  "analysis": "Detailed market analysis with emphasis on entry barriers",
  "trafficBackdoors": [
    {
      "channel": "Specific low-competition topic related to high-CPC main topic",
      "strategy": "How to leverage this opportunity as a beginner",
      "difficulty": "Easy",
      "potentialTraffic": "Estimated monthly visitors"
    }
  ],
  "tools": [
    {
      "name": "Tool name",
      "description": "Tool description",
      "type": "Calculator|Template|Checklist|Generator",
      "complexity": "Simple",
      "conversionPotential": "High|Medium|Low"
    }
  ],
  "alternatives": [
    {
      "niche": "More specific sub-niche",
      "difficulty": "Easy",
      "competition": "Low competition level description",
      "potential": "Revenue potential for beginners",
      "rationale": "Why this is good for beginners",
      "monthlyTraffic": "Estimated monthly visitors",
      "profitPotential": "Estimated monthly profit range",
      "startupCost": "Initial investment needed",
      "timeToFirstSale": "Estimated time to first sale"
    }
  ]
}`
            }]
          })
        });
      } else {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${settings.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
          },
          body: JSON.stringify({
            model: settings.model,
            messages: [{
              role: 'user',
              content: `Analyze this niche market: "${niche}". Focus on beginner-friendly opportunities with low competition. If the niche is too competitive, suggest 3 closely related but easier alternatives. Return ONLY a JSON object with this structure:
{
  "position": "Brief description of current market position",
  "suggestedFocus": "Specific focus area recommendation for beginners",
  "keywords": ["keyword1", "keyword2", ...],
  "contentStrategy": "Content strategy overview focused on beginner-friendly approach",
  "analysis": "Detailed market analysis with emphasis on entry barriers",
  "trafficBackdoors": [
    {
      "channel": "Specific low-competition topic related to high-CPC main topic",
      "strategy": "How to leverage this opportunity as a beginner",
      "difficulty": "Easy",
      "potentialTraffic": "Estimated monthly visitors"
    }
  ],
  "tools": [
    {
      "name": "Tool name",
      "description": "Tool description",
      "type": "Calculator|Template|Checklist|Generator",
      "complexity": "Simple",
      "conversionPotential": "High|Medium|Low"
    }
  ],
  "alternatives": [
    {
      "niche": "More specific sub-niche",
      "difficulty": "Easy",
      "competition": "Low competition level description",
      "potential": "Revenue potential for beginners",
      "rationale": "Why this is good for beginners",
      "monthlyTraffic": "Estimated monthly visitors",
      "profitPotential": "Estimated monthly profit range",
      "startupCost": "Initial investment needed",
      "timeToFirstSale": "Estimated time to first sale"
    }
  ]
}`
            }]
          })
        });
      }

      if (!response.ok) {
        throw new Error('Failed to analyze niche');
      }

      const data = await response.json();
      const nicheData = parseAIResponse(data.choices[0].message.content);
      setResult(nicheData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsPanel settings={settings} onSave={setSettings} />
      
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beginner-Friendly Niche Analyzer
          </h1>
          <p className="text-gray-600">
            Discover low-competition niches perfect for beginners
          </p>
        </div>

        <NicheAnalyzer
          onAnalyze={analyzeNiche}
          result={result}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}