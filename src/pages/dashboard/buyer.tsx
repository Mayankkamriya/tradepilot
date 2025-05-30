import Link from 'next/link';
// import ProjectCard from '../../../components/ProjectCard';
import StatusBadge from '../../../components/StatusBadge';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  bidsCount: number;
}

async function getBuyerProjects(): Promise<Project[]> {
  
  // Mock data
  return [
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Looking for a designer to redesign our company website with modern UI/UX principles.',
      budget: '$1,000 - $2,500',
      deadline: '2023-12-15',
      status: 'Pending',
      bidsCount: 5,
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Need an experienced React Native developer to build a cross-platform mobile application.',
      budget: '$5,000 - $10,000',
      deadline: '2023-12-30',
      status: 'In Progress',
      bidsCount: 8,
    },
    {
      id: '3',
      title: 'Content Marketing Strategy',
      description: 'Looking for a content marketer to develop a 6-month strategy for our SaaS product.',
      budget: '$3,000 - $5,000',
      deadline: '2023-11-30',
      status: 'Completed',
      bidsCount: 4,
    },
  ];
}

export default async function BuyerDashboard() {
  const projects = await getBuyerProjects();

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
              {projects.filter(p => p.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Completed Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {projects.filter(p => p.status === 'Completed').length}
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
                          {project.bidsCount} {project.bidsCount === 1 ? 'bid' : 'bids'} • Deadline: {project.deadline}
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