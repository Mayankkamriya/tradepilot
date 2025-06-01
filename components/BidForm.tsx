
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface BidFormProps {
  projectId: string;
  onBidSubmitted: () => void;
}

export default function BidForm({ projectId, onBidSubmitted }: BidFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    estimatedTime: '',
    message: '',
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        // toast.error('Please login to submit a bid');
        return;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isClient) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to submit a bid');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          amount: parseFloat(formData.amount),
          estimatedTime: formData.estimatedTime,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success('Bid submitted successfully!');
        setFormData({
          amount: '',
          estimatedTime: '',
          message: '',
        });
        onBidSubmitted();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to submit bid');
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('An error occurred while submitting your bid');
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Bid Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-1">
          Estimated Completion Time
        </label>
        <input
          type="text"
          id="estimatedTime"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., 2 weeks, 1 month"
          value={formData.estimatedTime}
          onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Why are you the best fit for this project?
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Bid
        </button>
      </div>
    </form>
  );
}