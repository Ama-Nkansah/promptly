import { Ollama } from "ollama";
import { configDotenv } from "dotenv";
configDotenv();
<<<<<<< HEAD




=======
const ollama = new Ollama({});
>>>>>>> upstream/main
export const chatModel = async (prompt) => {
    try {
        console.log("Prompt:", prompt);
        const response = await ollama.chat({
            model: "gpt-oss:120b-cloud",
            messages: [{ role: "user", content: prompt }],
        });
        console.log(response);
        return response.message.content;
    }
    catch (error) {
        console.log("Error:", error);
    }
};
//# sourceMappingURL=ollama-client.js.map