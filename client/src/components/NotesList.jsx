import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NotesList = ({setEditForm,setCurrentNoteId}) => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                console.log(token);
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
        <div className="p-6 space-y-6"> {/* Increased space-y value for more space between notes */}
            {error && <p className="text-red-500">{error}</p>}

            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-md p-4 rounded-md space-y-2"
                    >
                        <h2 className="text-xl font-bold text-blue-600">{note.title}</h2>
                        <p className="text-gray-700">{note.content}</p>
                        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-
                    2 px-4 rounded'
                    onClick={()=>{
                        setEditForm(true);
                        setCurrentNoteId(note._id);
                    }}
                    >Edit</button>
                    </div>
                ))
            ) : (
                <h1 className="text-white text-3xl text-center">No notes to show</h1>
            )}
        </div>
    );
};

export default NotesList;
