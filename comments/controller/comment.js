// comments/controller/comment.js

import { randomBytes } from 'crypto';
import { commentsDB } from '../database/index.js';

export const createComment = (req, res) => {
    // ... (This function is fine, no changes needed)
    const commentId = randomBytes(4).toString("hex");

    const { text } = req.body;
    const snippetId = req.params.id;

    const comments = commentsDB[snippetId] || [];
    // creating a comment object
    comments.push({
        commentId,
        text
    });
    commentsDB[snippetId] = comments;

    // returning the comment object
    return res.status(201).json({
        success: true,
        message: "Comment created successfully",
        comment: {
            commentId,
            text
        }
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