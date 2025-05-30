import Link from 'next/link';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

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
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/dashboard/buyer"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium"
              >
                Buyer Dashboard
              </Link>
              <Link
                href="/dashboard/seller"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium"
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
              className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthType('register');
                setIsAuthModalOpen(true);
              }}
              className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                  BidHub
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
              <div className="space-y-4">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard/buyer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  onClick={closeMobileMenu}
                >
                  Buyer Dashboard
                </Link>
                <Link
                  href="/dashboard/seller"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  onClick={closeMobileMenu}
                >
                  Seller Dashboard
                </Link>
              </div>
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => {
                    setAuthType('login');
                    setIsAuthModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthType('register');
                    setIsAuthModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </button>
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
