import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { marked } from 'marked';
import { ChatMessage } from '../types.ts';

const SUGGESTIONS = [
  '¿Por qué el pan de muerto tiene cuatro canillas y una bolita arriba?',
  '¿Qué significan los 9 niveles del Mictlán?',
  '¿Cuál es la diferencia histórica y cultural entre Día de Muertos y Halloween?',
  '¿Qué día llegan las almas de las mascotas y cómo se les recibe?',
  '¿Qué simbolizan la sal, el agua y el copal en la ofrenda?',
  '¿Quién creó a La Catrina y qué historia tiene?',
  '¿Cómo se celebra el Xantolo en la Huasteca?',
  '¿Cómo se compone una calaverita literaria tradicional?',
];

export interface ChatViewRef {
  resetChat: () => void;
}

export const ChatView = forwardRef<ChatViewRef, {}>((_props, ref) => {
  const initialGreeting: ChatMessage = {
    id: 'welcome',
    role: 'model',
    text: `¡Hola! 👋🌼 Soy **Mictli**, un asistente dedicado a compartir la historia, cultura y tradiciones del **Día de Muertos** en México.

Puedo responder con mucho gusto y de manera clara cualquier duda que tengas sobre:

* 🕯️ **El Altar y la Ofrenda**: El significado del cempasúchil, la sal, el agua, las velas, el copal o el pan de muerto.
* 🏛️ **Raíces Prehispánicas**: El Mictlán, sus 9 niveles y la cosmovisión mexica.
* 💀 **Calaveritas y La Catrina**: Su historia, origen satírico y versos tradicionales.
* 🗺️ **Costumbres de México**: Cómo se celebra en Michoacán, Oaxaca, Mixquic y la Huasteca (Xantolo).

*Mi enfoque es únicamente sobre el Día de Muertos.* ¿Hay algo de esta tradición que te gustaría conocer hoy?`,
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: `¡Hola de nuevo! 🌼 ¿Qué te gustaría saber hoy sobre las tradiciones del **Día de Muertos**?`,
        timestamp: new Date(),
      },
    ]);
  };

  useImperativeHandle(ref, () => ({
    resetChat: handleReset,
  }));

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    const modelMessageId = 'model-' + (Date.now() + 1);
    const initialModelMessage: ChatMessage = {
      id: modelMessageId,
      role: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages([...updatedMessages, initialModelMessage]);
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      if (!response.body) {
        throw new Error('No se recibió flujo de datos.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === modelMessageId
                      ? { ...msg, text: accumulatedText }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Ignore partial chunk
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelMessageId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelMessageId
            ? {
                ...msg,
                text: 'Ocurrió una breve interrupción en la conexión. Por favor intenta plantear nuevamente tu duda sobre el Día de Muertos.',
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const plainText = text.replace(/[*#_`>]/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'es-MX';
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-65px)] max-w-4xl w-full mx-auto p-2 sm:p-4">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-2 py-2 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          const isSpeaking = speakingId === message.id;
          const isCopied = copiedId === message.id;

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              } animate-fadeIn`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-md ${
                  isUser
                    ? 'bg-amber-600/30 border border-amber-500/50 text-amber-200'
                    : 'bg-[#180f2d] border border-amber-500/40 text-amber-300'
                }`}
              >
                {isUser ? '👤' : '💀'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-amber-600/90 to-orange-700/90 text-white rounded-tr-sm border border-amber-400/30 font-medium'
                    : 'bg-[#140c24] border border-amber-500/20 text-amber-50 rounded-tl-sm shadow-amber-950/20'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 text-[11px] opacity-80 mb-2 border-b border-white/10 pb-1.5">
                  <span className="font-semibold tracking-wide">
                    {isUser ? 'Tú' : 'Mictli'}
                  </span>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Content */}
                {isUser ? (
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </p>
                ) : (
                  <div>
                    {message.text ? (
                      <div
                        className="text-xs sm:text-sm leading-relaxed space-y-2 prose prose-invert prose-amber max-w-none prose-p:my-1.5 prose-headings:text-amber-300 prose-headings:font-heading prose-headings:my-2 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-amber-300"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(message.text) as string,
                        }}
                      />
                    ) : message.isStreaming ? (
                      <div className="flex items-center gap-2 text-amber-300/80 text-xs py-2">
                        <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Mictli está respondiendo...</span>
                      </div>
                    ) : null}

                    {/* Actions for Assistant Message */}
                    {!message.isStreaming && message.text && (
                      <div className="mt-3 pt-2 border-t border-amber-900/30 flex items-center justify-end gap-2 text-[11px]">
                        <button
                          onClick={() => handleSpeak(message.id, message.text)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 transition-colors"
                          title={isSpeaking ? 'Detener lectura' : 'Escuchar respuesta'}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                              <span className="text-rose-300">Silenciar</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Escuchar</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(message.id, message.text)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 transition-colors"
                          title="Copiar texto"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-400" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] text-amber-400/70 font-semibold uppercase tracking-wider flex-shrink-0">
          Sugerencias:
        </span>
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(item)}
            disabled={isStreaming}
            className="px-3 py-1.5 text-xs rounded-xl bg-white/5 hover:bg-amber-500/10 border border-amber-900/30 hover:border-amber-500/40 text-amber-200 hover:text-amber-100 transition-all whitespace-nowrap flex-shrink-0 disabled:opacity-40"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="pt-1">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl bg-[#140c24] border border-amber-500/30 focus-within:border-amber-400/70 shadow-lg shadow-black/40 p-2 sm:p-2.5 transition-all"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Pregunta lo que desees sobre el Día de Muertos (ej. ¿Qué significa el cempasúchil en el altar?)..."
              className="w-full bg-transparent text-amber-100 text-xs sm:text-sm placeholder:text-amber-300/40 resize-none focus:outline-none p-1.5 max-h-32 leading-relaxed"
            />

            <div className="flex items-center gap-1.5 pb-1">
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-40 text-slate-950 font-bold flex items-center justify-center transition-all shadow-md shadow-amber-900/40 hover:scale-105 active:scale-95"
                title="Enviar pregunta a Mictli"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-1 border-t border-amber-900/20 text-[10px] text-amber-400/60">
            <span>Presiona Enter para enviar · Shift+Enter para salto de línea</span>
            <span className="font-medium text-amber-300/80">
              {messages.filter((m) => m.role === 'user').length > 0
                ? `${messages.filter((m) => m.role === 'user').length} pregunta${messages.filter((m) => m.role === 'user').length === 1 ? '' : 's'} realizada${messages.filter((m) => m.role === 'user').length === 1 ? '' : 's'}`
                : 'Enfoque exclusivo en Día de Muertos'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});

ChatView.displayName = 'ChatView';
