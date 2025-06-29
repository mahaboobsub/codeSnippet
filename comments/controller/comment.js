// comments/controller/comment.js

import { randomBytes } from 'crypto';
import { commentsDB } from '../database/index.js';
import axios from 'axios';

// FIX: Make the function async
export const createComment = async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { text } = req.body;
    const snippetId = req.params.id;

    if (!text) {
        return res.status(400).json({ success: false, message: "Comment text is required." });
    }

    const comments = commentsDB[snippetId] || [];
    comments.push({ commentId, text });
    commentsDB[snippetId] = comments;

    try {
        // FIX: Await the event publication
        await axios.post("http://localhost:8005/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content: text,
                snippetId,
            }
        });
    } catch (err) {
        console.error("Failed to publish CommentCreated event:", err.message);
    }

    return res.status(201).json({
        success: true,
        message: "Comment created successfully",
        comment: { commentId, text }
    });
};

export const getCommentBySnippetId = (req, res) => {
    const snippetId = req.params.id;

    // FIX: Change the key from 'commentsDB' to 'comments' to match the frontend
    return res.status(200).json({
        success: true,
        comments: commentsDB[snippetId] || []
    });
};