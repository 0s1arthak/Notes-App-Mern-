import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotesList from '../components/NotesList';

const Main = () => {
  const navigate = useNavigate();


  
  const onClickHandler = () => {
    console.log("Button clicked");
    localStorage.removeItem('token');
    navigate('/login');
  }



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
          >
          Generate Note
        </button>

        <NotesList />
      </div>
    </div>
  )
}

export default Main
