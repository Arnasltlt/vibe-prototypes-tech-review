'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  // Layout
  SidebarLayout, Container, Section, Grid, Flex, Stack,
  // Content
  Text, Badge, Avatar, Metric, ImagePlaceholder,
  // Navigation
  NavBar, Tabs, Steps,
  // Forms
  Form, FormField, Input, Textarea, Select, Switch,
  // Data Display
  Table, List, Stats,
  // Feedback
  Alert, Modal, Menu,
  // Fake data
  fakeText, fakeNumber, fakeUser, fakeStatus
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function ExampleQuoteV2Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedTab, setSelectedTab] = useState('quotes');
  const [workflowStatus, setWorkflowStatus] = useState('none');
  const [versionActionsOpen, setVersionActionsOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState('');
  
  useEffect(() => {
    const statusFromUrl = searchParams?.get('status');
    if (statusFromUrl) {
      localStorage.setItem('quoteWorkflowStatus', statusFromUrl);
      setWorkflowStatus(statusFromUrl);
      window.history.replaceState({}, '', '/example-quote-v2');
    } else {
      const localStatus = localStorage.getItem('quoteWorkflowStatus');
      if (localStatus) {
        setWorkflowStatus(localStatus);
      }
    }
  }, [searchParams]);
  
  const tabs = [
    { id: 'quotes', label: 'Quotes' },
    { id: 'sourcing', label: 'Sourcing' },
    { id: 'purchase', label: 'Purchase orders' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'quality', label: 'Quality Control' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'complaints', label: 'Complaints' },
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
          { label: 'RFQ manager', href: '#', icon: '📦' },
          { label: 'Scans', href: '#', icon: '📄' },
          { label: 'Orders', href: '/orders', icon: '📦' },
          { label: 'Example Quote', href: '/example-quote-v2', icon: '📋', active: true },
        ]}
        variant="pills"
      />
    </Stack>
  );

  const workflowSteps = [
    { 
      id: '1', 
      label: 'Technical Review', 
      completed: ['technical-review-completed', 'rfq-sent', 'production'].includes(workflowStatus),
      active: workflowStatus === 'technical-review-requested'
    },
    { 
      id: '2', 
      label: 'Supplier RFQs', 
      completed: ['rfq-sent', 'production'].includes(workflowStatus),
      active: false 
    },
    { 
      id: '3', 
      label: 'Production', 
      completed: workflowStatus === 'production',
      active: false 
    }
  ];

  const lineItems = [
    {
      id: 1,
      partNumber: '4012633_AB.stp',
      material: 'AL 7075-T6',
      finish: 'Anodized type II',
      quantity: 100,
      unitPrice: '$524.35',
      total: '$52,435.00',
      status: 'Manually priced'
    },
    {
      id: 2,
      partNumber: 'M10000145.stp',
      material: 'SS 316L',
      finish: 'Passivated',
      quantity: 250,
      unitPrice: '$167.12',
      total: '$41,780.00',
      status: 'Auto-priced'
    },
    {
      id: 3,
      partNumber: 'BRACKET_001.stp',
      material: 'AL 6061-T6',
      finish: 'As machined',
      quantity: 500,
      unitPrice: '$45.89',
      total: '$22,945.00',
      status: 'Auto-priced'
    }
  ];

  const menuItems = [
    { label: 'Notify customer', onClick: () => {} },
    { label: 'Duplicate', onClick: () => {} },
    { label: 'New deal from quote', onClick: () => {} },
    { label: 'Send RFQ', onClick: () => router.push('/orders/send-rfq') },
    { label: 'Set up production', onClick: () => router.push('/orders/new') },
    { 
      label: 'Request technical review', 
      onClick: () => {
        router.push('/orders/technical-review');
        localStorage.setItem('quoteWorkflowStatus', 'technical-review-requested');
      }
    },
    { divider: true },
    { label: 'Archive', onClick: () => {} },
    { label: 'Split order', onClick: () => {} }
  ];

  return (
    <SidebarLayout
      sidebar={<div className="bg-[#171717] h-full">{sidebarContent}</div>}
      sidebarWidth="md"
    >
      {/* Info Banner */}
      <Alert
        variant="info"
        title="Welcome to the new Quote Builder!"
        className="rounded-none border-0 border-b"
      >
        You can return to the old Quote Builder via the Order actions menu.
      </Alert>
      
      {/* Order Header */}
      <Section background="white" spacing="md" border="bottom">
        <Container>
          <Stack spacing="md">
            <Flex align="center" gap="md">
              <Text variant="h4">Order:</Text>
              <Text variant="h4" className="font-bold">3DZF983L7</Text>
              <Badge variant="default">Submitted</Badge>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <span>HubSpot</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </Flex>
            
            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={selectedTab}
              onTabChange={setSelectedTab}
              variant="underline"
            />
          </Stack>
        </Container>
      </Section>
      
      {/* Main Content */}
      <Section spacing="lg">
        <Container>
          <Stack spacing="lg">
            {/* Page Header */}
            <Flex justify="between" align="center">
              <Text variant="h2">Quotes</Text>
              <Menu
                trigger={
                  <Button buttonType="outline" colorVariant="grey">
                    Order actions ▼
                  </Button>
                }
                items={menuItems}
              />
            </Flex>
            
            {/* Customer Info */}
            <Grid cols={2} gap="lg">
              <div>
                <Text variant="label" className="mb-2">Customer account</Text>
                <Flex align="center" gap="sm">
                  <Text variant="body">{fakeUser.email()}</Text>
                  <Button size="s" buttonType="text-action" colorVariant="grey">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Button>
                </Flex>
              </div>
              
              <div>
                <Text variant="label" className="mb-2">Technical contact</Text>
                <Flex align="center" gap="sm">
                  <Text variant="body">{fakeUser.email()}</Text>
                  <Button size="s" buttonType="text-action" colorVariant="blue">
                    Edit
                  </Button>
                </Flex>
              </div>
            </Grid>
            
            {/* Quote Warning */}
            <Alert variant="warning">
              Please note: This order will be routed through our warehouse. Please adjust lead time accordingly.
            </Alert>
            
            {/* Version Info */}
            <Card>
              <Flex justify="between" align="center" className="p-4">
                <Flex align="center" gap="md">
                  <Text variant="h4" className="font-semibold">V1</Text>
                  <Text variant="body" className="font-medium">3DZF983L7-V1</Text>
                  <Badge variant="info">🔒</Badge>
                  <Flex align="center" gap="sm">
                    <Text variant="small">Auto update price:</Text>
                    <Switch />
                  </Flex>
                </Flex>
                
                <Flex align="center" gap="md">
                  <div className="text-right">
                    <Text variant="small" color="muted">Total:</Text>
                    <Text variant="h3" className="font-bold">{fakeNumber.currency(100000, 500000)}</Text>
                  </div>
                  
                  <Flex gap="sm">
                    <Menu
                      trigger={
                        <Button buttonType="outline" colorVariant="grey">
                          Version actions ▼
                        </Button>
                      }
                      items={menuItems}
                      open={versionActionsOpen}
                      onOpenChange={setVersionActionsOpen}
                    />
                    <Button buttonType="default" colorVariant="blue">
                      Lock quote
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            
            {/* Workflow Status */}
            {workflowStatus !== 'none' && (
              <Card>
                <div className="p-4">
                  <Text variant="h5" className="mb-4">Order Workflow Status</Text>
                  <Steps steps={workflowSteps} orientation="horizontal" />
                </div>
              </Card>
            )}
            
            {/* Line Items Table */}
            <div>
              <Text variant="h4" className="mb-4">Line Items</Text>
              <Table
                columns={[
                  { key: 'partNumber', header: 'Part Number' },
                  { key: 'material', header: 'Material' },
                  { key: 'finish', header: 'Finish' },
                  { key: 'quantity', header: 'Quantity', align: 'right' },
                  { key: 'unitPrice', header: 'Unit Price', align: 'right' },
                  { key: 'total', header: 'Total', align: 'right' },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (value) => (
                      <Badge variant={value === 'Manually priced' ? 'warning' : 'success'}>
                        {value}
                      </Badge>
                    )
                  }
                ]}
                data={lineItems}
                hover
                striped
              />
            </div>
            
            {/* Add Note Button */}
            <div>
              <Button
                buttonType="outline"
                colorVariant="grey"
                onClick={() => setIsNoteModalOpen(true)}
              >
                + Add preliminary ME note
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>
      
      {/* Note Modal */}
      <Modal
        open={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title="Add Preliminary ME Note"
        footer={
          <Flex justify="end" gap="sm">
            <Button
              buttonType="outline"
              colorVariant="grey"
              onClick={() => setIsNoteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              buttonType="default"
              colorVariant="blue"
              onClick={() => {
                // Save note logic here
                setIsNoteModalOpen(false);
                setCurrentNoteText('');
              }}
            >
              Save Note
            </Button>
          </Flex>
        }
      >
        <Textarea
          label="Note"
          value={currentNoteText}
          onChange={(e) => setCurrentNoteText(e.target.value)}
          rows={4}
          placeholder="Enter your note here..."
        />
      </Modal>
    </SidebarLayout>
  );
}