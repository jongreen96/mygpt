// TODO: Add models & data

export const models = {
  OpenAI: {
    'gpt-4o': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    'gpt-4o-mini': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    // 'gpt-4o-audio-preview': {}
    o1: {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    'o1-mini': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    'gpt-4': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    'gpt-4-turbo': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
    'gpt-3.5-turbo': {
      description: '',
      inputCost: 1,
      outputCost: 1,
    },
  },
};

export const defaultModelSettings = {
  model: 'gpt-4o-mini',
};

export type ModelSettingsType = typeof defaultModelSettings;
