"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// A list of tasks for the AI agent
const tasks = [
  "Generate Title",
  "Generate Intro",
  "Generate Body",
  "Generate Conclusion",
  "Rewrite",
];

export default function Menu() {
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [isRunning, setIsRunning] = useState(false);

  // Function to run a task against the backend agent
  async function runTask() {
    if (!input.trim() || isRunning) return;

    try {
      setIsRunning(true);
      setContent(""); // Clear previous content
      const response = await fetch("http://localhost:5000/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: selectedTask, content: input }),
      });

      const data = await response.json();
      setContent(data.result ?? JSON.stringify(data, null, 2));
    } catch (err) {
      setContent(
        "An error occurred while running the task. Please try again."
      );
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  }

  // Renders the generated content based on the selected task
  const renderContent = () => {
    if (isRunning || !content) return null;

    const contentToRender = (
      <div
        className="prose prose-invert max-w-none text-gray-900"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
    return (
      <div className="w-full max-w-2xl mt-8 p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 animate-fade-in">
        {contentToRender}
      </div>
    );
  };

  // Animated text for the heading
  const headingText = "Hey there, what are you up to...".split("");

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 font-sans">
      {/* Conditionally render the animated heading */}
      {!content && !isRunning && (
        <h1 className="text-3xl font-bold text-white mb-4">
          {headingText.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.03,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      )}

      {/* Render the generated content */}
      {renderContent()}

      <div className="w-full max-w-2xl mt-8 p-6 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700/50">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text or topic here..."
          className="w-full p-4 bg-gray-900/50 border-2 border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
          rows={4}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          {/* Custom Styled Select Dropdown */}
          <div className="relative w-full sm:w-auto shrink-0">
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full appearance-none cursor-pointer rounded-md bg-gray-700/80 py-2.5 pl-4 pr-10 text-left text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {tasks.map((task) => (
                <option
                  key={task}
                  value={task}
                  className="bg-gray-800 text-white"
                >
                  {task}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                ></path>
              </svg>
            </div>
          </div>

          {/* Main action button with CSS loader */}
          <button
            onClick={runTask}
            disabled={isRunning || !input.trim()}
            className="grow w-full sm:w-auto flex items-center justify-center px-6 py-2.5 rounded-md text-white font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500"
          >
            {isRunning ? (
              <>
                {/* Simple CSS Spinner */}
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Running...
              </>
            ) : (
              selectedTask
            )}
          </button>
        </div>
      </div>
    </section>
  );
}