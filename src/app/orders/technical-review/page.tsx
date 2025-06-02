'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import LineItemsSidePanel, { LineItem } from '@/components/LineItemsSidePanel';

// Define types for our form state
interface TechnicalReviewFormState {
  reasons: Record<string, boolean>;
  priority: 'Low' | 'Medium' | 'High' | '';
  htsCodes: string;
  descriptionOfParts: string;
  customRequestDetails: string;
  quoteVersionNumbers: string;
  previousReviewChanges: string;
  reorderPreviousDealLink: string;
  reorderType: 'Prototyping' | 'Production' | ''; // Added for reorder type
  ignorableDrawingNotes: string;
  purchaseIntent: 'Budgetary' | 'Unknown' | 'High' | 'Low' | '';
}

// Define structure for checkbox items
interface ReasonCheckbox {
  id: keyof TechnicalReviewFormState['reasons']; // Use keyof for type safety
  label: string;
}

// Define structure for description input fields
interface DescriptionField {
  id: keyof TechnicalReviewFormState;
  label: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'radio' | 'select'; // Added type for rendering
  options?: string[]; // For radio or select
}

export default function TechnicalReviewPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<TechnicalReviewFormState>({
    reasons: {
      tightTolerances: false,
      nonCheckoutMaterial: false,
      nonCheckoutFinish: false,
      nonCheckoutTechnology: false,
      documentationRequest: false,
      leadTime: false,
      partDimensions: false,
      assemblyRequest: false,
      highQuantity: false,
      complexGeometry: false,
      injectionMolding: false,
      targetPriceToMatch: false,
      outsideCapabilities: false,
      pricingNotAvailable: false,
      svp: false,
      reorder: false,
    },
    priority: 'Low',
    htsCodes: '',
    descriptionOfParts: '',
    customRequestDetails: '',
    quoteVersionNumbers: '',
    previousReviewChanges: '',
    reorderPreviousDealLink: '',
    reorderType: '',
    ignorableDrawingNotes: '',
    purchaseIntent: '',
  });

  const handleCheckboxChange = (field: keyof TechnicalReviewFormState['reasons']) => {
    setFormState(prev => ({
      ...prev,
      reasons: { ...prev.reasons, [field]: !prev.reasons[field] },
    }));
  };

  const handleInputChange = (
    field: keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>, // Adjust for direct string fields
    value: string
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  
  const handleRadioChange = (
    field: 'priority' | 'reorderType' | 'purchaseIntent', 
    value: string
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const lineItems: LineItem[] = [
    {
      id: 1,
      name: '4012633_AB.stp',
      thumbnailUrl: '/metal-part.png',
      subtitle: '1 attachment in details',
      price: '€52435.00',
      manualPriceLabel: 'Manually priced',
      extraDetails: (
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
      ),
    },
    {
      id: 2,
      name: 'M10000145.stp',
      thumbnailUrl: '/metal-part.png',
      price: '—',
      extraDetails: (
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
      ),
    },
    {
      id: 3,
      name: 'Batch shipping: Required',
      thumbnailUrl: undefined,
      price: undefined,
      extraDetails: (
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-blue-50 p-2 rounded">
            <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
          </div>
          <span className="text-gray-900 font-medium">Batch shipping: Required</span>
        </div>
      ),
    },
    {
      id: 4,
      name: 'Material Test Report - Aluminium',
      thumbnailUrl: undefined,
      price: undefined,
      extraDetails: (
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-purple-50 p-2 rounded">
            <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-900 font-medium">Material Test Report - Aluminium</span>
        </div>
      ),
    },
  ];

  const reasonsForReview: ReasonCheckbox[] = [
    { id: 'tightTolerances', label: 'Tight Tolerances' },
    { id: 'nonCheckoutMaterial', label: 'Non-checkout Material' },
    { id: 'nonCheckoutFinish', label: 'Non-checkout Finish' },
    { id: 'nonCheckoutTechnology', label: 'Non-checkout Technology' },
    { id: 'documentationRequest', label: 'Documentation Request' },
    { id: 'leadTime', label: 'Lead Time' },
    { id: 'partDimensions', label: 'Part Dimensions' },
    { id: 'assemblyRequest', label: 'Assembly Request' },
    { id: 'highQuantity', label: 'High Quantity' },
    { id: 'complexGeometry', label: 'Complex Geometry' },
    { id: 'injectionMolding', label: 'Injection Molding' },
    { id: 'targetPriceToMatch', label: 'Target price to match' },
    { id: 'outsideCapabilities', label: 'Outside capabilities' },
    { id: 'pricingNotAvailable', label: 'Pricing not available' },
    { id: 'svp', label: 'SVP' },
    { id: 'reorder', label: 'Reorder' },
  ];

  const priorityOptions: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];

  const descriptionFields: DescriptionField[] = [
    { id: 'htsCodes', label: 'HTS Codes (customer-provided, line items w/ quantity 50+)', type: 'text' },
    { id: 'descriptionOfParts', label: 'Description/Use of Parts:', type: 'textarea' },
    { id: 'customRequestDetails', label: 'Custom request (Provide requirement details):', type: 'textarea' },
    { id: 'quoteVersionNumbers', label: 'Quote version number(s):', type: 'text' },
    { id: 'previousReviewChanges', label: 'If previously reviewed, what changed?', type: 'textarea' },
    { id: 'reorderPreviousDealLink', label: 'Reorder (Previous deal link), prototyping, or production?', type: 'text', placeholder: "Previous deal link..."},
    { id: 'ignorableDrawingNotes', label: "From the drawing notes or call-outs, which ones can be ignored? (If 'None', the quote must match the TD)", type: 'textarea'},
    { id: 'purchaseIntent', label: 'Purchase intent? (Budgetary/Unknown/High/Low)', type: 'select', options: ['Budgetary', 'Unknown', 'High', 'Low', ''] },
 ];
  
  const reorderTypeOptions: Array<'Prototyping' | 'Production'> = ['Prototyping', 'Production'];

  const handleSubmitReview = async () => {
    // TODO: hook up API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Store workflow status in localStorage
    localStorage.setItem('quoteWorkflowStatus', 'technical-review-requested');
    // Go back to orders with status parameter
    router.push('/example-quote?status=technical-review-requested');
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
                
                <a href="/orders/technical-review" className="flex items-center py-2 text-white bg-[#333] rounded px-2">
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Technical Review</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area with adjusted margins */}
        <div className="flex flex-1 ml-16">
          <LineItemsSidePanel title="Quote overview" items={lineItems} />
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h1" color="default" className="text-2xl font-bold">
                Request Technical Review
              </Typography>
              <Typography variant="caption" color="default" className="text-sm">
                V31 2G46V4WXX-V31
              </Typography>
            </div>

            {/* New Form Structure */}
            <div className="space-y-6">
              {/* Reasons for Review */}
              <div>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
                  Select one or more reasons
                </Typography>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {reasonsForReview.map((reason) => (
                    <label key={reason.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={formState.reasons[reason.id]}
                        onChange={() => handleCheckboxChange(reason.id)}
                      />
                      <span className="text-gray-700">{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority to Quote */}
              <div>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
                  Priority to quote
                </Typography>
                <div className="flex space-x-4">
                  {priorityOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="priority"
                        value={option}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={formState.priority === option}
                        onChange={(e) => handleRadioChange('priority', e.target.value)}
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description Fields */}
              <div>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
                  Description
                </Typography>
                <div className="space-y-4">
                  {descriptionFields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          name={field.id}
                          rows={3}
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={field.placeholder || ''}
                          value={formState[field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>]}
                          onChange={(e) => handleInputChange(field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>, e.target.value)}
                        />
                      ) : field.type === 'select' && field.id === 'purchaseIntent' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formState.purchaseIntent}
                          onChange={(e) => handleRadioChange('purchaseIntent', e.target.value)}
                        >
                          <option value="" disabled>Select intent...</option>
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt || 'None'}</option>)}
                        </select>
                      ) : field.id === 'reorderPreviousDealLink' ? (
                        <div className="flex space-x-4 items-center">
                           <input
                            type="text"
                            id={field.id}
                            name={field.id}
                            className="flex-grow border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={field.placeholder || ''}
                            value={formState[field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>]}
                            onChange={(e) => handleInputChange(field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>, e.target.value)}
                          />
                          {reorderTypeOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-1">
                              <input
                                type="radio"
                                name="reorderType"
                                value={option}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                checked={formState.reorderType === option}
                                onChange={(e) => handleRadioChange('reorderType', e.target.value)}
                              />
                              <span className="text-gray-700 text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          id={field.id}
                          name={field.id}
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={field.placeholder || ''}
                          value={formState[field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>]}
                          onChange={(e) => handleInputChange(field.id as keyof Omit<TechnicalReviewFormState, 'reasons' | 'priority' | 'reorderType' | 'purchaseIntent'>, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-4 border-t">
              <Button
                buttonType="outline"
                colorVariant="grey"
                size="m"
                onClick={() => router.back()}
                className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>

              <Button
                buttonType="default"
                colorVariant="blue"
                size="m"
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 