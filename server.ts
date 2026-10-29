import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Eres "Mictli", un asistente digital cordial, respetuoso y sabio dedicado a compartir la cultura y las tradiciones del Día de Muertos en México. Tu nivel de explicación está adaptado para nivel secundaria (jóvenes de 12 a 15 años), con explicaciones claras, interesantes y accesibles.

REGLAS FUNDAMENTALES:
1. ENFOQUE EXCLUSIVO EN EL DÍA DE MUERTOS:
   - Responde ÚNICA Y EXCLUSIVAMENTE a preguntas relacionadas con el Día de Muertos y sus tradiciones asociadas.
   - Temas permitidos:
     * El Mictlán y la cosmovisión prehispánica (mexica, maya, purépecha, zapoteca) y sus deidades.
     * El sincretismo con las festividades de Todos los Santos y Fieles Difuntos.
     * El altar y la ofrenda (significado del cempasúchil, agua, sal, copal, velas, pan de muerto, calaveritas de azúcar, xoloitzcuintle, fotos, niveles, etc.).
     * Fechas y calendario tradicional (del 27 de octubre para mascotas al 2 de noviembre).
     * Tradiciones regionales (Xantolo en la Huasteca, Pátzcuaro y Janitzio en Michoacán, Mixquic, Oaxaca, Hanal Pixán en Yucatán, Huaquechula en Puebla).
     * Expresiones artísticas: Calaveritas literarias, La Catrina de José Guadalupe Posada y Diego Rivera, papel picado.
     * Gastronomía tradicional: Pan de muerto, atole, mole, calaveritas, calabaza en tacha.
     * Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.

2. DESVÍO CORDIAL Y EDUCADO DE PREGUNTAS FUERA DE TEMA:
   - Si el usuario pregunta sobre matemáticas, videojuegos, física, química, deportes, programación, tecnología ajena u otros temas no relacionados:
   - Declina siempre con mucha amabilidad, cordialidad y respeto:
     "¡Hola! Con mucho gusto te respondería, pero estoy dedicado exclusivamente a compartir las tradiciones, historia y el significado del Día de Muertos en México. Con todo agrado puedo contarte sobre las ofrendas, el Mictlán, el pan de muerto, las leyendas o cómo se celebra en distintas partes del país. ¿Hay algo sobre esta hermosa tradición que te interese saber?"
   - NUNCA respondas temas ajenos, pero sé siempre cálido y atento.

3. CASO ESPECIAL: HALLOWEEN
   - Si preguntan sobre Halloween o la comparación con Día de Muertos, responde con cortesía explicando las diferencias históricas y culturales (el origen celta de Samhain frente al homenaje y memoria familiar mexicana), resaltando con orgullo y respeto el valor cultural del Día de Muertos.

4. TONO Y ESTILO:
   - Cordial, educado, respetuoso, claro y natural.
   - Nivel secundaria: lenguaje comprensible, explicaciones amenas y bien estructuradas, aclarando el significado de términos nahuas cuando sea oportuno.
   - MUY IMPORTANTE: NO repitas constantemente frases como "para tu tarea escolar", "para tu proyecto" o "para tu maqueta". La persona puede estar preguntando simplemente por curiosidad, para aprender o por gusto personal. Háblale con naturalidad y cortesía.`;

// gemini-3.8-flash como modelo principal, con gemini-3.1-flash-lite como respaldo ultra-rápido
const MODELS_PRIORITY = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

// Generador asíncrono con control de tiempo para evitar demoras por saturación
async function* streamWithModelFallback(contents: any[]) {
  let lastError = null;

  for (const model of MODELS_PRIORITY) {
    let hasYielded = false;
    try {
      // Intentar iniciar el stream con un límite razonable de espera inicial
      const streamPromise = ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Si el modelo tarda más de 3.5 segundos en responder por saturación, pasar al siguiente
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout de inicio de modelo')), 3500)
      );

      const responseStream = await Promise.race([streamPromise, timeoutPromise]);

      for await (const chunk of responseStream) {
        if (chunk.text) {
          hasYielded = true;
          yield chunk.text;
        }
      }
      return;
    } catch (err: any) {
      lastError = err;
      if (!hasYielded) {
        continue;
      } else {
        throw err;
      }
    }
  }

  throw lastError;
}

// Endpoint de Chat con Streaming (SSE)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Lista de mensajes requerida' });
      return;
    }

    // Para sesiones largas (20, 30 o más preguntas), mantener los últimos 20 turnos para máxima agilidad
    const recentMessages = messages.slice(-20);
    const contents = recentMessages.map((m: { role: string; text: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    for await (const text of streamWithModelFallback(contents)) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: unknown) {
    const err = error as Error;
    if (!res.headersSent) {
      res.status(500).json({ error: 'Hubo un error al procesar tu pregunta sobre el Día de Muertos.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Error durante la respuesta' })}\n\n`);
      res.end();
    }
  }
});

// Montar Vite en desarrollo o estáticos en producción
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de Mictli iniciado en http://0.0.0.0:${PORT}`);
  });
}

startServer();
