// snippet/controller/snippet.js

import { snippets } from "../database/index.js";
import { randomBytes } from "crypto";
import axios from "axios";

// FIX: Make the function async
export const createSnippet = async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title, code } = req.body;

    if (!title || !code) {
        return res.status(400).json({ success: false, message: "Title and code are required." });
    }
    
    snippets[id] = { id, title, code };

    try {
        // FIX: Await the event publication
        await axios.post("http://localhost:8005/events", {
            type: "SnippetCreated",
            data: {
                id,
                title,
                code // Also send the code to the query service
            }
        });
    } catch (err) {
        // This will print the entire error object, which is much more informative
        console.error("Failed to publish SnippetCreated event:", err); 
        // Decide if you want to fail the whole request or just log the error
        // For now, we'll log it and continue.
    }

    return res.status(201).json({
        success: true,
        message: "Snippet created successfully",
        snippet: snippets[id]
    });
};

export const getSnippet = (_, res) => {
    return res.status(200).json(snippets);
};