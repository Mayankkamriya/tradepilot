import { useState } from 'react';

interface SelectBidButtonProps {
  bidId: string;
  onSelect: (bidId: string) => Promise<void> | void;
}

export default function SelectBidButton({ bidId, onSelect }: SelectBidButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSelect = async () => {
    if (!isConfirmed) {
      setIsConfirmed(true);
      return;
    }

    setIsLoading(true);
    try {
      await onSelect(bidId);
    } finally {
      setIsLoading(false);
      setIsConfirmed(false);
    }
  };

  return (
    <button
      onClick={handleSelect}
      disabled={isLoading}
      className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isConfirmed
          ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
          : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
      }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : isConfirmed ? (
        'Confirm Selection'
      ) : (
        'Select This Bid'
      )}
    </button>
  );
}