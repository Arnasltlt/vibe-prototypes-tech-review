'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';

export interface LineItem {
  id: number;
  name: string;
  thumbnailUrl?: string;
  subtitle?: string;
  quantity?: number;
  price?: string;
  manualPriceLabel?: string;
  extraDetails?: React.ReactNode;
}

export interface LineItemsSidePanelProps {
  title: string;
  items: LineItem[];
  selectedItemId?: number;
  onItemClick?: (id: number) => void;
  showStatus?: boolean;
  itemStatuses?: Array<{
    id: number;
    status: 'complete' | 'in-progress' | 'pending';
  }>;
}

const LineItemsSidePanel: React.FC<LineItemsSidePanelProps> = ({ 
  title, 
  items,
  selectedItemId,
  onItemClick,
  showStatus = false,
  itemStatuses = []
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [expandAll, setExpandAll] = useState(false);

  const toggleItem = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setExpandAll(prev => !prev);
    setExpandedItems(!expandAll ? items.map(item => item.id) : []);
  };

  const getItemStatus = (itemId: number) => {
    return itemStatuses.find(s => s.id === itemId)?.status || 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <span className="text-green-600 text-lg">✓</span>;
      case 'in-progress':
        return <span className="text-yellow-600 text-lg">●</span>;
      case 'pending':
        return <span className="text-gray-400 text-lg">○</span>;
      default:
        return null;
    }
  };

  return (
    <aside className="w-[40%] bg-gray-50 border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        <Typography variant="subtitle1" className="text-xl font-semibold text-gray-900 mb-4">
          {title} <span className="text-sm font-normal text-gray-600 ml-2">{items.length} items</span>
        </Typography>

        <div className="flex items-center mb-6">
          <input
            id="expandAllPanel"
            type="checkbox"
            className="mr-2"
            checked={expandAll}
            onChange={toggleAll}
          />
          <label htmlFor="expandAllPanel" className="text-sm text-gray-600">
            Expand all details
          </label>
        </div>

        <div className="space-y-1.5">
          {items.map((item) => {
            const status = showStatus ? getItemStatus(item.id) : null;
            const isSelected = selectedItemId === item.id;
            
            return (
              <div
                key={item.id}
                className={`border ${expandedItems.includes(item.id)
                  ? 'border-2 border-blue-500 hover:border-blue-500'
                  : 'border-gray-300 hover:border-blue-500'} rounded bg-white hover:bg-gray-50 transition-colors`}
                onClick={() => onItemClick?.(item.id)}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 mr-3 flex-shrink-0">
                      {item.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          {item.thumbnailUrl && (
                            <img
                              src={item.thumbnailUrl}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded bg-gray-100"
                            />
                          )}
                          <span className="text-gray-900 font-medium">{item.name}</span>
                        </div>
                        {item.subtitle && (
                          <Typography variant="body2" color="default">
                            {item.subtitle}
                          </Typography>
                        )}
                        <div className="flex justify-between items-start">
                          {item.price ? (
                            <div className="text-right">
                              <div className="text-gray-900 font-medium">{item.price}</div>
                              {item.manualPriceLabel && (
                                <Typography variant="body2" color="default">
                                  {item.manualPriceLabel}
                                </Typography>
                              )}
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="text-gray-900 font-medium">—</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details area */}
                  {expandedItems.includes(item.id) && (
                    <div className="mt-4">
                      {item.extraDetails}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 px-4 pb-4">
                  <Button
                    buttonType="text-action"
                    colorVariant="blue"
                    size="s"
                    onClick={() => toggleItem(item.id)}
                    className="rounded text-sm"
                  >
                    {expandedItems.includes(item.id) ? 'Hide details' : 'Show details'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default LineItemsSidePanel; 