import { chatModel } from "../llm/ollama-client.js";


export const generateTitle = async (topic: string) => {
    const prompt = `Generate a catchy and concise title for a blog post about : ${topic}`;
    return await chatModel(prompt);
}
