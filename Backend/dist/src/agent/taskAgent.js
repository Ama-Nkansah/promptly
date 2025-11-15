import { generateTitle } from "../tools/generate-title.js";
import { chatModel } from "../llm/ollama-client.js";
import { generateIntro } from "../tools/generate-intro.js";
import { generateBody } from "../tools/generate-body.js";
import { generateConclusion } from "../tools/generate-conclusion.js";
export const handleUserTask = async (task, content, value, sectionCount) => {
    console.log(`Handling task: ${task} with content: ${content} and value: ${value}`);
    if (/title/i.test(task) && !value) {
        const title = await generateTitle(content);
        console.log(title);
        return { type: task, result: title };
    }
    if (/title/i.test(task) && value) {
        const result = await generateTitle(content, value);
        const titles = result.split('\n').map((title) => title.trim()).filter((title) => title.trim() !== '');
        return { type: task, result: titles };
    }
    if (/introduction/i.test(task) || /intro/i.test(task) && !value) {
        const result = await generateIntro(content, value);
        console.log(result);
        return { type: task, result: result };
    }
    if (/(introduction|intro)/i.test(task) && value) {
        const result = await generateIntro(content, value);
        const intros = result.split('\n').map((intro) => intro.trim()).filter((intro) => intro.trim() !== '');
        return { type: task, result: intros };
    }
    if (/generate body/i.test(task) || /body/i.test(task) && !sectionCount) {
        const body = await generateBody(content);
        return { type: "body", result: body };
    }
    if (/(generate body|body)/i.test(task) && sectionCount) {
        const body = await generateBody(content, sectionCount);
        return { type: "body", result: body };
    }
    if (/conclusion/i.test(task) && !value) {
        const conclusion = await generateConclusion(content);
        return { type: "conclusion", result: conclusion };
    }
    if (/conclusion/i.test(task) && value) {
        const result = await generateConclusion(content, value);
        const conclusions = result.split('\n').map((conclusion) => conclusion.trim()).filter((conclusion) => conclusion.trim() !== '');
        return { type: task, result: conclusions };
    }
    if (/rewrite/i.test(task)) {
        const prompt = `Rewrite the following content in a more engaging tone:\n\n${content}`;
        const rewritten = await chatModel(prompt);
        return { type: "rewrite", result: rewritten };
    }
    const generic = await chatModel(content);
    return { type: "generic", result: generic };
};
//# sourceMappingURL=taskAgent.js.map