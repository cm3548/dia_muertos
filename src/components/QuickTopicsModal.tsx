import React from 'react';
import { X, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { STUDY_TOPICS } from '../data/altarData.ts';

interface QuickTopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (question: string) => void;
}

export const QuickTopicsModal: React.FC<QuickTopicsModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  if (!isOpen) return null;

  const handleSelect = (question: string) => {
    onSelectTopic(question);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#120b22] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-teal-900/40 flex items-center justify-between bg-gradient-to-r from-teal-950/40 via-emerald-950/40 to-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-teal-200">
                Guías de Estudio para Secundaria
              </h2>
              <p className="text-xs text-teal-300/70">
                Temas frecuentes para exposiciones, tareas y exámenes escolares
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-teal-400 hover:text-teal-100 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-3">
          <div className="p-3 bg-teal-950/30 border border-teal-800/30 rounded-xl text-xs text-teal-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span>
              Selecciona cualquiera de estos temas y Mictli te generará un resumen completo, estructurado y claro con datos para tu cuaderno.
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {STUDY_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(topic.question)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-teal-900/30 hover:border-teal-400/50 hover:bg-teal-950/20 text-left transition-all group flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-400 font-mono">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-sm font-semibold text-teal-100 group-hover:text-teal-200">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-xs text-teal-300/70 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-300 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
