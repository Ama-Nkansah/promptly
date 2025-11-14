"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { smartFormat } from "@/utils/regex";

export default function Menu() {
    const [title, setTitle] = useState("");
    const [input, setInput] = useState("");
    const [selectedTask, setSelectedTask] = useState("Generate Title");
    const [isRunning, setIsRunning] = useState(false);

    const tasks = [
        "Generate Title",
        "Generate Intro",
        "Generate Body",
        "Generate Conclusion",
        "Rewrite",
    ];

    async function runTask(task = selectedTask) {
        try {
            setIsRunning(true);
            const response = await fetch("http://localhost:5000/agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task, content: input }),
            });

            const data = await response.json();
            setTitle(data.result ?? JSON.stringify(data));
        } catch (err) {
            setTitle("Error running task");
            console.error(err);
        } finally {
            setIsRunning(false);
        }
    }

    return (
        <section className=" flex flex-col items-center justify-center">
        <h1 className="text-xl text-white font-bold mb-4">
            {selectedTask === "Generate Title" ? title : null}
            </h1>

                        <div className="text-white w-4/5">
            {selectedTask === "Generate Body" ? (
                <div className="text-white border border-white p-6 m-4 leading-relaxed space-y-4">
  <ReactMarkdown
    components={{
      ul: ({ children }) => (
        <ul className="list-disc list-inside space-y-2">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-inside space-y-2">{children}</ol>
      ),
      li: ({ children }) => (
        <li className="ml-2">{children}</li>
      ),
      p: ({ children }) => (
        <p className="mb-2">{children}</p>
      ),
    }}
  >
    {smartFormat(title)}
  </ReactMarkdown>
</div>

            ) : selectedTask === "Generate Intro" ? (
                <p className="italic mb-2">{title}</p>
            ) : null}
            </div>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here..."
                className="border flex justify-center mx-87 p-2 m-4 w-80"
            />

            <div className="flex justify-center mb-6 items-center gap-4">
                {/* Select dropdown (no visible text) */}
                <div className="relative">
                    <select
                        value={selectedTask}
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className="appearance-none bg-gray-950 border-none p-2 pr-6 cursor-pointer text-transparent focus:outline-none"
                    >
                        {tasks.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    {/* Custom dropdown arrow icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Dynamic action button */}
                <button
                    onClick={() => runTask()}
                    disabled={isRunning || !input.trim()}
                    className={`rounded px-4 py-2 text-white transition ${input.trim()
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    {isRunning ? "Running..." : selectedTask}
                </button>
            </div>
        </section>
    );
}
