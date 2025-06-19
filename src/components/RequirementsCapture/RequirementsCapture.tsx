'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import { Accordion } from '@/components/ui/Accordion/Accordion';

export interface ManufacturingRequirements {
  partMarking: {
    content: string[];
    font?: string;
    characterHeight?: string;
    characterDepth?: string;
    fillColor?: string;
    location?: string;
    process?: 'laser' | 'cnc' | 'pad-print' | 'other';
    timing?: 'before-finishing' | 'after-finishing';
    locationFile?: File;
  };
  threads: {
    specifications: Array<{
      holeId: string;
      standard: 'metric' | 'unc' | 'npt' | 'none' | 'other';
      size?: string;
      pitch?: string;
      toleranceClass?: string;
      handedness?: 'right' | 'left';
      depth?: string;
      reliefAcceptable?: boolean;
      fullThreadDepth?: string;
      doubleTapping?: boolean;
    }>;
  };
  finish: {
    process: string;
    filmThickness?: string;
    raTarget?: string;
    colorRange?: string;
    glossRange?: string;
    maskingRequired: Array<{
      area: string;
      reason: string;
    }>;
    fixturePoints?: string;
  };
  tolerances: {
    criticalDimensions: Array<{
      dimension: string;
      tolerance: string;
      inspectionGauge?: string;
    }>;
  };
  cosmetics: {
    maxScratchLength?: string;
    maxScratchDepth?: string;
    maxStainArea?: string;
    edmLineVisibility?: string;
    colorDeltaE?: string;
    viewingDistance?: string;
  };
  materials: {
    alternatesAllowed: boolean;
    approvedAlternatives?: string[];
    heatTreatOptions?: string[];
    finishingSwaps?: string[];
    deviationApprovalPath?: string;
  };
  geometry: {
    defaultInsideRadius?: string;
    defaultChamferSize?: string;
    edmAllowed?: boolean;
    wireCutAllowed?: boolean;
  };
}

interface RequirementsCaptureProps {
  initialData?: Partial<ManufacturingRequirements>;
  onSave: (requirements: ManufacturingRequirements) => void;
  mode: 'sales' | 'engineering';
  lineItemId?: string;
}

