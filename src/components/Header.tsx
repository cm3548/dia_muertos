import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onResetChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetChat }) => {
  return (
    <header className="border-b border-amber-900/40 bg-[#0e0918]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Festive Papel Picado Top Ribbon */}
      <div className="flex h-2.5 w-full overflow-hidden">
        <div className="flex-1 bg-amber-500 transform -skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-pink-600 transform skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-purple-700 transform -skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-teal-500 transform skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-orange-600 transform -skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-rose-500 transform skew-x-12 opacity-90"></div>
        <div className="flex-1 bg-amber-400 transform -skew-x-12 opacity-90"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-pink-600 p-[2px] shadow-lg shadow-amber-900/40 flex-shrink-0">
            <div className="w-full h-full bg-[#130b22] rounded-[14px] flex items-center justify-center text-lg">
              💀
            </div>
            <div className="absolute -bottom-1 -right-1 text-xs">🌼</div>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-amber-300 tracking-wide flex items-center gap-2">
              Mictli
              <span className="text-xs font-normal text-amber-400/80 font-sans border-l border-amber-800/60 pl-2">
                Asistente del Día de Muertos
              </span>
            </h1>
            <p className="text-xs text-amber-200/70">
              Respuestas cordiales y claras sobre nuestras tradiciones e historia
            </p>
          </div>
        </div>

        {/* Clean Reset action */}
        {onResetChat && (
          <button
            onClick={onResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 border border-amber-900/40 hover:border-amber-500/40 text-xs transition-all"
            title="Iniciar nueva conversación"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Nueva charla</span>
          </button>
        )}
      </div>
    </header>
  );
};
