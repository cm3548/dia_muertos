import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, XCircle, RefreshCw, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TriviaQuestion } from '../types.ts';

interface TriviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskQuestion: (question: string) => void;
}

export const TriviaModal: React.FC<TriviaModalProps> = ({
  isOpen,
  onClose,
  onAskQuestion,
}) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/trivia-questions');
      if (res.ok) {
        const data = await res.json();
        // Mezclar y tomar 5
        const shuffled = [...data.questions].sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffled);
        setCurrentIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowExplanation(false);
        setIsFinished(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || isFinished) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      if (score >= 3) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'],
        });
      }
    }
  };

  const handleAskMictli = () => {
    if (!currentQ) return;
    onAskQuestion(`Mictli, en la trivia escolar me salió esta pregunta: "${currentQ.question}". ¿Podrías profundizar más en este tema para mi apunte escolar?`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#120b22] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-900/40 flex items-center justify-between bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-purple-200">
                Trivia de Repaso para Secundaria
              </h2>
              <p className="text-xs text-purple-300/70">
                Pon a prueba tus conocimientos para tus tareas y proyectos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-purple-400 hover:text-purple-100 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-12 text-center text-purple-300 flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 animate-spin text-purple-400" />
              <p className="text-sm">Preparando preguntas del Mictlán...</p>
            </div>
          ) : isFinished ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-3xl">
                {score >= 4 ? '🏆' : score >= 2 ? '🎖️' : '📚'}
              </div>
              <h3 className="text-2xl font-bold font-heading text-purple-100">
                ¡Has completado el repaso!
              </h3>
              <p className="text-sm text-purple-200/80">
                Obtuviste <span className="font-bold text-amber-400 text-lg">{score}</span> de{' '}
                <span className="font-bold text-lg">{questions.length}</span> aciertos.
              </p>
              <p className="text-xs text-purple-300/70 max-w-sm mx-auto">
                {score >= 4
                  ? '¡Excelente dominio de las tradiciones! Estás listo para sacar 10 en tu proyecto de secundaria.'
                  : '¡Buen intento! Recuerda que puedes preguntarle a Mictli cualquier duda sobre estos temas.'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={fetchQuestions}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Jugar otra vez</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-semibold transition-all"
                >
                  Volver al chat
                </button>
              </div>
            </div>
          ) : currentQ ? (
            <div className="space-y-4">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-purple-300/80">
                <span>
                  Pregunta {currentIndex + 1} de {questions.length}
                </span>
                <span className="font-medium text-amber-300">Puntaje: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-semibold text-purple-100 leading-snug pt-2">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let style = 'bg-white/5 border-purple-900/40 text-purple-200 hover:bg-white/10';
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      style = 'bg-black/20 border-purple-950/40 opacity-40 text-purple-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                      )}
                      {selectedOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="mt-4 p-3.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-purple-200 space-y-2 animate-fadeIn">
                  <p className="font-semibold text-amber-300">💡 Explicación Escolar:</p>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <button
                      onClick={handleAskMictli}
                      className="text-xs text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Preguntarle más a Mictli</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
                    >
                      {currentIndex + 1 === questions.length ? 'Ver Resultados' : 'Siguiente Pregunta'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
