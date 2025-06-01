export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  avatar?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budgetRange: [number, number];
  deadline: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  buyerId: string;
  sellerId?: string;
  createdAt: Date;
  skillsRequired?: string[];
}

export interface Bid {
  id: string;
  projectId: string;
  sellerId: string;
  amount: number;
  estimatedCompletion: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Deliverable {
  id: string;
  projectId: string;
  fileUrl: string;
  submittedAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}