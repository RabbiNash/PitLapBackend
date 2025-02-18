import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface Message {
  role: 'system' | 'user';
  content: string;
}

interface ChatRequest {
  model: string;
  messages: Message[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  search_domain_filter?: string | null;
  search_recency_filter?: string | null;
}

export const summariseWeatherInfo = async (
  question: string,
  apiKey: string = process.env.PERPLEXITY_API_KEY || '',
  systemPrompt: string = "Be precise and concise. i need only 10 words describing the weather, be witty and fun and also include the name of the city",
  apiUrl: string = 'https://api.perplexity.ai/chat/completions'
): Promise<any> => {
  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: question }
  ];

  const requestBody: ChatRequest = {
    model: 'sonar',
    messages,
    max_tokens: 123,
    temperature: 0.2,
    top_p: 0.9,
    search_domain_filter: null,
    search_recency_filter: null
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw new Error(`Failed to get answer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
