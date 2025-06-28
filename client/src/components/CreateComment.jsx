// client/src/components/CreateComment.jsx

// FIX 1: Import useEffect from React and axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// FIX 2: Destructure snippetId from the props object
const CreateComment = ({ snippetId }) => {
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);

    // Function to fetch comments for this specific snippet
    const fetchComments = async () => {
        // Prevent API call if snippetId is not yet available
        if (!snippetId) return; 

        try {
            const res = await axios.get(`http://localhost:8001/api/v1/snippet/${snippetId}/comment`);
            // FIX 5: The backend returns 'comments', so we use res.data.comments
            setComments(res.data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // FIX 3: Use useEffect to fetch comments when the component mounts or snippetId changes
    useEffect(() => {
        fetchComments();
    }, [snippetId]); // Dependency array prevents infinite loops

    const addComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return; // Don't submit empty comments

        try {
            const res = await axios.post(
                `http://localhost:8001/api/v1/snippet/${snippetId}/comment`,
                { text }
            );
            
            
            // Clear the input field
            setText('');
            // Re-fetch comments to show the new one
            fetchComments();
            
        } catch (error) {
           
            alert("Failed to add comment. See console for details.");
        }
    };

    return (
        <div className='text-left'>
            <h4 className='font-semibold text-sm mt-3'>Comments:</h4>
            <ul className='list-disc list-inside text-sm pl-2'>
                {comments.length > 0 ? (
                    // FIX 4: Use comment.commentId for the key and display comment.text
                    comments.map((comment) => (
                        <li key={comment.commentId}>{comment.text}</li>
                    ))
                ) : (
                    <li className='text-gray-500 italic'>No comments yet.</li>
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