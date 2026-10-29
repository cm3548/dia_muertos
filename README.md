# Mictli · Asistente y Chatbot del Día de Muertos 🌼💀

Aplicación web interactiva desarrollada con **React 19**, **TypeScript**, **Express** y la **API de Gemini**. Diseñada especialmente para estudiantes y público general interesado en explorar y aprender sobre las tradiciones, historia, ofrendas y cosmovisión del **Día de Muertos** en México.

---

## 🌟 Características

- **Enfoque Temático Exclusivo:** Responde con rigor histórico y cultural a cualquier duda sobre el Día de Muertos (Mictlán, elementos de la ofrenda, cempasúchil, pan de muerto, La Catrina, fechas del 27 de octubre al 2 de noviembre, tradiciones regionales como Xantolo o Janitzio, y patrimonio de la UNESCO).
- **Atención Cordial y Educada:** Ante preguntas no relacionadas, declina amablemente invitando a conocer más de la festividad mexicana.
- **Nivel Secundaria:** Lenguaje accesible, explicaciones estructuradas con viñetas y raíces nahuas claras.
- **Streaming en Tiempo Real:** Respuestas fluidas con Server-Sent Events (SSE).
- **Herramientas Útiles:** Lectura en voz alta (Text-to-Speech), botón para copiar respuestas y contador de preguntas realizadas.

---

## 🛠️ Tecnologías

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Marked.
- **Backend:** Node.js, Express, TSX.
- **Inteligencia Artificial:** `@google/genai` (Google Gemini 3.8 Flash con respaldo automático).
- **Empaquetador:** Vite 6.

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/mictli-dia-de-muertos.git
cd mictli-dia-de-muertos
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y agrega tu clave gratuita de Google Gemini (puedes obtenerla gratis en [aistudio.google.com](https://aistudio.google.com)):
```bash
cp .env.example .env
```
Edita `.env`:
```env
GEMINI_API_KEY="AIzaSy..."
PORT=3000
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

---


### Opción B: Vercel o Railway
También puedes desplegarlo conectando tu repositorio de GitHub a Vercel o Railway en menos de 2 minutos.
