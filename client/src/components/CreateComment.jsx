// client/src/components/CreateComment.jsx

import React, { useState } from 'react';
import axios from 'axios';

// The component receives the full snippet object and a function to refresh the main list.
// It is now a "presentational" component with no data-fetching logic.
const CreateComment = ({ snippet, onCommentCreated }) => {
    const [text, setText] = useState('');

    // This function correctly posts to the 'comments' command service.
    const addComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await axios.post(
                `http://localhost:8001/api/v1/snippet/${snippet.id}/comment`,
                { text }
            );
            
            setText('');
            
            // Notify the parent component that a comment was created, so it can trigger a refresh.
            onCommentCreated();

        } catch (error) {
            console.error("Failed to add comment:", error);
            alert("Failed to add comment. See console for details.");
        }
    };

    return (
        <div className='text-left'>
            <h4 className='font-semibold text-sm mt-3'>Comments:</h4>
            <ul className='list-disc list-inside text-sm pl-2'>
                {/* Render the comments array directly from the 'snippet' prop. */}
                {/* This data comes from the Query Service via the parent component. */}
                {snippet.comments && snippet.comments.length > 0 ? (
                    snippet.comments.map((comment) => (
                        // Use the correct property names from the Query Service: 'id' and 'content'.
                        <li key={comment.id}>{comment.content}</li>
                    ))
                ) : (
                    <li className='text-gray-500 list-none italic'>No comments yet.</li>
                )}
            </ul>
            <form onSubmit={addComment} className='mt-2 flex items-center gap-2'>
                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Add a comment...'
                    className='border rounded p-1 flex-grow'
                />
                <button type='submit' className='w-fit bg-amber-900 text-amber-50 px-4 py-1 rounded cursor-pointer'>
                    Add
                </button>
            </form>
        </div>
    );
};

export default CreateComment;