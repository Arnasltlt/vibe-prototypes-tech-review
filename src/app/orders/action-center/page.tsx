'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for action items
const actionItems = [
  {
    id: 1,
    orderId: 'ORD-2025-141',
    orderName: 'Medical Device Enclosure',
    customer: 'MediTech Solutions',
    industry: 'Medical',
    action: 'Quote Approval Required',
    dueDate: 'Feb 15, 2025',
    priority: 'High',
    description: 'Customer quote approval is pending. Quote will expire in 3 days.',
    status: 'Quoted'
  },
  {
    id: 2,
    orderId: 'ORD-2025-138',
    orderName: 'Camera Mounting Bracket',
    customer: 'VisTech Systems',
    industry: 'Consumer Electronics',
    action: 'Shipping Confirmation',
    dueDate: 'Feb 13, 2025',
    priority: 'High',
    description: 'Order has been shipped but requires confirmation of delivery receipt.',
    status: 'Shipped'
  },
  {
    id: 3,
    orderId: 'ORD-2025-142',
    orderName: 'Robotics Controller Housing',
    customer: 'Acme Corp',
    industry: 'Aerospace',
    action: 'Quality Check Required',
    dueDate: 'Feb 20, 2025',
    priority: 'Medium',
    description: 'First production batch complete. Quality inspection required before continuing.',
    status: 'In Production'
  },
  {
    id: 4,
    orderId: 'ORD-2025-139',
    orderName: 'Industrial Sensor Mount',
    customer: 'SensorTech Industries',
    industry: 'Industrial',
    action: 'Quote Preparation',
    dueDate: 'Feb 15, 2025',
    priority: 'Medium',
    description: 'Customer is waiting for a quote. Technical review required.',
    status: 'Quote Requested'
  },
  {
    id: 5,
    orderId: 'ORD-2025-137',
    orderName: 'Drone Frame Components',
    customer: 'SkyView Robotics',
    industry: 'Aerospace',
    action: 'Draft Completion',
    dueDate: 'Feb 28, 2025',
    priority: 'Low',
    description: 'Order specifications are incomplete. Additional details needed from customer.',
    status: 'Draft'
  },
  {
    id: 6,
    orderId: 'ORD-2025-140',
    orderName: 'EV Battery Terminal',
    customer: 'ElectroDrive Inc',
    industry: 'Automotive',
    action: 'Materials Procurement',
    dueDate: 'Feb 17, 2025',
    priority: 'Medium',
    description: 'Special materials need to be ordered for this production run.',
    status: 'In Production'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColorClass = () => {
    switch (status) {
      case 'In Production':
        return 'bg-green-100 text-green-800';
      case 'Quoted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Quote Requested':
        return 'bg-purple-100 text-purple-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass()}`}>
      {status}
    </span>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityColorClass = () => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColorClass()}`}>
      {priority}
    </span>
  );
};

export default function ActionCenterPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  
  // Filter action items based on selected filter
  const filteredItems = filter === 'all' 
    ? actionItems 
    : actionItems.filter(item => item.priority.toLowerCase() === filter.toLowerCase());

  // Function to get border color class based on priority
  const getBorderColorClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-l-[var(--red-500)]';
      case 'Medium':
        return 'border-l-[var(--orange-500)]';
      case 'Low':
        return 'border-l-[var(--network-blue-400)]';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-[#171717] text-white">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <Typography variant="h3" className="font-bold text-white">PROTOLABS NETWORK</Typography>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Marvin
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Messages
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                RDA manager
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                RFQ manager
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Scans
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/orders" className="flex items-center px-4 py-3 bg-gray-800 text-white">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.197l-4.419 3.617A1 1 0 014 16V4z" clipRule="evenodd" />
                </svg>
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="w-full mx-auto px-6 py-6 max-w-7xl">
          {/* Header with Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Typography variant="h1" color="default" className="text-2xl font-bold text-black">Action Center</Typography>
              <Typography variant="body2" color="subtle" className="mt-1 text-gray-700">
                Prioritized tasks requiring your attention
              </Typography>
            </div>
            <div className="flex space-x-2">
              <Button 
                buttonType="outline" 
                colorVariant="grey" 
                size="m"
                onClick={() => router.push('/orders')}
                className="flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                View All Orders
              </Button>
              <Button 
                buttonType="default" 
                colorVariant="purple" 
                size="m"
                className="flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Order
              </Button>
            </div>
          </div>
          
          {/* Filter options */}
          <div className="mb-6 flex items-center space-x-2">
            <Typography variant="body2" color="default" className="text-sm">Filter by priority:</Typography>
            <div className="flex space-x-1">
              <Button 
                buttonType={filter === 'all' ? 'default' : 'outline'} 
                colorVariant={filter === 'all' ? 'purple' : 'grey'} 
                size="s"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                buttonType={filter === 'high' ? 'default' : 'outline'} 
                colorVariant={filter === 'high' ? 'red' : 'grey'} 
                size="s"
                onClick={() => setFilter('high')}
              >
                High Priority
              </Button>
              <Button 
                buttonType={filter === 'medium' ? 'default' : 'outline'} 
                colorVariant={filter === 'medium' ? 'orange' : 'grey'} 
                size="s"
                onClick={() => setFilter('medium')}
              >
                Medium Priority
              </Button>
              <Button 
                buttonType={filter === 'low' ? 'default' : 'outline'} 
                colorVariant={filter === 'low' ? 'blue' : 'grey'} 
                size="s"
                onClick={() => setFilter('low')}
              >
                Low Priority
              </Button>
            </div>
          </div>
          
          {/* Action Items */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <Card 
                description={<Typography color="default">No action items match your current filter.</Typography>}
                cardType="centered"
              />
            ) : (
              filteredItems.map((item) => (
                <Card 
                  key={item.id}
                  className={`border-l-4 ${getBorderColorClass(item.priority)}`}
                  title={
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Typography variant="subtitle1" color="default" className="font-medium">{item.action}</Typography>
                        <PriorityBadge priority={item.priority} />
                      </div>
                      <Typography variant="body2" color="subtle" className="text-sm">
                        Due: {item.dueDate}
                      </Typography>
                    </div>
                  }
                  description={
                    <div className="mt-3">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center">
                            <Link href={`/orders/${item.orderId}`} className="text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)] font-medium">
                              #{item.orderId}
                            </Link>
                            <span className="mx-2">•</span>
                            <Typography variant="body1" color="default">{item.orderName}</Typography>
                          </div>
                          <div className="text-sm mt-1">
                            <Typography variant="body2" color="subtle">
                              {item.customer} <span className="text-gray-400">({item.industry})</span>
                            </Typography>
                          </div>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      
                      <Typography variant="body2" color="default" className="mb-4">{item.description}</Typography>
                      
                      <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-3">
                        <div>
                          {item.status === 'Quoted' && (
                            <Button buttonType="default" colorVariant="green" size="s">
                              Approve Quote
                            </Button>
                          )}
                          {item.status === 'Shipped' && (
                            <Button buttonType="default" colorVariant="blue" size="s">
                              Confirm Delivery
                            </Button>
                          )}
                          {item.status === 'In Production' && item.action === 'Quality Check Required' && (
                            <Button buttonType="default" colorVariant="purple" size="s">
                              Record Inspection
                            </Button>
                          )}
                          {item.status === 'In Production' && item.action === 'Materials Procurement' && (
                            <Button buttonType="default" colorVariant="purple" size="s">
                              Manage Materials
                            </Button>
                          )}
                          {item.status === 'Quote Requested' && (
                            <Button buttonType="default" colorVariant="orange" size="s">
                              Prepare Quote
                            </Button>
                          )}
                          {item.status === 'Draft' && (
                            <Button buttonType="default" colorVariant="grey" size="s">
                              Complete Details
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button buttonType="text-action" colorVariant="grey" size="s">
                            Reassign
                          </Button>
                          <Button buttonType="text-action" colorVariant="grey" size="s">
                            Postpone
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                />
              ))
            )}
          </div>
          
          {/* Statistics Card */}
          <Card
            className="mt-6"
            title={<Typography variant="h3" color="default">Action Summary</Typography>}
            description={
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <Typography variant="h3" color="red" className="text-2xl font-bold">2</Typography>
                  <Typography variant="body2" color="default">High Priority</Typography>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <Typography variant="h3" color="orange" className="text-2xl font-bold">3</Typography>
                  <Typography variant="body2" color="default">Medium Priority</Typography>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Typography variant="h3" color="primary" className="text-2xl font-bold">1</Typography>
                  <Typography variant="body2" color="default">Low Priority</Typography>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <Typography variant="h3" color="success" className="text-2xl font-bold">5</Typography>
                  <Typography variant="body2" color="default">Completed Today</Typography>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
} 