import React from 'react';
import { QualityOption } from '../types';

interface QualitySelectorProps {
  qualityOptions: QualityOption[];
  selectedQuality: string;
  onQualityChange: (qualityValue: string) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({ qualityOptions, selectedQuality, onQualityChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-white">Image Quality</h3>
      <div className="flex flex-col gap-2">
        {qualityOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-3 rounded-lg cursor-pointer border-2 transition-all duration-200
              ${selectedQuality === option.value
                ? 'bg-slate-700/80 border-purple-500 ring-1 ring-purple-500'
                : 'bg-slate-800/70 border-slate-700 hover:bg-slate-700'
              }
            `}
          >
            <input
              type="radio"
              name="quality"
              value={option.value}
              checked={selectedQuality === option.value}
              onChange={() => onQualityChange(option.value)}
              className="w-4 h-4 text-purple-500 bg-slate-600 border-slate-500 focus:ring-purple-600"
            />
            <div className="ml-3 text-sm">
              <span className="font-medium text-white">{option.name}</span>
              <p className="text-slate-400">{option.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QualitySelector;