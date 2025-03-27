import { Supplier } from './types';
import { Typography } from '@/components/ui/Typography/Typography';

interface SupplierCardProps {
  supplier: Supplier;
  onViewProfile: (supplierId: number) => void;
  isSelected: boolean;
  onSelect: (supplierId: number) => void;
}

export function SupplierCard({ supplier, onViewProfile, isSelected, onSelect }: SupplierCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow w-full p-6 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-8">
        {/* Left section - Company info */}
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(supplier.id)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-2"
          />
          <div className="flex-shrink-0 min-w-[200px]">
            <div className="flex items-start gap-2">
              <Typography variant="subtitle1" color="default" className="font-semibold mb-1">
                {supplier.name}
              </Typography>
              {supplier.isPreferred && (
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <Typography variant="caption" color="primary" className="text-blue-600">
                    Preferred
                  </Typography>
                </div>
              )}
            </div>
            <Typography variant="body2" color="subtle">
              {supplier.location}
            </Typography>
          </div>
        </div>

        {/* Middle section - Capabilities and Materials */}
        <div className="flex-grow max-w-[400px]">
          <div className="mb-4">
            <Typography variant="caption" color="subtle" className="mb-2 block">
              Capabilities
            </Typography>
            <div className="flex flex-wrap gap-2">
              {supplier.capabilities.map((capability, idx) => (
                <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full">
                  <Typography variant="caption" color="default">
                    {capability}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Typography variant="caption" color="subtle" className="mb-2 block">
              Materials
            </Typography>
            <div className="flex flex-wrap gap-2">
              {supplier.materials.map((material, idx) => (
                <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full">
                  <Typography variant="caption" color="default">
                    {material}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right section - Metrics */}
        <div className="flex flex-wrap items-center gap-8 ml-auto">
          <div>
            <Typography variant="caption" color="subtle" className="mb-1 block">
              Quality Score
            </Typography>
            <Typography variant="body1" color="default" className="font-semibold">
              {(supplier.qualityScore * 100).toFixed(0)}%
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="subtle" className="mb-1 block">
              On-Time Rate
            </Typography>
            <Typography variant="body1" color="default" className="font-semibold">
              {(supplier.onTimeRate * 100).toFixed(0)}%
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="subtle" className="mb-1 block">
              Orders
            </Typography>
            <Typography variant="body1" color="default" className="font-semibold">
              {supplier.orders}
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="subtle" className="mb-1 block">
              Last Order
            </Typography>
            <Typography variant="body1" color="default" className="font-semibold">
              {new Date(supplier.lastOrder).toLocaleDateString()}
            </Typography>
          </div>
          <button 
            onClick={() => onViewProfile(supplier.id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-8"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
} 