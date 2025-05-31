import { useRouter } from 'next/router';
import StatusBadge from '../../../../../components/StatusBadge';
import SelectBidButton from '../../../../../components/SelectBidButton';
import { useEffect, useState } from 'react';
import { getProjects } from '@/pages/api/projectApi';

interface Project {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
  selectedBid: string | null;
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

export default function BuyerProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const allProjects = await getProjects();
        const foundProject = allProjects.find((p: Project) => p.id === id);
        if (!foundProject) throw new Error("Project not found");
        setProject(foundProject);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSelectBid = async (bidId: string) => {
    // In a real app, you would call your API to select the bid
    console.log(`Selected bid ${bidId} for project ${id}`);
    // Update project status and selected bid
    if (project) {
      setProject({
        ...project,
        selectedBid: bidId,
        status: 'In Progress'
      });
    }
  };

  const handleSubmitReview = async () => {
    // In a real app, you would submit the review to your API
    console.log('Review submitted');
    // Update project status
    if (project) {
      setProject({
        ...project,
        status: 'Completed'
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you&#39;re looking for doesn&#39;t exist or may have been removed.</p>
          <button
            onClick={() => router.push('/dashboard/buyer')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Projects
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
                  ₹{project.budgetMin.toLocaleString()} - ₹{project.budgetMax.toLocaleString()}
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
              <p className="text-gray-500">No bids yet.</p>
            ) : (
              <div className="space-y-4">
                {project.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className={`border rounded-lg p-4 ${
                      project.selectedBid === bid.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{bid.sellerName}</h3>
                        <p className="text-sm text-gray-500">
                          Bid placed on {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-indigo-600">
                          ₹{bid.amount.toLocaleString()}
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
                    {project.status === 'Pending' && !project.selectedBid && (
                      <div className="mt-4 flex justify-end">
                        <SelectBidButton
                          bidId={bid.id}
                          onSelect={handleSelectBid}
                        />
                      </div>
                    )}
                    {project.selectedBid === bid.id && (
                      <div className="mt-4 flex justify-end">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Actions */}
          {project.status === 'In Progress' && (
            <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Management</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Current Status: In Progress</h3>
                  <p className="text-gray-700 mb-4">
                    The seller is working on your project. You&#39;ll be notified when they submit deliverables.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Message Seller
                  </button>
                </div>
              </div>
            </div>
          )}

          {project.status === 'Completed' && (
            <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Completed</h2>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Deliverables Received</h3>
                <p className="text-gray-700 mb-4">
                  The seller has submitted the final deliverables for your review.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Files</h4>
                    <ul className="mt-1 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">website-design.zip (24.5 MB)</span>
                      </li>
                      <li className="flex items-center mt-2">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">style-guide.pdf (2.1 MB)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Seller Notes</h4>
                    <p className="mt-1 text-sm text-gray-700">
                      Thank you for the opportunity to work on this project. Please find attached all the final design files and a style guide for your reference. Let me know if you need any modifications or have questions about the deliverables.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Rate the Seller</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                      >
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                      Write a Review
                    </label>
                    <textarea
                      id="review"
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Share your experience working with this seller..."
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSubmitReview}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
