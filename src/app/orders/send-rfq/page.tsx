'use client';

import React, { useState, useEffect } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SupplierSelection } from '@/app/components/suppliers/SupplierSelection';
import { Accordion } from '@/components/ui/Accordion/Accordion';

// Mock line items - replace with actual data
const mockLineItems = [
  {
    id: 1,
    name: '4012633_AB.stp',
    thumbnailUrl: '/metal-part.png',
    subtitle: '1 attachment, CNC machining, AL 7075-T6',
    price: '€52435.00',
    manualPriceLabel: 'Manually priced',
  },
  {
    id: 2,
    name: 'M10000145.stp',
    thumbnailUrl: '/metal-part.png',
    subtitle: 'CNC machining, AL 7075-T6',
    price: '—',
  },
];

export default function SendRFQPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSection, setExpandedSection] = useState('general');
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // No items expanded by default
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rfqSent, setRfqSent] = useState(false);
  const [requirementsComplete, setRequirementsComplete] = useState(false);
  const [requirementsData, setRequirementsData] = useState<any>(null);
  const [technicalReviewSummary, setTechnicalReviewSummary] = useState<any>(null);
  
  const totalSteps = 2;
  const steps = [
    { id: 1, name: 'RFQ Details' },
    { id: 2, name: 'Select Suppliers' }
  ];
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection('');
    } else {
      setExpandedSection(section);
    }
  };
  
  const toggleItemDetails = (itemId: number) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleAllDetails = () => {
    setExpandAllDetails(!expandAllDetails);
    setExpandedItems(expandAllDetails ? [] : [1, 2]);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    router.push('/example-quote');
  };

  const handleSubmitRfq = async () => {
    console.log('Submitting RFQ...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to orders page
    router.push('/orders');
  };

  useEffect(() => {
    // Check if requirements are complete
    const hasRequirements = searchParams?.get('requirements') === 'complete';
    if (hasRequirements) {
      setRequirementsComplete(true);
      // Load requirements data
      const savedRequirements = localStorage.getItem('rfqRequirements');
      if (savedRequirements) {
        setRequirementsData(JSON.parse(savedRequirements));
      }
    }

    // Load technical review summary
    const summaryData = localStorage.getItem('technicalReviewSummary');
    if (summaryData) {
      try {
        setTechnicalReviewSummary(JSON.parse(summaryData));
      } catch (e) {
        console.error("Failed to parse technical review summary", e);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex">
        {/* Collapsible Sidebar */}
        <div className="group fixed left-0 top-0 h-screen z-10">
          <div className="w-16 group-hover:w-64 bg-[#171717] text-white h-full transition-all duration-300 overflow-hidden">
            <div className="p-4">
              <div className="mb-8">
                <div className="flex items-center">
                  <div className="mr-2 flex-shrink-0">
                    <svg className="h-8 w-8" viewBox="0 0 60 60" fill="white">
                      <path d="M30 0L0 17.32v34.64L30 60l30-17.32V17.32L30 0zm20 46.19L30 57.96 10 46.19V22.64L30 10.87l20 11.77v23.55z" />
                      <path d="M30 16.47L15 25.02v17.11l15 8.55 15-8.55V25.02L30 16.47z" />
                    </svg>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="font-bold text-lg leading-none">PROTOLABS</div>
                    <div className="font-bold text-lg leading-none">NETWORK</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a3 3 0 100 6 3 3 0 000-6zm-7 9a7 7 0 1114 0h-1.5a5.5 5.5 0 10-11 0H3z"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Marvin</span>
                </a>
                
                <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Messages</span>
                </a>
                
                <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">RDA manager</span>
                </a>
                
                <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scans</span>
                </a>
                
                <a href="/orders" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Orders</span>
                </a>
                
                <a href="/orders/new" className="flex items-center py-2 text-white bg-[#333] rounded px-2">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">New Order</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area with adjusted margins */}
        <div className="flex flex-1 ml-16">
          {/* Quote Overview Panel - 40% width */}
          <div className="w-[40%] bg-gray-50 border-l border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900 mb-4">
                Quote overview
              </Typography>

              {technicalReviewSummary && (
                <div className="mb-6">
                  <Accordion title="Technical Review Summary" defaultOpen={true}>
                    <div className="space-y-4 p-4">
                      {/* AI Analysis */}
                      <div>
                        <Typography variant="subtitle2" className="font-semibold mb-2">{technicalReviewSummary.aiAnalysis.title}</Typography>
                        <div className="space-y-3">
                          {technicalReviewSummary.aiAnalysis.findings.map((finding: any) => (
                            <div key={finding.id} className={`p-2 rounded-md border-l-4 bg-gray-50 ${finding.severity === 'High' ? 'border-red-500' : finding.severity === 'Medium' ? 'border-yellow-500' : 'border-blue-500'}`}>
                              <Typography variant="caption" className={`font-semibold flex items-center ${finding.severity === 'High' ? 'text-red-700' : finding.severity === 'Medium' ? 'text-yellow-700' : 'text-blue-700'}`}>
                                <span className="mr-2 text-lg">{finding.icon}</span> {finding.type}
                              </Typography>
                              <Typography variant="caption" className="text-gray-800 mt-1 pl-8">{finding.details}</Typography>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Supply Chain Assessment */}
                      <div>
                        <Typography variant="subtitle2" className="font-semibold mb-2">{technicalReviewSummary.supplyChainAssessment.title}</Typography>
                         <div className="text-sm text-gray-700">
                           <p><strong>Overall Fit:</strong> {technicalReviewSummary.supplyChainAssessment.overallFit.text}</p>
                           <p><strong>Capacity:</strong> {technicalReviewSummary.supplyChainAssessment.capacity.status}</p>
                         </div>
                      </div>

                      {/* Preliminary Notes */}
                      {technicalReviewSummary.preliminaryNotes.length > 0 && (
                        <div>
                          <Typography variant="subtitle2" className="font-semibold mb-2">Preliminary Notes</Typography>
                          <div className="space-y-2">
                            {technicalReviewSummary.preliminaryNotes.map((note: any) => (
                              <div key={note.id} className="text-sm p-2 border border-amber-200 rounded-md bg-amber-50">
                                <Typography variant="caption" className="font-semibold text-amber-600">{note.context}</Typography>
                                <Typography className="text-gray-700 whitespace-pre-wrap mt-0.5">{note.text}</Typography>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Accordion>
                </div>
              )}
              
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
                <div className={`border ${
                  expandedItems.includes(1) 
                    ? 'border-2 border-blue-500 hover:border-blue-500' 
                    : 'border-gray-300 hover:border-blue-500'
                } rounded bg-white hover:bg-gray-50 transition-colors`}>
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">1</div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                            <img 
                              src="/metal-part.png" 
                              alt="Metal part" 
                              className="w-8 h-8 object-cover rounded bg-gray-100" 
                            />
                            <span className="text-gray-900 font-medium">4012633_AB.stp</span>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">1 attachment in details</div>
                          
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                                4012633_ac_7f759.pdf
                                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-900 font-medium">€52435.00</div>
                              <div className="text-sm text-blue-600">Manually priced</div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {expandedItems.includes(1) && (
                            <div className="space-y-2 text-sm text-gray-600 mt-4">
                              <div>CNC machining</div>
                              <div>AL 7075-T6</div>
                              <div>As machined + Anodized type II</div>
                              <div>No part markings</div>
                              <div>General tolerance: ISO 2768 Medium</div>
                              <div>No tighter tolerances</div>
                              <div>Sharp internal corners rounded to 2 mm</div>
                              <div>No engineering fits</div>
                              <div>No threads</div>
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
                            onClick={() => toggleItemDetails(1)}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${
                              expandedItems.includes(1)
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {expandedItems.includes(1) ? 'Hide details' : 'Show details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className={`border ${
                  expandedItems.includes(2) 
                    ? 'border-2 border-blue-500 hover:border-blue-500' 
                    : 'border-gray-300 hover:border-blue-500'
                } rounded bg-white hover:bg-gray-50 transition-colors`}>
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">2</div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                            <img 
                              src="/metal-part.png" 
                              alt="Metal part" 
                              className="w-8 h-8 object-cover rounded bg-gray-100" 
                            />
                            <span className="text-gray-900 font-medium">M10000145.stp</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <div className="text-gray-500">—</div>
                            <div className="text-right">
                              <div className="text-gray-900 font-medium">—</div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {expandedItems.includes(2) && (
                            <div className="space-y-2 text-sm text-gray-600 mb-4 mt-4">
                              <div>CNC machining</div>
                              <div>AL 7075-T6</div>
                              <div>As machined + Anodized type II</div>
                              <div>No part markings</div>
                              <div>General tolerance: ISO 2768 Medium</div>
                              <div>No tighter tolerances</div>
                              <div>Sharp internal corners rounded to 2 mm</div>
                              <div>No engineering fits</div>
                              <div>No threads</div>
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
                            onClick={() => toggleItemDetails(2)}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${
                              expandedItems.includes(2)
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {expandedItems.includes(2) ? 'Hide details' : 'Show details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Batch shipping item */}
                <div className="border border-gray-300 hover:border-blue-500 rounded bg-white hover:bg-gray-50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">3</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-50 p-2 rounded">
                            <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                            </svg>
                          </div>
                          <span className="text-gray-900 font-medium">Batch shipping: Required</span>
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
                
                {/* Material Test Report item */}
                <div className="border border-gray-300 hover:border-blue-500 rounded bg-white hover:bg-gray-50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">4</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-50 p-2 rounded">
                            <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-900 font-medium">Material Test Report - Aluminium</span>
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
              </div>
            </div>
          </div>

          {/* Main Content - 60% width */}
          <div className="w-[60%] bg-white overflow-y-auto p-6">
            <div className="w-full mx-auto px-6 py-6 max-w-4xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h1" color="default" className="text-2xl font-bold text-black">RFQ bid</Typography>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray-50 border-b p-4 mb-6 rounded-lg">
                <div className="flex items-center justify-between">
                  {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                        ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {step.id}
                      </div>
                      <Typography 
                        variant="body2" 
                        className={`text-sm ${currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
                      >
                        {step.name}
                      </Typography>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <div className={`h-1 ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
                </div>
              </div>

              {/* Step Content */}
              {currentStep === 1 ? (
                <div className="space-y-6">
                  {/* General information */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('general')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        General information
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'general' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'general' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Enter general company and project information..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Project description */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('project')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Project description
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'project' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'project' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Describe your project and requirements..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Geometry */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('geometry')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Geometry
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'geometry' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'geometry' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Describe any specific geometric considerations..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Material */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('material')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Material
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'material' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'material' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Describe material requirements and alternatives..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Volumes */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('volumes')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Volumes
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'volumes' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'volumes' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Specify production volumes and frequency..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('pricing')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Pricing
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'pricing' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'pricing' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Enter price expectations and budgetary constraints..."
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Timeframe */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleSection('timeframe')}
                    >
                      <Typography variant="subtitle1" className="font-semibold text-gray-900">
                        Timeframe
                      </Typography>
                      <span className="text-blue-600 text-xl">{expandedSection === 'timeframe' ? '−' : '+'}</span>
                    </div>
                    {expandedSection === 'timeframe' && (
                      <div className="p-4 border-t border-gray-200">
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Specify project timeline and delivery requirements..."
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <SupplierSelection />
              )}

              {/* Requirements Status Alert */}
              {!requirementsComplete && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <Typography variant="body2" className="text-amber-800">
                        <strong>Requirements not complete.</strong> Complete manufacturing requirements to prevent supplier questions and delays.
                      </Typography>
                      <Button
                        buttonType="text-action"
                        colorVariant="blue"
                        size="s"
                        className="mt-2"
                        onClick={() => router.push('/orders/send-rfq/prepare')}
                      >
                        Complete Requirements →
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements Complete Status */}
              {requirementsComplete && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <Typography variant="body2" className="text-green-800">
                        <strong>All requirements complete!</strong> Your RFQ includes comprehensive manufacturing specifications.
                      </Typography>
                      <Button
                        buttonType="text-action"
                        colorVariant="blue"
                        size="s"
                        className="mt-2"
                        onClick={() => router.push('/orders/send-rfq/prepare')}
                      >
                        Review Requirements
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Line Items Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h3" className="text-lg font-semibold">
                    Line Items
                  </Typography>
                  {!requirementsComplete && (
                    <Button
                      buttonType="outline"
                      colorVariant="blue"
                      size="s"
                      onClick={() => router.push('/orders/send-rfq/prepare')}
                    >
                      Prepare Requirements
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {mockLineItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <Typography variant="subtitle2" className="font-semibold">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            {item.subtitle}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {requirementsComplete && (
                          <span className="text-green-600 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Requirements Complete
                          </span>
                        )}
                        <Typography variant="body2" className="font-bold">
                          {item.price}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex justify-between items-center">
                <div>
                  {currentStep > 1 && (
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey" 
                      size="m"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                </div>
                <Button
                  buttonType="default"
                  colorVariant="blue"
                  size="m"
                  onClick={currentStep === totalSteps ? handleSubmitRfq : handleNext}
                >
                  {currentStep === totalSteps ? 'Submit RFQ' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 