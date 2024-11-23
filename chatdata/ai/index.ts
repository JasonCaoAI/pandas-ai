import { createAzure } from '@ai-sdk/azure';
import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string, provider: 'openai' | 'azure') => {
  return wrapLanguageModel({
    model: provider === 'openai' ? openai(apiIdentifier) : 
    createAzure({
        baseURL: process.env.AZURE_OPENAI_ENDPOINT,
        apiKey: process.env.AZURE_OPENAI_API_KEY,
      })(process.env.AZURE_OPENAI_DEPLOYMENT_NAME ?? ''),

    middleware: customMiddleware,
  });
};
