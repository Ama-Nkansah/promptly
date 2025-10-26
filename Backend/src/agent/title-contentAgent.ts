import { generateTitle } from "../tools/generate-title.js";
import { chatModel } from "../llm/ollama-client.js";


export const handleUserTask = async (task: string, content: string) => {
    if (/title/i.test(task)) {
        const title = await generateTitle(content);
        console.log(title)
        return { type: task, result: title }
    }

    if (/rewrite/i.test(task)) {
        const prompt = `Rewrite the following content in a more engaging tone:\n\n${content}`;
        const rewritten = await chatModel(prompt);
        return { type: "rewrite", result: rewritten };
    }

    const generic = await chatModel(content);
    return { type: "generic", result: generic };
}