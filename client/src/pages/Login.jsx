import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');


  const onSubmitHandler=async(e)=>{
    e.preventDefault();

    if(!email || !password){
      alert("please enter the details correctly");
      return;
    }
    if(password.length<6){
      alert("Length of password should be greater than or equal to 6");
      return;
    }
    console.log("Logged in");
    console.log(`email is ${email} and password is ${password}`);
    const data={
      email:email,
      password:password,
    }
    // console.log(data);
    // Make api call now 
    try {
      const response=await axios.post("https://notes-app-mern-dh3o.onrender.com/api/login",data);
      if(response.data.message==="User does not exist"){
        alert("User does not exist please sign up to move further");
        return;
      }
      if(response.data.message==="Password is incorrect"){
        alert("Password is incorrect");
        return;
      }
      else{
        console.log("User logged in data with",response.data);
        localStorage.setItem('token', response.data.token);
        // Redirect to main page 
        navigate('/main');
      }
    } catch (error) {
      console.log(error);
    }

  }





  return (
    <div className='bg-slate-800 h-screen w-screen flex justify-center items-center'>
        <div>
            <h1 className='text-white text-2xl font-bold mb-4'>Login</h1>
            <form onSubmit={onSubmitHandler} className='h-[500px] w-[600px] border rounded-md' action="submit">
                <div className='flex flex-col gap-3 p-4'>
                    <label className='text-white'>Email:</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your email' value={email} />
                    <label className='text-white'>Password:</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your password' value={password}/>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-
                    2 px-4 rounded'>Login</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login
