import { NicheData } from '../types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export async function callOpenRouter(
  prompt: string,
  apiKey: string,
  model: string
): Promise<string> {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.href,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from OpenRouter');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function analyzeNicheWithAI(
  niche: string,
  apiKey: string,
  model: string
): Promise<NicheData> {
  const prompt = `Analyze the following niche for affiliate marketing: "${niche}"
  Provide a structured analysis including:
  1. Competition level
  2. Market size
  3. Growth potential
  4. Two recommended sub-niches with descriptions
  5. Five low-competition keywords with search volume and difficulty
  6. Two content ideas with outlines and writing prompts
  Format as JSON matching the following TypeScript interface:
  ${JSON.stringify(NicheData, null, 2)}`;

  const response = await callOpenRouter(prompt, apiKey, model);
  return JSON.parse(response);
}