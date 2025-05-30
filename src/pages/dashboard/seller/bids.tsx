import Link from 'next/link';
import StatusBadge from '../../../../components/StatusBadge';

interface Bid {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  status: string;
  createdAt: string;
  projectStatus: string;
}

async function getSellerBids(): Promise<Bid[]> {
  
  return [
    {
      id: '1',
      projectId: '101',
      projectTitle: 'Website Redesign',
      amount: 2000,
      status: 'Submitted',
      createdAt: '2023-11-10',
      projectStatus: 'Pending',
    },
    {
      id: '2',
      projectId: '102',
      projectTitle: 'Mobile App Development',
      amount: 8500,
      status: 'Accepted',
      createdAt: '2023-11-05',
      projectStatus: 'In Progress',
    },
    {
      id: '3',
      projectId: '103',
      projectTitle: 'Logo Design',
      amount: 750,
      status: 'Rejected',
      createdAt: '2023-10-28',
      projectStatus: 'Completed',
    },
  ];
}

export default async function SellerBids() {
  const bids = await getSellerBids();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Bids</h1>
          <Link
            href="/dashboard/seller"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Projects
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Bid History</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {bids.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-gray-500">You haven&#39;t placed any bids yet.</p>
                <Link
                  href="/dashboard/seller"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Browse Projects
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bid Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bids.map((bid) => (
                      <tr key={bid.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{bid.projectTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${bid.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={bid.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={bid.projectStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/dashboard/seller/projects/${bid.projectId}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}