'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  // Layout
  SidebarLayout, Container, Stack, Section, Grid, Flex,
  // Content
  Text, Badge, Avatar, ImagePlaceholder,
  // Navigation
  NavBar, Steps,
  // Forms
  Form, FormField, Textarea,
  // Data Display
  List,
  // Feedback
  Alert,
  // Fake data
  fakeText
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { SupplierSelection } from '@/app/components/suppliers/SupplierSelection';

export default function SendRFQPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSection, setExpandedSection] = useState('general');
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  const [formData, setFormData] = useState({
    generalInfo: '',
    projectDescription: '',
    geometry: '',
    material: '',
    volumes: '',
    tolerances: '',
    cosmetics: '',
    markings: '',
    delivery: '',
    quality: ''
  });
  
  const steps = [
    { id: '1', label: 'RFQ Details', active: currentStep === 1, completed: currentStep > 1 },
    { id: '2', label: 'Select Suppliers', active: currentStep === 2, completed: false }
  ];
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/orders');
  };

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
          { label: 'New Order', href: '/orders/new', icon: '📋', active: true },
        ]}
        variant="pills"
      />
    </Stack>
  );

  const quoteItems = [
    {
      id: 1,
      number: '1',
      title: '4012633_AB.stp',
      thumbnail: <ImagePlaceholder fake width={32} height={32} />,
      subtitle: '1 attachment in details',
      attachment: '4012633_ac_7f759.pdf',
      price: '€52435.00',
      priceLabel: 'Manually priced',
      details: [
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
      number: '2',
      title: 'M10000145.stp',
      thumbnail: <ImagePlaceholder fake width={32} height={32} />,
      price: '—',
      details: [
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
      id: 3,
      number: '3',
      title: 'Batch shipping: Required',
      icon: '🚚',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 4,
      number: '4',
      title: 'Material Test Report - Aluminium',
      icon: '📄',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const formSections = [
    { id: 'general', label: 'General information', field: 'generalInfo', placeholder: 'Enter general company and project information...' },
    { id: 'project', label: 'Project description', field: 'projectDescription', placeholder: 'Describe your project and requirements...' },
    { id: 'geometry', label: 'Geometry', field: 'geometry', placeholder: 'Describe any specific geometric considerations...' },
    { id: 'material', label: 'Material', field: 'material', placeholder: 'Describe material requirements and alternatives...' },
    { id: 'volumes', label: 'Volumes', field: 'volumes', placeholder: 'Specify production volumes and frequency...' },
    { id: 'tolerances', label: 'Tolerances', field: 'tolerances', placeholder: 'Specify required tolerances...' },
    { id: 'cosmetics', label: 'Cosmetics', field: 'cosmetics', placeholder: 'Describe cosmetic requirements...' },
    { id: 'markings', label: 'Markings', field: 'markings', placeholder: 'Specify any marking requirements...' },
    { id: 'delivery', label: 'Delivery', field: 'delivery', placeholder: 'Describe delivery requirements and timeline...' },
    { id: 'quality', label: 'Quality', field: 'quality', placeholder: 'Specify quality standards and requirements...' }
  ];

  return (
    <SidebarLayout
      sidebar={<div className="bg-[#171717] h-full">{sidebarContent}</div>}
      sidebarWidth="md"
    >
      <div className="flex h-full">
        {/* Quote Overview Panel - 40% width */}
        <div className="w-[40%] bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <Text variant="h5" className="mb-4">Quote overview</Text>
            
            <Flex align="center" className="mb-6">
              <input 
                type="checkbox" 
                id="expandAllDetailsPanel" 
                className="mr-2"
                checked={expandAllDetails}
                onChange={toggleAllDetails}
              />
              <label htmlFor="expandAllDetailsPanel" className="text-sm text-gray-600">
                Expand all details
              </label>
            </Flex>
            
            <Stack spacing="sm">
              {quoteItems.map((item) => (
                <Card
                  key={item.id}
                  className={`border ${
                    expandedItems.includes(item.id)
                      ? 'border-2 border-blue-500'
                      : 'border-gray-300'
                  } hover:border-blue-500 transition-colors`}
                >
                  <div className="p-4">
                    <Flex gap="sm" align="start">
                      <Badge variant="default" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">
                        {item.number}
                      </Badge>
                      
                      <div className="flex-1">
                        <Stack spacing="sm">
                          <Flex gap="sm" align="center">
                            {item.thumbnail && item.thumbnail}
                            {item.icon && (
                              <div className={`p-2 rounded ${item.iconBg}`}>
                                <span className={`text-lg ${item.iconColor}`}>{item.icon}</span>
                              </div>
                            )}
                            <Text variant="body" className="font-medium">{item.title}</Text>
                          </Flex>
                          
                          {item.subtitle && (
                            <Text variant="caption" color="muted">{item.subtitle}</Text>
                          )}
                          
                          {item.attachment && (
                            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center">
                              {item.attachment}
                              <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          
                          {item.price && (
                            <Flex justify="between" align="start">
                              <div />
                              <div className="text-right">
                                <Text variant="body" className="font-medium">{item.price}</Text>
                                {item.priceLabel && (
                                  <Text variant="small" color="primary">{item.priceLabel}</Text>
                                )}
                              </div>
                            </Flex>
                          )}
                          
                          {expandedItems.includes(item.id) && item.details && (
                            <Stack spacing="xs" className="mt-4">
                              {item.details.map((detail, idx) => (
                                <Text key={idx} variant="small" color="muted">{detail}</Text>
                              ))}
                            </Stack>
                          )}
                          
                          {item.details && (
                            <Flex gap="sm" className="mt-3">
                              <Button
                                size="s"
                                buttonType="default"
                                colorVariant="orange"
                                className="!bg-[#fff4eb] !text-[#c85c21] hover:!bg-orange-100"
                              >
                                View DFM analysis
                              </Button>
                              <Button
                                size="s"
                                buttonType="default"
                                colorVariant="grey"
                                onClick={() => toggleItemDetails(item.id)}
                              >
                                {expandedItems.includes(item.id) ? 'Hide details' : 'Show details'}
                              </Button>
                            </Flex>
                          )}
                        </Stack>
                      </div>
                    </Flex>
                  </div>
                </Card>
              ))}
            </Stack>
          </div>
        </div>

        {/* Main Content - 60% width */}
        <div className="w-[60%] bg-white overflow-y-auto">
          <Container className="py-6">
            <Stack spacing="lg">
              {/* Header */}
              <Flex justify="between" align="center">
                <Text variant="h3">RFQ bid</Text>
              </Flex>

              {/* Progress */}
              <Section background="gray" spacing="md" className="rounded-lg">
                <Steps steps={steps} orientation="horizontal" />
              </Section>

              {/* Step Content */}
              {currentStep === 1 ? (
                <Form>
                  <Stack spacing="md">
                    {formSections.map((section) => (
                      <Card key={section.id} className="overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                          onClick={() => toggleSection(section.id)}
                        >
                          <Text variant="h6">{section.label}</Text>
                          <Text variant="h5" color="primary">
                            {expandedSection === section.id ? '−' : '+'}
                          </Text>
                        </div>
                        {expandedSection === section.id && (
                          <div className="p-4 border-t border-gray-200">
                            <Textarea
                              value={formData[section.field as keyof typeof formData]}
                              onChange={(e) => handleInputChange(section.field, e.target.value)}
                              placeholder={section.placeholder}
                              rows={4}
                            />
                          </div>
                        )}
                      </Card>
                    ))}
                  </Stack>
                </Form>
              ) : (
                <div className="space-y-6">
                  <Alert variant="info">
                    Select suppliers to send your RFQ to. You can filter by capabilities, location, and more.
                  </Alert>
                  <SupplierSelection />
                </div>
              )}

              {/* Navigation Buttons */}
              <Flex justify="between" className="pt-4 border-t">
                <Button
                  buttonType="outline"
                  colorVariant="grey"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                
                <Flex gap="sm">
                  {currentStep > 1 && (
                    <Button
                      buttonType="outline"
                      colorVariant="grey"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  
                  {currentStep < 2 ? (
                    <Button
                      buttonType="default"
                      colorVariant="blue"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      buttonType="default"
                      colorVariant="blue"
                      onClick={handleSubmitRfq}
                    >
                      Send RFQ
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Stack>
          </Container>
        </div>
      </div>
    </SidebarLayout>
  );
} 