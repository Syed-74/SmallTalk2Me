import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recognition = null;
    this.isRecording = false;
    this.responseMode = "short";
    this.resumeContent = "";
    this.companyContext = {};
  }

  setResumeContent(content) {
    this.resumeContent = content;
    console.log("Resume Content Updated");
  }

  setCompanyContext(context) {
    this.companyContext = context;
    console.log("Company Context Updated:", context.name);
  }

  setResponseMode(mode) {
    this.responseMode = mode;
    console.log("Response Mode Updated:", mode);
  }

  startSpeechRecognition(sessionId, onResult) {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      return;
    }

    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        console.log("Detected Question:", finalTranscript);
        this.sendToAI(sessionId, finalTranscript);
        if (onResult) onResult(finalTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    this.recognition.start();
    this.isRecording = true;
  }

  stopSpeechRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
    }
  }

  sendToAI(sessionId, questionText, aiProvider = "chatgpt", context = {}) {
    socket.emit("process_question", {
      sessionId,
      questionText,
      aiProvider,
      responseMode: this.responseMode,
      context: {
        ...context,
        resumeInfo: this.resumeContent,
        companyInfo: this.companyContext
      }
    });
  }
}

export const audioService = new AudioService();
