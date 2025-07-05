import React from 'react';
import './signup.css'; // ⬅️ Make sure this matches your filename
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import { useForm } from 'react-hook-form';

function SignUp() {
  let { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(registerUser(data));
    alert('Registration Successful!');

     localStorage.setItem('selectedCategory', data.category);
    navigate('/Signing'); // ⬅️ Redirect to SignIn page after registration
    
  };

  return (
    <div className="auth-container">
      <h2>✍️Sign Up</h2>
      <form onSubmit={handleSubmit(myFunc)} className="auth-form">

        <input type='text' placeholder='Username' {...register('username')} />
        <input type='password' placeholder='Password' {...register('password')} />
        <input type='email' placeholder='Email' {...register('email')} />
        <input type='number' placeholder='Mobile No' {...register('mobile')} />

        <div className="radio-group">
          <label><input type='radio' value="Male" {...register('gender')} /> Male</label>
          <label><input type='radio' value="Female" {...register('gender')} /> Female</label>
        </div>

        <select {...register('category')}>
          <option value="">Select Category</option>
          <option value="Veg">Veg</option>
          <option value="NonVeg">Non Veg</option>
        </select>

        <button type='submit'>Sign Up</button>
      </form>

      <div className="auth-link">
        Already Registered? <a href="/Signing">Sign In</a>
      </div>
    </div>
  );
}

export default SignUp;
