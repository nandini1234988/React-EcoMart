import React from 'react';
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

    if (data.category === "Veg") {
      navigate("/Veg");
    } else if (data.category === "NonVeg") {
      navigate("/NonVeg");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit(myFunc)}>
        Username: <input type='text' placeholder='Username' {...register('username')} />
        Password: <input type='password' placeholder='Password' {...register('password')} />
        Email: <input type='email' placeholder='Email' {...register('email')} />
        Mobile No: <input type='number' placeholder='MobileNo' {...register('mobile')} /><br />
        <input type='radio' value="Male" {...register('gender')} /> Male
        <input type='radio' value="Female" {...register('gender')} /> Female<br />
        
        <select {...register('category')}>
          <option value="">Select Category</option>
          <option value="Veg">Veg</option>
          <option value="NonVeg">Non Veg</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default SignUp;
