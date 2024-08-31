import React from 'react';
import Navbar from '../components/Navbar';

const Blog = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-bold">Blog</h2>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">Understanding Controlled and Uncontrolled Components</h3>
          <p className="text-gray-600">A controlled component is...</p>

          <h3 className="text-2xl font-bold mt-8">Using PropTypes in React</h3>
          <p className="text-gray-600">PropTypes are a way to...</p>

          {/* Add more blog content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
