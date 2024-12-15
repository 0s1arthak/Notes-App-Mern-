import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onSubmitHandler=async(e)=>{
        e.preventDefault();

        console.log("Form submitted");
        console.log(`name is${username} email is ${email} password is ${password}`)
        // setSignUp(false);

        // Do not think of using useEffect while submitting forms
        // if(!username || !email || !password){
        //     alert("Please enter the details correctly");
        //     return;
        // }
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        // else if(password.length<6){
        //     alert("Password should be at least 6 characters long");
        //     return;
        // }
        else{
            const data={
                name:username,
                email:email,
                password:password,
                confirmPassword:confirmPassword
            }
            console.log(data)
            // API call to server write fn
            try {
                const response=await axios.post("http://localhost:3000/api/signup",data);
                if(response.data.message==="User already exists"){
                    alert("User already exists");
                    return;
                }
                else{
                    // Bhai ab token aa gyaa hai to ab usse mujhko authorization header mein daalna pdhega using a middleware
                    console.log("User created with data",response.data);
                    // Save token
                    localStorage.setItem('token', response.data.token);
                    // Redirect to main page 
                    navigate('/main');
                }
            } catch (error) {
                console.log(error);
            }
        }



    }
  return (
    <div className='bg-slate-800 h-screen w-screen flex justify-center items-center'>
        <div>
            <h1 className='text-white text-2xl font-bold mb-4'>Signup</h1>
            <form onSubmit={onSubmitHandler} className='h-[500px] w-[600px] border rounded-md' action="submit">
                <div className='flex flex-col gap-3 p-4'>
                    <label className='text-white'>Username:</label>
                    <input onChange={(e)=>setUsername(e.target.value)} type="text" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your username' value={username}/>
                    <label className='text-white'>Email:</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your email' value={email} />
                    <label className='text-white'>Password:</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your password' value={password}/>
                    <label className='text-white'>Confirm Password:</label>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Confirm your password' value={confirmPassword}/>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-
                    2 px-4 rounded'>Signup</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup
