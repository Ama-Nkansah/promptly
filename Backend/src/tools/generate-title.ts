import { chatModel } from "../llm/ollama-client.js";


export const generateTitle = async (topic: string, value?: number) => {
    const prompt = `Generate a catchy and concise title for a blog post about : ${topic}, remove all formatting`;

    // value param to specify number of titles
    if (value) {
        const prompt = `Generate ${value} catchy and concise titles for a blog post about : ${topic} ,with no numbering and  remove all formatting`;
    return await chatModel(prompt);
    }

    return await chatModel(prompt);
}
