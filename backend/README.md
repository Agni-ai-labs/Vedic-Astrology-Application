# Vedic Astrology Backend

AI-powered backend service using Google Gemini for intelligent astrology predictions.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required credentials:
- `GEMINI_API_KEY`: Your Google Gemini API key (already provided)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

### 3. Setup Supabase Database

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the migration script from `migrations/001_initial_schema.sql`
3. Copy your project URL and service role key to `.env`

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```

### Search Yogas
```
GET /api/search?q=wealth+and+success
```

### Generate Remedy Plan
```
POST /api/remedies/generate
Content-Type: application/json

{
  "userId": "user-id",
  "predictions": [...],
  "userContext": {...},
  "preferences": {...}
}
```

## Technology Stack

- **Express.js**: Web framework
- **Google Gemini**: AI for semantic search and text generation
- **Supabase**: PostgreSQL database with vector support
- **Redis**: Caching layer (optional)
- **TypeScript**: Type-safe development
