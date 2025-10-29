"use client";
import { useState } from "react";

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
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-4">{title}</h1>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here..."
                className="border p-2 m-4 w-80"
            />

            <div className="flex items-center gap-4">
                {/* Select dropdown (no visible text) */}
                <div className="relative">
                    <select
                        value={selectedTask}
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className="appearance-none bg-transparent border-none p-2 pr-6 cursor-pointer text-transparent focus:outline-none"
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
        </div>
    );
}
