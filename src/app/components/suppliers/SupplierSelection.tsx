import { useState } from 'react';
import { Supplier, SupplierFilters, SupplierTab } from './types';
import { SupplierCard } from './SupplierCard';
import { SupplierSearch } from './SupplierSearch';
import { Typography } from '@/components/ui/Typography/Typography';
import { SupplierProfile } from './SupplierProfile';

// Mock data - in real app this would come from an API
const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'PrecisionMachine Co.',
    location: 'Chicago, IL',
    isPreferred: true,
    capabilities: ['CNC Machining', 'Milling', 'Turning'],
    materials: ['Aluminum', 'Steel', 'Titanium'],
    qualityScore: 0.98,
    onTimeRate: 0.98,
    orders: 32,
    lastOrder: '2024-02-10',
    description: 'Leading precision machining company specializing in complex parts.',
    technology: 'Advanced 5-axis CNC machines, CMM inspection',
    supplyChainManager: 'John Smith',
    contactName: 'Sarah Johnson',
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@precisionmachine.com'
    },
    workingHours: 'Mon-Fri: 8:00 AM - 5:00 PM CST',
    address: {
      street: '123 Manufacturing Dr.',
      city: 'Chicago',
      region: 'Illinois',
      country: 'United States',
      postcode: '60601'
    }
  },
  {
    id: 2,
    name: 'MetalWorks Inc.',
    location: 'Detroit, MI',
    isPreferred: true,
    capabilities: ['CNC Machining', 'Sheet Metal', 'Welding'],
    materials: ['All Metals', 'Stainless Steel'],
    qualityScore: 0.94,
    onTimeRate: 0.95,
    orders: 54,
    lastOrder: '2024-01-23'
  },
  {
    id: 3,
    name: 'TechForm Solutions',
    location: 'Austin, TX',
    isPreferred: false,
    capabilities: ['Injection Molding', 'CNC Machining', 'Vacuum Forming'],
    materials: ['ABS', 'POM/Delrin', 'PEEK'],
    qualityScore: 0.97,
    onTimeRate: 0.99,
    orders: 18,
    lastOrder: '2024-02-15'
  }
];

export function SupplierSelection() {
  const [activeTab, setActiveTab] = useState<SupplierTab>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedSupplierIds, setSelectedSupplierIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<SupplierFilters>({
    capability: 'All Capabilities',
    material: 'All Materials',
    searchQuery: ''
  });

  const handleViewProfile = (supplierId: number) => {
    const supplier = mockSuppliers.find(s => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const handleCloseProfile = () => {
    setSelectedSupplier(null);
  };

  const handleSupplierSelect = (supplierId: number) => {
    setSelectedSupplierIds(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(supplierId)) {
        newSelection.delete(supplierId);
      } else {
        newSelection.add(supplierId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedSupplierIds.size === filteredSuppliers.length) {
      setSelectedSupplierIds(new Set());
    } else {
      setSelectedSupplierIds(new Set(filteredSuppliers.map(s => s.id)));
    }
  };

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    if (activeTab === 'preferred' && !supplier.isPreferred) return false;
    if (activeTab === 'recent') {
      // Example logic for recent suppliers - modify as needed
      const lastOrderDate = new Date(supplier.lastOrder);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastOrderDate >= thirtyDaysAgo;
    }

    const searchQuery = filters.searchQuery.toLowerCase();
    if (searchQuery && searchQuery.length > 0) {
      return (
        supplier.name.toLowerCase().includes(searchQuery) ||
        supplier.capabilities.some(capability => 
          capability.toLowerCase().includes(searchQuery)
        ) ||
        supplier.materials.some(material => 
          material.toLowerCase().includes(searchQuery)
        )
      );
    }
    
    return true;
  });

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleTabChange = (tab: SupplierTab) => {
    setActiveTab(tab);
  };
  
  const tabCounts = {
    all: mockSuppliers.length,
    preferred: mockSuppliers.filter(s => s.isPreferred).length,
    recent: mockSuppliers.filter(s => {
      const lastOrderDate = new Date(s.lastOrder);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastOrderDate >= thirtyDaysAgo;
    }).length
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Typography variant="h2" color="default" className="text-xl font-semibold mb-2">
          Select Suppliers
        </Typography>
        <Typography variant="body2" color="subtle">
          Choose suppliers for your manufacturing needs
        </Typography>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 text-gray-900"
              value={filters.capability}
              onChange={(e) => setFilters(prev => ({ ...prev, capability: e.target.value }))}
            >
              <option value="All Capabilities">All Capabilities</option>
              <option value="CNC Machining">CNC Machining</option>
              <option value="Sheet Metal">Sheet Metal</option>
              <option value="Injection Molding">Injection Molding</option>
            </select>
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 text-gray-900"
              value={filters.material}
              onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
            >
              <option value="All Materials">All Materials</option>
              <option value="Aluminum">Aluminum</option>
              <option value="Steel">Steel</option>
              <option value="Plastic">Plastic</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('all')}
          >
            All Suppliers ({tabCounts.all})
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'preferred' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('preferred')}
          >
            Preferred ({tabCounts.preferred})
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'recent' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('recent')}
          >
            Recent ({tabCounts.recent})
          </button>
        </div>
      </div>

      {/* Supplier List */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onViewProfile={handleViewProfile}
            isSelected={selectedSupplierIds.has(supplier.id)}
            onSelect={handleSupplierSelect}
          />
        ))}
        
        {filteredSuppliers.length === 0 && (
          <div className="py-8 text-center">
            <Typography variant="body1" color="subtle">
              No suppliers match your filter criteria.
            </Typography>
          </div>
        )}
      </div>

      {/* Supplier Profile Modal */}
      {selectedSupplier && (
        <SupplierProfile
          supplier={selectedSupplier}
          isOpen={true}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
} 