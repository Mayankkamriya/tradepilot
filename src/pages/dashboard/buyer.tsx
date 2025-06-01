"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '../../../components/StatusBadge';
//import {toast} from 'react-toastify'
interface Bid {
  id: string;
  amount: number;
  estimatedTime: string;
  message: string;
  createdAt: string;
  sellerName: string;
  sellerId: string;
  projectId: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  buyerId: string;
  sellerId: string | null;
  bids?: Bid[];
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  projectsCreated: Project[];
  projectsTaken: Project[];
  bids: Bid[];
}

// API function to get user details
const getUserDetails = async (): Promise<UserDetails> => {
  const token = localStorage.getItem('token'); // Adjust based on how you store the token
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  // if (!response.ok) {
  //   toast.error('Failed to fetch user details');
  // }

  const result = await response.json();
  return result.data;
};

export default function BuyerDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token,setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsResult = await getUserDetails();
        setUserDetails(userDetailsResult);
        setProjects(userDetailsResult?.projectsCreated);
      } catch (err) {
        console.error('Error fetching user details:', err);
       // setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);


  // if (error) {
  //   return <div className="p-4 text-red-500">Failed to load projects.</div>;
  // }
if ( !token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="mx-auto h-20 w-20 text-red-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-500 mt-4">No authentication token found</p>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Projects</h1>
            {userDetails && (
              <p className="text-sm text-gray-600 mt-1">Welcome back, {userDetails.name}</p>
            )}
          </div>
          <Link
            href="/dashboard/buyer/projects/create"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'IN_PROGRESS').length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'COMPLETED').length}
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Your Created Projects</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Loading your projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-gray-500">You haven&#39;t created any projects yet.</p>
                <Link
                  href="/dashboard/buyer/projects/create"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Your First Project
                </Link>
              </div>
            ) : (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/buyer/projects/${project.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {project.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <StatusBadge status={project.status} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>
                          Budget: ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
                        </span>
                        <span>
                          Deadline: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        {userDetails && userDetails.bids.length > 0 && (
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Your Recent Bids</h3>
              <p className="mt-1 text-sm text-gray-500">Bids you&#39;ve placed on other projects</p>
            </div>
            <div className="divide-y divide-gray-200">
              {userDetails.bids.slice(0, 3).map((bid) => (
                <div key={bid.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bid Amount: ${bid.amount}</p>
                      <p className="text-sm text-gray-500">Estimated Time: {bid.estimatedTime}</p>
                      <p className="text-sm text-gray-500 mt-1">{bid.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}