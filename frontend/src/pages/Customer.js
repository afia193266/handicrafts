import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Customer = () => {

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">Customer Page</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Customer;
