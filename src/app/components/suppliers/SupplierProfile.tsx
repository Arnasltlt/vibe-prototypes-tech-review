import { useState } from 'react';
import { Supplier } from './types';
import { Typography } from '@/components/ui/Typography/Typography';

type Tab = 'overview' | 'comments' | 'documents';

interface SupplierProfileProps {
  supplier: Supplier;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  title: string;
  message: string;
  author: string;
  dateCreated: string;
}

export function SupplierProfile({ supplier, isOpen, onClose }: SupplierProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!isOpen) return null;

  const mockComments: Comment[] = [
    {
      title: 'Comment title',
      message: 'Comment',
      author: 'Comment Author',
      dateCreated: 'Comment Created At Date'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-7xl max-h-[90vh] rounded-lg flex flex-col overflow-hidden shadow-xl">
        {/* Header with Close Button */}
        <div className="border-b border-gray-200 px-8 py-6 flex justify-between items-start">
          <div>
            <Typography variant="h1" color="default" className="text-2xl font-bold mb-2">
              {supplier.name}
            </Typography>
            <Typography variant="body2" color="subtle">
              Supplier ID: {supplier.id}
            </Typography>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full focus:outline-none transition-colors"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="px-8 py-6">
              {/* About Section */}
              <div className="mb-8">
                <Typography variant="h2" color="default" className="text-xl font-semibold mb-4">
                  About
                </Typography>
                
                <div className="space-y-4">
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Supplier Description
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.description || 'No description available'}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Technology
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.technology || 'supplier technology'}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <Typography variant="h2" color="default" className="text-xl font-semibold mb-4">
                  Contact information
                </Typography>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Supply chain manager
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.supplyChainManager || 'Supply Chain Manager'}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Point of contact
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.contactName || 'Firstname Lastname'}
                    </Typography>
                    <Typography variant="body2" color="subtle">
                      {(supplier.contactInfo?.phone && supplier.contactInfo?.email) ? 
                        `${supplier.contactInfo.phone}, ${supplier.contactInfo.email}` : 
                        'Phone number, email'}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Working Hours
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.workingHours || 'Working hours'}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="caption" color="subtle" className="block mb-1">
                      Location
                    </Typography>
                    <Typography variant="body2" color="default">
                      {supplier.address?.street || 'Supplier address'}
                    </Typography>
                    <Typography variant="body2" color="subtle">
                      {supplier.address ? 
                        `${supplier.address.city}, ${supplier.address.region}, ${supplier.address.country}` : 
                        'Supplier city, region, country'}
                    </Typography>
                    <Typography variant="body2" color="subtle">
                      {supplier.address?.postcode || 'postcode'}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Supplier Performance */}
              <div className="mb-8">
                <Typography variant="h2" color="default" className="text-xl font-semibold mb-4">
                  Supplier performance
                </Typography>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {/* Performance metrics will go here */}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {/* More performance metrics */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="p-8">
              <Typography variant="h2" color="default" className="text-xl font-semibold mb-6">
                Comments
              </Typography>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <Typography variant="caption" color="subtle">
                        Title
                      </Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="caption" color="subtle">
                        Message
                      </Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="caption" color="subtle">
                        Author
                      </Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="caption" color="subtle">
                        Date created
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockComments.map((comment, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4">
                        <Typography variant="body2" color="default">
                          {comment.title}
                        </Typography>
                      </td>
                      <td className="py-3 px-4">
                        <Typography variant="body2" color="default">
                          {comment.message}
                        </Typography>
                      </td>
                      <td className="py-3 px-4">
                        <Typography variant="body2" color="default">
                          {comment.author}
                        </Typography>
                      </td>
                      <td className="py-3 px-4">
                        <Typography variant="body2" color="default">
                          {comment.dateCreated}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="p-8">
              <Typography variant="h2" color="default" className="text-xl font-semibold mb-6">
                Documents
              </Typography>
              <div className="text-gray-500">No documents available</div>
            </div>
          )}
        </div>
        
        {/* Footer with Close Button */}
        <div className="border-t border-gray-200 px-8 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 