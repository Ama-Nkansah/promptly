import { chatModel } from "../llm/ollama-client.js";
export const generateBody = async (topic, sectionCount) => {
    if (sectionCount && sectionCount !== 0) {
        const prompt = `
Write the main body of a blog post about: ${topic}

Requirements:
- Create exactly ${sectionCount} sections, each with a descriptive subheading
- Each section should have 2-3 paragraphs exploring one main idea
- Include relevant examples, statistics, or describe visual concepts where appropriate
- Use bullet points or numbered lists to break down complex information
- End each section with a key takeaway or transition to the next idea

Style guidelines:
- Write in a conversational, engaging, and accessible tone
- Use short, scannable paragraphs (2-4 sentences each)
- Incorporate storytelling elements or real-world scenarios when relevant
- Make the content actionable and practical
- Target total length: 400-600 words
    `;
        return await chatModel(prompt);
    }
    const prompt = `
Write the main body of a blog post about: ${topic}

Requirements:
- Organize content into 3-4 natural sections with clear topic flow
- Each section should have 2-3 paragraphs exploring one main idea
- Include relevant examples, statistics, or describe visual concepts where appropriate
- Use bullet points or numbered lists to break down complex information
- Create smooth transitions between ideas

Style guidelines:
- Write in a conversational, engaging, and accessible tone
- Use short, scannable paragraphs (2-4 sentences each)
- Incorporate storytelling elements or real-world scenarios when relevant
- Make the content actionable and practical
- Target total length: 400-600 words
  `;
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-body.js.map