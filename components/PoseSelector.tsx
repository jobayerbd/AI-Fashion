import React from 'react';
import { Pose } from '../types';

interface PoseSelectorProps {
  poses: Pose[];
  selectedPose: string;
  onPoseChange: (posePrompt: string) => void;
}

const PoseSelector: React.FC<PoseSelectorProps> = ({ poses, selectedPose, onPoseChange }) => {
  const isPresetSelected = poses.some(p => p.prompt === selectedPose);

  const handlePresetClick = (prompt: string) => {
    onPoseChange(prompt);
  };

  const handleCustomPoseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPoseChange(event.target.value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-white">Select a Preset Pose</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {poses.map((pose) => (
          <button
            key={pose.name}
            onClick={() => handlePresetClick(pose.prompt)}
            className={`p-3 rounded-lg text-sm text-center border transition-all duration-200 h-full transform hover:-translate-y-1
              ${selectedPose === pose.prompt
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 border-transparent text-white font-semibold shadow-lg shadow-purple-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
              }
            `}
          >
            {pose.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Or, Describe a Custom Pose</h3>
        <textarea
          value={isPresetSelected ? "" : selectedPose}
          onChange={handleCustomPoseChange}
          placeholder="e.g., A model leaning against a brick wall, laughing."
          className={`w-full p-2.5 bg-slate-800 border rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200
            ${!isPresetSelected && selectedPose ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-slate-700'}
          `}
          rows={3}
        />
      </div>
    </div>
  );
};

export default PoseSelector;