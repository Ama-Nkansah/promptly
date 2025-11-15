import { Ollama } from "ollama";
import { configDotenv } from "dotenv";
configDotenv();
const ollama = new Ollama({});

// for cloud host access

// const ollama = new Ollama({
//   host: "https://ollama.com",
//   headers: {
//     Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
//   },
// });

const gettingStarted = async () => {
  try {
    const response = await ollama.chat({
      model: "gpt-oss:120b-cloud",
      messages: [{ role: "user", content: "Hello Ollama" }],
      stream: true,
    });

    for await (const part of response) {
      process.stdout.write(part.message.content);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

gettingStarted();
