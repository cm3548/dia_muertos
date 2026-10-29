import React, { useState } from 'react';
import { X, Flame, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { ALTAR_ELEMENTS } from '../data/altarData.ts';
import { AltarElement } from '../types.ts';

interface AltarExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskQuestion: (question: string) => void;
}

export const AltarExplorerModal: React.FC<AltarExplorerModalProps> = ({
  isOpen,
  onClose,
  onAskQuestion,
}) => {
  const [selectedElement, setSelectedElement] = useState<AltarElement>(ALTAR_ELEMENTS[0]);
  const [filter, setFilter] = useState<'all' | 'guias' | 'elementos' | 'ofrenda'>('all');

  if (!isOpen) return null;

  const filteredElements = ALTAR_ELEMENTS.filter(
    (el) => filter === 'all' || el.category === filter
  );

  const handleAsk = (element: AltarElement) => {
    onAskQuestion(element.promptQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#120b22] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-amber-900/40 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
              🕯️
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-amber-200">
                Explorador Interactivo del Altar
              </h2>
              <p className="text-xs text-amber-300/70">
                Descubre el simbolismo sagrado de cada elemento de la ofrenda tradicional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-amber-400 hover:text-amber-100 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-amber-900/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs text-amber-400/70 font-medium">Categorías:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-white/5 text-amber-200 hover:bg-white/10'
            }`}
          >
            Todos ({ALTAR_ELEMENTS.length})
          </button>
          <button
            onClick={() => setFilter('guias')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'guias'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-white/5 text-amber-200 hover:bg-white/10'
            }`}
          >
            Guías y Luz
          </button>
          <button
            onClick={() => setFilter('elementos')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'elementos'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-white/5 text-amber-200 hover:bg-white/10'
            }`}
          >
            Purificación y Elementos
          </button>
          <button
            onClick={() => setFilter('ofrenda')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'ofrenda'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-white/5 text-amber-200 hover:bg-white/10'
            }`}
          >
            Alimentos y Festivos
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Elements Grid List */}
          <div className="md:col-span-5 grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredElements.map((elem) => {
              const isSelected = selectedElement.id === elem.id;
              return (
                <button
                  key={elem.id}
                  onClick={() => setSelectedElement(elem)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-900/30 ring-1 ring-amber-400/50'
                      : 'bg-white/5 border-amber-900/30 hover:bg-white/10 hover:border-amber-500/30'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{elem.icon}</div>
                  <h4 className="text-xs font-semibold text-amber-100 line-clamp-1">
                    {elem.name}
                  </h4>
                  <p className="text-[10px] text-amber-300/60 line-clamp-1 mt-0.5">
                    {elem.symbolism}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Element Detail Card */}
          <div className="md:col-span-7 bg-black/40 border border-amber-500/20 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner">
                    {selectedElement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-amber-200">
                      {selectedElement.name}
                    </h3>
                    {selectedElement.nahuatlName && (
                      <p className="text-xs italic text-orange-400 font-medium mt-0.5">
                        Náhuatl: {selectedElement.nahuatlName}
                      </p>
                    )}
                  </div>
                </div>

                <span className="px-2.5 py-1 text-[11px] rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                  {selectedElement.category === 'guias'
                    ? 'Guía Espiritual'
                    : selectedElement.category === 'elementos'
                    ? 'Elemento Sagrado'
                    : 'Ofrenda Tradicional'}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  Significado Simbólico
                </h4>
                <p className="text-sm text-amber-100 font-medium">
                  {selectedElement.symbolism}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1b122f]/80 border border-amber-900/40">
                <h4 className="text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Dato Clave para tu Proyecto Escolar
                </h4>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  {selectedElement.detailedFact}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-800/30">
                <p className="text-xs text-orange-200/90 italic">
                  💡 "¿Sabías que los 4 elementos naturales (tierra, agua, viento y fuego) siempre deben estar presentes en el altar?"
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-900/30 mt-4 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => handleAsk(selectedElement)}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Preguntar a Mictli sobre este elemento</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
