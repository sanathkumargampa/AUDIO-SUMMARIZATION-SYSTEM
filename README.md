# Audio Summarization System

A futuristic application that transcribes and summarizes audio recordings using AI.

## Features

- Upload audio files (WAV, MP3, etc.)
- Transcribe audio using Whisper LLM
- Summarize transcriptions using Pegasus LLM
- Download results in multiple formats (PDF, TXT, DOCX)
- Processing history
- Parallel processing for faster results

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Flask
- **AI Models**: Whisper (transcription), Pegasus (summarization)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Pip

### Installation

1. Clone the repository
2. Install frontend dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd server
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend development server

```bash
npm run dev
```

2. Start the backend server in a separate terminal

```bash
npm run server
```

## Usage

1. Navigate to the app in your browser
2. Upload an audio file
3. Wait for processing to complete
4. View the transcription and summary
5. Download results in your preferred format

## Notes

This is a demo application. In a production environment, you would need to:

1. Set up proper error handling and logging
2. Implement user authentication
3. Add database storage for history
4. Configure proper model deployment
5. Add more comprehensive testing

## License

MIT