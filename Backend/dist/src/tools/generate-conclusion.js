import { chatModel } from "../llm/ollama-client.js";
export const generateConclusion = async (topic, value) => {
    const prompt = `Generate a catchy and concise conclusion for a blog post about : ${topic} and remove all formatting . Keep it between 50–80 words And remove all line breaks.`;
    if (value !== 0) {
        const prompt = `Generate ${value} catchy  conclusion for a blog post about : ${topic} with no numbering and remove all formatting . Keep each intro between 50–80 words include line breaks.`;
        return await chatModel(prompt);
    }
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-conclusion.js.map