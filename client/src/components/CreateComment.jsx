// client/src/components/CreateComment.jsx

// FIX: Remove unused 'useEffect' and simplify imports
import React, { useState } from 'react';
import axios from 'axios';

// The component now receives the full snippet object and a function to refresh the main list
const CreateComment = ({ snippet, onCommentCreated }) => {
    const [text, setText] = useState('');

    // This function remains the same, it correctly posts to the comments service
    const addComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await axios.post(
                `http://localhost:8001/api/v1/snippet/${snippet.id}/comment`,
                { text }
            );
            
            setText('');
            
            // FIX: Call the passed-in function to trigger a data refresh in the parent
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
                {/* FIX: Render the comments array directly from the snippet prop */}
                {snippet.comments && snippet.comments.length > 0 ? (
                    snippet.comments.map((comment) => (
                        // FIX: Use the correct property names from the Query Service
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