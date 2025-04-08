import React from 'react';
import { Clock } from 'lucide-react';
import type { SearchHistoryItem } from '../types';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (city: string) => void;
}

export function SearchHistory({ history, onSelect }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-6">
      <div className="flex items-center gap-2 text-emerald-700 mb-3">
        <Clock size={16} />
        <h3 className="text-sm font-medium">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item.timestamp}
            onClick={() => onSelect(item.city)}
            className="px-4 py-1.5 text-sm bg-white/50 hover:bg-emerald-100 rounded-full text-emerald-800 transition-all duration-200 border border-emerald-100/50 hover:border-emerald-200"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
}