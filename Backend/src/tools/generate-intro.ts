import { chatModel } from "../llm/ollama-client.js";


export const generateIntro = async (topic: string, value?: number) => {
    const prompt = `Generate a catchy and concise Intro for a blog post about : ${topic} and remove all formatting . Keep it between 50–80 words`;

    // value param to specify number of titles
    if (value !== 0) {
        const prompt = `Generate ${value} catchy  Intros for a blog post about : ${topic} with no numbering and remove all formatting . Keep each intro between 50–80 words`;
    return await chatModel(prompt);
    }

    return await chatModel(prompt);
}