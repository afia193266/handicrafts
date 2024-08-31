// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';

// const Home = () => {
//   const [businesses, setBusinesses] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/business')
//       .then(res => res.json())
//       .then(data => setBusinesses(data));
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto mt-8">
//         <h2 className="text-2xl font-bold">Handicraft Businesses</h2>
//         <div className="grid grid-cols-4 gap-4 mt-4">
//           {businesses.map(business => (
//             <div key={business._id} className="bg-white p-4 shadow rounded">
//               <img src={business.logo} alt={business.name} className="w-full h-32 object-cover" />
//               <h3 className="text-lg font-bold mt-2">{business.name}</h3>
//               <p>Years of Operation: {business.yearsOfOperation}</p>
//               <p>Number of Products: {business.numberOfProducts}</p>
//               <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">View Products</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    fetch('http://localhost:5000/api/business')
      .then(res => res.json())
      .then(data => setBusinesses(data));
  }, []);

  const viewProducts = (id) => {
    navigate(`/business/${id}`);  // Use navigate instead of history.push
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-bold text-center">Discover Bangladeshi Handicrafts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {businesses.map(business => (
            <div key={business._id} className="bg-white shadow-lg rounded-lg p-6">
              <img src={business.logo} alt={business.name} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-bold mt-4">{business.name}</h3>
              <p className="text-gray-600">Years of Operation: {business.yearsOfOperation}</p>
              <p className="text-gray-600">Number of Products: {business.numberOfProducts}</p>
              <p className="text-gray-600">Likes: {business.likes}</p>
              <button 
                onClick={() => viewProducts(business._id)} 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                View Products
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;


