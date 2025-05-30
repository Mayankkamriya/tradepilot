import Link from 'next/link';
import StatusBadge from './StatusBadge';

// interface Bid {
//   id: string;
//   amount: number;
//   estimatedTime: string;
//   message: string;
//   createdAt: string;
//   sellerName: string;
//   sellerId: string;
//   projectId: string;
// }

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  bidsCount: number;
  // bids: Bid[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="font-medium text-indigo-600">{project.budget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium text-gray-900">{new Date(project.deadline).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {project.bidsCount} {project.bidsCount === 1 ? 'bid' : 'bids'}
            {/* {project.bids.length} {project.bids.length === 1 ? 'bid' : 'bids'} */}

          </span>
          <Link
            href={`/dashboard/seller/projects/${project.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}