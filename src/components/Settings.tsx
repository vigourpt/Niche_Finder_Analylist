import React, { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import type { Settings } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsPanel({ settings, onSave }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  API Key
                </label>
                <select
                  value={formData.apiType || 'openrouter'}
                  onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="openrouter">OpenRouter API</option>
                  <option value="openai">OpenAI API</option>
                </select>
                <input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder={formData.apiType === 'openai' ? 'Enter OpenAI API Key' : 'Enter OpenRouter API Key'}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  AI Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  {formData.apiType === 'openai' ? (
                    <>
                      <option value="gpt-4o">GPT-4o</option>
                      <option value="gpt-4">GPT-4</option>
                    </>
                  ) : (
                    <>
                      <option value="anthropic/claude-3.5-opus">Claude 3.5 Opus - Anthropic</option>
                      <option value="anthropic/claude-3.5-haiku">Claude 2 - Anthropic</option>
                      <option value="openai/gpt-4o">GPT-4o - OpenAI</option>
                      <option value="google/gemini-pro">Gemini Pro - Google</option>
                      <option value="meta-llama/llama-2-70b-chat">Llama 2 70B - Meta</option>
                      <option value="mistral/mixtral-8x7b">Mixtral - Mistral</option>
                    </>
                  )}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}