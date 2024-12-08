import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Get the token from localStorage
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/getNotes", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the headers
                    },
                });

                setNotes(response.data); // Set the notes to state
            } catch (error) {
                setError(error.message); // Catch and set any error
            }
        };

        getNotes(); // Call getNotes function to fetch data
    }, []); // Empty dependency array to run effect only once on component mount

    return (
        <div>
            {error && <p>{error}</p>}

            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <div key={index}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))
            ) : (
                <h1 className="text-white text-3xl">No notes to show</h1>
            )}
        </div>
    );
};

export default NotesList;
