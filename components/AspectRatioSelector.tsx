import React from 'react';
import { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  aspectRatios: AspectRatio[];
  selectedAspectRatio: string;
  onAspectRatioChange: (aspectRatioValue: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ aspectRatios, selectedAspectRatio, onAspectRatioChange }) => {
  return (
    <div>
      <label htmlFor="aspect-ratio-select" className="block text-lg font-semibold mb-2 text-white">
        Aspect Ratio
      </label>
      <select
        id="aspect-ratio-select"
        value={selectedAspectRatio}
        onChange={(e) => onAspectRatioChange(e.target.value)}
        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {aspectRatios.map((ratio) => (
          <option key={ratio.value} value={ratio.value} className="bg-slate-900 text-white">
            {ratio.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AspectRatioSelector;