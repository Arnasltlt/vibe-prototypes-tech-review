// Export all wireframe components
export * from './Layout';
export * from './Content';
export * from './Navigation';
export * from './Forms';
export * from './DataDisplay';
export * from './Feedback';

// Re-export fake data utilities for convenience
export { FakeData, fakeText, fakeUser, fakeNumber, fakeDate, fakeStatus, fakeList, fakeMedia, fakeChart } from '@/lib/fake-data';