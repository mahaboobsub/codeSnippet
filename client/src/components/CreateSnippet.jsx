// client/src/components/CreateSnippet.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment'; 

const CreateSnippet = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [snippets, setSnippets] = useState({});

    // This function will fetch all snippets from the server
    const fetchSnippets = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/snippet');
            setSnippets(res.data);
        } catch (error) {
            console.error("Error fetching snippets:", error);
        }
    };

    // Fetch snippets when the component first loads using useEffect
    useEffect(() => {
        fetchSnippets();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Function to handle the creation of a new snippet
    const createSnippet = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/v1/snippet', { title, code });
            alert(res.data.message || "Snippet created successfully!");

            // Clear the form fields after successful submission
            setTitle('');
            setCode('');
            
            // Re-fetch the snippets to update the list automatically
            fetchSnippets();

        } catch (error) {
            console.error("Error creating snippet:", error);
            alert("Failed to create snippet. See console for details.");
        }
    };

    // OPTIMIZATION: Use useMemo to prevent creating a new array on every render.
    // This `renderedSnippets` array will only be recalculated if the `snippets` object changes.
    const renderedSnippets = useMemo(() => Object.values(snippets), [snippets]);

    return (
        <div className='mt-10'>
            {/* Form to create a new snippet */}
            <div className='p-4 bg-amber-50 rounded-lg shadow-md mb-8'>
                <form onSubmit={createSnippet} className='flex flex-col space-y-4'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        className='border rounded px-2 py-1 w-full md:w-1/2'
                    />
                    <textarea
                        placeholder='Write a code snippet...'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className='border rounded px-2 py-1'
                        rows={5}
                    />
                    <button type='submit' className='w-fit bg-amber-900 text-amber-50 px-6 py-3 rounded cursor-pointer'>
                        Add Snippet
                    </button>
                </form>
            </div>

            {/* Displaying the list of existing snippets */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    // Map over the memoized array for better performance
                    renderedSnippets.map((snippet) => (
                        <div key={snippet.id} className='border rounded-lg p-4 bg-white shadow-sm flex flex-col'>
                            <h2 className='text-lg font-semibold text-left'>{snippet.title}</h2>
                            <pre className='bg-gray-100 text-left p-2 rounded mt-2 flex-grow overflow-auto'>{snippet.code}</pre>
                            
                            {/* Render the CreateComment component for each snippet */}
                            <div className='mt-4'>
                                <CreateComment snippetId={snippet.id} /> 
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CreateSnippet;