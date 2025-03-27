'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { useRouter } from 'next/navigation';
import { SupplierSelection } from '@/app/components/suppliers/SupplierSelection';
import { ReviewStep as ReviewStepComponent } from '@/app/components/orders/ReviewStep';
import { OrderReview, Industry, DesignPhase, MaterialFlexibility } from '@/app/components/orders/types';

export default function NewOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // No items expanded by default
  const router = useRouter();
  
  const totalSteps = 4;
  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Requirements' },
    { id: 3, name: 'Supplier' },
    { id: 4, name: 'Review' }
  ];

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
    router.push('/orders');
  };

  const handleSubmitOrder = async () => {
    console.log('Submitting order...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate directly to orders page
    window.location.href = 'http://localhost:3000/orders';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <RequirementsStep />;
      case 3:
        return <SupplierStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <BasicInfoStep />;
    }
  };

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
                  <Typography variant="h1" color="default" className="text-2xl font-bold text-black">New Production Order</Typography>
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
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className={`h-1 ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
                    <div className={`h-1 ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
                    <div className={`h-1 ${currentStep > 3 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
                  </div>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t">
                  <div>
                    <Button 
                      buttonType="outline" 
                      colorVariant="grey" 
                      size="m"
                      onClick={handleCancel}
                      className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    {currentStep > 1 && (
                      <Button 
                        buttonType="outline" 
                        colorVariant="blue" 
                        size="m"
                        onClick={handleBack}
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Back
                      </Button>
                    )}
                  </div>
                  <Button 
                    buttonType="default" 
                    colorVariant="blue" 
                    size="m"
                    onClick={currentStep === totalSteps ? handleSubmitOrder : handleNext}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {currentStep === totalSteps ? 'Submit Order' : 'Continue'}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Basic Information
function BasicInfoStep() {
  const [generalInfoOpen, setGeneralInfoOpen] = useState(true);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const [fileDrawing1Open, setFileDrawing1Open] = useState(false);
  const [fileDrawing2Open, setFileDrawing2Open] = useState(false);

  return (
    <div className="space-y-6">
      <Typography variant="h2" color="default" className="text-xl font-semibold text-black">Basic Information</Typography>
      
      {/* General Information Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">General Information</Typography>
          <button 
            type="button" 
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setGeneralInfoOpen(!generalInfoOpen)}
          >
            <span>{generalInfoOpen ? '−' : '+'}</span>
          </button>
        </div>
        {generalInfoOpen && (
          <div className="transition-all duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>Select industry</option>
                  <option>Aerospace</option>
                  <option>Automotive</option>
                  <option>Medical</option>
                  <option>Industrial</option>
                  <option>Consumer Electronics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Phase</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>Select design phase</option>
                  <option>Concept</option>
                  <option>Detailed Design</option>
                  <option>Prototyping</option>
                  <option>Production</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Part Use Description</label>
              <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-purple-500" rows={3} placeholder="Describe how the part will be used..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Flexibility</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                <option>Select flexibility</option>
                <option>Strict - No material substitutions</option>
                <option>Moderate - Similar materials acceptable</option>
                <option>Flexible - Open to alternatives</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Compliance & Legal Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Compliance & Legal</Typography>
          <button 
            type="button" 
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setComplianceOpen(!complianceOpen)}
          >
            <span>{complianceOpen ? '−' : '+'}</span>
          </button>
        </div>
        {complianceOpen && (
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" id="nca" />
              <label htmlFor="nca" className="text-sm text-gray-700">NCA Required</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" id="mp" />
              <label htmlFor="mp" className="text-sm text-gray-700">MP Profile Required</label>
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" id="export" />
              <label htmlFor="export" className="text-sm text-gray-700">Export Control Applicable</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Export Control Requirements</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                <option>None</option>
                <option>ITAR</option>
                <option>EAR</option>
                <option>Other (specify in notes)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-purple-500" rows={2} placeholder="Any additional legal notes..."></textarea>
            </div>
          </div>
        )}
      </div>
      
      {/* Finance Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Downpayment & Finance</Typography>
          <button 
            type="button" 
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setFinanceOpen(!financeOpen)}
          >
            <span>{financeOpen ? '−' : '+'}</span>
          </button>
        </div>
        {financeOpen && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>Standard payment terms</option>
                  <option>Net 30</option>
                  <option>Net 45</option>
                  <option>Net 60</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Downpayment Required</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>None</option>
                  <option>25%</option>
                  <option>50%</option>
                  <option>Other percentage</option>
                  <option>Fixed amount</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <input type="checkbox" id="fixedMaterial" className="mt-1 mr-2" />
                <label htmlFor="fixedMaterial" className="text-sm text-gray-700">
                  Fixed material pricing (Restrictions on bulk material purchasing)
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Costs</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>Standard</option>
                  <option>Waived</option>
                  <option>Custom pricing</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Contract Terms Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Contract Manufacturing</Typography>
          <button 
            type="button" 
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setContractOpen(!contractOpen)}
          >
            <span>{contractOpen ? '−' : '+'}</span>
          </button>
        </div>
        {contractOpen && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Long Term Production Forecast</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-purple-500" 
                rows={2} 
                placeholder="Describe expected production volumes and timeline"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Pricing Period</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                  <option>Not required</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>Custom period</option>
                </select>
              </div>
              
              <div className="flex items-start">
                <input type="checkbox" id="terminationClause" className="mt-1 mr-2" />
                <label htmlFor="terminationClause" className="text-sm text-gray-700">
                  Production Termination Clause (Pricing adjustments for early termination)
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Window</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-purple-500">
                <option>Standard</option>
                <option>Extended (specify in notes)</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Documentation Section */}
      <div className="mb-8 border-t pt-4">
        <Typography variant="subtitle1" className="text-xl font-semibold mb-4 text-gray-900">Technical Documentation</Typography>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-2">
            <Typography variant="body2" className="text-sm text-gray-700">
              Drag and drop files here, or <span className="text-purple-600 font-medium">browse</span>
            </Typography>
            <Typography variant="caption" className="text-xs text-gray-500 mt-1">
              Upload CAD files, drawings, specifications, and other relevant documents
            </Typography>
          </div>
          <Button 
            buttonType="default" 
            colorVariant="purple" 
            size="s"
            className="mt-2"
          >
            Browse Files
          </Button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Uploaded Files</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-2 rounded border">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <Typography variant="body2" className="text-sm text-gray-700">
                  PartDrawing.pdf
                </Typography>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder Components for Other Steps
function RequirementsStep() {
  type SectionName = 'manufacturing' | 'dfm' | 'tooling' | 'quality' | 'logistics' | 'change';
  
  const [sections, setSections] = useState({
    manufacturing: true,
    dfm: false,
    tooling: false,
    quality: false,
    logistics: false,
    change: false
  });

  const toggleSection = (section: SectionName) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      <Typography variant="h2" color="default" className="text-xl font-semibold text-black">Manufacturing Requirements</Typography>
      
      {/* Manufacturing Planning Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Manufacturing Planning</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('manufacturing')}
          >
            <span>{sections.manufacturing ? '−' : '+'}</span>
          </button>
          </div>
        {sections.manufacturing && (
          <div className="transition-all duration-200">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="designRecord" className="mt-1" />
                  <label htmlFor="designRecord" className="ml-2 block text-gray-700 font-medium">Design Record Required</label>
                </div>
                <div className="pl-6 text-sm text-gray-600 mb-4">
                  Master CAD, Bubble drawings, Revision controls - Defines the 'nominal' requirements of the parts
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="processFlow" className="mt-1" />
                  <label htmlFor="processFlow" className="ml-2 block text-gray-700 font-medium">Process Flow Diagram Required</label>
                </div>
                <div className="pl-6 text-sm text-gray-600 mb-4">
                  A flow diagram where each process step is defined. Expected to be completed before production starts.
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="processFMEA" className="mt-1" />
                  <label htmlFor="processFMEA" className="ml-2 block text-gray-700 font-medium">Process FMEA Required</label>
                </div>
                <div className="pl-6 text-sm text-gray-600 mb-4">
                  Similar to design FMEA but for process steps. The aim is to ensure all risks are identified and necessary actions are taken.
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="controlPlan" className="mt-1" />
                  <label htmlFor="controlPlan" className="ml-2 block text-gray-700 font-medium">Control Plan Required</label>
                </div>
                <div className="pl-6 text-sm text-gray-600 mb-4">
                  Based on the PFMEA, identifies what needs to be inspected, at what frequency and with what methods.
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Post-Processing Considerations</label>
                <textarea 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900" 
                  rows={2} 
                  placeholder="Specify outsourcing options and post-processing requirements"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DFM Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Design for Manufacturability</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('dfm')}
          >
            <span>{sections.dfm ? '−' : '+'}</span>
          </button>
        </div>
        {sections.dfm && (
          <div className="transition-all duration-200">
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Material & Geometry Considerations</h3>
              <div className="bg-gray-50 p-3 rounded mb-3 border border-gray-200">
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="materialMachinability" className="mt-1" />
                  <label htmlFor="materialMachinability" className="ml-2 block text-gray-700">
                    Confirm material is machinable with available tools
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="toolWear" className="mt-1" />
                  <label htmlFor="toolWear" className="ml-2 block text-gray-700">
                    Need plan for controlling tool wear over time
                  </label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="geometryRisks" className="mt-1" />
                  <label htmlFor="geometryRisks" className="ml-2 block text-gray-700">
                    Evaluate geometry for risks (chatter, deflection, tool access)
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Machining & Surface Finish Compatibility</h3>
              <div className="bg-gray-50 p-3 rounded mb-3 border border-gray-200">
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="surfaceFinish" className="mt-1" />
                  <label htmlFor="surfaceFinish" className="ml-2 block text-gray-700">
                    Machining tolerances planned with final surface finish in mind
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="postMachining" className="mt-1" />
                  <label htmlFor="postMachining" className="ml-2 block text-gray-700">
                    Post-machining processes may affect dimensional accuracy
                  </label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="stressRelief" className="mt-1" />
                  <label htmlFor="stressRelief" className="ml-2 block text-gray-700">
                    Stress-relief operations required before finishing
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tooling Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Tooling, Fixtures & Workholding</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('tooling')}
          >
            <span>{sections.tooling ? '−' : '+'}</span>
          </button>
        </div>
        {sections.tooling && (
          <div className="transition-all duration-200">
            <div className="bg-gray-50 p-3 rounded mb-4 border border-gray-200">
              <div className="flex items-start mb-2">
                <input type="checkbox" id="cuttingTools" className="mt-1" />
                <label htmlFor="cuttingTools" className="ml-2 block text-gray-700">
                  Special cutting tools, inserts, or tool holders required
                </label>
              </div>
              <div className="flex items-start mb-2">
                <input type="checkbox" id="tighterTolerances" className="mt-1" />
                <label htmlFor="tighterTolerances" className="ml-2 block text-gray-700">
                  Special tool holders needed for tight tolerances
                </label>
              </div>
              <div className="flex items-start mb-2">
                <input type="checkbox" id="customFixtures" className="mt-1" />
                <label htmlFor="customFixtures" className="ml-2 block text-gray-700">
                  Custom fixtures needed for non-standard geometries
                </label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="additionalClamps" className="mt-1" />
                <label htmlFor="additionalClamps" className="ml-2 block text-gray-700">
                  Additional clamps/supports needed to reduce deflection
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Special Tooling Requirements</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900" 
                rows={2}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quality Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Quality Requirements</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('quality')}
          >
            <span>{sections.quality ? '−' : '+'}</span>
          </button>
        </div>
        {sections.quality && (
          <div className="transition-all duration-200">
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Measurement & Inspection Strategy</h3>
              <div className="bg-gray-50 p-3 rounded mb-3 border border-gray-200">
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="measurementPlan" className="mt-1" />
                  <label htmlFor="measurementPlan" className="ml-2 block text-gray-700">
                    Detailed measurement plan for in-process and final inspections
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="cmmRequired" className="mt-1" />
                  <label htmlFor="cmmRequired" className="ml-2 block text-gray-700">
                    CMM, laser scanning, or optical measurement required
                  </label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="outsourcedInspection" className="mt-1" />
                  <label htmlFor="outsourcedInspection" className="ml-2 block text-gray-700">
                    Outsourced inspection services needed
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Quality Documentation Requirements</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900" 
                rows={2} 
                placeholder="List any special documentation requirements"
              />
            </div>
          </div>
        )}
      </div>

      {/* Logistics Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Logistics & Shipping</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('logistics')}
          >
            <span>{sections.logistics ? '−' : '+'}</span>
          </button>
        </div>
        {sections.logistics && (
          <div className="transition-all duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Batch Shipment Schedule</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900">
                  <option>Ship all at once</option>
                  <option>Weekly shipments</option>
                  <option>Monthly shipments</option>
                  <option>Custom schedule</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Ship Date Flexibility</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900">
                  <option>Strict deadlines</option>
                  <option>+/- 1 week</option>
                  <option>+/- 2 weeks</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Packaging Requirements</h3>
              <div className="bg-gray-50 p-3 rounded mb-3 border border-gray-200">
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="bagTag" className="mt-1" />
                  <label htmlFor="bagTag" className="ml-2 block text-gray-700">Standard bag & tag packaging</label>
                </div>
                <div className="flex items-start mb-2">
                  <input type="checkbox" id="boxLabels" className="mt-1" />
                  <label htmlFor="boxLabels" className="ml-2 block text-gray-700">Box content labels</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="esdPackaging" className="mt-1" />
                  <label htmlFor="esdPackaging" className="ml-2 block text-gray-700">ESD packaging or blister trays required</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Management Section */}
      <div className="mb-8 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900">Change Management & Reorders</Typography>
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => toggleSection('change')}
          >
            <span>{sections.change ? '−' : '+'}</span>
          </button>
        </div>
        {sections.change && (
          <div className="transition-all duration-200">
            <div className="bg-gray-50 p-3 rounded mb-4 border border-gray-200">
              <div className="flex items-start mb-2">
                <input type="checkbox" id="changeRequests" className="mt-1" />
                <label htmlFor="changeRequests" className="ml-2 block text-gray-700">Formal change request process required</label>
              </div>
              <div className="flex items-start mb-2">
                <input type="checkbox" id="changeApproval" className="mt-1" />
                <label htmlFor="changeApproval" className="ml-2 block text-gray-700">Changes require engineering approval</label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="revisedDocumentation" className="mt-1" />
                <label htmlFor="revisedDocumentation" className="ml-2 block text-gray-700">Revised technical documentation for each change</label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Change Management Notes</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-900" 
                rows={2} 
                placeholder="Specify any special requirements for changes or reorders"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SupplierStep() {
  return <SupplierSelection />;
}

function ReviewStep() {
  const router = useRouter();
  
  // Mock data for demonstration - replace with actual data from your state management
  const mockOrderData: OrderReview = {
    basicInfo: {
      customer: {
        id: '1',
        name: 'Acme Corp'
      },
      project: {
        name: 'Project Alpha',
        industry: 'Automotive' as Industry,
        designPhase: 'Prototype' as DesignPhase,
        description: 'Prototype parts for new vehicle model'
      },
      materialFlexibility: 'Moderate' as MaterialFlexibility,
      compliance: {
        ncaRequired: true,
        mpProfileRequired: true,
        exportControl: 'None'
      },
      financialTerms: {
        paymentTerms: 'Net 30',
        downpayment: 25,
        fixedMaterialPricing: true,
        sampleCosts: 'Standard',
        fixedPricingPeriod: 6,
        productionTerminationClause: true
      }
    },
    requirements: {
      documentation: {
        designRecord: true,
        processFlow: true,
        processFMEA: false,
        controlPlan: true
      },
      dfm: {
        materialConsiderations: ['Heat treatment required', 'Surface finish critical'],
        surfaceFinish: ['Ra 1.6'],
        gdtStrategy: ['Form tolerances applied']
      },
      tooling: {
        specialTools: true,
        customFixtures: true,
        additionalSupports: false
      },
      quality: {
        measurementStrategy: 'CMM inspection required',
        inspectionRequirements: ['First article inspection', '100% visual inspection']
      }
    },
    selectedSuppliers: [
      {
        id: 1,
        name: 'Precision Manufacturing Co.',
        location: 'Detroit, MI',
        isPreferred: true,
        capabilities: ['CNC Machining', 'Metal Fabrication'],
        materials: ['Aluminum', 'Steel'],
        qualityScore: 0.95,
        onTimeRate: 0.98,
        orders: 150,
        lastOrder: '2024-02-15'
      }
    ],
    lineItems: [
      {
        partName: 'Bracket Assembly',
        material: 'AL 6061-T6',
        process: 'CNC Machining',
        quantity: 100,
        deliveryDate: new Date('2024-06-01')
      }
    ],
    attachedFiles: [
      {
        name: 'bracket_assembly.step',
        type: 'CAD',
        size: 2500000,
        url: '/files/bracket_assembly.step'
      }
    ],
    quoteRequest: {
      type: 'Firm',
      deadline: new Date('2024-03-15'),
      targetDate: new Date('2024-05-01')
    }
  };

  const handleEdit = (section: string) => {
    // Handle edit action based on section
    console.log('Editing section:', section);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // Show loading state or notification here if needed
      console.log('Submitting order...');
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Order submitted successfully, redirecting...');
      
      // Use direct window location navigation as a fallback to ensure redirect works
      window.location.href = 'http://localhost:3000/orders';
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ReviewStepComponent
        orderData={mockOrderData}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 