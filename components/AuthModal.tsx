import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
  onTypeChange: (type: 'login' | 'register') => void;
}

export default function AuthModal({ isOpen, onClose, type, onTypeChange }: AuthModalProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'buyer',
  });
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.email || !formData.password) {
      toast.warning('Please fill in all required fields');
      return;
    }

    if (type === 'register' && !formData.name) {
      toast.warning('Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      // let response;
      let endpoint;
      let body;

      if (type === 'login') {
        endpoint = '/api/auth/login';
        body = {
          email: formData.email,
          password: formData.password
        };
      } else {
        endpoint = '/api/auth/signup';
        body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.userType.toUpperCase()
        };
      }

    const   response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = data.user;

// Store user details without the password
localStorage.setItem('user', JSON.stringify(userWithoutPassword));

window.dispatchEvent(new Event('storage'));

      toast.success(type === 'login' ? 'Login successful!' : 'Registration successful!');
      router.push('/');
      // Close modal after successful auth
      onClose();
      
      setFormData({
        email: '',
        password: '',
        name: '',
        userType: 'buyer',
      });

    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Authentication failed. Please try again.');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {type === 'login' ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="flex border-b mb-4">
          <button
            className={`cursor-pointer py-2 px-4 font-medium ${type === 'login' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => onTypeChange('login')}
          >
            Login
          </button>
          <button
            className={`cursor-pointer py-2 px-4 font-medium ${type === 'register' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => onTypeChange('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {type === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600"
                    name="userType"
                    value="buyer"
                    checked={formData.userType === 'buyer'}
                    onChange={() => setFormData({ ...formData, userType: 'buyer' })}
                  />
                  <span className="ml-2 text-gray-700">Buyer</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600"
                    name="userType"
                    value="seller"
                    checked={formData.userType === 'seller'}
                    onChange={() => setFormData({ ...formData, userType: 'seller' })}
                  />
                  <span className="ml-2 text-gray-700">Seller</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              'Processing...'
            ) : type === 'login' ? (
              'Login'
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}