import { chatModel } from "../llm/ollama-client.js";
export const generateIntro = async (topic, value) => {
    const prompt = `Generate a catchy and concise Intro for a blog post about : ${topic} and remove all formatting . Keep it between 50–80 words`;
    if (value !== 0) {
        const prompt = `Generate ${value} catchy  Intros for a blog post about : ${topic} with no numbering and remove all formatting . Keep each intro between 50–80 words`;
        return await chatModel(prompt);
    }
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-intro.js.map