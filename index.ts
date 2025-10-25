// import mcpserver to provide apis for working with tools and resourceTemplate for url matching
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
// import stream transport for sending streamable http responses
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
// import express for creating the node server 
import express from 'express'
// import zod for schema validation
import zod from 'zod'

import { Ollama } from "ollama";
import { configDotenv } from "dotenv";
configDotenv();
const ollama = new Ollama({});

const server = new McpServer({
    name: "Content creation",
    version: "1.0.0"
})

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



const app = express();
app.use(express.json());



app.post('/mcp', async (req, res) => {

    try {

        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
            enableJsonResponse: true
        })
        res.on('close', () => {
            transport.close();
        })

        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    } catch (error) {
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
})

const port = 3000
app.listen(port, () => {
    console.log(`Demo Mcp server  running on http://locahost:${port}/mcp`);

}).on('error', (error) => {
    console.error("Server error:", error)
    process.exit(1)
})