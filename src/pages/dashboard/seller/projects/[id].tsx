import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StatusBadge from '../../../../../components/StatusBadge';
import BidForm from '../../../../../components/BidForm';

interface Project {
  id: string;
  title: string;
  description: string;
  minBudget: number;
  maxBudget: number;
  deadline: string;
  status: string;
  bids: Bid[];
}

interface Bid {
  id: string;
  amount: number;
  sellerName: string;
  estimatedTime: string;
  message: string;
  createdAt: string;
}

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {

        // Mock data
        const data: Project = {
          id: id as string,
          title: 'Website Redesign',
          description: 'Looking for a designer to redesign our company website with modern UI/UX principles. The website should be responsive and accessible. We need a complete redesign of all pages including homepage, about us, services, and contact pages.',
          minBudget: 1000,
          maxBudget: 2500,
          deadline: '2023-12-15',
          status: 'Pending',
          bids: [
            {
              id: '1',
              amount: 2000,
              sellerName: 'Creative Designs Co.',
              estimatedTime: '3 weeks',
              message: 'We have extensive experience in website redesigns for similar businesses. Our portfolio includes 50+ successful projects.',
              createdAt: '2023-11-10',
            },
            {
              id: '2',
              amount: 1800,
              sellerName: 'UI/UX Pros',
              estimatedTime: '4 weeks',
              message: 'Specializing in user-centered design that improves conversion rates. We follow the latest web design trends.',
              createdAt: '2023-11-12',
            },
          ],
        };
        
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Project Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                <div className="mt-1 flex items-center">
                  <StatusBadge status={project.status} />
                  <span className="ml-2 text-sm text-gray-500">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Budget Range</p>
                <p className="text-lg font-semibold text-indigo-600">
                  ${project.minBudget.toLocaleString()} - ${project.maxBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Project Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          </div>

          {/* Bids Section */}
          <div className="border-t border-gray-200 px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Bids ({project.bids.length})
            </h2>

            {project.bids.length === 0 ? (
              <p className="text-gray-500">No bids yet. Be the first to bid on this project!</p>
            ) : (
              <div className="space-y-4">
                {project.bids.map((bid) => (
                  <div key={bid.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{bid.sellerName}</h3>
                        <p className="text-sm text-gray-500">
                          Bid placed on {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-indigo-600">
                          ${bid.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Est. time: {bid.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Message</h4>
                      <p className="text-gray-700">{bid.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bid Form (for sellers) */}
          <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Place Your Bid</h2>
            <BidForm projectId={project.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
