'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function ExampleQuotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState('Quotes');
  const [versionActionsOpen, setVersionActionsOpen] = useState(false);
  const versionActionsRef = useRef<HTMLDivElement>(null);
  
  const [workflowStatus, setWorkflowStatus] = useState<string>('none');

  // State for ME preliminary notes
  const [preliminaryMeNotes, setPreliminaryMeNotes] = useState<Array<{id: string, text: string, context: string}>>([]);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [currentNoteContext, setCurrentNoteContext] = useState(''); // To store context for the note
  const quoteIdForNotes = '3DZF983L7'; // Example quote ID, make dynamic if possible
  
  useEffect(() => {
    // Load preliminary notes from localStorage on mount
    const savedNotesString = localStorage.getItem(`preliminaryMeNotes_${quoteIdForNotes}`);
    if (savedNotesString) {
      try {
        setPreliminaryMeNotes(JSON.parse(savedNotesString));
      } catch (error) {
        console.error("Failed to parse preliminary ME notes from localStorage:", error);
        setPreliminaryMeNotes([]); // Reset to empty if parsing fails
      }
    }

    // Check URL params first (could be coming back from technical review page)
    const statusFromUrl = searchParams?.get('status');
    if (statusFromUrl) {
      localStorage.setItem('quoteWorkflowStatus', statusFromUrl);
      setWorkflowStatus(statusFromUrl);
      // Clear the status from URL to prevent re-triggering on refresh
      // Ensure router is available and history.replaceState is a valid alternative if router.replace is problematic
      if (router && typeof router.replace === 'function') {
        router.replace('/example-quote', undefined); 
      } else {
        // Fallback or log if router.replace is not available as expected
        window.history.replaceState({}, '', '/example-quote');
      }
    } else {
      // Otherwise check local storage for workflow status
      const localStatus = localStorage.getItem('quoteWorkflowStatus');
      if (localStatus) {
        setWorkflowStatus(localStatus);
      }
    }
  }, [quoteIdForNotes, searchParams, router]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (versionActionsRef.current && !versionActionsRef.current.contains(event.target as Node)) {
        setVersionActionsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const tabs = [
    { id: 'quotes', label: 'Quotes' },
    { id: 'sourcing', label: 'Sourcing' },
    { id: 'purchase', label: 'Purchase orders' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'quality', label: 'Quality Control' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'complaints', label: 'Complaints' },
  ];

  // Function to open the modal with a specific context
  const handleOpenNoteModal = (context: string) => {
    setCurrentNoteContext(context);
    setIsNoteModalOpen(true);
  };

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
            
            <a href="/orders" className="flex items-center py-2 text-gray-300 hover:text-white">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
              </svg>
              Orders
            </a>
            
            <a href="/example-quote" className="flex items-center py-2 text-white bg-[#333] rounded px-2">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              Example Quote
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Info banner */}
          <div className="bg-[var(--network-blue-000)] p-4 flex items-center border-b border-[var(--network-blue-200)]">
            <svg className="w-5 h-5 text-[var(--network-blue-400)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Typography variant="body2" color="default">
              Welcome to the new Quote Builder! You can return to the old Quote Builder via the Order actions menu.
            </Typography>
          </div>
          
          {/* Order header and tabs */}
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center py-4">
                <div className="flex items-center space-x-4">
                  <Typography variant="h3" color="default" className="font-medium">
                    Order:
                  </Typography>
                  <Typography variant="h3" color="default" className="font-bold">
                    3DZF983L7
                  </Typography>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    Submitted
                  </span>
                  <a href="#" className="text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)] flex items-center">
                    <span>HubSpot</span>
                    <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="mt-2">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.label)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === tab.label
                          ? 'border-[var(--network-blue-400)] text-[var(--network-blue-400)]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Quote header with actions */}
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h2" color="default" className="text-2xl font-bold">
                Quotes
              </Typography>
              <div>
                <Button 
                  buttonType="outline" 
                  colorVariant="grey" 
                  size="m"
                  className="flex items-center"
                >
                  <span>Order actions</span>
                  <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            </div>
            
            {/* Customer and technical contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <Typography variant="subtitle2" color="default" className="font-semibold mb-2">
                  Customer account
                </Typography>
                <div className="flex items-center">
                  <Typography variant="body1" color="default">
                    sgullicks@mmm.com
                  </Typography>
                  <button className="ml-3 text-gray-400 hover:text-gray-500">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div>
                <Typography variant="subtitle2" color="default" className="font-semibold mb-2">
                  Technical contact
                </Typography>
                <div className="flex items-center">
                  <Typography variant="body1" color="default">
                    triciawilmot@plasticproductsco.com
                  </Typography>
                  <button className="ml-3 text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)]">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quote versions dropdown */}
            <div className="mb-6">
              <button className="flex items-center text-[var(--network-blue-400)] font-medium">
                <span>Quote versions (32)</span>
                <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Warning note */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <Typography variant="body2" color="default" className="text-amber-800">
                    Please note: This order will be routed through our warehouse. Please adjust lead time accordingly.
                  </Typography>
                </div>
              </div>
            </div>
            
            {/* Version info and total */}
            <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg mb-6">
              <div className="flex items-center">
                <Typography variant="h3" color="default" className="font-semibold mr-3">
                  V1
                </Typography>
                <div className="flex items-center space-x-2">
                  <Typography variant="body1" color="default" className="font-medium">
                    3DZF983L7-V1
                  </Typography>
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="flex items-center ml-8">
                    <Typography variant="body2" color="default" className="mr-2">
                      Auto update price:
                    </Typography>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <div className="block w-10 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <Typography variant="body2" color="default" className="text-right mb-1">
                    Total:
                  </Typography>
                  <Typography variant="h3" color="default" className="font-bold">
                    US$467,103.46
                  </Typography>
                </div>
                
                <div className="flex space-x-2 relative" ref={versionActionsRef}>
                  <Button
                    buttonType="outline"
                    colorVariant="grey"
                    size="m"
                    className="flex items-center"
                    onClick={() => setVersionActionsOpen(!versionActionsOpen)}
                  >
                    <span>Version actions</span>
                    <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  
                  {/* Version actions dropdown menu */}
                  {versionActionsOpen && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Notify customer
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Duplicate
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          New deal from quote
                        </button>
                        <button 
                          onClick={() => {
                            router.push('/orders/send-rfq');
                            setVersionActionsOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                        >
                          <span>Send RFQ</span>
                          <span className="bg-[var(--green-400)] text-white text-xs font-medium px-1.5 py-0.5 rounded">New</span>
                        </button>
                        <button 
                          onClick={() => {
                            router.push('/orders/new');  // Linking to the existing New Order page for now
                            setVersionActionsOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                        >
                          <span>Set up production</span>
                          <span className="bg-[var(--green-400)] text-white text-xs font-medium px-1.5 py-0.5 rounded">New</span>
                        </button>
                        <button
                          onClick={() => {
                            router.push('/orders/technical-review');
                            setVersionActionsOpen(false);
                            // Set status in localStorage to persist after redirect
                            localStorage.setItem('quoteWorkflowStatus', 'technical-review-requested');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Request technical review
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-300 cursor-not-allowed">
                          Request refund
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Archive
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Split order
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    buttonType="default"
                    colorVariant="blue"
                    size="m"
                  >
                    Lock quote
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Workflow Status Indicator */}
            {workflowStatus !== 'none' && (
              <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <Typography variant="subtitle1" color="default" className="font-semibold">
                    Order Workflow Status
                  </Typography>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between max-w-3xl mx-auto">
                    {/* Step 1: Technical Review */}
                    {workflowStatus === 'technical-review-requested' ? (
                      <Link href="/orders/technical-review/example-review-id" className="flex flex-col items-center cursor-pointer">
                        <div className={'w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-blue-600 text-white'}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Typography variant="body2" color="default" className={'font-bold text-blue-600'}>
                          Technical Review
                        </Typography>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          workflowStatus === 'technical-review-completed' || 
                          workflowStatus === 'technical-review-completed-rda' || 
                          workflowStatus === 'technical-review-completed-rfq' || 
                          workflowStatus === 'rfq-sent' || 
                          workflowStatus === 'production'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Typography variant="body2" color="default" className={'text-gray-500'}>
                          Technical Review
                        </Typography>
                        {(workflowStatus === 'technical-review-completed' || workflowStatus === 'technical-review-completed-rda' || workflowStatus === 'technical-review-completed-rfq' || workflowStatus === 'rfq-sent' || workflowStatus === 'production') && (
                          <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        )}
                        {workflowStatus !== 'technical-review-requested' && workflowStatus !== 'technical-review-completed' && workflowStatus !== 'technical-review-completed-rda' && workflowStatus !== 'technical-review-completed-rfq' && workflowStatus !== 'rfq-sent' && workflowStatus !== 'production' && (
                           <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                               Not Started
                           </span>
                        )}
                      </div>
                    )}
                    
                    {/* Connector */}
                    <div className={`flex-1 h-0.5 mx-2 ${
                      workflowStatus === 'technical-review-completed' || 
                      workflowStatus === 'technical-review-completed-rda' || 
                      workflowStatus === 'technical-review-completed-rfq' || 
                      workflowStatus === 'rfq-sent' || 
                      workflowStatus === 'production'
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`}></div>
                    
                    {/* Step 2: Sourcing/RFQ */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        workflowStatus === 'rfq-sent' || workflowStatus === 'production'
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                      </div>
                      <Typography variant="body2" color="default" className={workflowStatus === 'rfq-sent' ? 'font-bold text-blue-600' : 'text-gray-500'}>
                        Supplier RFQs
                      </Typography>
                      {workflowStatus === 'rfq-sent' && (
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      )}
                      {workflowStatus === 'production' && (
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    {/* Connector */}
                    <div className={`flex-1 h-0.5 mx-2 ${
                      workflowStatus === 'production' ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                    
                    {/* Step 3: Production */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        workflowStatus === 'production' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <Typography variant="body2" color="default" className={workflowStatus === 'production' ? 'font-bold text-blue-600' : 'text-gray-500'}>
                        Production
                      </Typography>
                      {workflowStatus === 'production' && (
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Current status details */}
                  <div className="mt-6 bg-gray-50 p-3 rounded-md text-sm">
                    {workflowStatus === 'technical-review-requested' && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <Typography variant="body2" color="default">
                            <span className="font-medium">Technical review requested</span> - Waiting for assessment. This typically takes 1-2 business days.
                          </Typography>
                        </div>
                      </div>
                    )}
                    {workflowStatus === 'technical-review-completed' && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <Typography variant="body2" color="default">
                            <span className="font-medium">Technical review completed</span> - Ready to send RFQ to suppliers. 
                            <Button
                              buttonType="text-action"
                              colorVariant="blue"
                              size="s"
                              onClick={() => router.push('/orders/send-rfq')}
                              className="ml-2"
                            >
                              Send RFQ
                            </Button>
                          </Typography>
                        </div>
                      </div>
                    )}
                    {workflowStatus === 'rfq-sent' && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <Typography variant="body2" color="default">
                            <span className="font-medium">RFQ sent to suppliers</span> - Waiting for responses. You'll be notified when bids are received.
                          </Typography>
                        </div>
                      </div>
                    )}
                    {workflowStatus === 'production' && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <Typography variant="body2" color="default">
                            <span className="font-medium">Production in progress</span> - Supplier has been selected and production has started.
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Notes and access settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" color="default" className="font-semibold">
                      Internal note
                    </Typography>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <Typography variant="body2" color="default">
                      AK - new deal from 3B8PRNBNW (remakes). Full volumes (x2500)
                    </Typography>
                    <button className="mt-2 text-gray-400 hover:text-gray-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                }
              />
              
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" color="default" className="font-semibold">
                      External note
                    </Typography>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <Typography variant="body2" color="default">
                      Add external note...
                    </Typography>
                    <button className="mt-2 text-gray-400 hover:text-gray-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                }
              />
              
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" color="default" className="font-semibold">
                      Access settings
                    </Typography>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <Typography variant="body2" color="default" className="font-semibold">
                      External
                    </Typography>
                    <Typography variant="body2" color="default">
                      - Quote is visible for customer account
                    </Typography>
                    <button className="mt-2 text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)]">
                      Edit
                    </button>
                  </div>
                }
              />
            </div>
            
            {/* Address information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" color="default" className="font-semibold">
                      Shipping address
                    </Typography>
                    <Button buttonType="text-action" colorVariant="blue" size="s">
                      Edit
                    </Button>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <Typography variant="body2" color="default" className="font-semibold">
                      PPC
                    </Typography>
                    <Typography variant="body2" color="default">
                      Scott Gullicks
                    </Typography>
                    <Typography variant="body2" color="default">
                      Plastic Products Co. Inc.
                    </Typography>
                    <Typography variant="body2" color="default">
                      30355 Akerson Street
                    </Typography>
                    <Typography variant="body2" color="default">
                      Lindstrom, MN 55045
                    </Typography>
                    <Typography variant="body2" color="default">
                      United States
                    </Typography>
                    <Typography variant="body2" color="default">
                      sgullicks@mmm.com
                    </Typography>
                    <Typography variant="body2" color="default">
                      +1 651-733-5022
                    </Typography>
                  </div>
                }
              />
              
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" color="default" className="font-semibold">
                      Billing address
                    </Typography>
                    <Button buttonType="text-action" colorVariant="blue" size="s">
                      Edit
                    </Button>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <div className="flex items-center mb-2">
                      <input type="checkbox" className="mr-2" />
                      <Typography variant="body2" color="default">
                        Same as shipping
                      </Typography>
                    </div>
                    <Typography variant="body2" color="default" className="font-semibold">
                      Protolabs, Inc.
                    </Typography>
                    <Typography variant="body2" color="default">
                      Jason Frankman
                    </Typography>
                    <Typography variant="body2" color="default">
                      5540 Pioneer Creek Drive
                    </Typography>
                    <Typography variant="body2" color="default">
                      Maple Plain, MN 55359
                    </Typography>
                    <Typography variant="body2" color="default">
                      United States
                    </Typography>
                    <Typography variant="body2" color="default">
                      jason.frankman@protolabs.com
                    </Typography>
                    <Typography variant="body2" color="default">
                      +1 763-479-3680
                    </Typography>
                  </div>
                }
              />
            </div>
            
            {/* Batch plan */}
            <Card
              className="mb-8"
              title={
                <div className="flex justify-between items-center">
                  <Typography variant="subtitle1" color="default" className="font-semibold">
                    Batch plan
                  </Typography>
                  <Button buttonType="default" colorVariant="blue" size="s">
                    Create
                  </Button>
                </div>
              }
              description={
                <Typography variant="body2" color="default" className="mt-2">
                  This order doesn't contain batch shipments
                </Typography>
              }
            />
            
            {/* Parts and pricing */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h3" color="default" className="font-semibold">
                  Parts and pricing
                  <span className="text-sm font-normal text-gray-600 ml-2">4 parts / 10000 pcs.</span>
                </Typography>
                <Button 
                  buttonType="outline"
                  colorVariant="blue"
                  size="s"
                  onClick={() => handleOpenNoteModal('General Parts & Pricing Note')}
                >
                  Add General Note
                </Button>
              </div>

              {/* Display Preliminary ME Notes */}
              {preliminaryMeNotes.length > 0 && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <Typography variant="subtitle2" className="font-semibold text-amber-800 mb-2">Preliminary ME Notes:</Typography>
                  <ul className="list-disc list-inside space-y-1">
                    {preliminaryMeNotes.map(note => (
                      <li key={note.id} className="text-sm text-amber-700">
                        <span className="font-semibold">{note.context}:</span> {note.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Parts list headers */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                  <Typography variant="body2" color="default" className="font-semibold">
                    Specifications
                  </Typography>
                  <Typography variant="body2" color="default" className="font-semibold">
                    Custom requirements
                  </Typography>
                  <Typography variant="body2" color="default" className="font-semibold text-center">
                    Quantity
                  </Typography>
                  <Typography variant="body2" color="default" className="font-semibold text-right">
                    Price
                  </Typography>
                </div>
                
                {/* Parts entries (simplified for brevity) */}
                <div className="border-b border-gray-200 p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gray-100 p-2 mr-4 flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <Typography variant="body2" color="default" className="font-semibold">
                            78-8137-4866-0_REV002.stp
                          </Typography>
                          <Typography variant="body2" color="default">
                            CNC machining
                          </Typography>
                          <Typography variant="body2" color="default">
                            Aluminum 6061-T6 | 3.321 | 60628 | AlMgSiCu
                          </Typography>
                          <Typography variant="body2" color="default">
                            As machined + Anodized type III (hardcoat)
                          </Typography>
                          <Button size="xs" buttonType="text-action" colorVariant="blue" onClick={() => handleOpenNoteModal('Part 78-8137 - Specs')} className="mt-1">Add Note</Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Typography variant="body2" color="default">
                        No customer note
                      </Typography>
                      <Typography variant="body2" color="default">
                        Sales note
                      </Typography>
                      <Typography variant="body2" color="default" className="ml-4 text-xs">
                        • Tolerances apply after anodizing, not thread oversize to compensate
                      </Typography>
                      <Button size="xs" buttonType="text-action" colorVariant="blue" onClick={() => handleOpenNoteModal('Part 78-8137 - Requirements')} className="mt-1">Add Note</Button>
                    </div>
                    <div className="flex justify-center items-center">
                      <Typography variant="body1" color="default" className="font-semibold">
                        2500
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body1" color="default" className="font-semibold">
                        US$77,750.00
                      </Typography>
                      <Typography variant="body2" color="default">
                        US$31.10 p/part
                      </Typography>
                      <Button buttonType="text-action" colorVariant="blue" size="s">
                        Manually priced
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Additional services */}
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="col-span-2 flex items-center">
                      <input type="checkbox" className="mr-2" checked={true} readOnly />
                      <Typography variant="body2" color="default">
                        Certificate of Conformance
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$30.00
                      </Typography>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="col-span-2 flex items-center">
                      <input type="checkbox" className="mr-2" checked={true} readOnly />
                      <Typography variant="body2" color="default">
                        Dimensional Inspection Report
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$30.00
                      </Typography>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex items-center">
                      <input type="checkbox" className="mr-2" checked={true} readOnly />
                      <Typography variant="body2" color="default">
                        Material Certificates for All Materials
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$30.00
                      </Typography>
                    </div>
                  </div>
                </div>
                
                {/* Subtotal and shipping */}
                <div className="p-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="body2" color="default">
                        Shipping - Standard / 1 - 2 business days
                      </Typography>
                      <Button size="xs" buttonType="text-action" colorVariant="blue" onClick={() => handleOpenNoteModal('Shipping Note')} className="mt-1">Add Note</Button>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$200.00
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Typography variant="body2" color="default">
                        Subtotal
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$467,103.46
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <Typography variant="body2" color="default">
                        Sales tax - 0%
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body2" color="default">
                        US$0.00
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <Button buttonType="text-action" colorVariant="blue" size="s">
                      Have a discount code?
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <Typography variant="body1" color="default" className="font-semibold">
                        Total
                      </Typography>
                      <Button size="xs" buttonType="text-action" colorVariant="blue" onClick={() => handleOpenNoteModal('Total/Pricing Note')} className="mt-1">Add Note</Button>
                    </div>
                    <div className="text-right">
                      <Typography variant="h3" color="default" className="font-bold">
                        US$467,103.46
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Admin Panel - For testing workflow states (hidden in production) */}
      <div className="mt-8 p-4 border border-gray-300 border-dashed rounded-lg bg-gray-50">
        <Typography variant="subtitle1" color="default" className="font-medium mb-3">
          Demo Controls (For Testing)
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Button
            buttonType="outline"
            colorVariant="grey"
            size="s"
            onClick={() => {
              localStorage.setItem('quoteWorkflowStatus', 'none');
              setWorkflowStatus('none');
            }}
          >
            Reset Status
          </Button>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => {
              localStorage.setItem('quoteWorkflowStatus', 'technical-review-requested');
              setWorkflowStatus('technical-review-requested');
            }}
          >
            Set: Tech Review Requested
          </Button>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => {
              localStorage.setItem('quoteWorkflowStatus', 'technical-review-completed');
              setWorkflowStatus('technical-review-completed');
            }}
          >
            Set: Tech Review Completed
          </Button>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => {
              localStorage.setItem('quoteWorkflowStatus', 'rfq-sent');
              setWorkflowStatus('rfq-sent');
            }}
          >
            Set: RFQ Sent
          </Button>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => {
              localStorage.setItem('quoteWorkflowStatus', 'production');
              setWorkflowStatus('production');
            }}
          >
            Set: Production
          </Button>
        </div>
      </div>

      {/* ME Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <Typography variant="h3" className="text-xl font-semibold mb-4">Add Note for ME Review</Typography>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              rows={4}
              placeholder="Enter your note..."
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
            />
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                buttonType="outline"
                colorVariant="grey"
                onClick={() => {
                  setIsNoteModalOpen(false);
                  setCurrentNoteText(''); // Clear text on cancel
                }}
              >
                Cancel
              </Button>
              <Button
                buttonType="default"
                colorVariant="blue"
                onClick={() => {
                  if (currentNoteText.trim()) {
                    const newNote = { id: Date.now().toString(), text: currentNoteText.trim(), context: currentNoteContext };
                    const updatedNotes = [...preliminaryMeNotes, newNote];
                    setPreliminaryMeNotes(updatedNotes);
                    localStorage.setItem(`preliminaryMeNotes_${quoteIdForNotes}`, JSON.stringify(updatedNotes));
                    setCurrentNoteText('');
                    setCurrentNoteContext(''); // Reset context
                    setIsNoteModalOpen(false);
                  }
                }}
                disabled={!currentNoteText.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 