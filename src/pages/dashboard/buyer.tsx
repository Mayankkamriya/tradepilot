import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '../../../components/StatusBadge';
import { getProjects } from '../api/projectApi';

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
  bids: Bid[];
}

export default function BuyerDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load projects.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Projects</h1>
          <Link
            href="/dashboard/buyer/projects/create"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Projects in Progress</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'IN_PROGRESS').length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Completed Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'COMPLETED').length}
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Projects</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {projects.length === 0 ? (
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
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {project.bids.length} {project.bids.length === 1 ? 'bid' : 'bids'} • Deadline:{' '}
                          {new Date(project.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}