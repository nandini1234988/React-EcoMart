import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from './store';

function Signing() {
    let {register,handleSubmit}=useForm()
    let dispatch=useDispatch();
    let navigate=useNavigate();

    let myFunc=(data)=>{
        dispatch(loginUser(data))
        navigate('/Signing');
    }
  return (
    <>
    <h2>User Sign In</h2>
    <form onSubmit={handleSubmit(myFunc)}>
        <input type='text' placeholder='Username'{...register('username')}/>
        <input type="password" placeholder='Password'{...register('password')} />
        <button type='submit'>Sign In</button>
    </form>
    <p>
        New User?<a href='SignUp'>Sign Up</a>
    </p>
    </>
  )
}

export default Signing;