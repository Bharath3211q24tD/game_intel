import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, GenerateVideosOperation, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. Multi-turn Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, role = 'forensic-analyst', modelType = 'general' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Model selection based on requirements:
    // Complex tasks: gemini-3.8-flash with HIGH thinking (or gemini-4-argon)
    // General tasks: gemini-3.8-flash
    // Fast tasks: gemini-3.1-flash-lite
    let selectedModel = 'gemini-3.8-flash';
    let thinkingConfig = undefined;

    if (modelType === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (modelType === 'complex') {
      selectedModel = 'gemini-3.8-flash';
      thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    // Role-specific system instructions
    const roleInstructions: Record<string, string> = {
      'forensic-analyst':
        'You are the Senior Forensic Intelligence Analyst at GAMEINTEL. You specialize in verifying Grand Theft Auto VI and GTA V claims, technical engine mechanics (RAGE 9), map photogrammetry (Leonida, Vice City, Keys), regulatory filings (Take-Two Form 10-K, Form 8-K), and USPTO patent records (US11288863B2, US10981067B2). Maintain a professional, rigorous, objective, and investigative tone. Cite evidence references where appropriate. Avoid unsubstantiated rumors.',
      'cartographer':
        'You are the Chief Spatial Cartographer at GAMEINTEL. You specialize in photogrammetry, horizon angle analysis, coordinates triangulation (Highway 1, Port Gellhorn, Hamlet Keys, Vice Beach), and geographic comparison between the 128 km² Leonida landmass and GTA V Los Santos.',
      'engine-specialist':
        'You are the RAGE 9 Technical Engine Specialist at GAMEINTEL. You specialize in real-time fluid simulation patents, compute strand hair shaders, volumetric fog, acoustic ray-tracing, Euphoria procedural ragdoll physics, and PS5/Xbox Series X|S hardware budgets.'
    };

    const systemInstruction = roleInstructions[role] || roleInstructions['forensic-analyst'];

    // Convert past messages into contents array
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        ...(thinkingConfig ? { thinkingConfig } : {})
      }
    });

    res.json({
      text: response.text || '',
      model: selectedModel
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Error processing chat query' });
  }
});

// 2. Google Search Grounding Endpoint
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an investigative journalist and evidence researcher. Provide accurate, up-to-date facts grounded in recent real-time web results. Highlight verified sources.',
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = groundingChunks
      .filter((c: any) => c.web)
      .map((c: any) => ({
        uri: c.web.uri,
        title: c.web.title || c.web.uri
      }));

    res.json({
      text,
      sources: webSources
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    res.status(500).json({ error: error.message || 'Error executing search grounded query' });
  }
});

// 3. Google Maps Grounding Endpoint
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { prompt, latLng } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // Default to Miami / Vice City latitude and longitude if not provided
    const userLocation = latLng || {
      latitude: 25.7617,
      longitude: -80.1918
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLocation
          }
        }
      }
    });

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const places = groundingChunks
      .filter((c: any) => c.maps)
      .map((c: any) => ({
        uri: c.maps.uri,
        title: c.maps.title || 'Google Maps Location'
      }));

    res.json({
      text,
      places
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    res.status(500).json({ error: error.message || 'Error executing maps grounded query' });
  }
});

// 4. Veo Video Generation Endpoint
app.post('/api/generate-video', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt = 'Cinematic forensic drone sweep over tropical coastal city at dusk', aspectRatio = '16:9' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 photo is required for video animation' });
    }

    // Strip data url prefix if present
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    // The user requested:
    // model: veo-3.1-fast-generate-preview (or veo-3.1-lite-generate-preview)
    // aspect ratio: 16:9 (landscape) or 9:16 (portrait)
    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    try {
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        image: {
          imageBytes: cleanBase64,
          mimeType
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: validAspectRatio
        }
      });

      return res.json({
        operationName: operation.name,
        aspectRatio: validAspectRatio
      });
    } catch (veoErr: any) {
      // If veo-3.1-fast-generate-preview isn't available or requires paid key, try fallback model
      console.warn('Veo fast attempt error, trying veo-3.1-lite-generate-preview:', veoErr?.message);
      
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt,
        image: {
          imageBytes: cleanBase64,
          mimeType
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: validAspectRatio
        }
      });

      return res.json({
        operationName: operation.name,
        aspectRatio: validAspectRatio
      });
    }
  } catch (error: any) {
    console.error('Video generation start error:', error);
    res.status(403).json({
      error: error.message || 'Veo video generation requires an authorized Google AI Studio key with video generation quotas.',
      needsPaidKey: true
    });
  }
});

// 5. Veo Video Status Polling
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: updated.done,
      error: updated.error
    });
  } catch (error: any) {
    console.error('Video status error:', error);
    res.status(500).json({ error: error.message || 'Error checking video status' });
  }
});

// 6. Veo Video Download & Stream
app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Video URI not found' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey }
    });

    res.setHeader('Content-Type', 'video/mp4');
    videoRes.body!.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        }
      })
    );
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({ error: error.message || 'Error downloading video' });
  }
});

// Server configuration & static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
