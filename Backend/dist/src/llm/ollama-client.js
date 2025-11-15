import { Ollama } from "ollama";
import { configDotenv } from "dotenv";
configDotenv();


const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
});


export const chatModel = async (prompt) => {
    try {
        console.log("Prompt:", prompt);
        const response = await ollama.chat({
            model: "gpt-oss:120b-cloud",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant that formats all responses in HTML with Tailwind CSS classes.
                    
Rules for your output:
- Wrap your entire response in a parent <div> with Tailwind classes for spacing and layout
- Use semantic HTML tags with appropriate Tailwind styling
- Apply Tailwind classes for typography, spacing, and visual hierarchy
- Do not include <html>, <head>, or <body> tags
- Ensure all HTML is valid and properly nested

Tailwind styling guidelines:
- Headings: Use text-2xl, text-xl, text-lg with font-bold or font-semibold
- Paragraphs: Use text-base, text-gray-700, with mb-4 for spacing
- Lists: Use space-y-2 for list spacing, ml-6 for indentation
- Code: Use bg-gray-100, px-2, py-1, rounded, font-mono for inline code
- Code blocks: Use bg-gray-900, text-gray-100, p-4, rounded-lg, overflow-x-auto
- Emphasis: Use font-bold or font-semibold for strong, italic for em
- Quotes: Use border-l-4, border-gray-300, pl-4, italic
- Spacing: Use mb-4 or mb-6 between sections
- Links: Use text-blue-600, hover:text-blue-800, underline

Example structure:
<div class="space-y-4 p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Title</h2>
    <p class="text-base text-gray-700 leading-relaxed">Content here...</p>
    <ul class="list-disc ml-6 space-y-2 text-gray-700">
        <li>Item one</li>
        <li>Item two</li>
    </ul>
</div>`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        });
        console.log(response);
        return response.message.content;
    }
    catch (error) {
        console.log("Error:", error);
    }
};
//# sourceMappingURL=ollama-client.js.map