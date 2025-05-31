import Link from 'next/link';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'SELLER' | 'BUYER';
  createdAt: string;
}

export default function Navbar() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  // In Navbar component
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    setIsLoggedIn(!!token);
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

  // Add this event listener
  const handleStorageChange = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    setIsLoggedIn(!!token);
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, [router.pathname]);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsMobileMenuOpen(false), 300);
    }
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Helper function to determine active route
  const isActive = (path: string) => {
    return router.pathname === path;
  };

  // Helper function to check if user can see buyer dashboard
  const canSeeBuyerDashboard = () => {
    return !isLoggedIn || (user && user.role === 'BUYER');
  };

  // Helper function to check if user can see seller dashboard
  const canSeeSellerDashboard = () => {
    return !isLoggedIn || (user && user.role === 'SELLER');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Trade Pilot
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium`}
              >
                Home
              </Link>
            {canSeeBuyerDashboard() && (
              <Link
                href="/dashboard/buyer"
                className={`${isActive('/dashboard/buyer') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium`}
              >
                Buyer Dashboard
              </Link>
            )}
            {canSeeSellerDashboard() && (
              <Link
                href="/dashboard/seller"
                className={`${isActive('/dashboard/seller') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium`}
              >
                Seller Dashboard
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/Profile"
                className={`${isActive('/profile') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium`}
              >
                Profile
              </Link>
            )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
        {isLoggedIn && user && (
          <span className="text-gray-700 font-medium">
            Welcome, {user.name}
          </span>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setAuthType('login');
                setIsAuthModalOpen(true);
              }}
              className="cursor-pointer px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthType('register');
                setIsAuthModalOpen(true);
              }}
              className="cursor-pointer ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </button>
          </>
        )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="cursor-pointer inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={`sm:hidden fixed inset-0 z-50 ${isAnimating ? 'animate-fadeIn' : 'animate-fadeOut'}`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeMobileMenu}
        >
          <div
            className={`relative bg-white w-4/5 max-w-sm h-full shadow-xl ${
              isAnimating ? 'animate-slideIn' : 'animate-slideOut'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-5 px-4">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="text-xl font-bold text-indigo-600" onClick={closeMobileMenu}>
                  Trade Pilot
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="cursor-pointer p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* User greeting for mobile */}
              {isLoggedIn && user && (
                <div className="mb-6 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">Welcome,</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              {canSeeBuyerDashboard() && (
                <Link
                  href="/dashboard/buyer"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard/buyer') ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                  onClick={closeMobileMenu}
                >
                  Buyer Dashboard
                </Link>
              )}
              {canSeeSellerDashboard() && (
                <Link
                  href="/dashboard/seller"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard/seller') ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                  onClick={closeMobileMenu}
                >
                  Seller Dashboard
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/Profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              )}
              </div>
              <div className="mt-8 space-y-4">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="cursor-pointer w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthType('login');
                        setIsAuthModalOpen(true);
                        closeMobileMenu();
                      }}
                      className="cursor-pointer w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthType('register');
                        setIsAuthModalOpen(true);
                        closeMobileMenu();
                      }}
                      className="cursor-pointer w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authType}
        onTypeChange={setAuthType}
      />
    </nav>
  );
}