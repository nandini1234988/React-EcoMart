import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './store';
import './signing.css';

function Signing() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    dispatch(loginUser(data));
    const selectedCategory = localStorage.getItem('selectedCategory') || '/';

    setTimeout(() => {
      if (selectedCategory) {
        navigate(`/${selectedCategory}`);
        localStorage.removeItem('selectedCategory');
      } else {
        navigate('/');
      }
    }, 100);
  };

  return (
    <div className="auth-container">
      <h2>👤 Sign In</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="auth-form">
        <input type="text" placeholder="Username" {...register('username')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <button type="submit">Sign In</button>
      </form>
      <p className="auth-link">
        New User? <Link to="/SignUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default Signing;