
import Link from 'next/link';
import ProjectCard from '../../components/ProjectCard';
import { useEffect, useState } from 'react';
import { getProjects } from './api/projectApi';


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
  bidsCount: number;
  status: string;
  bids: Bid[];
}

export default function Home() {
  // In a real app, you would fetch these from your API
  // const featuredProjects = [
  //   {
  //     id: '1',
  //     title: 'Website Redesign',
  //     description: 'Looking for a designer to redesign our company website with modern UI/UX principles.',
  //     budget: '$1,000 - $2,500',
  //     deadline: '2023-12-15',
  //     status: 'Pending',
  //     bidsCount: 5,
  //   },
  //   {
  //     id: '2',
  //     title: 'Mobile App Development',
  //     description: 'Need an experienced React Native developer to build a cross-platform mobile application.',
  //     budget: '$5,000 - $10,000',
  //     deadline: '2023-12-30',
  //     status: 'Pending',
  //     bidsCount: 8,
  //   },
  // ];

   const [featuredProjects, setfeaturedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const result = await getProjects();
          setfeaturedProjects(result);
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
      return <div className="p-4">Loading...</div>;
    }
  
    if (error) {
      return <div className="p-4 text-red-500">Failed to load projects.</div>;
    }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Find the Perfect Freelancer for Your Project</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with skilled professionals or find exciting projects to work on. Our platform makes collaboration easy.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard/buyer/projects/create"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100"
            >
              Post a Project
            </Link>
            <Link
              href="/dashboard/seller"
              className="px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to get your project done or find work that matches your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Post or Browse</h3>
              <p className="text-gray-600">
                Buyers post projects with requirements. Sellers browse available projects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bid or Select</h3>
              <p className="text-gray-600">
                Sellers place bids on projects. Buyers review bids and select the best fit.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Collaborate & Complete</h3>
              <p className="text-gray-600">
                Work together, track progress, and complete the project successfully.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out some of the latest projects posted by buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/dashboard/seller"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

