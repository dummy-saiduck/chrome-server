// Minimal local OpenAI loader used by the project to avoid external @ai-sdk/openai dependency.
export function openai(modelName: string) {
  return {
    provider: "openai",
    model: modelName,
  } as const;
}

export type OpenAIModel = ReturnType<typeof openai>;
