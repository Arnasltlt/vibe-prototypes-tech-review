'use client';

import React from 'react';
import {
  Container, Section, Grid, Stack, Text, Card, Badge, Flex
} from '@/components/wireframe';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';

export default function HomePage() {
  const examples = [
    {
      title: 'Wireframe Component Showcase',
      description: 'Interactive gallery of all standardized wireframe components',
      href: '/wireframe-showcase',
      badge: 'Essential',
      color: 'primary'
    },
    {
      title: 'Example Dashboard',
      description: 'Complete dashboard layout using wireframe components',
      href: '/example-dashboard',
      badge: 'Example',
      color: 'success'
    },
    {
      title: 'Technical Review Flow',
      description: 'Standardized technical review request workflow',
      href: '/orders/technical-review',
      badge: 'Updated',
      color: 'info'
    },
    {
      title: 'Send RFQ Flow',
      description: 'Request for quotation workflow with supplier selection',
      href: '/orders/send-rfq',
      badge: 'Updated',
      color: 'info'
    },
    {
      title: 'Example Quote (V2)',
      description: 'Modernized quote management interface',
      href: '/example-quote-v2',
      badge: 'New',
      color: 'success'
    },
    {
      title: 'Orders Page',
      description: 'Order management and listing interface',
      href: '/orders',
      badge: 'Classic',
      color: 'default'
    }
  ];

  return (
    <Section spacing="xl" background="gray" className="min-h-screen">
      <Container>
        <Stack spacing="xl">
          <div className="text-center">
            <Text variant="h1" className="mb-4">Wireframing Platform</Text>
            <Text variant="body" color="muted" className="max-w-2xl mx-auto">
              A robust template platform for rapid prototyping and wireframing. 
              All components use standardized patterns with fake data generators for quick iteration.
            </Text>
          </div>

          <Grid cols={3} gap="lg">
            {examples.map((example, index) => (
              <Link key={index} href={example.href} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="p-6">
                    <Flex justify="between" align="start" className="mb-4">
                      <Text variant="h5">{example.title}</Text>
                      <Badge variant={example.color as any}>{example.badge}</Badge>
                    </Flex>
                    <Text variant="body" color="muted">
                      {example.description}
                    </Text>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>

          <div className="text-center">
            <Text variant="h4" className="mb-4">Quick Start</Text>
            <Text variant="body" color="muted" className="mb-6">
              Start building your wireframe by importing components:
            </Text>
            <div className="bg-gray-900 text-white p-4 rounded-lg text-left max-w-2xl mx-auto">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { 
  Container, Grid, Text, Card, Button,
  Form, Input, Table, fakeData
} from '@/components/wireframe';

// Use with fake data
<Table columns={columns} data={[]} fake />
<Text fake="paragraph" />
<Avatar fake />`}</code>
              </pre>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
