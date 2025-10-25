import ollama from "ollama";

const gettingStarted = async () => {
  try {
    const response = await ollama.chat({
      model: "gemma3",
      messages: [{ role: "user", content: "Hello, Ollama!" }],
    });

    console.log(response.message.content);
  } catch (error) {
    console.log("Error:", error);
  }
};

gettingStarted();