export default function RequirementsCapture({ 
  initialData, 
  onSave, 
  mode,
  lineItemId 
}: RequirementsCaptureProps) {
  const [requirements, setRequirements] = useState<ManufacturingRequirements>({
    partMarking: {
      content: initialData?.partMarking?.content || [],
      ...initialData?.partMarking
    },
    threads: {
      specifications: initialData?.threads?.specifications || []
    },
    finish: {
      process: initialData?.finish?.process || '',
      maskingRequired: initialData?.finish?.maskingRequired || [],
      ...initialData?.finish
    },
    tolerances: {
      criticalDimensions: initialData?.tolerances?.criticalDimensions || []
    },
    cosmetics: initialData?.cosmetics || {},
    materials: {
      alternatesAllowed: initialData?.materials?.alternatesAllowed || false,
      ...initialData?.materials
    },
    geometry: initialData?.geometry || {}
  });

  const [completionStatus, setCompletionStatus] = useState({
    partMarking: false,
    threads: false,
    finish: false,
    tolerances: false,
    cosmetics: false,
    materials: false,
    geometry: false
  });

  const updateRequirement = (category: keyof ManufacturingRequirements, data: any) => {
    setRequirements(prev => ({
      ...prev,
      [category]: { ...prev[category], ...data }
    }));
  };

  const getCompletionPercentage = () => {
    const completed = Object.values(completionStatus).filter(Boolean).length;
    return Math.round((completed / Object.keys(completionStatus).length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-800">
            Requirements Capture Progress
          </Typography>
          <Typography variant="body2" className="text-blue-600 font-semibold">
            {getCompletionPercentage()}% Complete
          </Typography>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
      </div>

      {/* Part Marking Requirements */}
      <Accordion 
        title={
          <div className="flex items-center justify-between w-full">
            <span>Part Marking & Engraving</span>
            {completionStatus.partMarking && (
              <span className="text-green-600 text-sm mr-2">✓ Complete</span>
            )}
          </div>
        }
        defaultOpen={mode === 'engineering'}
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm">
            <Typography variant="body2" className="font-semibold text-amber-800 mb-1">
              Why this matters:
            </Typography>
            <Typography variant="caption" className="text-amber-700">
              21 supplier questions in May were about part marking. Clear specifications prevent delays.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marking Content (per line)
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Line 1: PART-123&#10;Line 2: REV A&#10;Line 3: 2024-01"
                value={requirements.partMarking.content.join('\n')}
                onChange={(e) => updateRequirement('partMarking', { 
                  content: e.target.value.split('\n').filter(Boolean) 
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marking Process
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={requirements.partMarking.process || ''}
                onChange={(e) => updateRequirement('partMarking', { process: e.target.value })}
              >
                <option value="">Select process...</option>
                <option value="laser">Laser Marking</option>
                <option value="cnc">CNC Engraving</option>
                <option value="pad-print">Pad Printing</option>
                <option value="other">Other (specify in notes)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Character Height/Depth
              </label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Height (e.g., 3mm)"
                  value={requirements.partMarking.characterHeight || ''}
                  onChange={(e) => updateRequirement('partMarking', { characterHeight: e.target.value })}
                />
                <input 
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Depth (e.g., 0.1mm)"
                  value={requirements.partMarking.characterDepth || ''}
                  onChange={(e) => updateRequirement('partMarking', { characterDepth: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                When to Apply Marking
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={requirements.partMarking.timing || ''}
                onChange={(e) => updateRequirement('partMarking', { timing: e.target.value })}
              >
                <option value="">Select timing...</option>
                <option value="before-finishing">Before Finishing</option>
                <option value="after-finishing">After Finishing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marking Location
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <Typography variant="body2" className="mt-2 text-gray-600">
                Upload DXF or annotated 3D model showing marking location
              </Typography>
              <Button
                buttonType="outline"
                colorVariant="blue"
                size="s"
                className="mt-2"
              >
                Choose File
              </Button>
            </div>
          </div>
        </div>
      </Accordion>

      {/* Thread Specifications */}
      <Accordion 
        title={
          <div className="flex items-center justify-between w-full">
            <span>Thread Specifications</span>
            {completionStatus.threads && (
              <span className="text-green-600 text-sm mr-2">✓ Complete</span>
            )}
          </div>
        }
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm">
            <Typography variant="body2" className="font-semibold text-amber-800 mb-1">
              Why this matters:
            </Typography>
            <Typography variant="caption" className="text-amber-700">
              17 supplier questions were about threads. Specify every hole to avoid confusion.
            </Typography>
          </div>

          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => {
              const newSpec = {
                holeId: `hole-${requirements.threads.specifications.length + 1}`,
                standard: 'metric' as const,
                handedness: 'right' as const
              };
              updateRequirement('threads', {
                specifications: [...requirements.threads.specifications, newSpec]
              });
            }}
          >
            + Add Thread Specification
          </Button>

          {requirements.threads.specifications.map((spec, index) => (
            <div key={spec.holeId} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Typography variant="subtitle2" className="font-semibold">
                  Hole {index + 1}
                </Typography>
                <button
                  className="text-red-600 hover:text-red-700 text-sm"
                  onClick={() => {
                    updateRequirement('threads', {
                      specifications: requirements.threads.specifications.filter((_, i) => i !== index)
                    });
                  }}
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Thread Standard
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    value={spec.standard}
                    onChange={(e) => {
                      const updated = [...requirements.threads.specifications];
                      updated[index] = { ...spec, standard: e.target.value as any };
                      updateRequirement('threads', { specifications: updated });
                    }}
                  >
                    <option value="metric">Metric</option>
                    <option value="unc">UNC</option>
                    <option value="npt">NPT</option>
                    <option value="none">No Thread (Ø only)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {spec.standard !== 'none' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Size & Pitch
                      </label>
                      <input 
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="e.g., M6x1.0"
                        value={spec.size || ''}
                        onChange={(e) => {
                          const updated = [...requirements.threads.specifications];
                          updated[index] = { ...spec, size: e.target.value };
                          updateRequirement('threads', { specifications: updated });
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Min. Full Thread Depth
                      </label>
                      <input 
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="e.g., 12mm"
                        value={spec.fullThreadDepth || ''}
                        onChange={(e) => {
                          const updated = [...requirements.threads.specifications];
                          updated[index] = { ...spec, fullThreadDepth: e.target.value };
                          updateRequirement('threads', { specifications: updated });
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Surface Finish */}
      <Accordion 
        title={
          <div className="flex items-center justify-between w-full">
            <span>Surface Finish & Cosmetics</span>
            {completionStatus.finish && (
              <span className="text-green-600 text-sm mr-2">✓ Complete</span>
            )}
          </div>
        }
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm">
            <Typography variant="body2" className="font-semibold text-amber-800 mb-1">
              Why this matters:
            </Typography>
            <Typography variant="caption" className="text-amber-700">
              20 supplier questions were about finish specifications and cosmetic requirements.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Finish Process
              </label>
              <input 
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Type II Anodize, Clear"
                value={requirements.finish.process}
                onChange={(e) => updateRequirement('finish', { process: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Film Thickness / Ra Target
              </label>
              <input 
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 25μm or Ra 0.8"
                value={requirements.finish.filmThickness || ''}
                onChange={(e) => updateRequirement('finish', { filmThickness: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Masking Requirements
            </label>
            <Typography variant="caption" className="text-gray-600 mb-2">
              Specify which areas must remain finish-free
            </Typography>
            <Button
              buttonType="outline"
              colorVariant="blue"
              size="s"
              onClick={() => {
                updateRequirement('finish', {
                  maskingRequired: [...requirements.finish.maskingRequired, { area: '', reason: '' }]
                });
              }}
            >
              + Add Masking Area
            </Button>
          </div>

          {/* Cosmetic Requirements */}
          <div className="border-t pt-4">
            <Typography variant="subtitle2" className="font-semibold mb-3">
              Cosmetic Acceptance Criteria
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Max Scratch Length
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., 10mm"
                  value={requirements.cosmetics.maxScratchLength || ''}
                  onChange={(e) => updateRequirement('cosmetics', { maxScratchLength: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Viewing Distance
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., 1 meter"
                  value={requirements.cosmetics.viewingDistance || ''}
                  onChange={(e) => updateRequirement('cosmetics', { viewingDistance: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          buttonType="outline"
          colorVariant="grey"
          size="m"
        >
          Save as Draft
        </Button>
        <Button
          buttonType="default"
          colorVariant="blue"
          size="m"
          onClick={() => onSave(requirements)}
        >
          {mode === 'sales' ? 'Submit for Review' : 'Confirm Requirements'}
        </Button>
      </div>
    </div>
  );
} 