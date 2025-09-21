import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface ImageUploaderProps {
  id: string;
  title: string;
  onImageUpload: (dataUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        onImageUpload(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files);
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileChange(event.dataTransfer.files);
  };

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <div
        onClick={onAreaClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-full aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer flex items-center justify-center
          ${isDragging ? 'border-purple-500 bg-slate-700/50 ring-2 ring-purple-500/50' : 'border-slate-700 hover:border-slate-500'}
        `}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          onChange={onFileSelect}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="text-center text-slate-400 p-4">
            <p>Drag &amp; drop an image here</p>
            <p className="text-sm">or</p>
            <p className="font-semibold text-purple-400">Click to browse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;