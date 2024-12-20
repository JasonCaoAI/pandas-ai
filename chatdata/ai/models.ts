// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
  provider: 'openai' | 'azure';
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
    provider: 'openai',
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
    provider: 'openai',
  },
  {
    id: 'azure-gpt-4o-2024-0806',
    label: 'Azure GPT-4o-2024-0806',
    apiIdentifier: 'gpt-4o-2024-0806',
    description: 'Azure-hosted GPT-4o-2024-0806 model',
    provider: 'azure',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
