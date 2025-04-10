'use client';

import React, { useState } from 'react';
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
    status: 'RFQ Sent',
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
    ],
    parts: [
      {
        id: 1,
        name: '4012633_AB.stp',
        price: '€52435.00',
        priceType: 'Manually priced',
        attachments: [
          { name: '4012633_ac_7f759.pdf', id: '01' }
        ],
        specs: [
          'CNC machining',
          'AL 7075-T6',
          'As machined + Anodized type II',
          'No part markings',
          'General tolerance: ISO 2768 Medium',
          'No tighter tolerances',
          'Sharp internal corners rounded to 2 mm',
          'No engineering fits',
          'No threads'
        ]
      },
      {
        id: 2,
        name: 'M10000145.stp',
        price: '—',
        priceType: '',
        attachments: [],
        specs: [
          'CNC machining',
          'AL 7075-T6',
          'As machined + Anodized type II',
          'No part markings',
          'General tolerance: ISO 2768 Medium',
          'No tighter tolerances',
          'Sharp internal corners rounded to 2 mm',
          'No engineering fits',
          'No threads'
        ]
      }
    ],
    additionalItems: [
      {
        id: 3,
        type: 'shipping',
        name: 'Batch shipping: Required'
      },
      {
        id: 4,
        type: 'report',
        name: 'Material Test Report - Aluminium'
      }
    ],
    supplierGroups: [
      {
        supplier: 'Precision Manufacturing Co.',
        logo: 'https://placehold.co/100x100/4299e1/ffffff?text=PMC',
        location: 'Detroit, MI',
        rating: 4.8,
        expanded: true,
        responses: [
          {
            id: '3GVDLHM94-V3-RFQ3',
            parts: 1,
            units: 50,
            material: 'Aluminum 6061-T6 | 3.321| 65028| AlMg1SiCu',
            surfaceFinish: 'Brushed + Anodized type II (Glossy)',
            leadTime: '16 days',
            price: '$4,850.00',
            status: 'Submitted',
            adminNote: '-'
          },
          {
            id: '3GVDLHM94-V2-RFQ1',
            parts: 1,
            units: 35,
            material: 'Aluminum 6061-T6 | 3.321| 65028| AlMg1SiCu',
            surfaceFinish: 'Brushed + Anodized type II (Glossy)',
            leadTime: '18 days',
            price: '$3,950.00',
            status: 'Declined',
            adminNote: 'Unit count too low'
          }
        ]
      },
      {
        supplier: 'Metal Solutions Ltd.',
        logo: 'https://placehold.co/100x100/68d391/ffffff?text=MSL',
        location: 'Chicago, IL',
        rating: 4.6,
        expanded: false,
        responses: [
          {
            id: '3GVDLHM94-V2-RFQ2',
            parts: 1,
            units: 20,
            material: 'Aluminum 6061-T6 | 3.321| 65028| AlMg1SiCu',
            surfaceFinish: 'Brushed + Anodized type II (Glossy)',
            leadTime: '16 days',
            price: '$3,750.00',
            status: 'Declined',
            adminNote: 'Quote too high'
          }
        ]
      },
      {
        supplier: 'Advanced Engineering Inc.',
        logo: 'https://placehold.co/100x100/f6ad55/ffffff?text=AEI',
        location: 'Austin, TX',
        rating: 4.9,
        expanded: false,
        responses: [
          {
            id: '3GVDLHM94-V1-RFQ2',
            parts: 1,
            units: 50,
            material: 'Aluminum 6061-T6 | 3.321| 65028| AlMg1SiCu',
            surfaceFinish: 'Brushed + Anodized type II (Glossy)',
            leadTime: '16 days',
            price: '$4,250.00',
            status: 'Submitted',
            adminNote: '-'
          },
          {
            id: '3GVDLHM94-V1-RFQ1',
            parts: 1,
            units: 30,
            material: 'Aluminum 6061-T6 | 3.321| 65028| AlMg1SiCu',
            surfaceFinish: 'Brushed + Anodized type II (Glossy)',
            leadTime: '14 days',
            price: '$3,550.00',
            status: 'Answered',
            adminNote: '-'
          }
        ]
      }
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
      case 'RFQ Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-200 text-gray-800';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Answered':
        return 'bg-green-100 text-green-800';
      case 'Declined':
        return 'bg-gray-200 text-gray-600';
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

// Fun PO Confirmation Modal Component
const FunPoModal = ({ isOpen, onClose, poId }: { isOpen: boolean; onClose: () => void; poId: string | null }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-lg shadow-2xl text-center transform transition-all scale-100 opacity-100">
        <span className="text-6xl mb-4 block">🎉</span>
        <Typography variant="h2" className="text-white font-bold mb-2">PO Issued!</Typography>
        <Typography variant="body1" className="text-white mb-6">Purchase Order <span className="font-semibold">#{poId}</span> has been successfully issued! Let the manufacturing magic begin! ✨</Typography>
        <Button 
          buttonType="default" 
          colorVariant="grey"
          onClick={onClose}
        >
          Awesome!
        </Button>
      </div>
    </div>
  );
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : 'unknown';
  const order = getMockOrder(orderId);
  const [showVersions, setShowVersions] = useState(true);
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // No items expanded by default
  const [expandedSuppliers, setExpandedSuppliers] = useState<string[]>(
    order.supplierGroups.filter(sg => sg.expanded).map(sg => sg.supplier)
  );
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [isFunModalOpen, setIsFunModalOpen] = useState(false);
  const [issuedPoId, setIssuedPoId] = useState<string | null>(null);

  const toggleItemDetails = (itemId: number) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleAllDetails = () => {
    setExpandAllDetails(!expandAllDetails);
    setExpandedItems(expandAllDetails ? [] : order.parts.map(part => part.id));
  };

  const toggleSupplier = (supplier: string) => {
    setExpandedSuppliers(prev => 
      prev.includes(supplier)
        ? prev.filter(s => s !== supplier)
        : [...prev, supplier]
    );
  };

  const toggleResponseSelection = (responseId: string) => {
    setSelectedResponses(prev => 
      prev.includes(responseId)
        ? prev.filter(id => id !== responseId)
        : [...prev, responseId]
    );
  };

  const handleSelectAll = () => {
    const allResponses = order.supplierGroups.flatMap(group => 
      group.responses.filter(r => r.status !== 'Declined').map(r => r.id)
    );
    
    if (selectedResponses.length === allResponses.length) {
      setSelectedResponses([]);
    } else {
      setSelectedResponses(allResponses);
    }
  };

  const handleAssignPO = () => {
    if (selectedResponses.length === 0) {
      alert('Please select at least one response');
      return;
    }
    console.log(`Assigning PO to responses: ${selectedResponses.join(', ')}`);
    alert(`Purchase Order assigned to ${selectedResponses.length} response(s)`);
  };

  const handleCreateProductionOrder = () => {
    if (selectedResponses.length === 0) {
      alert('Please select at least one response');
      return;
    }
    
    console.log(`Creating Production Order for: ${selectedResponses.join(', ')}`);
    router.push(`/orders/new?fromResponses=${selectedResponses.join(',')}`);
  };

  const handleAwardPO = (responseId: string) => {
    console.log(`Issuing PO to ${responseId}`);
    setIssuedPoId(responseId);
    setIsFunModalOpen(true);
    // In a real app, this would call an API to award the PO
  };

  const handleRespond = (responseId: string) => {
    console.log(`Responding to ${responseId}`);
    // In a real app, this would open a response form
  };

  const handleDecline = (responseId: string) => {
    console.log(`Declining ${responseId}`);
    // In a real app, this would mark the response as declined
  };

  const handleClear = (responseId: string) => {
    console.log(`Clearing ${responseId}`);
    // In a real app, this would remove the response
  };

  // Replace the Supplier Responses card in the render method with this updated version:
  
  // The following code should replace the existing Supplier Responses Card in the render method
  const renderSupplierResponses = () => (
    <Card
      className="mb-6"
      title={
        <div className="flex justify-between items-center">
          <Typography variant="h3" color="default">Supplier Responses</Typography>
          <Button
            buttonType="outline"
            colorVariant="grey"
            size="s"
            onClick={() => setShowVersions(!showVersions)}
          >
            {showVersions ? 'Hide versions' : 'Show versions'} 
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showVersions ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </Button>
        </div>
      }
      description={
        <div className="mt-4">
          {showVersions ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllResponses" 
                    className="mr-2 h-4 w-4"
                    checked={
                      selectedResponses.length > 0 && 
                      selectedResponses.length === order.supplierGroups.flatMap(g => 
                        g.responses.filter(r => r.status !== 'Declined')
                      ).length
                    }
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="selectAllResponses" className="text-sm text-gray-700">Select all active responses</label>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    buttonType="default"
                    colorVariant="green"
                    size="s"
                    onClick={handleAssignPO}
                    disabled={selectedResponses.length === 0}
                    className="flex items-center gap-1"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Issue PO
                  </Button>
                  <Button
                    buttonType="default"
                    colorVariant="purple"
                    size="s"
                    onClick={handleCreateProductionOrder}
                    disabled={selectedResponses.length === 0}
                    className="flex items-center gap-1"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Create Production Order
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4 px-4 py-2 bg-gray-100 rounded">
                <div className="grid grid-cols-7 gap-2 w-full text-xs text-gray-600 font-medium">
                  <div className="col-span-2">Supplier</div>
                  <div>Parts & Units</div>
                  <div>Surface finishes</div>
                  <div>Lead time</div>
                  <div>Price</div>
                  <div className="text-right">Actions</div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 mb-4"></div>

              {/* Main Product Item */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="subtitle1" className="font-semibold text-gray-900">3GVDLHM94</Typography>
                    <Typography variant="body2" className="text-gray-600">1 part | &lt;50 units</Typography>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-2 ml-4">
                    <div>
                      <Typography variant="body2" color="subtle" className="text-xs">Material</Typography>
                      <Typography variant="body2" className="text-sm">Aluminum 6061-T6</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="text-xs">Surface finish</Typography>
                      <Typography variant="body2" className="text-sm">Brushed + Anodized type II (Glossy)</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="subtle" className="text-xs">Lead time</Typography>
                      <Typography variant="body2" className="text-sm">16 days</Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supplier Groups */}
              {order.supplierGroups.map((group, index) => (
                <div key={index} className="mb-4">
                  {/* Supplier Header */}
                  <div 
                    className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer"
                    onClick={() => toggleSupplier(group.supplier)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
                        {group.logo ? (
                          <img src={group.logo} alt={`${group.supplier} logo`} className="w-10 h-10 object-cover" />
                        ) : (
                          <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <Typography variant="subtitle1" className="font-semibold text-gray-900">{group.supplier}</Typography>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">{group.location}</span>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{group.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{group.responses.length} bid{group.responses.length !== 1 ? 's' : ''}</span>
                      <svg 
                        className={`h-5 w-5 text-gray-600 transition-transform ${expandedSuppliers.includes(group.supplier) ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Supplier Responses */}
                  {expandedSuppliers.includes(group.supplier) && (
                    <div className="border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
                      {group.responses.map((response, responseIndex) => (
                        <div 
                          key={responseIndex} 
                          className={`p-4 ${responseIndex !== group.responses.length - 1 ? 'border-b border-gray-200' : ''} ${response.status === 'Declined' ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <div className="flex items-start">
                            {response.status !== 'Declined' && (
                              <div className="mr-3 mt-1">
                                <input 
                                  type="checkbox" 
                                  id={`response-${response.id}`}
                                  className="h-4 w-4"
                                  checked={selectedResponses.includes(response.id)}
                                  onChange={() => toggleResponseSelection(response.id)}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <Typography variant="subtitle2" className="text-gray-900 font-medium">{response.id}</Typography>
                                  <StatusBadge status={response.status} />
                                </div>
                                <Typography variant="subtitle1" className="text-blue-600 font-bold">{response.price}</Typography>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div>
                                  <Typography variant="body2" color="subtle" className="text-xs">Parts & Units</Typography>
                                  <Typography variant="body2" className="text-sm">{response.parts} part | {response.units} units</Typography>
                                </div>
                                <div>
                                  <Typography variant="body2" color="subtle" className="text-xs">Surface finishes</Typography>
                                  <Typography variant="body2" className="text-sm">{response.surfaceFinish}</Typography>
                                </div>
                                <div>
                                  <Typography variant="body2" color="subtle" className="text-xs">Lead time</Typography>
                                  <Typography variant="body2" className="text-sm">{response.leadTime}</Typography>
                                </div>
                              </div>
                              
                              {response.adminNote !== '-' && (
                                <div className="mb-3">
                                  <Typography variant="body2" color="subtle" className="text-xs">Admin note</Typography>
                                  <Typography variant="body2" className="text-sm text-red-600">{response.adminNote}</Typography>
                                </div>
                              )}
                              
                              <div className="flex justify-end space-x-2">
                                {response.status !== 'Declined' && (
                                  <Button
                                    buttonType="outline"
                                    colorVariant="green"
                                    size="s"
                                    onClick={() => handleAwardPO(response.id)}
                                    className="flex items-center gap-1"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Issue PO
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click "Show versions" to see supplier responses
            </div>
          )}
        </div>
      }
    />
  );

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
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 002-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
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
        <div className="flex-1">
          {/* Header with Actions */}
          <div className="bg-white p-6 border-b border-gray-200">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
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
          </div>

          <div className="flex">
            {/* Quote Overview Panel - 40% width */}
            <div className="w-[40%] bg-gray-50 border-l border-r border-gray-200 overflow-y-auto">
              <div className="p-6">
                <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900 mb-4">
                  Quote overview
                </Typography>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="expandAllDetailsPanel" 
                    className="mr-2"
                    checked={expandAllDetails}
                    onChange={toggleAllDetails}
                  />
                  <label htmlFor="expandAllDetailsPanel" className="text-sm text-gray-600">Expand all details</label>
                </div>
                
                <div className="space-y-1.5">
                  {/* Item 1 */}
                  {order.parts.map((part) => (
                    <div 
                      key={part.id}
                      className={`border ${
                        expandedItems.includes(part.id) 
                          ? 'border-2 border-blue-500 hover:border-blue-500' 
                          : 'border-gray-300 hover:border-blue-500'
                      } rounded bg-white hover:bg-gray-50 transition-colors mb-3`}
                    >
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">{part.id}</div>
                          <div className="flex-1">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-3 mb-2">
                                <img 
                                  src="/metal-part.png" 
                                  alt="Metal part" 
                                  className="w-8 h-8 object-cover rounded bg-gray-100" 
                                />
                                <span className="text-gray-900 font-medium">{part.name}</span>
                              </div>
                              {part.attachments.length > 0 && (
                                <div className="text-xs text-gray-500 mb-2">{part.attachments.length} attachment in details</div>
                              )}
                              
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  {part.attachments.map((attachment) => (
                                    <a key={attachment.id} href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                                      {attachment.name}
                                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  ))}
                                </div>
                                <div className="text-right">
                                  <div className="text-gray-900 font-medium">{part.price}</div>
                                  {part.priceType && (
                                    <div className="text-sm text-blue-600">{part.priceType}</div>
                                  )}
                                </div>
                              </div>

                              {/* Expanded Details */}
                              {expandedItems.includes(part.id) && (
                                <div className="space-y-2 text-sm text-gray-600 mt-4">
                                  {part.specs.map((spec, index) => (
                                    <div key={index}>{spec}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button 
                                className="px-3 py-1.5 bg-[#fff4eb] text-[#c85c21] rounded text-sm hover:bg-orange-100 transition-colors"
                              >
                                View DFM analysis
                              </button>
                              <button 
                                onClick={() => toggleItemDetails(part.id)}
                                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                                  expandedItems.includes(part.id)
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {expandedItems.includes(part.id) ? 'Hide details' : 'Show details'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Additional items (Batch shipping, Material Test Report) */}
                  {order.additionalItems.map((item) => (
                    <div key={item.id} className="border border-gray-300 hover:border-blue-500 rounded bg-white hover:bg-gray-50 transition-colors mb-3">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">{item.id}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className={`${item.type === 'shipping' ? 'bg-blue-50' : 'bg-purple-50'} p-2 rounded`}>
                                <svg className={`h-4 w-4 ${item.type === 'shipping' ? 'text-blue-600' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  {item.type === 'shipping' ? (
                                    <>
                                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                                    </>
                                  ) : (
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7z" clipRule="evenodd" />
                                  )}
                                </svg>
                              </div>
                              <span className="text-gray-900 font-medium">{item.name}</span>
                            </div>
                            
                            <div className="mt-3">
                              <button 
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                              >
                                Show details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - 60% width */}
            <div className="w-[60%] bg-white overflow-y-auto p-6">
              <div className="w-full mx-auto px-6 py-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                  {/* Timeline Card */}
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
                          <div className="absolute w-3 h-3 -left-[6.5px] bg-blue-500 rounded-full"></div>
                          <Typography variant="body2" color="default" className="font-semibold">RFQ Sent</Typography>
                          <Typography variant="body2" color="subtle">Feb 14, 2025</Typography>
                        </div>
                        <div className="relative border-l-2 border-gray-200 pl-4 pb-2">
                          <div className="absolute w-3 h-3 -left-[6.5px] bg-yellow-500 rounded-full"></div>
                          <Typography variant="body2" color="default" className="font-semibold">Supplier Responses Received</Typography>
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
                      </div>
                    }
                  />
                  
                  {/* Attachments Card */}
                  <Card
                    title={<Typography variant="h3" color="default">Attachments</Typography>}
                    description={
                      <div className="mt-4">
                        {order.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-t border-gray-200">
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7z" clipRule="evenodd" />
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

                {/* Supplier Responses */}
                {renderSupplierResponses()}

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
      </div>
      {/* Render the fun modal */}
      <FunPoModal 
        isOpen={isFunModalOpen} 
        onClose={() => setIsFunModalOpen(false)} 
        poId={issuedPoId} 
      />
    </div>
  );
} 