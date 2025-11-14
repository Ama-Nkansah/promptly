import { chatModel } from "../llm/ollama-client.js";
export const generateBody = async (topic, sectionCount) => {
    const prompt = `
Write the main body of a blog post about: ${topic}.
Split the content into clear sections 
Each section should:
- Introduce one main idea
- Use examples, statistics, or visuals (describe them briefly)
- End with a short takeaway or summary line

Write in a conversational and engaging tone.
Use short paragraphs and bullet points where appropriate.
Do not include any formatting symbols (like ** , ##,  \\n\\n).
And remove all line breaks.
Keep the total length between 400–600 words.
  `;
    if (sectionCount && sectionCount !== 0) {
        const prompt = `
Write the main body of a blog post about: ${topic}.
Generate ${sectionCount} sections with clear subheadings.
Each section should:
- Introduce one main idea
- Use examples, statistics, or visuals (describe them briefly)
- End with a short takeaway or summary line

Write in a conversational and engaging tone.
Use short paragraphs and bullet points where appropriate.
Do not include any formatting symbols (like ** , ##, \\n\\n).
And remove all line breaks.
Keep the total length between 400–600 words.
    `;
        return await chatModel(prompt);
    }
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-body.js.map