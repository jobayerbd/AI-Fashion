import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PoseSelector from './components/PoseSelector';
import AspectRatioSelector from './components/AspectRatioSelector';
import QualitySelector from './components/QualitySelector';
import Spinner from './components/Spinner';
import { generateStyledImage } from './services/geminiService';
import { POSES, ASPECT_RATIOS, QUALITY_OPTIONS } from './constants';

function App() {
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string>(POSES[0].prompt);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!clothImage || !faceImage) {
      setError("Please upload both a clothing and a face image.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateStyledImage(
        clothImage,
        faceImage,
        selectedPose,
        selectedAspectRatio,
        selectedQuality
      );
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-fashion-stylist-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isGenerateDisabled = !clothImage || !faceImage || isLoading;

  return (
    <div className="min-h-screen text-slate-200 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6 p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/20">
            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3">1. Upload Images</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <ImageUploader id="cloth-uploader" title="Clothing Image" onImageUpload={setClothImage} />
              <ImageUploader id="face-uploader" title="Face/Model Image" onImageUpload={setFaceImage} />
            </div>
            
            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3 mt-4">2. Customize Output</h2>
            <PoseSelector poses={POSES} selectedPose={selectedPose} onPoseChange={setSelectedPose} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <AspectRatioSelector aspectRatios={ASPECT_RATIOS} selectedAspectRatio={selectedAspectRatio} onAspectRatioChange={setSelectedAspectRatio} />
              <QualitySelector qualityOptions={QUALITY_OPTIONS} selectedQuality={selectedQuality} onQualityChange={setSelectedQuality} />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-pink-500"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">3. Result</h2>
            <div className="w-full aspect-square bg-slate-900 rounded-lg flex items-center justify-center relative border border-slate-700">
              {isLoading && <Spinner />}
              {error && !isLoading && (
                <div className="text-center text-red-400 p-4">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
              {generatedImage && !isLoading && (
                <img src={generatedImage} alt="Generated fashion model" className="w-full h-full object-contain rounded-lg" />
              )}
              {!generatedImage && !isLoading && !error && (
                <p className="text-slate-500">Your generated image will appear here</p>
              )}
            </div>
            {generatedImage && !isLoading && (
              <button
                onClick={handleDownload}
                className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500"
              >
                Download Image
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;