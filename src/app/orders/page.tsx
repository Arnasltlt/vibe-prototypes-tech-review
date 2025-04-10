'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-2025-142',
    name: 'Robotics Controller Housing',
    customer: 'Acme Corp',
    industry: 'Aerospace',
    status: 'Draft',
    created: 'Feb 12, 2025',
    delivery: 'Apr 15, 2025',
  },
  {
    id: 'ORD-2025-141',
    name: 'Medical Device Enclosure',
    customer: 'MediTech Solutions',
    industry: 'Medical',
    status: 'Draft',
    created: 'Feb 10, 2025',
    delivery: 'Mar 25, 2025',
  },
  {
    id: 'ORD-2025-140',
    name: 'EV Battery Terminal',
    customer: 'ElectroDrive Inc',
    industry: 'Automotive',
    status: 'Production PO issued',
    created: 'Feb 5, 2025',
    delivery: 'Mar 20, 2025',
  },
  {
    id: 'ORD-2025-139',
    name: 'Industrial Sensor Mount',
    customer: 'SensorTech Industries',
    industry: 'Industrial',
    status: 'Production RFQ',
    created: 'Feb 2, 2025',
    delivery: 'Apr 5, 2025',
  },
  {
    id: 'ORD-2025-138',
    name: 'Camera Mounting Bracket',
    customer: 'VisTech Systems',
    industry: 'Consumer Electronics',
    status: 'Canceled',
    created: 'Jan 28, 2025',
    delivery: 'Mar 5, 2025',
  },
  {
    id: 'ORD-2025-137',
    name: 'Drone Frame Components',
    customer: 'SkyView Robotics',
    industry: 'Aerospace',
    status: 'Draft',
    created: 'Jan 25, 2025',
    delivery: '--',
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColorClass = () => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'PO issued':
        return 'bg-blue-100 text-blue-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      case 'Production RFQ':
        return 'bg-purple-100 text-purple-800';
      case 'Production PO issued':
        return 'bg-green-100 text-green-800';
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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All Requests');
  const router = useRouter();
  
  // Tab data
  const tabs = [
    { id: 'all', label: 'All Requests', count: 42 },
    { id: 'active', label: 'Active', count: 28 },
    { id: 'quoted', label: 'Quoted', count: 7 },
    { id: 'production', label: 'In Production', count: 14 },
    { id: 'completed', label: 'Completed', count: 14 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#171717] text-white p-4 hidden md:block">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="mr-2">
                <svg className="h-8 w-8" viewBox="0 0 60 60" fill="white">
                  <path d="M30 0L0 17.32v34.64L30 60l30-17.32V17.32L30 0zm20 46.19L30 57.96 10 46.19V22.64L30 10.87l20 11.77v23.55z" />
                  <path d="M30 16.47L15 25.02v17.11l15 8.55 15-8.55V25.02L30 16.47z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg leading-none">PROTOLABS</div>
                <div className="font-bold text-lg leading-none">NETWORK</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a3 3 0 100 6 3 3 0 000-6zm-7 9a7 7 0 1114 0h-1.5a5.5 5.5 0 10-11 0H3z"></path>
              </svg>
              Marvin
            </a>
            
            <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
              </svg>
              Messages
            </a>
            
            <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
              </svg>
              RDA manager
            </a>
            
            <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              RFQ manager
            </a>
            
            <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
              Scans
            </a>
            
            <a href="/orders" className="flex items-center py-2 text-white bg-[#333] rounded px-2">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
              </svg>
              Requests to Quote
            </a>
            
            <a href="/example-quote" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              Example Quote
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="w-full mx-auto px-6 py-6 max-w-7xl">
            {/* Header with Actions */}
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h1" color="default" className="text-2xl font-bold text-black">Requests to Quote</Typography>
              <div className="flex space-x-2">
                <Button 
                  buttonType="outline" 
                  colorVariant="grey" 
                  size="m"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter
                </Button>
                <Button 
                  buttonType="outline" 
                  colorVariant="grey" 
                  size="m"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h8a1 1 0 100-2H3zm0 6a1 1 0 100 2h4a1 1 0 100-2H3z" clipRule="evenodd" />
                  </svg>
                  Sort
                </Button>
              </div>
            </div>
            
            {/* Search and Filter Bar */}
            <Card 
              className="mb-6"
              contentClassName="p-4"
              description={
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search orders..." 
                        className="w-full border border-gray-300 rounded pl-10 py-2 focus:outline-none focus:border-[var(--network-blue-400)] text-gray-900 placeholder-gray-500"
                      />
                      <svg 
                        className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--network-blue-400)] text-gray-900 bg-white"
                    >
                      <option>All Statuses</option>
                      <option>Draft</option>
                      <option>PO issued</option>
                      <option>Canceled</option>
                      <option>Production RFQ</option>
                      <option>Production PO issued</option>
                    </select>
                    <select 
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--network-blue-400)] text-gray-900 bg-white"
                    >
                      <option>All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>
              }
            />
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`border-b-2 px-1 py-3 text-sm font-medium ${
                      activeTab === tab.label
                        ? 'border-[var(--network-blue-400)] text-[var(--network-blue-400)]'
                        : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Order List */}
            <Card 
              className="mb-6 overflow-hidden"
              description={
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Customer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Created</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Delivery</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                <div className="text-sm text-gray-800">{order.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.customer}</div>
                            <div className="text-sm text-gray-800">{order.industry}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {order.created}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {order.delivery}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link 
                              href={`/orders/${order.id}`}
                              className="text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)] mr-3"
                            >
                              View
                            </Link>
                            <a 
                              href="#" 
                              className="text-gray-800 hover:text-gray-900"
                            >
                              {order.status === 'Draft' || order.status === 'Production RFQ' ? 'Edit' :
                               order.status === 'Canceled' ? 'View Details' : 'Track'}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            />
            
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button buttonType="outline" colorVariant="grey" size="s">Previous</Button>
                <Button buttonType="outline" colorVariant="grey" size="s">Next</Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <Typography variant="body2" color="default">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> results
                  </Typography>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300"
                    >
                      1
                    </Button>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300"
                    >
                      2
                    </Button>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300"
                    >
                      3
                    </Button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-800">
                      ...
                    </span>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300"
                    >
                      7
                    </Button>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 