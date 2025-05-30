import Link from 'next/link';
import ProjectCard from '../../../components/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  bidsCount: number;
}

async function getSellerProjects(): Promise<Project[]> {

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
      status: 'Pending',
      bidsCount: 8,
    },
    {
      id: '3',
      title: 'Logo Design',
      description: 'Looking for a creative designer to create a modern logo for our startup.',
      budget: '$500 - $1,000',
      deadline: '2023-11-20',
      status: 'Pending',
      bidsCount: 3,
    },
  ];
}

export default async function SellerDashboard() {
  const projects = await getSellerProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Available Projects</h1>
          <div className="flex space-x-3">
            <Link
              href="/dashboard/seller/bids"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Your Bids
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Active Bids</h3>
            <p className="text-2xl font-semibold text-gray-900">5</p> {/* This would come from API */}
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Projects Won</h3>
            <p className="text-2xl font-semibold text-gray-900">3</p> {/* This would come from API */}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No projects available at the moment.</p>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}