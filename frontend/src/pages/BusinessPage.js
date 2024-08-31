import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BusinessPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch(`http://localhost:5000/api/business/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setBusiness(data))
      .catch(err => setError(err.message)); // Handle error
  }, [id]);

  if (error) return <p>{error}</p>; // Display error message
  if (!business) return <p>Loading...</p>;

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(business);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Added to Favorites!');
  };
  

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center">
            <img src={business.logo} alt={business.name} className="w-24 h-24 object-cover rounded-full" />
            <div className="ml-4">
              <h2 className="text-3xl font-bold">{business.name}</h2>
              <p className="text-gray-600">{business.yearsOfOperation} Years of Operation</p>
              <p className="text-gray-600">{business.numberOfProducts} Products</p>
              <p className="text-gray-600">{business.likes} Likes</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold">Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
              {business.products.map((product, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="text-lg font-bold">{product}</h4>
                  <p className="text-gray-600">Materials: ...</p>
                  <p className="text-gray-600">Crafting Method: ...</p>
                  <button onClick={addToFavorites} className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300">
                    Add to Favorites
                  </button>

                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessPage;
