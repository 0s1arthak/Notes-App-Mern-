import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesList from '../components/NotesList'
import axios from 'axios';

const Main = () => {
  const [viewMode, setViewMode] = useState('view'); // 'view', 'create', 'edit'
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState(null);


  const onClickHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const decodeToken = (token) => {
    if (!token) return null;
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    const note = {
      title: title,
      content: content,
      userId: decodedToken.userId,
    };

    try {
      const response = await axios.post('https://notes-app-mern-dh3o.onrender.com/api/notes', note, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('Note created successfully');
        setTitle('');
        setContent('');
        setViewMode('view');
      } else {
        alert('Failed to create note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onEditFormHandler = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);

    const noteToUpdate = {
      title: title,
      content: content,
      userId: decodedToken.userId,
    };

    try {
      const response = await axios.put(
        `https://notes-app-mern-dh3o.onrender.com/api/notes/${currentNoteId}`,
        noteToUpdate,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Note updated successfully');
        setTitle('');
        setContent('');
        setViewMode('view');
      } else {
        alert('Failed to update note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // UI Rendering based on viewMode
  if (viewMode === 'create') {
    return (
      <div className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl font-bold mb-4">Enter Note Details</h1>
        <form className="flex flex-col space-y-4" onSubmit={onSubmitHandler}>
          <label className="text-white">Title:</label>
          <input
            type="text"
            className="bg-slate-700 p-2 rounded-md"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-white">Content:</label>
          <textarea
            className="bg-slate-700 p-2 rounded-md h-40"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (viewMode === 'edit') {
    return (
      <div className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl font-bold mb-4">Edit Note Details</h1>
        <form className="flex flex-col space-y-4" onSubmit={onEditFormHandler}>
          <label className="text-white">Title:</label>
          <input
            type="text"
            className="bg-slate-700 p-2 rounded-md"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-white">Content:</label>
          <textarea
            className="bg-slate-700 p-2 rounded-md h-40"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Update
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      {/* Navbar */}
      <div className="sticky top-0 left-0 w-full bg-gray-900 h-16 flex items-center justify-between px-6 shadow-lg z-10">
        <p className="text-white text-lg font-bold">Notes App</p>
        <button
          onClick={onClickHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
  
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-5 px-4 py-6">
        <button
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          onClick={() => setViewMode('create')}
        >
          Create Note
        </button>
  
        <NotesList
          setViewMode={setViewMode}
          setCurrentNoteId={setCurrentNoteId}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>
    </div>
  );
  
  
};

export default Main;
