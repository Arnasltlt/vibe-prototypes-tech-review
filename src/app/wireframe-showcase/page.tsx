'use client';

import React from 'react';
import { 
  // Layout components
  Container, Section, Grid, Flex, Stack, HeaderLayout, SidebarLayout,
  
  // Content components
  Text, Placeholder, Skeleton, Avatar, ImagePlaceholder, Metric, DataList,
  
  // Navigation components
  NavBar, Tabs, Breadcrumbs, Pagination, Menu, Steps,
  
  // Form components
  Form, FormField, Input, Textarea, Select, Checkbox, RadioGroup, Switch, SearchInput,
  
  // Data display components
  Table, List, Stats, Badge, Progress, EmptyState,
  
  // Fake data utilities
  fakeText, fakeUser, fakeNumber, fakeDate, fakeList
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';

export default function WireframeShowcase() {
  const [activeTab, setActiveTab] = React.useState('layout');
  
  const showcaseTabs = [
    { id: 'layout', label: 'Layout' },
    { id: 'content', label: 'Content' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'forms', label: 'Forms' },
    { id: 'data', label: 'Data Display' },
  ];
  
  const fakeTableData = fakeList.items(5);
  const fakeListItems = fakeList.generate(() => ({
    id: Math.random(),
    primary: fakeText.sentence(4),
    secondary: fakeText.sentence(8),
    meta: fakeDate.formatted(),
    avatar: <Avatar fake size="sm" />,
    actions: <Button size="s" buttonType="text-action" colorVariant="purple">View</Button>
  }), 5);
  
  const fakeStats = [
    { label: 'Total Revenue', value: fakeNumber.currency(10000, 50000), change: '+12%', changeType: 'increase' as const },
    { label: 'Active Users', value: fakeNumber.integer(1000, 5000), change: '+5%', changeType: 'increase' as const },
    { label: 'Conversion Rate', value: fakeNumber.percentage(), change: '-2%', changeType: 'decrease' as const },
    { label: 'Avg Order Value', value: fakeNumber.currency(50, 200), change: '0%', changeType: 'neutral' as const },
  ];
  
  return (
    <HeaderLayout
      header={
        <Container className="h-full flex items-center">
          <Text variant="h4">Wireframe Component Showcase</Text>
        </Container>
      }
    >
      <Section spacing="lg">
        <Container>
          <Tabs tabs={showcaseTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </Container>
      </Section>
      
      {activeTab === 'layout' && (
        <Section spacing="xl">
          <Container>
            <Stack spacing="xl">
              {/* Grid Demo */}
              <div>
                <Text variant="h5" className="mb-4">Grid Layout</Text>
                <Grid cols={3} gap="md">
                  <div className="bg-gray-100 p-4 rounded">Column 1</div>
                  <div className="bg-gray-100 p-4 rounded">Column 2</div>
                  <div className="bg-gray-100 p-4 rounded">Column 3</div>
                </Grid>
              </div>
              
              {/* Flex Demo */}
              <div>
                <Text variant="h5" className="mb-4">Flex Layout</Text>
                <Flex gap="md" align="center">
                  <div className="bg-gray-100 p-4 rounded flex-1">Flex Item 1</div>
                  <div className="bg-gray-100 p-4 rounded flex-1">Flex Item 2</div>
                  <div className="bg-gray-100 p-4 rounded flex-1">Flex Item 3</div>
                </Flex>
              </div>
              
              {/* Section Demo */}
              <div>
                <Text variant="h5" className="mb-4">Sections</Text>
                <Stack>
                  <Section background="gray" spacing="md" border="both">
                    <Text>Gray section with borders</Text>
                  </Section>
                  <Section background="primary" spacing="md">
                    <Text>Primary colored section</Text>
                  </Section>
                  <Section background="gradient" spacing="md">
                    <Text>Gradient section</Text>
                  </Section>
                </Stack>
              </div>
            </Stack>
          </Container>
        </Section>
      )}
      
      {activeTab === 'content' && (
        <Section spacing="xl">
          <Container>
            <Stack spacing="xl">
              {/* Typography */}
              <div>
                <Text variant="h5" className="mb-4">Typography</Text>
                <Stack spacing="sm">
                  <Text variant="h1" fake="title" />
                  <Text variant="h2" fake="heading" />
                  <Text variant="h3">Heading 3</Text>
                  <Text variant="body" fake="paragraph" />
                  <Text variant="small" color="muted" fake="sentence" />
                  <Text variant="caption" fake="sentence" fakeLength={5} />
                </Stack>
              </div>
              
              {/* Placeholders */}
              <div>
                <Text variant="h5" className="mb-4">Placeholders & Skeletons</Text>
                <Stack spacing="md">
                  <Skeleton lines={3} showAvatar showImage />
                  <Grid cols={3} gap="md">
                    <Placeholder type="heading" width="full" />
                    <Placeholder type="text" width="full" />
                    <Placeholder type="button" />
                  </Grid>
                </Stack>
              </div>
              
              {/* Avatars & Images */}
              <div>
                <Text variant="h5" className="mb-4">Avatars & Images</Text>
                <Stack spacing="md">
                  <Flex gap="md" align="center">
                    <Avatar fake size="xs" />
                    <Avatar fake size="sm" />
                    <Avatar fake size="md" />
                    <Avatar fake size="lg" />
                    <Avatar fake size="xl" />
                  </Flex>
                  <Grid cols={3} gap="md">
                    <ImagePlaceholder fake ratio="square" />
                    <ImagePlaceholder fake ratio="video" />
                    <ImagePlaceholder fake ratio="portrait" />
                  </Grid>
                </Stack>
              </div>
              
              {/* Metrics */}
              <div>
                <Text variant="h5" className="mb-4">Metrics</Text>
                <Grid cols={4} gap="md">
                  <Metric label="Revenue" fake />
                  <Metric label="Users" value="1,234" change="+12%" changeType="increase" />
                  <Metric label="Conversion" value="45.6%" change="-3%" changeType="decrease" />
                  <Metric label="Orders" value="567" change="0%" changeType="neutral" />
                </Grid>
              </div>
            </Stack>
          </Container>
        </Section>
      )}
      
      {activeTab === 'navigation' && (
        <Section spacing="xl">
          <Container>
            <Stack spacing="xl">
              {/* Navigation Bar */}
              <div>
                <Text variant="h5" className="mb-4">Navigation Bar</Text>
                <Stack spacing="md">
                  <NavBar fake items={[]} variant="default" />
                  <NavBar fake items={[]} variant="pills" />
                  <NavBar fake items={[]} variant="underline" />
                </Stack>
              </div>
              
              {/* Breadcrumbs */}
              <div>
                <Text variant="h5" className="mb-4">Breadcrumbs</Text>
                <Breadcrumbs 
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Electronics', href: '#' },
                    { label: 'Laptops' }
                  ]} 
                />
              </div>
              
              {/* Pagination */}
              <div>
                <Text variant="h5" className="mb-4">Pagination</Text>
                <Pagination currentPage={3} totalPages={10} />
              </div>
              
              {/* Steps */}
              <div>
                <Text variant="h5" className="mb-4">Steps</Text>
                <Steps 
                  steps={[
                    { id: '1', label: 'Account Details', completed: true },
                    { id: '2', label: 'Shipping Info', active: true },
                    { id: '3', label: 'Payment' },
                    { id: '4', label: 'Review' }
                  ]} 
                />
              </div>
              
              {/* Menu */}
              <div>
                <Text variant="h5" className="mb-4">Dropdown Menu</Text>
                <Menu 
                  trigger={<Button>Open Menu</Button>}
                  items={[
                    { label: 'Edit', onClick: () => {} },
                    { label: 'Duplicate', onClick: () => {} },
                    { divider: true },
                    { label: 'Delete', onClick: () => {} }
                  ]}
                />
              </div>
            </Stack>
          </Container>
        </Section>
      )}
      
      {activeTab === 'forms' && (
        <Section spacing="xl">
          <Container>
            <Grid cols={2} gap="xl">
              <Form title="Contact Form" description="Fill out the form below to get in touch">
                <FormField label="Name" required>
                  <Input fake placeholder="Enter your name" />
                </FormField>
                
                <FormField label="Email" required error="Please enter a valid email">
                  <Input type="email" placeholder="email@example.com" />
                </FormField>
                
                <FormField label="Subject">
                  <Select 
                    options={[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'support', label: 'Technical Support' },
                      { value: 'sales', label: 'Sales Question' }
                    ]}
                    placeholder="Select a subject"
                  />
                </FormField>
                
                <FormField label="Message" helper="Max 500 characters">
                  <Textarea fake rows={4} />
                </FormField>
                
                <FormField label="Priority">
                  <RadioGroup
                    name="priority"
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ]}
                    value="medium"
                  />
                </FormField>
                
                <Checkbox label="I agree to the terms and conditions" />
                
                <Switch label="Send me email notifications" />
                
                <Button colorVariant="purple">Submit Form</Button>
              </Form>
              
              <Stack spacing="lg">
                <div>
                  <Text variant="h6" className="mb-4">Search Input</Text>
                  <SearchInput placeholder="Search for anything..." />
                </div>
                
                <div>
                  <Text variant="h6" className="mb-4">Input Sizes</Text>
                  <Stack spacing="sm">
                    <Input size="sm" placeholder="Small input" />
                    <Input size="md" placeholder="Medium input" />
                    <Input size="lg" placeholder="Large input" />
                  </Stack>
                </div>
                
                <div>
                  <Text variant="h6" className="mb-4">Input States</Text>
                  <Stack spacing="sm">
                    <Input placeholder="Default input" />
                    <Input variant="success" placeholder="Success state" />
                    <Input variant="error" placeholder="Error state" />
                  </Stack>
                </div>
              </Stack>
            </Grid>
          </Container>
        </Section>
      )}
      
      {activeTab === 'data' && (
        <Section spacing="xl">
          <Container>
            <Stack spacing="xl">
              {/* Stats */}
              <div>
                <Text variant="h5" className="mb-4">Stats Grid</Text>
                <Stats items={fakeStats} columns={4} />
              </div>
              
              {/* Table */}
              <div>
                <Text variant="h5" className="mb-4">Data Table</Text>
                <Table
                  columns={[
                    { key: 'title', header: 'Title' },
                    { key: 'status', header: 'Status', render: (value) => <Badge variant="primary">{value}</Badge> },
                    { key: 'date', header: 'Date' },
                    { key: 'value', header: 'Value', align: 'right' }
                  ]}
                  data={fakeTableData}
                  striped
                  hover
                />
              </div>
              
              {/* List */}
              <div>
                <Text variant="h5" className="mb-4">List Component</Text>
                <List items={fakeListItems} variant="bordered" />
              </div>
              
              {/* Badges */}
              <div>
                <Text variant="h5" className="mb-4">Badges</Text>
                <Flex gap="sm" wrap="wrap">
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="purple" dot>With Dot</Badge>
                </Flex>
              </div>
              
              {/* Progress */}
              <div>
                <Text variant="h5" className="mb-4">Progress Bars</Text>
                <Stack spacing="md">
                  <Progress value={25} label="Project Progress" showValue />
                  <Progress value={60} variant="success" label="Completed" showValue />
                  <Progress value={80} variant="warning" size="lg" />
                  <Progress value={95} variant="danger" size="sm" />
                </Stack>
              </div>
              
              {/* Empty State */}
              <div>
                <Text variant="h5" className="mb-4">Empty State</Text>
                <div className="border border-gray-200 rounded-lg p-8">
                  <EmptyState
                    icon={
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    title="No documents found"
                    description="Get started by creating your first document"
                    action={<Button colorVariant="purple">Create Document</Button>}
                  />
                </div>
              </div>
            </Stack>
          </Container>
        </Section>
      )}
    </HeaderLayout>
  );
}