import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from 'express';
import zod from 'zod';
import cors from 'cors';
import { Ollama } from "ollama";
import { configDotenv } from "dotenv";
configDotenv();
const ollama = new Ollama({});
const server = new McpServer({
    name: "Content creation",
    version: "1.0.0"
});
server.registerTool('calculate-bmi', {
    title: "Calculate Body Mass Index",
    description: "Calculates the Body Mass Index (BMI) based on weight and height.",
    inputSchema: {
        weightKg: zod.number().min(1).max(500).describe("weight in kg"),
        heightFt: zod.number().min(0.5).max(3).describe("height in feet")
    }
}, async ({ weightKg, heightFt }) => {
    const output = {
        bmi: weightKg / (heightFt * heightFt * 0.092903),
        category: ''
    };
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(output)
            }
        ],
        structuredContent: output
    };
});
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
    }
    catch (error) {
        console.log("Error:", error);
    }
};
gettingStarted();
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    exposedHeaders: ['Mcp-Session-Id'],
    allowedHeaders: ['Content-Type', 'mcp-session-id']
}));
app.post('/mcp', async (req, res) => {
    try {
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
            enableJsonResponse: true
        });
        res.on('close', () => {
            transport.close();
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    }
    catch (error) {
        console.error('Error handling MCP request:', error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: '2.0',
                error: {
                    code: -32603,
                    message: 'Internal server error'
                },
                id: null
            });
        }
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Demo Mcp server  running on http://locahost:${port}/mcp`);
}).on('error', (error) => {
    console.error("Server error:", error);
    process.exit(1);
});
//# sourceMappingURL=Mcp_server_example.js.map