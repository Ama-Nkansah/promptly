import { chatModel } from "../llm/ollama-client.js";


export const generateConclusion = async (topic: string, value?: number) => {
    const prompt = `Generate a catchy and concise conclusion for a blog post about : ${topic}. Keep it between 50–80 words.`;

    // value param to specify number of titles
    if (value !== 0) {
        const prompt = `Generate ${value} catchy  conclusion for a blog post about : ${topic}. Keep each intro between 50–80 words.`;
    return await chatModel(prompt);
    }

    return await chatModel(prompt);
}