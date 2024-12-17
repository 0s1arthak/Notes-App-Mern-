import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NotesList = ({ setViewMode, setCurrentNoteId, setTitle, setContent }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/getNotes', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        setNotes(response.data); // Update notes state with fetched data
      } catch (error) {
        setError(error.message || 'Failed to fetch notes.');
      }
    };

    getNotes(); // Fetch notes when component mounts
  }, []);

  return (
    <div className="p-6 space-y-6 w-full max-w-3xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow-md p-4 rounded-md space-y-2"
          >
            <h2 className="text-xl font-bold text-blue-600">{note.title}</h2>
            <p className="text-gray-700">{note.content}</p>

            <div className="flex space-x-3">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  console.log('Editing note:', note);
                  setViewMode('edit'); // Switch to edit mode
                  setCurrentNoteId(note._id); // Set current note ID
                  setTitle(note.title); // Set title to the selected note's title
                  setContent(note.content); // Set content to the selected note's content
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white text-3xl text-center">No notes to show</h1>
      )}
    </div>
  );
};

export default NotesList;
