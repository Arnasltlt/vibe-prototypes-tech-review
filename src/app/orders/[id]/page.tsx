'use client';

import React from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock order data - in a real app, this would be fetched from an API
const getMockOrder = (id: string) => {
  return {
    id,
    name: 'Medical Device Enclosure',
    description: 'Custom manufactured medical-grade enclosure for portable monitoring device. Made with biocompatible materials.',
    customer: 'MediTech Solutions',
    industry: 'Medical',
    status: 'Quoted',
    created: 'Feb 10, 2025',
    delivery: 'Mar 25, 2025',
    quantity: 500,
    material: 'Medical-grade polycarbonate',
    finish: 'Matte texture, antimicrobial coating',
    price: '$12,500.00',
    notes: 'Customer requires ISO 13485 certification for production. All units must pass biocompatibility testing.',
    attachments: [
      { name: 'Technical_Specifications.pdf', size: '2.4 MB' },
      { name: 'Enclosure_3D_Model.step', size: '8.7 MB' },
      { name: 'Assembly_Requirements.docx', size: '1.2 MB' }
    ]
  };
};

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

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : 'unknown';
  const order = getMockOrder(orderId);

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
              Orders
            </a>
            
            <a href="/orders/new" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              New Order
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="w-full mx-auto px-6 py-6 max-w-7xl">
            {/* Header with Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Button 
                  buttonType="outline" 
                  colorVariant="grey"
                  size="s"
                  onClick={() => router.back()}
                  className="flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
                <Typography variant="h1" color="default" className="text-2xl font-bold text-black">Order #{orderId}</Typography>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex space-x-2">
                <Button 
                  buttonType="default" 
                  colorVariant="green" 
                  size="m"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Accept Quote
                </Button>
                <Button 
                  buttonType="outline" 
                  colorVariant="grey" 
                  size="m"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Request Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Order Information Card */}
              <Card
                className="md:col-span-2"
                title={<Typography variant="h3" color="default">Order Information</Typography>}
                description={
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Project Name</Typography>
                      <Typography variant="body1" color="default">{order.name}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Customer</Typography>
                      <Typography variant="body1" color="default">{order.customer} <span className="text-sm text-gray-500">({order.industry})</span></Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Created Date</Typography>
                      <Typography variant="body1" color="default">{order.created}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Delivery Date</Typography>
                      <Typography variant="body1" color="default">{order.delivery}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Quantity</Typography>
                      <Typography variant="body1" color="default">{order.quantity} units</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Material</Typography>
                      <Typography variant="body1" color="default">{order.material}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Finish</Typography>
                      <Typography variant="body1" color="default">{order.finish}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Quote Price</Typography>
                      <Typography variant="body1" color="green" className="font-semibold">{order.price}</Typography>
                    </div>
                    <div className="sm:col-span-2">
                      <Typography variant="body2" color="subtle" className="mb-1">Description</Typography>
                      <Typography variant="body1" color="default">{order.description}</Typography>
                    </div>
                    <div className="sm:col-span-2">
                      <Typography variant="body2" color="subtle" className="mb-1">Special Notes</Typography>
                      <Typography variant="body1" color="default">{order.notes}</Typography>
                    </div>
                  </div>
                }
              />

              {/* Timeline & Attachments Card */}
              <Card
                title={<Typography variant="h3" color="default">Production Timeline</Typography>}
                description={
                  <div className="mt-4">
                    <div className="relative border-l-2 border-gray-200 pl-4 pb-2">
                      <div className="absolute w-3 h-3 -left-[6.5px] bg-blue-500 rounded-full"></div>
                      <Typography variant="body2" color="default" className="font-semibold">Quote Created</Typography>
                      <Typography variant="body2" color="subtle">Feb 12, 2025</Typography>
                    </div>
                    <div className="relative border-l-2 border-gray-200 pl-4 pb-2">
                      <div className="absolute w-3 h-3 -left-[6.5px] bg-yellow-500 rounded-full"></div>
                      <Typography variant="body2" color="default" className="font-semibold">Waiting for Approval</Typography>
                      <Typography variant="body2" color="subtle">Current Stage</Typography>
                    </div>
                    <div className="relative border-l-2 border-gray-200 pl-4 pb-2">
                      <div className="absolute w-3 h-3 -left-[6.5px] bg-gray-300 rounded-full"></div>
                      <Typography variant="body2" color="subtle" className="font-semibold">Production Start</Typography>
                      <Typography variant="body2" color="subtle">Estimated: Mar 1, 2025</Typography>
                    </div>
                    <div className="relative pl-4 pb-2">
                      <div className="absolute w-3 h-3 -left-[6.5px] bg-gray-300 rounded-full"></div>
                      <Typography variant="body2" color="subtle" className="font-semibold">Shipping</Typography>
                      <Typography variant="body2" color="subtle">Estimated: Mar 20, 2025</Typography>
                    </div>

                    <div className="mt-6 mb-4">
                      <Typography variant="subtitle1" color="default">Attachments</Typography>
                    </div>
                    {order.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-t border-gray-200">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <Typography variant="body2" color="default">{file.name}</Typography>
                        </div>
                        <div className="flex items-center">
                          <Typography variant="body2" color="subtle" className="mr-3">{file.size}</Typography>
                          <Button 
                            buttonType="text-action" 
                            colorVariant="blue"
                            size="s"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>

            {/* Additional Sections */}
            <Card
              className="mb-6"
              title={<Typography variant="h3" color="default">Manufacturing Details</Typography>}
              description={
                <div className="mt-4">
                  <div className="bg-gray-100 p-4 rounded-md mb-4 text-center">
                    <Typography variant="body2" color="subtle">3D model viewer will be displayed here</Typography>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Manufacturing Process</Typography>
                      <Typography variant="body1" color="default">CNC Machining</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Lead Time</Typography>
                      <Typography variant="body1" color="default">15 business days</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Quality Control</Typography>
                      <Typography variant="body1" color="default">ISO 13485 Standards</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="mb-1">Tolerances</Typography>
                      <Typography variant="body1" color="default">±0.1mm</Typography>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Actions Footer */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <Button 
                buttonType="outline" 
                colorVariant="grey"
                onClick={() => router.push('/orders')}
              >
                Back to Orders
              </Button>
              <div className="flex gap-2">
                <Button 
                  buttonType="text-action" 
                  colorVariant="blue"
                >
                  Download Quote PDF
                </Button>
                <Button 
                  buttonType="default" 
                  colorVariant="purple"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 