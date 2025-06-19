'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import RequirementsCapture, { ManufacturingRequirements } from '@/components/RequirementsCapture/RequirementsCapture';
import LineItemsSidePanel, { LineItem } from '@/components/LineItemsSidePanel';
import { Accordion } from '@/components/ui/Accordion/Accordion';

// Mock line items - replace with actual data
const mockLineItems: LineItem[] = [
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

interface RequirementsStatus {
  lineItemId: number;
  status: 'not-started' | 'in-progress' | 'complete' | 'needs-review';
  completionPercentage: number;
  requirements?: ManufacturingRequirements;
}

export default function PrepareRFQPage() {
  const router = useRouter();
  const [selectedLineItem, setSelectedLineItem] = useState<number>(1);
  const [requirementsStatuses, setRequirementsStatuses] = useState<RequirementsStatus[]>([
    { lineItemId: 1, status: 'not-started', completionPercentage: 0 },
    { lineItemId: 2, status: 'not-started', completionPercentage: 0 }
  ]);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState<any[]>([]);

  // Load any existing requirements from technical review
  useEffect(() => {
    const technicalReviewData = localStorage.getItem('technicalReviewRequirements');
    if (technicalReviewData) {
      try {
        const data = JSON.parse(technicalReviewData);
        // Pre-populate requirements from technical review
        console.log('Loading requirements from technical review:', data);
      } catch (error) {
        console.error('Failed to load technical review data:', error);
      }
    }
  }, []);

  const handleRequirementsSave = (requirements: ManufacturingRequirements) => {
    setRequirementsStatuses(prev => prev.map(status => 
      status.lineItemId === selectedLineItem
        ? { 
            ...status, 
            status: 'complete', 
            completionPercentage: 100,
            requirements 
          }
        : status
    ));
    
    // Auto-advance to next line item if available
    const nextIncomplete = requirementsStatuses.find(
      s => s.lineItemId !== selectedLineItem && s.status !== 'complete'
    );
    if (nextIncomplete) {
      setSelectedLineItem(nextIncomplete.lineItemId);
    }
  };

  const validateRequirements = () => {
    const results: any[] = [];
    
    requirementsStatuses.forEach(status => {
      const lineItem = mockLineItems.find(li => li.id === status.lineItemId);
      if (!lineItem) return;
      
      const issues: string[] = [];
      
      if (status.status !== 'complete') {
        issues.push('Requirements not completed');
      } else if (status.requirements) {
        // Validate specific requirements
        const req = status.requirements;
        
        // Part marking validation
        if (req.partMarking.content.length > 0 && !req.partMarking.process) {
          issues.push('Part marking process not specified');
        }
        
        // Thread validation
        req.threads.specifications.forEach((spec, i) => {
          if (spec.standard !== 'none' && !spec.size) {
            issues.push(`Thread ${i + 1}: Size not specified`);
          }
        });
        
        // Finish validation
        if (req.finish.process && !req.finish.filmThickness && !req.finish.raTarget) {
          issues.push('Finish thickness/Ra target not specified');
        }
      }
      
      results.push({
        lineItemId: status.lineItemId,
        lineItemName: lineItem.name,
        issues,
        status: issues.length === 0 ? 'ready' : 'needs-attention'
      });
    });
    
    setValidationResults(results);
    setShowValidation(true);
  };

  const getOverallReadiness = () => {
    const complete = requirementsStatuses.filter(s => s.status === 'complete').length;
    return {
      percentage: Math.round((complete / requirementsStatuses.length) * 100),
      ready: complete === requirementsStatuses.length
    };
  };

  const readiness = getOverallReadiness();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 hover:w-64 bg-[#171717] text-white h-screen transition-all duration-300 overflow-hidden fixed left-0 top-0 z-10 group">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 ml-16">
          <LineItemsSidePanel 
            title="Line Items" 
            items={mockLineItems}
            selectedItemId={selectedLineItem}
            onItemClick={(id: number) => setSelectedLineItem(id)}
            showStatus={true}
            itemStatuses={requirementsStatuses.map(s => ({
              id: s.lineItemId,
              status: s.status === 'complete' ? 'complete' : 
                     s.status === 'in-progress' ? 'in-progress' : 'pending'
            }))}
          />
          
          <div className="flex-1 p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h1" className="text-3xl font-bold">
                  Prepare RFQ Requirements
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Complete manufacturing requirements to prevent supplier questions
                </Typography>
              </div>
              <Button
                buttonType="outline"
                colorVariant="grey"
                size="m"
                onClick={() => router.push('/orders/send-rfq')}
              >
                Back to RFQ
              </Button>
            </div>

            {/* Overall Progress */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Typography variant="h3" className="text-xl font-semibold text-gray-800">
                    Overall RFQ Readiness
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mt-1">
                    {requirementsStatuses.filter(s => s.status === 'complete').length} of {requirementsStatuses.length} line items complete
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography variant="h2" className="text-3xl font-bold text-blue-600">
                    {readiness.percentage}%
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Ready
                  </Typography>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${readiness.percentage}%` }}
                />
              </div>
            </div>

            {/* Why This Matters */}
            <Accordion title="Why Complete Requirements Matter" defaultOpen={false}>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <Typography variant="subtitle1" className="font-semibold text-red-800 mb-2">
                    Impact of Incomplete Requirements
                  </Typography>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Average of 2.3 clarification emails per RFQ</li>
                    <li>• 3-5 day delay in quote turnaround</li>
                    <li>• 15% higher quoted prices due to uncertainty</li>
                    <li>• 123 supplier questions in May alone</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <Typography variant="subtitle1" className="font-semibold text-green-800 mb-2">
                    Benefits of Complete Requirements
                  </Typography>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• 100% of supplier questions preventable</li>
                    <li>• 48-hour faster quote turnaround</li>
                    <li>• More accurate pricing</li>
                    <li>• Higher supplier confidence = better pricing</li>
                  </ul>
                </div>
              </div>
            </Accordion>

            {/* Current Line Item Requirements */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h2" className="text-xl font-semibold">
                  Requirements for: {mockLineItems.find(li => li.id === selectedLineItem)?.name}
                </Typography>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    requirementsStatuses.find(s => s.lineItemId === selectedLineItem)?.status === 'complete'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {requirementsStatuses.find(s => s.lineItemId === selectedLineItem)?.status === 'complete'
                      ? 'Complete'
                      : 'In Progress'}
                  </span>
                </div>
              </div>

              <RequirementsCapture
                mode="engineering"
                lineItemId={selectedLineItem.toString()}
                initialData={requirementsStatuses.find(s => s.lineItemId === selectedLineItem)?.requirements}
                onSave={handleRequirementsSave}
              />
            </div>

            {/* Validation Results */}
            {showValidation && (
              <div className="p-6 border-2 border-blue-400 bg-white rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-4">
                  Requirements Validation
                </Typography>
                <div className="space-y-3">
                  {validationResults.map(result => (
                    <div 
                      key={result.lineItemId}
                      className={`p-3 rounded-lg border ${
                        result.status === 'ready' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="font-semibold">
                            {result.lineItemName}
                          </Typography>
                          {result.issues.length > 0 ? (
                            <ul className="mt-1 space-y-1">
                              {result.issues.map((issue: string, i: number) => (
                                <li key={i} className="text-sm text-yellow-700">
                                  • {issue}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Typography variant="body2" className="text-green-700 mt-1">
                              ✓ All requirements complete
                            </Typography>
                          )}
                        </div>
                        <span className={`text-2xl ${
                          result.status === 'ready' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {result.status === 'ready' ? '✓' : '!'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                buttonType="outline"
                colorVariant="blue"
                size="m"
                onClick={validateRequirements}
              >
                Validate Requirements
              </Button>
              
              <div className="flex gap-3">
                <Button
                  buttonType="outline"
                  colorVariant="grey"
                  size="m"
                  onClick={() => {
                    // Save progress
                    localStorage.setItem('rfqRequirements', JSON.stringify(requirementsStatuses));
                  }}
                >
                  Save Progress
                </Button>
                <Button
                  buttonType="default"
                  colorVariant="blue"
                  size="m"
                  disabled={!readiness.ready}
                  onClick={() => {
                    // Save requirements and proceed
                    localStorage.setItem('rfqRequirements', JSON.stringify(requirementsStatuses));
                    router.push('/orders/send-rfq?requirements=complete');
                  }}
                >
                  Continue to Send RFQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 