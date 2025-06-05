'use client';

import React from 'react';
import {
  // Layout
  HeaderLayout, Container, Grid, Stack, Section, Flex,
  // Content
  Text, Avatar, Badge, Metric, ImagePlaceholder, Progress,
  // Navigation
  NavBar, Tabs,
  // Data Display
  Table, Stats, List,
  // Forms
  SearchInput,
  // Utilities
  fakeNumber, fakeList, fakeText, fakeUser
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';

export default function ExampleDashboard() {
  // Generate fake data
  const stats = [
    { label: 'Total Revenue', value: fakeNumber.currency(50000, 100000), change: '+12.5%', changeType: 'increase' as const },
    { label: 'Active Users', value: fakeNumber.integer(5000, 10000).toLocaleString(), change: '+8.2%', changeType: 'increase' as const },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', changeType: 'decrease' as const },
    { label: 'Avg Session', value: '5m 23s', change: '+1.2%', changeType: 'increase' as const }
  ];

  const recentOrders = fakeList.generate(() => ({
    id: Math.random(),
    orderNumber: `#${fakeNumber.integer(10000, 99999)}`,
    customer: fakeUser.name(),
    date: new Date().toLocaleDateString(),
    status: ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
    amount: fakeNumber.currency(50, 500)
  }), 5);

  const teamMembers = fakeList.generate(() => ({
    id: Math.random(),
    primary: fakeUser.name(),
    secondary: fakeUser.role(),
    meta: 'Active',
    avatar: <Avatar fake size="sm" />
  }), 4);

  return (
    <HeaderLayout
      sticky
      header={
        <Container className="h-full">
          <Flex align="center" justify="between" className="h-full">
            <Text variant="h4">Dashboard</Text>
            <Flex gap="md" align="center">
              <SearchInput placeholder="Search..." />
              <Button colorVariant="purple">New Project</Button>
              <Avatar fake />
            </Flex>
          </Flex>
        </Container>
      }
    >
      <Section spacing="lg" background="gray">
        <Container>
          <NavBar
            items={[
              { label: 'Overview', href: '#', active: true },
              { label: 'Analytics', href: '#' },
              { label: 'Reports', href: '#' },
              { label: 'Settings', href: '#' }
            ]}
            variant="underline"
          />
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <Stack spacing="xl">
            {/* Stats Grid */}
            <div>
              <Text variant="h5" className="mb-6">Key Metrics</Text>
              <Stats items={stats} columns={4} />
            </div>

            {/* Main Content Grid */}
            <Grid cols={3} gap="xl">
              {/* Recent Orders */}
              <div className="col-span-2">
                <Text variant="h5" className="mb-4">Recent Orders</Text>
                <Table
                  columns={[
                    { key: 'orderNumber', header: 'Order #' },
                    { key: 'customer', header: 'Customer' },
                    { key: 'date', header: 'Date' },
                    { 
                      key: 'status', 
                      header: 'Status',
                      render: (value) => {
                        const variant = {
                          'Pending': 'warning',
                          'Processing': 'info',
                          'Shipped': 'primary',
                          'Delivered': 'success'
                        }[value] || 'default';
                        return <Badge variant={variant as any}>{value}</Badge>;
                      }
                    },
                    { key: 'amount', header: 'Amount', align: 'right' }
                  ]}
                  data={recentOrders}
                  hover
                />
              </div>

              {/* Team Members */}
              <div>
                <Text variant="h5" className="mb-4">Team Members</Text>
                <List
                  items={teamMembers}
                  variant="bordered"
                />
              </div>
            </Grid>

            {/* Charts Section */}
            <Grid cols={2} gap="xl">
              <div>
                <Text variant="h6" className="mb-4">Revenue Trend</Text>
                <ImagePlaceholder fake ratio="video" />
              </div>
              <div>
                <Text variant="h6" className="mb-4">User Activity</Text>
                <ImagePlaceholder fake ratio="video" />
              </div>
            </Grid>

            {/* Progress Section */}
            <div>
              <Text variant="h5" className="mb-4">Project Progress</Text>
              <Stack spacing="md">
                <div>
                  <Progress value={75} label="Website Redesign" showValue variant="primary" />
                </div>
                <div>
                  <Progress value={45} label="Mobile App Development" showValue variant="warning" />
                </div>
                <div>
                  <Progress value={90} label="API Integration" showValue variant="success" />
                </div>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </HeaderLayout>
  );
}