import Link from 'next/link';
import { useState } from 'react';
import AuthModal from '../AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                BidHub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/dashboard/buyer"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Buyer Dashboard
              </Link>
              <Link
                href="/dashboard/seller"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Seller Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={() => {
                setAuthType('login');
                setIsAuthModalOpen(true);
              }}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthType('register');
                setIsAuthModalOpen(true);
              }}
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authType}
        onTypeChange={setAuthType}
      />
    </nav>
  );
}

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { FiHome, FiBriefcase, FiDollarSign, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';

// const Navbar = () => {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   // Mock authentication state - replace with real auth logic
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState<'buyer' | 'seller'>('buyer');

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <FiHome className="mr-2" /> },
//     { name: 'Projects', href: '/projects', icon: <FiBriefcase className="mr-2" /> },
//     { name: 'Bids', href: '/bids', icon: <FiDollarSign className="mr-2" /> },
//     { name: 'Profile', href: '/profile', icon: <FiUser className="mr-2" /> },
//   ];

//   const toggleAuth = () => {
//     setIsAuthenticated(!isAuthenticated);
//     setUserRole(userRole === 'buyer' ? 'seller' : 'buyer');
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo and main nav */}
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               <span className="text-xl font-bold text-primary-600">TradePilot</span>
//             </Link>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                     router.pathname === link.href
//                       ? 'border-primary-500 text-gray-900'
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   }`}
//                 >
//                   {link.icon}
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Auth and mobile menu button */}
//           <div className="flex items-center">
//             <button
//               onClick={toggleAuth}
//               className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//             >
//               {isAuthenticated ? (
//                 <>
//                   <FiLogOut className="mr-2" />
//                   Sign Out
//                 </>
//               ) : (
//                 <>
//                   <FiLogIn className="mr-2" />
//                   Sign In
//                 </>
//               )}
//             </button>
//             <div className="ml-4 flex items-center sm:ml-6">
//               {isAuthenticated && (
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
//                   {userRole.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             {/* Mobile menu button */}
//             <div className="-mr-2 flex items-center sm:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <svg
//                   className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//                 <svg
//                   className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
//         <div className="pt-2 pb-3 space-y-1">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                 router.pathname === link.href
//                   ? 'bg-primary-50 border-primary-500 text-primary-700'
//                   : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
//               }`}
//             >
//               <div className="flex items-center">
//                 {link.icon}
//                 {link.name}
//               </div>
//             </Link>
//           ))}
//           <button
//             onClick={toggleAuth}
//             className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//               isAuthenticated
//                 ? 'bg-red-50 border-red-500 text-red-700'
//                 : 'bg-green-50 border-green-500 text-green-700'
//             }`}
//           >
//             <div className="flex items-center">
//               {isAuthenticated ? (
//                 <>
//                   <FiLogOut className="mr-2" />
//                   Sign Out
//                 </>
//               ) : (
//                 <>
//                   <FiLogIn className="mr-2" />
//                   Sign In
//                 </>
//               )}
//             </div>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;