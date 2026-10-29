export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AltarElement {
  id: string;
  name: string;
  nahuatlName?: string;
  symbolism: string;
  category: 'elementos' | 'ofrenda' | 'guias';
  icon: string;
  detailedFact: string;
  promptQuestion: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CalaveritaRequest {
  recipient: string;
  relation: string;
  trait: string;
  tone: string;
}
