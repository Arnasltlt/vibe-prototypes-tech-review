'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import LineItemsSidePanel, { LineItem } from '@/components/LineItemsSidePanel';
import { Accordion } from '@/components/ui/Accordion/Accordion';

// Mock data - replace with actual data fetching based on reviewId
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

// Mock data for review details - replace with actual data
const mockReviewDetails = {
  // --For Review--
  htsCodes: '8479.90.9496',
  customRequest: 'Material certification required. Specific surface finish Ra 0.8 on mating surfaces.',
  quoteVersionNumbers: 'V30, V31',
  previousReviewChanges: 'Minor adjustment to tolerance callout on drawing for V31.',
  ignorableDrawingNotes: 'None, all notes are critical.',
  sourcingRequirements: 'EU region preferred. Avoid MP-123.',
  documentationRequired: 'CofC, Material Certs.',
  otherInfo: 'Part will be assembled with a bearing, press-fit.',

  // COMMERCIAL
  reorderInfo: 'Reorder of PO #DEAL-12345',
  futureVolume: '1000 units/year',
  targetLeadTime: 'ASAP',
  targetPrice: '$45,000',
  industryApplication: 'Critical housing component for an aerospace assembly. Requires tight tolerances and specific alloy.',
  equivalentMaterialsAllowed: 'Yes, pre-approved list attached.',

  // Original data preserved for other parts of the UI
  requestedBy: 'John Doe (Deal Owner)',
  quoteId: '3DZF983L7-V31',
  reasons: ['Complex Geometry', 'Non-checkout Material'],
  priority: 'High',
};

// Mock AI Analysis Data
const mockAiAnalysis = {
  title: "AI Technical Analysis",
  findings: [
    {
      id: "ai-f1",
      icon: "⚠️",
      type: "Discrepancy",
      severity: "Medium",
      details: "Material: Drawing (AMS 5643) vs. Quote (AL 6061-T6). Verify.",
      recommendation: "Clarify required material."
    },
    {
      id: "ai-f2",
      icon: "💡",
      type: "Requirement",
      severity: "Low",
      details: "Surface Finish: Critical Ra 0.4 µm on face B (Note 3.2.1). Special machining?",
      recommendation: "Confirm MP capability."
    },
    {
      id: "ai-f3",
      icon: "❗",
      type: "Tolerance",
      severity: "High",
      details: "GD&T: Parallelism 0.05mm on main housing is tight. Risk of high scrap.",
      recommendation: "Discuss with MP. Consider DFM."
    },
    {
      id: "ai-f4",
      icon: "❓",
      type: "Completeness",
      severity: "Low",
      details: "Threads: M6 specs not in quote (drawing implies standard coarse).",
      recommendation: "Confirm if custom threads needed."
    }
  ]
};

// Mock Supply Chain Assessment Data
const mockSupplyChainAssessment = {
  title: "Supply Chain Assessment",
  overallFit: { text: "Good", icon: "✅" },
  capacity: {
    status: "Sufficient",
    icon: "🔋",
    notes: "Network load accommodates order."
  },
  experience: {
    similarParts: "High",
    icon: "⭐",
    details: "Preferred MPs recently made similar parts (AL 7075-T6, CNC)."
  },
  performance: {
    onTimeDeliveryRate: { value: "96.5%", icon: "⏱️", label: "On-Time Delivery (Similar)"},
    qualityScoreAverage: { value: "4.8/5", icon: "🌟", label: "Avg. Quality Score (Relevant)"}
  },
  risks: [
    { id: 'scr1', icon: "📉", level: 'Low', description: "AL 7075-T6 price flu_ctuation if order >30 days late." },
    { id: 'scr2', icon: "⚠️", level: 'Medium', description: "Type III hardcoat anodizing bottleneck; 2 alternatives exist." }
  ],
  recommendations: [
    { id: 'scrrec1', icon: "👍", text: "Prioritize MPs proven with AL 7075-T6 & hardcoat anodizing." },
    { id: 'scrrec2', icon: "💬", text: "Confirm lead time with MPs if tight tolerances require extra QC." }
  ]
};

// Define the structure for preliminary notes
interface PreliminaryNote {
  id: string;
  text: string;
  context: string;
}

