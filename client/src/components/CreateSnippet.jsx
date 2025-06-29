// client/src/components/CreateSnippet.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment'; 

const CreateSnippet = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [snippets, setSnippets] = useState({});

    // This function will fetch the aggregated data from the Query Service
    const fetchSnippets = async () => {
        try {
            // CRITICAL FIX: Fetch from the Query Service on port 8002
            const res = await axios.get('http://localhost:8002/snippets');
            setSnippets(res.data);
        } catch (error) {
            console.error("Error fetching snippets from Query Service:", error);
        }
    };

    // Fetch snippets when the component first loads using useEffect
    useEffect(() => {
        fetchSnippets();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Function to handle the creation of a new snippet
    // This still posts to the Snippet Service, which is correct.
    const createSnippet = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/v1/snippet', { title, code });
            alert(res.data.message || "Snippet created successfully!");

            // Clear the form fields after successful submission
            setTitle('');
            setCode('');
            
            // NOTE: We don't need to call fetchSnippets() here anymore.
            // In a fully event-driven UI, we would listen for an event to update state.
            // For now, a small delay and a re-fetch is a simple way to see the update.
            setTimeout(() => {
                fetchSnippets();
            }, 500); // Wait 500ms for the event to be processed by the query service

        } catch (error) {
            console.error("Error creating snippet:", error);
            alert("Failed to create snippet. See console for details.");
        }
    };

    // OPTIMIZATION: Use useMemo to prevent creating a new array on every render.
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
                        required
                    />
                    <textarea
                        placeholder='Write a code snippet...'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className='border rounded px-2 py-1'
                        rows={5}
                        required
                    />
                    <button type='submit' className='w-fit bg-amber-900 text-amber-50 px-6 py-3 rounded cursor-pointer'>
                        Add Snippet
                    </button>
                </form>
            </div>

            {/* Displaying the list of existing snippets */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    renderedSnippets.map((snippet) => (
                        <div key={snippet.id} className='border rounded-lg p-4 bg-white shadow-sm flex flex-col'>
                            <h2 className='text-lg font-semibold text-left'>{snippet.title}</h2>
                            <pre className='bg-gray-100 text-left p-2 rounded mt-2 flex-grow overflow-auto'>{snippet.code}</pre>
                            
                            <div className='mt-4'>
                                {/* FIX: Pass down the refresh handler */}
                                <CreateComment 
                                    snippet={snippet}
                                    onCommentCreated={() => setTimeout(fetchSnippets, 500)}
                                /> 
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CreateSnippet;