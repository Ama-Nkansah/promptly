import express from "express";
import cors from "cors";
import { handleUserTask } from "../agent/taskAgent.js";
const app = express();
app.use(cors());
app.use(express.json());
app.post("/agent", async (req, res) => {
    const { task, content, value } = req.body;
    try {
        const result = await handleUserTask(task, content, value);
        console.log(result);
        res.send(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export function startServer(port = 5000) {
    app.listen(port, () => {
        console.log(`Agent running on http://localhost:${port}`);
    });
}
//# sourceMappingURL=api.js.map