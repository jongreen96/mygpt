// TODO: Add models & data

export const models = {
  OpenAI: {
    'gpt-4o': {
      company: 'OpenAI',
      description:
        "GPT-4o is OpenAI's most advanced multimodal model that's faster and cheaper than GPT-4 Turbo with stronger vision capabilities. The model has 128K context and an October 2023 knowledge cutoff.",
      inputCost: 2.5,
      outputCost: 10,
    },
    'gpt-4o-mini': {
      company: 'OpenAI',
      description:
        "GPT-4o mini is OpenAI's most cost-efficient small model that's smarter and cheaper than GPT-3.5 Turbo, and has vision capabilities.",
      inputCost: 0.15,
      outputCost: 0.6,
    },
    /*
    'gpt-4o-audio-preview': {
      company: 'OpenAI',
      description:
        "GPT-4o is OpenAI's most advanced multimodal model that's faster and cheaper than GPT-4 Turbo with stronger vision capabilities. The model has 128K context and an October 2023 knowledge cutoff.",
      text: {
        inputCost: 2.5,
        outputCost: 10,
      },
      audio: {
        inputCost: 40,
        outputCost: 80,
      },
    }
    // o1 is awaiting Tier 5 ($1000 spent)
    'o1': {
      company: 'OpenAI',
      description:
        "o1 is OpenAI's most powerful reasoning model that supports tools, Structured Outputs, and vision. The model has 200K context and an October 2023 knowledge cutoff.",
      inputCost: 15,
      outputCost: 60,
    },
    */
    'o1-mini': {
      company: 'OpenAI',
      description:
        "o1-mini is OpenAI's small reasoning model that thinks faster than o1 and is optimized for coding and math.",
      inputCost: 3,
      outputCost: 12,
    },
    'gpt-4': {
      company: 'OpenAI',
      description:
        "GPT-4 is an older version of OpenAI's high-intelligence GPT models, usable in Chat Completions. The knowledge cutoff for the latest GPT-4 Turbo version is December, 2023.",
      inputCost: 30,
      outputCost: 60,
    },
    'gpt-4-turbo': {
      company: 'OpenAI',
      description:
        "GPT-4 turbo is an older version of OpenAI's high-intelligence GPT models, usable in Chat Completions. The knowledge cutoff for the latest GPT-4 Turbo version is December, 2023.",
      inputCost: 10,
      outputCost: 30,
    },
    'gpt-3.5-turbo': {
      company: 'OpenAI',
      description:
        'GPT-3.5 Turbo can understand and generate natural language or code and have been optimized for chat, but work well for non-chat tasks as well.',
      inputCost: 0.5,
      outputCost: 1.5,
    },
  },
};

export const defaultModelSettings = {
  model: 'gpt-4o-mini',
  maxTokens: 0,
  temperature: 1,
  topP: 1,
  presencePenalty: 0,
  frequencyPenalty: 0,
};

export type ModelSettingsType = typeof defaultModelSettings;
