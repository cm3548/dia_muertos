import React, { useState } from 'react';
import { X, PenTool, Sparkles, Copy, Check, MessageSquare, Send } from 'lucide-react';
import { marked } from 'marked';

interface CalaveritaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (prompt: string) => void;
}

export const CalaveritaModal: React.FC<CalaveritaModalProps> = ({
  isOpen,
  onClose,
  onSendToChat,
}) => {
  const [recipient, setRecipient] = useState('');
  const [relation, setRelation] = useState('Profesor(a) de secundaria');
  const [trait, setTrait] = useState('');
  const [tone, setTone] = useState('Divertida y respetuosa para la escuela');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/calaverita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, relation, trait, tone }),
      });

      if (!res.ok) throw new Error('No se pudo generar la calaverita');
      const data = await res.json();
      setResult(data.text);
    } catch (err: unknown) {
      console.error(err);
      setError('Hubo un inconveniente al crear la calaverita. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConsultChat = () => {
    if (!result) return;
    const prompt = `Mictli, generé esta calaverita literaria para mi clase de secundaria:\n\n${result}\n\n¿Podrías analizar su métrica y darme 2 consejos para recitarla ante mis compañeros y maestros?`;
    onSendToChat(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#120b22] border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-pink-900/40 flex items-center justify-between bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-xl">
              ✍️
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-pink-200">
                Taller Escolar de Calaveritas Literarias
              </h2>
              <p className="text-xs text-pink-300/70">
                Crea versos tradicionales en rima para maestros, amigos o materias
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-pink-400 hover:text-pink-100 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-pink-200 mb-1">
                  ¿A quién va dedicada? *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Profesor Martínez / Mi amiga Sofía"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-500/30 text-pink-100 text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-pink-200 mb-1">
                  Relación o rol en la secundaria
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a0f2e] border border-pink-500/30 text-pink-100 text-xs focus:outline-none focus:border-pink-400"
                >
                  <option value="Profesor(a) de secundaria">Profesor(a)</option>
                  <option value="Director(a) o Coordinador(a)">Director(a) o Prefecto</option>
                  <option value="Compañero(a) de clase">Compañero(a) de salón</option>
                  <option value="Mejor amigo(a)">Mejor amigo(a)</option>
                  <option value="El grupo de secundaria">Todo el grupo escolar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-pink-200 mb-1">
                Detalle característico o anécdota escolar (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Siempre pide la tarea de matemáticas, o le gusta el recreo y el fútbol"
                value={trait}
                onChange={(e) => setTrait(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-500/30 text-pink-100 text-xs focus:outline-none focus:border-pink-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-pink-300/80">Tono:</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1a0f2e] border border-pink-500/30 text-pink-100 text-xs focus:outline-none"
                >
                  <option value="Divertida y respetuosa para la escuela">Divertida y escolar</option>
                  <option value="Muy ingeniosa y poética">Poética e ingeniosa</option>
                  <option value="Amable y afectuosa">Afectuosa y cariñosa</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !recipient.trim()}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-950/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-pink-200" />
                    <span>Rimando con la Catrina...</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    <span>Componer Calaverita</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-200 text-xs">
              {error}
            </div>
          )}

          {/* Generated Result */}
          {result && (
            <div className="mt-4 p-5 rounded-2xl bg-black/50 border border-pink-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-pink-900/30 pb-2">
                <span className="text-xs font-semibold text-pink-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  Tu Calaverita Tradicional
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-xs border border-pink-500/30 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiada' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              <div
                className="text-xs sm:text-sm text-pink-100 whitespace-pre-line leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: marked.parse(result) as string }}
              />

              <div className="pt-3 border-t border-pink-900/30 flex justify-end">
                <button
                  onClick={handleConsultChat}
                  className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-medium flex items-center gap-2 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-300" />
                  <span>Preguntar a Mictli consejos de declamación</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
