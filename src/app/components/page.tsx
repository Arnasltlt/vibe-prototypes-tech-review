'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';

// Component Showcase Page
export default function ComponentsPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 border-b pb-4">
        <Typography variant="h1">Protolabs Factory Network Component Library</Typography>
        <Typography variant="body1" color="subtle" className="mt-2">
          A showcase of React components ported from the Angular design system
        </Typography>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Component Category: Buttons */}
        <section className="col-span-full mb-12">
          <Typography variant="h2" className="mb-6 border-b pb-2">Button Components</Typography>
          
          {/* Default Buttons */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Default Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button colorVariant="purple">Purple Button</Button>
              <Button colorVariant="grey">Grey Button</Button>
              <Button colorVariant="orange">Orange Button</Button>
              <Button colorVariant="black">Black Button</Button>
            </div>
          </div>
          
          {/* Alt Buttons */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Alt Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button buttonType="alt" colorVariant="purple">Purple Alt</Button>
              <Button buttonType="alt" colorVariant="green">Green Alt</Button>
              <Button buttonType="alt" colorVariant="orange">Orange Alt</Button>
              <Button buttonType="alt" colorVariant="red">Red Alt</Button>
            </div>
          </div>
          
          {/* Outline Buttons */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Outline Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button buttonType="outline" colorVariant="grey">Outline Button</Button>
            </div>
          </div>
          
          {/* Text Action Buttons */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Text Action Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button buttonType="text-action" colorVariant="purple">Purple Link</Button>
              <Button buttonType="text-action" colorVariant="grey">Grey Link</Button>
              <Button buttonType="text-action" colorVariant="green">Green Link</Button>
              <Button buttonType="text-action" colorVariant="orange">Orange Link</Button>
              <Button buttonType="text-action" colorVariant="red">Red Link</Button>
              <Button buttonType="text-action" colorVariant="blue">Blue Link</Button>
            </div>
          </div>
          
          {/* Button Sizes */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Button Sizes</Typography>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs" colorVariant="purple">Extra Small</Button>
              <Button size="s" colorVariant="purple">Small</Button>
              <Button size="m" colorVariant="purple">Medium</Button>
              <Button size="l" colorVariant="purple">Large</Button>
              <Button size="xl" colorVariant="purple">Extra Large</Button>
            </div>
          </div>
          
          {/* Button States */}
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">Button States</Typography>
            <div className="flex flex-wrap gap-4">
              <Button disabled colorVariant="purple">Disabled Button</Button>
              <Button loading colorVariant="purple">Loading Button</Button>
            </div>
          </div>
        </section>

        {/* Component Category: Typography */}
        <section className="col-span-full mb-12">
          <Typography variant="h2" className="mb-6 border-b pb-2">Typography Components</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Styles */}
            <div>
              <Typography variant="h3" className="mb-4">Text Styles</Typography>
              <div className="space-y-4">
                <Typography variant="h1">Heading 1</Typography>
                <Typography variant="h2">Heading 2</Typography>
                <Typography variant="h3">Heading 3</Typography>
                <Typography variant="subtitle1">Subtitle 1</Typography>
                <Typography variant="subtitle2">Subtitle 2</Typography>
                <Typography variant="body1">Body 1 - Main body text for most content</Typography>
                <Typography variant="body2">Body 2 - Secondary body text for less important content</Typography>
                <Typography variant="eyebrow">Eyebrow Text</Typography>
                <Typography variant="caption">Caption Text - Used for supplementary information</Typography>
              </div>
            </div>
            
            {/* Text Colors */}
            <div>
              <Typography variant="h3" className="mb-4">Text Colors</Typography>
              <div className="space-y-4">
                <Typography color="default">Default Text Color</Typography>
                <Typography color="subtle">Subtle Text Color</Typography>
                <div className="bg-gray-900 p-4 rounded">
                  <Typography color="white">White Text Color</Typography>
                  <Typography color="subtleWhite">Subtle White Text Color</Typography>
                </div>
                <Typography color="purple">Purple Text Color</Typography>
                <Typography color="green">Green Text Color</Typography>
                <Typography color="orange">Orange Text Color</Typography>
                <Typography color="red">Red Text Color</Typography>
              </div>
            </div>
          </div>
        </section>
        
        {/* Component Category: Cards */}
        <section className="col-span-full mb-12">
          <Typography variant="h2" className="mb-6 border-b pb-2">Card Components</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <div>
              <Typography variant="h3" className="mb-3">Default Card</Typography>
              <Card
                title="Card Title"
                description="This is a standard card component that displays information."
                action={<Button buttonType="text-action" colorVariant="purple">View details</Button>}
              />
            </div>
            
            {/* Card with eyebrow */}
            <div>
              <Typography variant="h3" className="mb-3">Card with Eyebrow</Typography>
              <Card
                eyebrow="EYEBROW TEXT"
                title="Card with Eyebrow"
                description="This card includes eyebrow text above the title for additional context."
                info="Last updated: Today"
              />
            </div>
            
            {/* Card with icon */}
            <div>
              <Typography variant="h3" className="mb-3">Card with Icon</Typography>
              <Card
                icon={
                  <div className="w-10 h-10 rounded-full bg-[var(--network-blue-100)] flex items-center justify-center text-[var(--network-blue-500)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                }
                title="Card with Icon"
                description="This card includes a custom icon element displayed next to the content."
              />
            </div>
            
            {/* Clickable Card */}
            <div>
              <Typography variant="h3" className="mb-3">Clickable Card</Typography>
              <Card
                clickable
                title="Clickable Card"
                description="This card is interactive. Click on it to trigger an action."
                onClick={() => alert('Card clicked!')}
              />
            </div>
            
            {/* Selected Card */}
            <div>
              <Typography variant="h3" className="mb-3">Selected Card</Typography>
              <Card
                selected
                title="Selected Card"
                description="This card is currently in a selected state."
              />
            </div>
            
            {/* Disabled Card */}
            <div>
              <Typography variant="h3" className="mb-3">Disabled Card</Typography>
              <Card
                disabled
                title="Disabled Card"
                description="This card is currently disabled and cannot be interacted with."
              />
            </div>
            
            {/* Inline Card */}
            <div className="col-span-full">
              <Typography variant="h3" className="mb-3">Inline Card</Typography>
              <Card
                cardType="inline"
                icon={
                  <div className="w-10 h-10 rounded-full bg-[var(--orange-100)] flex items-center justify-center text-[var(--orange-500)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                }
                title="Inline Card Layout"
                description="This card uses an inline layout with content displayed horizontally."
                action={<Button buttonType="text-action" colorVariant="orange">Action</Button>}
              />
            </div>
            
            {/* Centered Card */}
            <div>
              <Typography variant="h3" className="mb-3">Centered Card</Typography>
              <Card
                cardType="centered"
                icon={
                  <div className="w-12 h-12 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-500)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                }
                title="Centered Card"
                description="This card has content centered vertically and horizontally."
                action={<Button buttonType="alt" colorVariant="green" size="s">View Users</Button>}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}