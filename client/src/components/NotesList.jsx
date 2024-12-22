import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NotesList = ({ setViewMode, setCurrentNoteId, setTitle, setContent }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [search,setSearch]=useState('');
  const [view,setView]=useState('view')

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



  const onClickHandler=()=>{
    if(!search){
      alert('Please enter a title to search');
      return;
    }
    setView('searching');
  }
  

  const onDeletehandler=async(noteId)=>{
    try {
      const token=localStorage.getItem('token');
      if(!token){
        alert("please log in to delete note");
        return;
      }
      const response=await axios.delete(`http://localhost:3000/api/notes/${noteId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status===404){
        alert("Note not found");
        return;
      }
      if(response.status===200){
        setNotes(notes.filter(note=>note._id!==noteId));
      }
    } catch (error) {
      console.log("error is",error);
      
    }
  }






  if(view==='searching' && notes.length>0){
    const filteredNotes=notes.filter((note)=>note.title.split(" ").some((word) => word.toLowerCase().includes(search.toLowerCase())));
    return(
      <div className="p-6 space-y-6 w-full max-w-3xl mx-auto">
        {
          filteredNotes.map((note)=>(
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
                  setViewMode('edit');
                  setCurrentNoteId(note._id);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                Edit
              </button>
            </div>
          </div>
          ))
        }
      </div>
    )
  }




  return (
<div className="p-6 space-y-6 w-full max-w-3xl mx-auto">
  {error && <p className="text-red-500">{error}</p>}

  {/* Search Bar */}
  <div className="flex justify-end relative mb-6">
    <input
      type="text"
      className="w-full p-2 border border-gray-400 rounded-md"
      placeholder="Search notes"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button 
    className="absolute right-0 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    onClick={onClickHandler}
    >
      Search
    </button>
  </div>

  {/* Notes List */}
  {view==='view' && notes.length > 0 ? (
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
              setViewMode('edit');
              setCurrentNoteId(note._id);
              setTitle(note.title);
              setContent(note.content);
            }}
          >
            Edit
          </button>
          {/* Add delete button */}
          <button 
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
          onClick={()=>onDeletehandler(note._id)}
          >
            Delete
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