// Overview status calculation helper
const getOverviewStatus = (
  aiAnalysis: typeof mockAiAnalysis,
  supplyChain: typeof mockSupplyChainAssessment,
  preliminaryNotes: PreliminaryNote[]
) => {
  // AI Analysis Status
  const highSeverityIssues = aiAnalysis.findings.filter(f => f.severity === 'High').length;
  const mediumSeverityIssues = aiAnalysis.findings.filter(f => f.severity === 'Medium').length;
  
  let aiStatus = 'good';
  let aiMessage = 'No critical issues found';
  if (highSeverityIssues > 0) {
    aiStatus = 'warning';
    aiMessage = `${highSeverityIssues} high severity issue${highSeverityIssues > 1 ? 's' : ''}`;
  } else if (mediumSeverityIssues > 0) {
    aiStatus = 'caution';
    aiMessage = `${mediumSeverityIssues} medium severity issue${mediumSeverityIssues > 1 ? 's' : ''}`;
  }

  // Supply Chain Status
  const supplyStatus = supplyChain.overallFit.text === 'Good' || supplyChain.overallFit.text === 'Excellent' ? 'good' : 'caution';
  const supplyMessage = `${supplyChain.overallFit.text} fit, ${supplyChain.capacity.status.toLowerCase()} capacity`;

  // Notes Status
  const notesStatus = preliminaryNotes.length > 0 ? 'info' : 'neutral';
  const notesMessage = preliminaryNotes.length > 0 ? `${preliminaryNotes.length} preliminary note${preliminaryNotes.length > 1 ? 's' : ''}` : 'No preliminary notes';

  return { aiStatus, aiMessage, supplyStatus, supplyMessage, notesStatus, notesMessage };
};

