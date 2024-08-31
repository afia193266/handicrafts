import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 200 || data.token) {
        localStorage.setItem('token', data.token);
        const userRole = jwtDecode(data.token).user.role;
        if (userRole === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
      } else {
        setMessage(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="block w-full p-2 mb-4 border" />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="block w-full p-2 mb-4 border" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
      <Footer />
    </div>
  );
};

export default Login;
