import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';
import Footer from '../components/Footer';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = jwtDecode(localStorage.getItem('token')).user._id;

  useEffect(() => {
    fetch(`http://localhost:5000/api/favorites/${userId}`)
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-bold">My Favorite Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {favorites.map(business => (
            <div key={business._id} className="bg-white shadow-lg rounded-lg p-6">
              <img src={business.logo} alt={business.name} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-bold mt-4">{business.name}</h3>
              <p className="text-gray-600">Years of Operation: {business.yearsOfOperation}</p>
              <p className="text-gray-600">Number of Products: {business.numberOfProducts}</p>
              <p className="text-gray-600">Likes: {business.likes}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
