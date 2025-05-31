
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CreateProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
  });

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login");
      return;
    }
    return token;
  };

   const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      budgetMin: '',
      budgetMax: '',
      deadline: '',
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to your API
    try {
      const token = getAuthToken();
      if(!token) return;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          budgetMin: parseFloat(formData.budgetMin),
          budgetMax: parseFloat(formData.budgetMax),
          deadline: formData.deadline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Project created successfully!');
        resetForm()
        router.push('/dashboard/buyer');
      } else {
        toast.error(data.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('An error occurred while creating the project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Budget (₹)
                </label>
                <input
                  type="number"
                  id="budgetMin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Budget (₹)
                </label>
                <input
                  type="number"
                  id="budgetMax"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="cursor-pointer mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => router.push('/dashboard/buyer/projects')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}