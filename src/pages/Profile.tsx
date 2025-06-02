import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface Bid {
  id: string;
  amount: number;
  estimatedTime: string;
  message: string;
  createdAt: string;
  sellerName: string;
  sellerId: string;
  bidStatus: string;
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
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'SELLER' | 'BUYER';
  createdAt: string;
  projectsCreated: Project[];
  projectsTaken: Project[];
  bids: Bid[];
}

interface ApiResponse {
  status: string;
  data: UserData;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          toast.error('Failed to fetch user data');
        }

        const result: ApiResponse = await response.json();
        
        if (result.status === 'success') {
          setUser(result.data);
          console.log(result.data)
        } else {
          toast.error('API returned error status');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="mx-auto h-12 w-12 text-red-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-500 mt-4">{error}</p>
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

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate statistics
  const totalBidAmount = user.bids.reduce((sum, bid) => sum + bid.amount, 0);
  const activeBids = user.bids.length;
  const projectsCreatedCount = user.projectsCreated.length;
  const projectsTakenCount = user.projectsTaken.length;
  
  const activeProjects = user.projectsCreated.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PENDING').length;
  const completedProjects = user.projectsCreated.filter(p => p.status === 'COMPLETED').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            {/* <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Edit Profile
            </button> */}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-8 py-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-8">
                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-lg text-gray-600 mt-1">{user.email}</p>
                <div className="mt-3 flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'SELLER' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                  <span className="text-gray-500">
                    Member since {memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'SELLER' ? (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Bids Placed</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeBids}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Bid Amount</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalBidAmount.toLocaleString()}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Average Bid</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{activeBids > 0 ? Math.round(totalBidAmount / activeBids).toLocaleString() : '0'}
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Projects Taken</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{projectsTakenCount}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Projects Created</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{projectsCreatedCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Projects</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeProjects}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed Projects</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completedProjects}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Bids Received</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{user.bids.length}</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bids Section */}
          {user.bids.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.role === 'SELLER' ? 'Recent Bids Placed' : 'Recent Bids Received'}
                </h3>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {user.bids.slice(0, 5).map((bid) => (
                  <div key={bid.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-semibold text-indigo-600">
                            ₹{bid.amount.toLocaleString()}
                          </p>
                          {/* Status Badge */}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              bid.bidStatus === 'SELECTED'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {bid.bidStatus === 'SELECTED' ? 'Selected' : 'Submitted'}
                          </span>
                        </div>
                          <span className="text-sm text-gray-500">
                            {new Date(bid.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Estimated Time:</span> {bid.estimatedTime}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Seller:</span> {bid.sellerName}
                        </p>
                        {bid.message && (
                          <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                            &#34;{bid.message}&#34;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {user.bids.length > 5 && (
                <div className="px-6 py-3 bg-gray-50 text-center border-t">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View All Bids ({user.bids.length})
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Recent Projects Section */}
          {user.projectsCreated.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {user.projectsCreated.slice(0, 5).map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/${user.role.toLowerCase()}/projects/${project.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                          {project.title}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="font-medium text-green-600">
                          ₹{project.budgetMin.toLocaleString()} - ₹{project.budgetMax.toLocaleString()}
                        </span>
                        <span>
                          Deadline: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {user.projectsCreated.length > 5 && (
                <div className="px-6 py-3 bg-gray-50 text-center border-t">
                  <Link
                    href={`/dashboard/${user.role.toLowerCase()}/projects`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View All Projects ({user.projectsCreated.length})
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State */}
        {user.bids.length === 0 && user.projectsCreated.length === 0 && (
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-12 text-center">
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {user.role === 'SELLER' ? 'No bids placed yet' : 'No projects created yet'}
              </h3>
              <p className="mt-2 text-gray-500">
                {user.role === 'SELLER' 
                  ? 'Start bidding on projects to build your portfolio and showcase your skills.'
                  : 'Create your first project to find talented sellers and get your work done.'
                }
              </p>
              <div className="mt-6">
                <Link
                  href={user.role === 'SELLER' ? '/dashboard/seller' : '/dashboard/buyer/projects/create'}
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {user.role === 'SELLER' ? 'Browse Projects' : 'Create Your First Project'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}