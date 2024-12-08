import React, { useState } from 'react';


// Performed the lifting the state up here
const Navbar = ({setSignUp,setLogIn}) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 h-16 flex items-center justify-between px-6 shadow-lg z-10">
      <div className="text-xl font-bold text-white hover:cursor-pointer">
        Notes App
      </div>
      <div className="flex gap-4">
        <button onClick={()=>setLogIn(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Login
        </button>
        <button onClick={()=>setSignUp(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Navbar;
