import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, X, File, Image, Video, Music } from 'lucide-react';
import { Button } from './ui/button';

export const UploadCard = ({ onFileSelect, selectedFile, onClearFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Check file type
    const validTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime',
      'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image, video, or audio file.');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    // Create preview URL for images and videos
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreviewUrl(null);
    onClearFile();
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="w-8 h-8 text-gray-400" />;
    
    if (selectedFile.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-600" />;
    }
    if (selectedFile.type.startsWith('video/')) {
      return <Video className="w-8 h-8 text-purple-600" />;
    }
    if (selectedFile.type.startsWith('audio/')) {
      return <Music className="w-8 h-8 text-green-600" />;
    }
    return <File className="w-8 h-8 text-gray-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative bg-white rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
            ? 'border-green-300 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
        } p-8 cursor-pointer shadow-sm`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*,video/*,audio/*"
          className="hidden"
        />
        
        <div className="flex flex-col items-center text-center space-y-4">
          {getFileIcon()}
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedFile ? 'File Selected' : 'Drop your file here'}
            </h3>
            <p className="text-gray-600">
              {selectedFile 
                ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                : 'or click to browse your files'
              }
            </p>
            <p className="text-sm text-gray-500">
              Supports images, videos, and audio files up to 10MB
            </p>
          </div>

          {!selectedFile && (
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                JPG, PNG
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                MP4, WebM
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                MP3, WAV
              </span>
            </div>
          )}
        </div>

        {selectedFile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </motion.div>

      {/* File Preview */}
      {selectedFile && previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
          
          {selectedFile.type.startsWith('image/') && (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {selectedFile.type.startsWith('video/') && (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <video 
                src={previewUrl} 
                controls 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </motion.div>
      )}

      {/* File Details */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-900 mb-3">File Details</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-900 font-medium">{selectedFile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="text-gray-900">{formatFileSize(selectedFile.size)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="text-gray-900">{selectedFile.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Modified:</span>
              <span className="text-gray-900">
                {new Date(selectedFile.lastModified).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
