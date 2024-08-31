// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';

// const Admin = () => {


//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto mt-8">
//         <h2 className="text-2xl font-bold">Admin Page</h2>
//         <div className="grid grid-cols-4 gap-4 mt-4">
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Admin = () => {
  const [business, setBusiness] = useState({
    name: '',
    logo: '',
    yearsOfOperation: '',
    numberOfProducts: '',
    products: '',
  });

  const handleChange = (e) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productsArray = business.products.split(',').map(item => item.trim());
    const newBusiness = { ...business, products: productsArray };

    try {
      const response = await fetch('http://localhost:5000/api/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBusiness),
      });

      if (response.ok) {
        alert('Business added successfully!');
        setBusiness({
          name: '',
          logo: '',
          yearsOfOperation: '',
          numberOfProducts: '',
          products: '',
        });
      } else {
        alert('Failed to add business.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      
      <Navbar />
      <h2 className="text-2xl font-bold">Add New Business</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={business.name}
          onChange={handleChange}
          className="block w-full p-2 mt-2 border rounded"
          required
        />
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={business.logo}
          onChange={handleChange}
          className="block w-full p-2 mt-2 border rounded"
          required
        />
        <input
          type="number"
          name="yearsOfOperation"
          placeholder="Years of Operation"
          value={business.yearsOfOperation}
          onChange={handleChange}
          className="block w-full p-2 mt-2 border rounded"
          required
        />
        <input
          type="number"
          name="numberOfProducts"
          placeholder="Number of Products"
          value={business.numberOfProducts}
          onChange={handleChange}
          className="block w-full p-2 mt-2 border rounded"
          required
        />
        <textarea
          name="products"
          placeholder="Products (comma separated)"
          value={business.products}
          onChange={handleChange}
          className="block w-full p-2 mt-2 border rounded"
          required
        ></textarea>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add Business
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Admin;

