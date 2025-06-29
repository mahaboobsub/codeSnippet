// query/index.js

import express from "express";
import cors from "cors";

const app = express();
const PORT = 8002;

app.use(express.json());
app.use(cors()); // Simplified cors for this service

const snippets = {}; // In-memory storage

app.get("/snippets", (_, res) => {
    return res.status(200).json(snippets);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    console.log(`Query service received event: ${type}`);

    if (type === "SnippetCreated") {
        // FIX: Store the code as well
        const { id, title, code } = data;
        snippets[id] = { id, title, code, comments: [] };
    }

    if (type === "CommentCreated") {
        // FIX: Destructure 'content' instead of 'comment'
        const { id, content, snippetId } = data;
        const snippet = snippets[snippetId];

        // Add a safety check in case the snippet doesn't exist yet
        if (snippet) {
            // FIX: Push the correct object structure
            snippet.comments.push({ id, content });
        }
    }

    return res.status(200).json({});
});

app.listen(PORT, () => {
    console.log(`Query service is running on port ${PORT}`);
});