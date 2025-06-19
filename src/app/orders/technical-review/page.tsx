'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  // Layout
  SidebarLayout, Container, Stack, Section, Grid, Flex,
  // Content
  Text, Badge, Avatar,
  // Navigation
  NavBar,
  // Forms
  Form, FormField, Checkbox, RadioGroup, Select, Textarea, Input,
  // Data Display
  List,
  // Fake data
  fakeText, fakeNumber
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';
import LineItemsSidePanel, { LineItem } from '@/components/LineItemsSidePanel';

// Define types for our form state
interface TechnicalReviewFormState {
  reasons: Record<string, boolean>;
  priority: string;
  htsCodes: string;
  descriptionOfParts: string;
  customRequestDetails: string;
  quoteVersionNumbers: string;
  previousReviewChanges: string;
  reorderPreviousDealLink: string;
  reorderType: string;
  ignorableDrawingNotes: string;
  purchaseIntent: string;
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

  const handleInputChange = (field: string, value: string) => {
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
        <Stack spacing="xs">
          <Text variant="small" color="muted">CNC machining</Text>
          <Text variant="small" color="muted">AL 7075-T6</Text>
          <Text variant="small" color="muted">As machined + Anodized type II</Text>
          <Text variant="small" color="muted">No part markings</Text>
          <Text variant="small" color="muted">General tolerance: ISO 2768 Medium</Text>
          <Text variant="small" color="muted">No tighter tolerances</Text>
          <Text variant="small" color="muted">Sharp internal corners rounded to 2 mm</Text>
          <Text variant="small" color="muted">No engineering fits</Text>
          <Text variant="small" color="muted">No threads</Text>
        </Stack>
      ),
    },
    {
      id: 2,
      name: 'M10000145.stp',
      thumbnailUrl: '/metal-part.png',
      price: '—',
      extraDetails: (
        <Stack spacing="xs">
          <Text variant="small" color="muted">CNC machining</Text>
          <Text variant="small" color="muted">AL 7075-T6</Text>
          <Text variant="small" color="muted">As machined + Anodized type II</Text>
          <Text variant="small" color="muted">No part markings</Text>
          <Text variant="small" color="muted">General tolerance: ISO 2768 Medium</Text>
          <Text variant="small" color="muted">No tighter tolerances</Text>
          <Text variant="small" color="muted">Sharp internal corners rounded to 2 mm</Text>
          <Text variant="small" color="muted">No engineering fits</Text>
          <Text variant="small" color="muted">No threads</Text>
        </Stack>
      ),
    },
    {
      id: 3,
      name: 'Batch shipping: Required',
      thumbnailUrl: undefined,
      price: undefined,
      extraDetails: (
        <Flex gap="sm" align="center">
          <div className="bg-blue-50 p-2 rounded">
            <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
          </div>
          <Text variant="body" className="font-medium">Batch shipping: Required</Text>
        </Flex>
      ),
    },
    {
      id: 4,
      name: 'Material Test Report - Aluminium',
      thumbnailUrl: undefined,
      price: undefined,
      extraDetails: (
        <Flex gap="sm" align="center">
          <div className="bg-purple-50 p-2 rounded">
            <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <Text variant="body" className="font-medium">Material Test Report - Aluminium</Text>
        </Flex>
      ),
    },
  ];

  const reasonsForReview = [
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

  const sidebarContent = (
    <Stack spacing="lg" className="p-4">
      <div>
        <Flex align="center" gap="sm">
          <svg className="h-8 w-8" viewBox="0 0 60 60" fill="white">
            <path d="M30 0L0 17.32v34.64L30 60l30-17.32V17.32L30 0zm20 46.19L30 57.96 10 46.19V22.64L30 10.87l20 11.77v23.55z" />
            <path d="M30 16.47L15 25.02v17.11l15 8.55 15-8.55V25.02L30 16.47z" />
          </svg>
          <div>
            <Text variant="body" className="font-bold text-white leading-none">PROTOLABS</Text>
            <Text variant="body" className="font-bold text-white leading-none">NETWORK</Text>
          </div>
        </Flex>
      </div>
      
      <NavBar
        orientation="vertical"
        items={[
          { label: 'Marvin', href: '#', icon: '👤' },
          { label: 'Messages', href: '#', icon: '💬' },
          { label: 'RDA manager', href: '#', icon: '💰' },
          { label: 'Scans', href: '#', icon: '📄' },
          { label: 'Orders', href: '/orders', icon: '📦' },
          { label: 'Technical Review', href: '/orders/technical-review', icon: '📋', active: true },
        ]}
        variant="pills"
      />
    </Stack>
  );

  const handleSubmitReview = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('quoteWorkflowStatus', 'technical-review-requested');
    router.push('/example-quote?status=technical-review-requested');
  };

  return (
    <SidebarLayout
      sidebar={<div className="bg-[#171717] h-full">{sidebarContent}</div>}
      sidebarWidth="md"
    >
      <div className="flex">
        <LineItemsSidePanel title="Quote overview" items={lineItems} />
        <div className="flex-1 p-6">
          <Container>
            <Flex justify="between" align="center" className="mb-6">
              <Text variant="h2">Request Technical Review</Text>
              <Text variant="caption" color="muted">V31 2G46V4WXX-V31</Text>
            </Flex>

            <Form>
              <Stack spacing="lg">
                {/* Reasons for Review */}
                <FormField label="Select one or more reasons">
                  <Grid cols={2} gap="md">
                    {reasonsForReview.map((reason) => (
                      <Checkbox
                        key={reason.id}
                        label={reason.label}
                        checked={formState.reasons[reason.id as keyof typeof formState.reasons]}
                        onChange={() => handleCheckboxChange(reason.id as keyof typeof formState.reasons)}
                      />
                    ))}
                  </Grid>
                </FormField>

                {/* Priority */}
                <FormField label="Priority to quote">
                  <RadioGroup
                    name="priority"
                    options={[
                      { value: 'Low', label: 'Low' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'High', label: 'High' }
                    ]}
                    value={formState.priority}
                    onChange={(value) => handleInputChange('priority', value)}
                    orientation="horizontal"
                  />
                </FormField>

                {/* Description Fields */}
                <FormField label="Description">
                  <Stack spacing="md">
                    <Input
                      label="HTS Codes (customer-provided, line items w/ quantity 50+)"
                      value={formState.htsCodes}
                      onChange={(e) => handleInputChange('htsCodes', e.target.value)}
                    />

                    <Textarea
                      label="Description/Use of Parts:"
                      value={formState.descriptionOfParts}
                      onChange={(e) => handleInputChange('descriptionOfParts', e.target.value)}
                      rows={3}
                    />

                    <Textarea
                      label="Custom request (Provide requirement details):"
                      value={formState.customRequestDetails}
                      onChange={(e) => handleInputChange('customRequestDetails', e.target.value)}
                      rows={3}
                    />

                    <Input
                      label="Quote version number(s):"
                      value={formState.quoteVersionNumbers}
                      onChange={(e) => handleInputChange('quoteVersionNumbers', e.target.value)}
                    />

                    <Textarea
                      label="If previously reviewed, what changed?"
                      value={formState.previousReviewChanges}
                      onChange={(e) => handleInputChange('previousReviewChanges', e.target.value)}
                      rows={3}
                    />

                    <div>
                      <Input
                        label="Reorder (Previous deal link), prototyping, or production?"
                        placeholder="Previous deal link..."
                        value={formState.reorderPreviousDealLink}
                        onChange={(e) => handleInputChange('reorderPreviousDealLink', e.target.value)}
                      />
                      <RadioGroup
                        name="reorderType"
                        options={[
                          { value: 'Prototyping', label: 'Prototyping' },
                          { value: 'Production', label: 'Production' }
                        ]}
                        value={formState.reorderType}
                        onChange={(value) => handleInputChange('reorderType', value)}
                        orientation="horizontal"
                        className="mt-2"
                      />
                    </div>

                    <Textarea
                      label="From the drawing notes or call-outs, which ones can be ignored? (If 'None', the quote must match the TD)"
                      value={formState.ignorableDrawingNotes}
                      onChange={(e) => handleInputChange('ignorableDrawingNotes', e.target.value)}
                      rows={3}
                    />

                    <Select
                      label="Purchase intent? (Budgetary/Unknown/High/Low)"
                      options={[
                        { value: '', label: 'Select intent...' },
                        { value: 'Budgetary', label: 'Budgetary' },
                        { value: 'Unknown', label: 'Unknown' },
                        { value: 'High', label: 'High' },
                        { value: 'Low', label: 'Low' }
                      ]}
                      value={formState.purchaseIntent}
                      onChange={(e) => handleInputChange('purchaseIntent', e.target.value)}
                    />
                  </Stack>
                </FormField>

                {/* Actions */}
                <Flex justify="end" gap="sm" className="pt-4 border-t">
                  <Button
                    buttonType="outline"
                    colorVariant="grey"
                    size="m"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>

                  <Button
                    buttonType="default"
                    colorVariant="blue"
                    size="m"
                    onClick={handleSubmitReview}
                  >
                    Submit review
                  </Button>
                </Flex>
              </Stack>
            </Form>
          </Container>
        </div>
      </div>
    </SidebarLayout>
  );
} 