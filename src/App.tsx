/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Header } from './components/Header.tsx';
import { ChatView, ChatViewRef } from './components/ChatView.tsx';

export default function App() {
  const chatViewRef = useRef<ChatViewRef>(null);

  const handleResetChat = () => {
    chatViewRef.current?.resetChat();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0814] text-amber-50 relative selection:bg-amber-500 selection:text-slate-950">
      {/* Subtle Atmospheric Glowing Ambient Lights */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Header */}
      <Header onResetChat={handleResetChat} />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col relative z-10">
        <ChatView ref={chatViewRef} />
      </main>
    </div>
  );
}
