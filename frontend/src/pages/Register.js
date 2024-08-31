import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: ''
  });
  
  const [message, setMessage] = useState('');

  const { name, email, password, profilePicture } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      //const data = await response.json();

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      throw new Error('Unexpected non-JSON response');
    }


      if (response.status === 201 || data.token) {
        localStorage.setItem('token', data.token);
        const userRole = jwtDecode(data.token).user.role;
        if (userRole === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/customer-dashboard';
        }
      } else {
        setMessage(data.msg || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Server error');
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required className="block w-full p-2 mb-4 border" />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="block w-full p-2 mb-4 border" />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="block w-full p-2 mb-4 border" />
        <input type="text" name="profilePicture" value={profilePicture} onChange={onChange} placeholder="Profile Picture URL" className="block w-full p-2 mb-4 border" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
      <Footer />
    </div>
  );
};

export default Register;
