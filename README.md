# Mictli · Asistente y Chatbot del Día de Muertos 🌼💀

> **Demostración en vivo en la nube:**  
> 🔗 [https://dia-muertos.onrender.com](https://dia-muertos.onrender.com)  
> *(Servidor de respaldo: [Google Cloud Run Demo](https://ais-pre-6xe5h3kchzp7egwxcxevoy-897752684886.us-east1.run.app))*

---

## 📖 Descripción del Proyecto

**Mictli** es un asistente interactivo inteligente desarrollado con **React 19**, **TypeScript**, **Express** y la **API de Google Gemini**. Está diseñado para responder cualquier duda sobre la cosmovisión, historia, simbolismos y tradiciones del **Día de Muertos** en México con un tono educativo, cordial y accesible para nivel secundaria (12 a 15 años).

### 🎯 Enfoque y Reglas de Comportamiento:
- **Cobertura exhaustiva:** El Mictlán (9 niveles prehispánicos), elementos de la ofrenda (cempasúchil, agua, sal, velas, copal, pan de muerto), calendario tradicional (27 de octubre al 2 de noviembre), La Catrina de José Guadalupe Posada, diferencias históricas con Halloween y patrimonio inmaterial de la UNESCO.
- **Filtro temático estricto y cordial:** Si se le pregunta sobre materias ajenas (matemáticas, física, videojuegos, deportes), el bot declina con mucha educación y amabilidad, invitando a explorar la tradición mexicana.
- **Sin ataduras escolares forzadas:** Responde con claridad tanto a estudiantes como a cualquier persona que pregunte por pura curiosidad cultural.

---

## 🛠️ Requisitos Previos

Para ejecutar este proyecto en tu propia computadora o de forma remota, necesitas:
* **Node.js** (versión 18, 20 o superior) **o Bun** (v1.0+)
* **Git** instalado
* Una **API Key gratuita de Google Gemini** (se obtiene gratis en 1 clic en [aistudio.google.com/apikey](https://aistudio.google.com/apikey)).

---

## 🚀 Guía de Instalación y Ejecución Local / Remota

Sigue estos 4 pasos para ejecutar el proyecto en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/cm3548/dia_muertos.git
cd dia_muertos
```

### 2. Instalar dependencias
Con **npm**:
```bash
npm install
```
*(O con **bun** si lo tienes instalado: `bun install`)*.

### 3. Configurar la clave de API
Crea tu archivo `.env` a partir del archivo de ejemplo:
```bash
cp .env.example .env
```

Abre `.env` en cualquier editor de texto y agrega tu clave de Gemini:
```env
GEMINI_API_KEY="AIzaSyTuClaveDeGeminiAqui"
PORT=3000
```

### 4. Ejecutar la aplicación

#### Modo Desarrollo:
```bash
npm run dev
# o con bun:
bun run dev
```

#### Modo Producción (Recomendado para evaluación):
```bash
npm run build
npm start
# o con bun:
bun run build
bun run start
```

Abre tu navegador web en:  
👉 **`http://localhost:3000`**

---

## 🧪 Casos de Prueba Recomendados para Evaluación

Para probar la calidad y el cumplimiento de los requerimientos del chatbot:

1. **Pregunta cultural:**  
   * *"¿Por qué el pan de muerto tiene esa forma circular y cuatro canillas?"*
2. **Pregunta histórica/prehispánica:**  
   * *"¿Cuáles son los 9 niveles del Mictlán y qué perro ayudaba a cruzarlos?"*
3. **Pregunta de calendario tradicional:**  
   * *"¿Qué día llegan las almas de las mascotas y qué se les pone en la ofrenda?"*
4. **Prueba de filtro (pregunta fuera de tema):**  
   * *"¿Cómo resuelvo una ecuación cuadrática?"* o *"¿Quién ganó el partido de fútbol?"*  
   * *Resultado esperado:* El bot responderá con gran cordialidad y educación recordando que su enfoque es exclusivamente el Día de Muertos.

---

## 📦 Estructura del Código

```text
dia_muertos/
├── index.html                 # Punto de entrada HTML con tipografía y metadatos
├── server.ts                  # Servidor Express + integración Google Gemini API + Vite
├── vite.config.ts             # Configuración de empaquetado Vite + Tailwind
├── package.json               # Dependencias y scripts de inicio
├── .env.example               # Plantilla de variables de entorno
└── src/
    ├── main.tsx               # Montaje de React 19
    ├── App.tsx                # Contenedor principal de la aplicación
    ├── types.ts               # Tipos TypeScript para mensajes y ofrendas
    ├── components/
    │   ├── Header.tsx         # Cabecera festiva con estilo Día de Muertos
    │   └── ChatView.tsx       # Interfaz de conversación, streaming y TTS
    └── data/
        └── altarData.ts       # Datos históricos y culturales del altar
```

---

## 📄 Licencia y Créditos
Proyecto desarrollado con fines educativos y de preservación cultural mexicana.