export default function MechanicalEngineerReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params?.reviewId as string; // Example: 'example-review-id'
  const quoteIdForNotes = '3DZF983L7'; // Must match the one on example-quote page for mock

  // State for any ME inputs or notes (optional for now)
  const [meNotes, setMeNotes] = useState('');
  const [retrievedPreliminaryNotes, setRetrievedPreliminaryNotes] = useState<PreliminaryNote[]>([]);

  useEffect(() => {
    // Fetch preliminary notes from localStorage
    const savedNotesString = localStorage.getItem(`preliminaryMeNotes_${quoteIdForNotes}`);
    if (savedNotesString) {
      try {
        const notes: PreliminaryNote[] = JSON.parse(savedNotesString);
        setRetrievedPreliminaryNotes(notes);
      } catch (error) {
        console.error("Failed to parse preliminary notes from localStorage:", error);
      }
    }
    // TODO: Fetch actual review data based on reviewId in a useEffect hook
  }, [quoteIdForNotes, reviewId]); // reviewId added in case it becomes part of data fetching

  // Calculate overview status
  const overviewStatus = getOverviewStatus(mockAiAnalysis, mockSupplyChainAssessment, retrievedPreliminaryNotes);

  const handleAction = (action: 'save' | 'rda' | 'rfq' | 'pricing') => {
    console.log(`ME Action for review ${reviewId}: ${action}`);
    let newStatus = 'technical-review-completed'; // Default, can be more specific
    
    const technicalReviewSummary = {
      aiAnalysis: mockAiAnalysis,
      supplyChainAssessment: mockSupplyChainAssessment,
      preliminaryNotes: retrievedPreliminaryNotes,
    };

    if (action === 'rda') {
      newStatus = 'technical-review-completed-rda'; // Example specific status
      localStorage.setItem('quoteWorkflowStatus', newStatus);
      // Potentially call an API to update backend
      router.push(`/example-quote?status=${newStatus}`);
    } else if (action === 'rfq') {
      newStatus = 'technical-review-completed-rfq'; // Example specific status
      localStorage.setItem('quoteWorkflowStatus', newStatus);
      localStorage.setItem('technicalReviewSummary', JSON.stringify(technicalReviewSummary));
      // Potentially call an API to update backend
      router.push(`/example-quote?status=${newStatus}`);
    } else if (action === 'pricing') {
      newStatus = 'pricing-team-review'; // Example new status
      localStorage.setItem('quoteWorkflowStatus', newStatus);
      router.push(`/example-quote?status=${newStatus}`);
    } else if (action === 'save') {
      // Just save notes or current state, might not change overall status yet
      // Or could be a temporary save before final decision
      console.log('ME Review Progress Saved for', reviewId);
      alert('Progress Saved (mock)');
      // router.push('/example-quote'); // Or stay on page
    }
  };
  
  // TODO: Fetch actual review data based on reviewId in a useEffect hook

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex">
        {/* Reusable Sidebar (optional, could be a simpler one for ME) */}
        <div className="w-16 hover:w-64 bg-[#171717] text-white h-screen transition-all duration-300 overflow-hidden fixed left-0 top-0 z-10 group">
            <div className="p-4">
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="mr-2 flex-shrink-0">
                            <svg className="h-8 w-8" viewBox="0 0 60 60" fill="white"><path d="M30 0L0 17.32v34.64L30 60l30-17.32V17.32L30 0zm20 46.19L30 57.96 10 46.19V22.64L30 10.87l20 11.77v23.55z" /><path d="M30 16.47L15 25.02v17.11l15 8.55 15-8.55V25.02L30 16.47z" /></svg>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="font-bold text-lg leading-none">PROTOLABS</div>
                            <div className="font-bold text-lg leading-none">NETWORK</div>
                        </div>
                    </div>
                </div>
                {/* Simplified Nav for ME? */}
                 <a href="/orders" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" /></svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">All Orders</span>
                </a>
            </div>
        </div>

        {/* Main Content Area with adjusted margins */}
        <div className="flex flex-1 ml-16">
          <LineItemsSidePanel title="Quote Overview" items={mockLineItems} />
          <div className="flex-1 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <Typography variant="h1" className="text-3xl font-bold">
                Technical Review: {mockReviewDetails.quoteId}
              </Typography>
              <Typography variant="caption" color="secondary">
                Review ID: {reviewId}
              </Typography>
            </div>

            {/* Overview Status Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
              <Typography variant="h3" className="text-lg font-semibold text-gray-800 mb-3">Review Overview</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* AI Analysis Overview */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-lg ${
                    overviewStatus.aiStatus === 'good' ? 'bg-green-500' : 
                    overviewStatus.aiStatus === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {overviewStatus.aiStatus === 'good' ? '✓' : 
                     overviewStatus.aiStatus === 'caution' ? '!' : '⚠'}
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-700">AI Analysis</Typography>
                    <Typography variant="caption" className="text-gray-600">{overviewStatus.aiMessage}</Typography>
                  </div>
                </div>

                {/* Supply Chain Overview */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-lg ${
                    overviewStatus.supplyStatus === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {overviewStatus.supplyStatus === 'good' ? '✓' : '!'}
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-700">Supply Chain</Typography>
                    <Typography variant="caption" className="text-gray-600">{overviewStatus.supplyMessage}</Typography>
                  </div>
                </div>

                {/* Notes Overview */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-lg ${
                    overviewStatus.notesStatus === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {overviewStatus.notesStatus === 'info' ? '📝' : '—'}
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-700">Preliminary Notes</Typography>
                    <Typography variant="caption" className="text-gray-600">{overviewStatus.notesMessage}</Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT COLUMN (scrollable content) */}
              <div className="flex-1 space-y-6">
                {/* Review Details */}
                <Accordion title="Review Request Details" defaultOpen={true}>
                  <div className="space-y-6 p-4">
                    {/* --For Review-- Section */}
                    <div>
                      <Typography variant="h4" className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">--For Review--</Typography>
                      <div className="space-y-3">
                        <div><Typography variant="subtitle2">HTS Codes:</Typography> <Typography>{mockReviewDetails.htsCodes}</Typography></div>
                        <div><Typography variant="subtitle2">Custom request:</Typography> <Typography className="whitespace-pre-wrap">{mockReviewDetails.customRequest}</Typography></div>
                        <div><Typography variant="subtitle2">Quote version number(s):</Typography> <Typography>{mockReviewDetails.quoteVersionNumbers}</Typography></div>
                        <div><Typography variant="subtitle2">If previously reviewed, what changed?</Typography> <Typography className="whitespace-pre-wrap">{mockReviewDetails.previousReviewChanges}</Typography></div>
                        <div><Typography variant="subtitle2">From the drawing notes or call-outs, which ones can be ignored?</Typography> <Typography className="whitespace-pre-wrap">{mockReviewDetails.ignorableDrawingNotes}</Typography></div>
                        <div><Typography variant="subtitle2">Sourcing requirements? (Region? MP?)</Typography> <Typography>{mockReviewDetails.sourcingRequirements}</Typography></div>
                        <div><Typography variant="subtitle2">Documentation required?</Typography> <Typography>{mockReviewDetails.documentationRequired}</Typography></div>
                        <div><Typography variant="subtitle2">Other info:</Typography> <Typography className="whitespace-pre-wrap">{mockReviewDetails.otherInfo}</Typography></div>
                      </div>
                    </div>

                    {/* COMMERCIAL Section */}
                    <div>
                      <Typography variant="h4" className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">COMMERCIAL</Typography>
                      <div className="space-y-3">
                        <div><Typography variant="subtitle2">Reorder (Previous PO #)? Future volume?</Typography> <Typography>{mockReviewDetails.reorderInfo}, {mockReviewDetails.futureVolume}</Typography></div>
                        <div><Typography variant="subtitle2">Target LT:</Typography> <Typography>{mockReviewDetails.targetLeadTime}</Typography></div>
                        <div><Typography variant="subtitle2">Target $:</Typography> <Typography>{mockReviewDetails.targetPrice}</Typography></div>
                        <div><Typography variant="subtitle2">Industry / Part application?</Typography> <Typography className="whitespace-pre-wrap">{mockReviewDetails.industryApplication}</Typography></div>
                        <div><Typography variant="subtitle2">Customer open to equivalent materials?</Typography> <Typography>{mockReviewDetails.equivalentMaterialsAllowed}</Typography></div>
                      </div>
                    </div>
                  </div>
                </Accordion>

                {/* Preliminary Notes */}
                {retrievedPreliminaryNotes.length > 0 && (
                  <Accordion title={`Preliminary Notes (${retrievedPreliminaryNotes.length})`} defaultOpen={false}>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {retrievedPreliminaryNotes.map(note => (
                        <div key={note.id} className="text-sm p-2 border border-amber-200 rounded-md bg-amber-50">
                          <Typography variant="subtitle2" className="font-semibold text-amber-600">{note.context}</Typography>
                          <Typography className="text-gray-700 whitespace-pre-wrap mt-0.5">{note.text}</Typography>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                )}

                {/* AI Analysis */}
                <Accordion title="AI Analysis" defaultOpen={false}>
                  <div className="space-y-4">
                    {mockAiAnalysis.findings.map(finding => (
                      <div key={finding.id} className={`p-3 rounded-md border-l-4 bg-gray-50 ${finding.severity === 'High' ? 'border-red-500' : finding.severity === 'Medium' ? 'border-yellow-500' : 'border-blue-500'}`}> 
                        <Typography variant="subtitle1" className={`font-semibold flex items-center ${finding.severity === 'High' ? 'text-red-700' : finding.severity === 'Medium' ? 'text-yellow-700' : 'text-blue-700'}`}> 
                          <span className="mr-2 text-xl">{finding.icon}</span> {finding.type} <span className="font-normal text-gray-500 ml-1">({finding.severity})</span>
                        </Typography>
                        <Typography variant="body2" className="text-gray-800 mt-1 pl-8">{finding.details}</Typography>
                        {finding.recommendation && (
                          <Typography variant="body2" className="text-sm text-gray-600 mt-1.5 italic pl-8"><span className="font-medium">Suggestion:</span> {finding.recommendation}</Typography>
                        )}
                      </div>
                    ))}
                  </div>
                </Accordion>

                {/* Supply Chain Assessment */}
                <Accordion title="Supply-Chain Assessment" defaultOpen={false}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                      <div className="flex items-start"><span className="text-xl mr-2">{mockSupplyChainAssessment.overallFit.icon}</span><div><Typography variant="subtitle2" className="font-semibold">Overall Fit:</Typography><Typography className={mockSupplyChainAssessment.overallFit.text === 'Good' || mockSupplyChainAssessment.overallFit.text === 'Excellent' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{mockSupplyChainAssessment.overallFit.text}</Typography></div></div>
                      <div className="flex items-start"><span className="text-xl mr-2">{mockSupplyChainAssessment.capacity.icon}</span><div><Typography variant="subtitle2" className="font-semibold">Capacity Status:</Typography><Typography><span className="mr-1">{mockSupplyChainAssessment.capacity.status}</span><span className="text-xs text-gray-500">({mockSupplyChainAssessment.capacity.notes})</span></Typography></div></div>
                      <div className="flex items-start sm:col-span-2"><span className="text-xl mr-2">{mockSupplyChainAssessment.experience.icon}</span><div><Typography variant="subtitle2" className="font-semibold">Experience (Similar Parts):</Typography><Typography>{mockSupplyChainAssessment.experience.similarParts} - {mockSupplyChainAssessment.experience.details}</Typography></div></div>
                      <div className="flex items-start"><span className="text-xl mr-2">{mockSupplyChainAssessment.performance.onTimeDeliveryRate.icon}</span><div><Typography variant="subtitle2" className="font-semibold">{mockSupplyChainAssessment.performance.onTimeDeliveryRate.label}:</Typography><Typography>{mockSupplyChainAssessment.performance.onTimeDeliveryRate.value}</Typography></div></div>
                      <div className="flex items-start"><span className="text-xl mr-2">{mockSupplyChainAssessment.performance.qualityScoreAverage.icon}</span><div><Typography variant="subtitle2" className="font-semibold">{mockSupplyChainAssessment.performance.qualityScoreAverage.label}:</Typography><Typography>{mockSupplyChainAssessment.performance.qualityScoreAverage.value}</Typography></div></div>
                    </div>

                    {mockSupplyChainAssessment.risks.length > 0 && (
                      <div>
                        <Typography variant="subtitle2" className="font-semibold mb-2">Risks:</Typography>
                        <ul className="space-y-2">
                          {mockSupplyChainAssessment.risks.map(risk => (<li key={risk.id} className={`text-sm flex items-start ${risk.level === 'Medium' ? 'text-yellow-700' : risk.level === 'Low' ? 'text-gray-700' : 'text-red-700'}`}><span className="text-xl mr-2">{risk.icon}</span><span className="font-medium mr-1">{risk.level}:</span>{risk.description}</li>))}
                        </ul>
                      </div>
                    )}

                    {mockSupplyChainAssessment.recommendations.length > 0 && (
                      <div>
                        <Typography variant="subtitle2" className="font-semibold mb-2">Recommendations:</Typography>
                        <ul className="space-y-2">
                          {mockSupplyChainAssessment.recommendations.map(rec => (<li key={rec.id} className="text-sm text-gray-700 flex items-start"><span className="text-xl mr-2">{rec.icon}</span>{rec.text}</li>))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Accordion>

                {/* QUESTION / CONFIRMATION REQUIRED Section */}
                <Accordion title="QUESTION (from CS) / CONFIRMATION REQUIRED (by MP)" defaultOpen={true}>
                    <div className="p-4">
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={5}
                            placeholder="Log questions for customer service or clarifications needed from the manufacturing partner here..."
                            value={meNotes}
                            onChange={(e) => setMeNotes(e.target.value)}
                        />
                    </div>
                </Accordion>
              </div>

              {/* RIGHT COLUMN (sticky actions) */}
              <div className="md:w-80 space-y-4 md:sticky md:top-6">
                <div className="p-6 bg-gray-50 rounded-lg shadow space-y-4">
                  <Typography variant="h2" className="text-lg font-semibold text-gray-800">Actions</Typography>
                  <Button buttonType="default" colorVariant="blue" size="l" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleAction('rda')}>Send to RDA</Button>
                  <Button buttonType="default" colorVariant="green" size="l" className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction('rfq')}>Send to RFQ Team</Button>
                  <Button buttonType="default" colorVariant="purple" size="l" className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleAction('pricing')}>Send to Pricing Team</Button>
                  <Button buttonType="outline" colorVariant="grey" size="l" className="w-full text-gray-700 border-gray-400 hover:bg-gray-100 hover:text-gray-900" onClick={() => handleAction('save')}>Save and Exit</Button>
                </div>
              </div>
            </div>
            
            {/* Attachments section removed as per request */}

          </div>
        </div>
      </div>
    </div>
  );
} 