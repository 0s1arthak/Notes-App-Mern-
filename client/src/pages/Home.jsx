import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Navbar from '../components/Navbar';
import Signup from './Signup';
import Login from './Login';

const Home = () => {
  const [signUp,setSignUp]=useState(false);
  const [logIn,setLogIn]=useState(false);
  if(!signUp && !logIn){
    return (
      <div>
        <Navbar setSignUp={setSignUp} setLogIn={setLogIn}/>
        <div className="pt-16 text-center text-white overflow-hidden">
          <h1 className="text-4xl font-bold">Welcome to Notes App</h1>
          <p className="mt-4">Organize your thoughts and ideas efficiently.</p>
        </div>
      </div>
    );
  }
  if(signUp){
    return(
      <Signup/>
    )
  }
  return(
    <Login/>
  )


}

export default Home;
