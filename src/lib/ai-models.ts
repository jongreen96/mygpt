// TODO: Add models & data

export const defaultChatModel = 'gpt-4o-mini';

export const models = {
  'gpt-4o': {
    company: 'OpenAI',
    type: 'multimodal',
    description:
      "GPT-4o is OpenAI's most advanced multimodal model that's faster and cheaper than GPT-4 Turbo with stronger vision capabilities. The model has 128K context and an October 2023 knowledge cutoff.",
    inputCost: 2.5,
    outputCost: 10,
  },
  'gpt-4o-mini': {
    company: 'OpenAI',
    type: 'multimodal',
    description:
      "GPT-4o mini is OpenAI's most cost-efficient small model that's smarter and cheaper than GPT-3.5 Turbo, and has vision capabilities.",
    inputCost: 0.15,
    outputCost: 0.6,
  },
  // o1: {
  //   company: 'OpenAI',
  //   type: 'multimodal',
  //   description:
  //     "o1 is OpenAI's most powerful reasoning model that supports tools, Structured Outputs, and vision. The model has 200K context and an October 2023 knowledge cutoff.",
  //   inputCost: 15,
  //   outputCost: 60,
  // },
  'o1-mini': {
    company: 'OpenAI',
    type: 'multimodal',
    description:
      "o1-mini is OpenAI's small reasoning model that thinks faster than o1 and is optimized for coding and math.",
    inputCost: 3,
    outputCost: 12,
  },
  // 'o3-mini': {
  //   company: 'OpenAI',
  //   type: 'chat',
  //   description:
  //     "o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-mini. Like other models in the o-series, it is designed to excel at science, math, and coding tasks. The knowledge cutoff for o3-mini models is October, 2023.",
  //   inputCost: 3,
  //   outputCost: 12,
  // },
  'gpt-4': {
    company: 'OpenAI',
    type: 'chat',
    description:
      "GPT-4 is an older version of OpenAI's high-intelligence GPT models, usable in Chat Completions. The knowledge cutoff for the latest GPT-4 Turbo version is December, 2023.",
    inputCost: 30,
    outputCost: 60,
  },
  'gpt-4-turbo': {
    company: 'OpenAI',
    type: 'multimodal',
    description:
      "GPT-4 turbo is an older version of OpenAI's high-intelligence GPT models, usable in Chat Completions. The knowledge cutoff for the latest GPT-4 Turbo version is December, 2023.",
    inputCost: 10,
    outputCost: 30,
  },
  'gpt-3.5-turbo': {
    company: 'OpenAI',
    type: 'chat',
    description:
      'GPT-3.5 Turbo can understand and generate natural language or code and have been optimized for chat, but work well for non-chat tasks as well.',
    inputCost: 0.5,
    outputCost: 1.5,
  },
  'dall-e-2': {
    company: 'OpenAI',
    type: 'image',
    description:
      'DALL·E·2 is a AI system that can create images and art from a description in natural language. DALL·E 2 currently supports the ability, given a prompt, to create a new image with a specific size.',
    inputCost: 0,
    outputCost: 0.08,
  },
  'dall-e-3': {
    company: 'OpenAI',
    type: 'image',
    description:
      'DALL·E·3 is a AI system that can create realistic images and art from a description in natural language. DALL·E 3 currently supports the ability, given a prompt, to create a new image with a specific size.',
    inputCost: 0,
    outputCost: 0.12,
  },
};

export type ModelListType = keyof typeof models;
