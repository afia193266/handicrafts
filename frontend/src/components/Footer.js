import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 mt-8">
      <div className="container mx-auto flex justify-between">
        <div>
          <h2 className="text-lg font-bold">Bangladeshi Handicrafts</h2>
          <p>Your one-stop destination for authentic Bangladeshi handicrafts.</p>
        </div>
        <div>
          <h3 className="font-bold">Contact Us</h3>
          <p>Email: info@handicraftsbd.com</p>
          <p>Phone: +880-123456789</p>
        </div>
        <div>
          <h3 className="font-bold">Follow Us</h3>
          <a href="https://facebook.com" className="text-gray-300 hover:text-white mr-2">Facebook</a>
          <a href="https://instagram.com" className="text-gray-300 hover:text-white mr-2">Instagram</a>
          <a href="https://twitter.com" className="text-gray-300 hover:text-white">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
