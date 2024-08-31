import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
// Use the correct import statement without curly braces

// const Navbar = () => {
//   const [role, setRole] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userRole = jwtDecode(token).user.role;
//       setRole(userRole);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setRole(null);
//     setIsLoggedIn(false);
//     window.location.href = '/';
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-lg">Bangladeshi Handicrafts</h1>
//         <div>
//           <a href="/blog" className="text-gray-300 hover:text-white mr-4">Blog</a>
//           {isLoggedIn ? (
//             <>
//               {role === 'admin' && <a href="/admin" className="text-gray-300 hover:text-white mr-4">Admin Dashboard</a>}
//               {role === 'customer' && <a href="/customer" className="text-gray-300 hover:text-white mr-4">My Account</a>}
//               <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
//             </>
//           ) : (
//             <>
//               <a href="/login" className="text-gray-300 hover:text-white mr-4">Login</a>
//               <a href="/register" className="text-gray-300 hover:text-white">Register</a>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setprofilePicture] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('decodedToken', decodedToken)
      setRole(decodedToken.user.role);
      setUsername(decodedToken.user.name);  // Assuming the token contains the user's name
      setprofilePicture(decodedToken.user.profilePicture);  // Assuming the token contains the user's profile picture URL
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg">Bangladeshi Handicrafts</h1>
        <div className="flex items-center">
          <a href="/blog" className="text-gray-300 hover:text-white mr-4">Blog</a>
          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="text-gray-300 hover:text-white mr-4">My Favorites</Link>
              {role === 'admin' && <a href="/admin" className="text-gray-300 hover:text-white mr-4">Admin Dashboard</a>}
              {role === 'customer' && <a href="/customer" className="text-gray-300 hover:text-white mr-4">My Account</a>}
              <div className="flex items-center">
                <img
                  src={profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'}  // Provide a default profile picture
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-300 mr-4">{username || 'User'}</span>
                <Link to="/profile" className="text-gray-300 hover:text-white mr-4">Profile</Link> {/* Profile link */}
                <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-300 hover:text-white mr-4">Login</a>
              <a href="/register" className="text-gray-300 hover:text-white">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

