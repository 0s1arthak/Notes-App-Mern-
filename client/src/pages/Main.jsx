import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NotesList from '../components/NotesList';
import axios from 'axios';

const Main = () => {

  const [openForm,setOpenForm]=useState(false);
  const navigate = useNavigate();
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [editForm,setEditForm]=useState(false);
  const [currentNoteId,setCurrentNodeId]=useState(null);


  
  const onClickHandler = () => {
    console.log("Button clicked");
    localStorage.removeItem('token');
    navigate('/login');
  }

  const decodeToken = (token) => {
    if (!token) return null;
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64); 
    return JSON.parse(decodedPayload); 
  };


  const OnSubmitHandler=async(e)=>{
    e.preventDefault();
    console.log("Form submitted");
    if(!title || !content){
      alert("Please fill in all fields");
      return;
    }
    console.log(`Notes title is ${title} and notes content is ${content}`);

    // For sending the request I need whole Note object which contains title,content and user id which I believe should be extracted from token 
    const token = localStorage.getItem('token');
    const decodedToken=decodeToken(token);
    const userId=decodedToken.userId;
    const note = {
      title:title,
      content:content,
      userId:userId
    }

    // Now will write the axiox.post request 
    try {
      const response=await axios.post('http://localhost:3000/api/notes',
        note,
        {
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        }
      )
      if(response.status===201){
        console.log("Note created successfully");
        setTitle("");
        setContent("");
        setOpenForm(false);
      }
      else{
        console.log("Error creating note");
        alert("Failed to create note");
      }
    } catch (error) {
      console.error("Error is: ",error);
    }
  }




  const onEditFormHandler=async(e)=>{
    e.preventDefault();
    console.log("Details are being edited");
    if(!title || !content){
      alert("Please fill in all fields");
      return;
    }
    // Here I am sending the request to edit the note
    const token = localStorage.getItem('token');
    const decodedToken=decodeToken(token);
    const userId=decodedToken.userId;
    const noteToUpdate={
      title:title,
      content:content,
      userId:userId
    }
    // Now will write the axiox.put request
    try {
      // Extract id for sending the request 
      // Ab id lene k liyee mujhe jaana pdhega NotesList mein kyuki main note parr jo map laga raha hu usmei mere paas note._id hai betichod
      const response=await axios.put(`http://localhost:3000/api/notes/${currentNoteId}`,noteToUpdate,
        {
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        }
      )
      if(response.status===404){
        console.log("Note not found");
        alert("Note not found");
        return;
      }
      if(response.status===200){
        console.log("Note updated");
        alert("Note updated");
        setEditForm(false);
      }

    } catch (error) {
      
    }
  }








  if(!openForm){
    return (
      <div className='h-screen w-screen bg-slate-800 flex flex-col justify-center items-center space-y-5'>
        <div className='fixed top-0 left-0 w-full bg-gray-900 h-16 flex items-center justify-between px-6 shadow-lg z-10'>
          <p className='hover:cursor-pointer'>Notes App</p>
          <button onClick={onClickHandler} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
            Sign Out
          </button>
        </div>
  
        <div className='flex flex-col justify-center items-center space-y-4'>
          <h1 className='text-3xl text-white font-bold'>Welcome to Notes App</h1>
        
          <button 
            className='px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300'
            onClick={() => setOpenForm(true)}
            >
            Generate Note
          </button>
  
          <NotesList setEditForm={setEditForm} setCurrentNodeId={setCurrentNodeId}/>
        </div>
      </div>
    )
  }
  if(editForm){
    return (
      <div className=
      'h-screen w-screen bg-slate-800 flex flex-col justify-center items-center space-y-5'
      >
        <div>
          <h1 className='text-white text-2xl font-bold mb-4'>Enter notes details!</h1>
          <form className='flex flex-col space-y-4' onSubmit={onEditFormHandler}>
            <label className='text-white'>Notes Title:</label>
            <input type="text" className='bg-slate-700 p-2 rounded-md'
            placeholder='Enter notes Title' value={title}
            onChange={(e) => setTitle(e.target.value)} />
            <label className='text-white'>Notes Content:</label>
            <textarea name="content" id="content"
            className='bg-slate-700 p-2 rounded-md h-40 w-full'
            placeholder='Enter notes content'
            value={content}
            onChange={(e) => setContent(e.target.value)} />
            <button className=
            'px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-800'
            >Update</button>
          </form>
        </div>
      </div>
    )    

  }
  return (
    <div className=
    'h-screen w-screen bg-slate-800 flex flex-col justify-center items-center space-y-5'
    >
      <div>
        <h1 className='text-white text-2xl font-bold mb-4'>Enter notes details!</h1>
        <form className='flex flex-col space-y-4' onSubmit={OnSubmitHandler}>
          <label className='text-white'>Notes Title:</label>
          <input type="text" className='bg-slate-700 p-2 rounded-md'
          placeholder='Enter notes Title' value={title}
          onChange={(e) => setTitle(e.target.value)} />
          <label className='text-white'>Notes Content:</label>
          <textarea name="content" id="content"
          className='bg-slate-700 p-2 rounded-md h-40 w-full'
          placeholder='Enter notes content'
          value={content}
          onChange={(e) => setContent(e.target.value)} />
          <button className=
          'px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-800'
          >Submit</button>
        </form>
      </div>
    </div>
  )


}

export default Main
