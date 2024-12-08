import axios from 'axios';
import React, { useEffect } from 'react'

const Signup = ({setSignUp}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onSubmitHandler=async(e)=>{
        e.preventDefault();

        console.log("Form submitted");
        setSignUp(false);

        // Do not think of using useEffect while submitting forms
        if(!username || !email || !password || !confirmPassword || username.trim===' ' ){
            alert("Please enter the details correctly");
        }
        else if(password !== confirmPassword){
            alert("Passwords do not match");
        }
        else if(password.length<6){
            alert("Password should be at least 6 characters long");
        }
        else{
            const data={
                username:username,
                email:email,
                password:password,
                confirmPassword:confirmPassword
            }
            console.log(data)
            // API call to server write fn
            try {
                const response=await axios.post("http://localhost:3000/api/signup");
                if(response.data.message==="User already exists"){
                    alert("User already exists");
                }
                else{
                    // Bhai ab token aa gyaa hai to ab usse mujhko authorization header mein daalna pdhega using a middleware
                    console.log("User created with data",response.data);
                    // Save token
                    localStorage.setItem('token', response.data.token);
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
                    <input onClick={(e)=>setUsername(e.target.value)} type="text" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your username' />
                    <label className='text-white'>Email:</label>
                    <input onClick={(e)=>setEmail(e.target.value)} type="email" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your email' />
                    <label className='text-white'>Password:</label>
                    <input onClick={(e)=>setPassword(e.target.value)} type="password" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Enter your password' />
                    <label className='text-white'>Confirm Password:</label>
                    <input onClick={(e)=>setConfirmPassword(e.target.value)} type="password" className='bg-slate-700 p-2 rounded-md'
                    placeholder='Confirm your password' />
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-
                    2 px-4 rounded'>Signup</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup
