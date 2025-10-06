# Deepfake Detector

A modern React application that uses Google Gemini AI to detect deepfakes in images, videos, and audio files.

## Features

- 🔍 **Multi-format Support**: Analyze images, videos, and audio files
- 🤖 **AI-Powered**: Uses Google Gemini's advanced multimodal AI
- 📊 **Detailed Analysis**: Get confidence scores and context information
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 📱 **Drag & Drop**: Easy file upload with preview functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd deepfake-detector
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## How It Works

1. **Upload**: Select or drag-and-drop an image, video, or audio file
2. **Analysis**: The app sends the file to Google Gemini AI for analysis
3. **Results**: View the deepfake detection results with:
   - Authenticity status (Real/Deepfake)
   - Confidence score (0-100%)
   - Source analysis
   - Context explanation

## Supported File Types

- **Images**: JPEG, PNG, GIF, WebP
- **Videos**: MP4, WebM, OGG, QuickTime
- **Audio**: MP3, WAV, OGG, MPEG

## API Response Format

The Gemini AI returns analysis results in this format:

```json
{
  "deepfake_status": "real" | "deepfake",
  "confidence": 0.85,
  "source": "Real photograph taken with digital camera",
  "context": "Natural lighting and facial features suggest authentic content"
}
```

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI API**: Google Gemini 1.5 Pro
- **HTTP Client**: Fetch API

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Gemini API key is correctly set in the `.env` file
2. **File Size**: Files must be under 10MB
3. **File Format**: Only supported media formats are allowed
4. **Network Issues**: Check your internet connection if analysis fails

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure the file meets size and format requirements
