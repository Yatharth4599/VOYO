"use client";

import React, { useEffect, useRef, useState } from "react";

export default function VoiceRecorderModal({ onClose, agentId }) {
  const [recording, setRecording] = useState(false);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const processorRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  const currentSourceRef = useRef(null);


  useEffect(() => {
    if (recording) {
      startWaveform();
      startWebSocket();
    } else {
      stopWaveform();
      stopWebSocket();
    }
  }, [recording]);

  const startTalking = () => {
    if (!agentId) {
      console.error("No agent ID provided");
      return;
    }
    setRecording(true);
  };

  const stopWaveform = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const startWaveform = async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    audioContextRef.current = audioContext;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const source = audioContext.createMediaStreamSource(stream);
    sourceRef.current = source;
    analyserRef.current = audioContext.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    const stopAIPlayback = () => {
      if (isPlayingRef.current) {
        audioQueueRef.current = [];
    
        if (currentSourceRef.current) {
          currentSourceRef.current.stop();
          currentSourceRef.current.disconnect();
          currentSourceRef.current = null;
          console.log("👂 User interrupted — AI audio stopped.");
        }
    
        isPlayingRef.current = false;
      }
    };
    
    

    const draw = () => {
      animationFrameRef.current = setTimeout(() => requestAnimationFrame(draw), 60);
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
    
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
      const width = canvas.width;
      const height = canvas.height;
      const middle = height / 2;
      const sliceWidth = width / dataArrayRef.current.length;
      let x = 0;
    
      canvasCtx.beginPath();
    
      let maxAmplitude = 0; // ADD THIS LINE
    
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 128.0;
        const y = middle + (v - 1.0) * middle * 0.75;
    
        if (Math.abs(v - 1.0) > maxAmplitude) {
          maxAmplitude = Math.abs(v - 1.0);
        }
    
        i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
        x += sliceWidth;
      }
    
      const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#d97706");
      gradient.addColorStop(0.5, "#f59e0b");
      gradient.addColorStop(1, "#fbbf24");
    
      canvasCtx.strokeStyle = gradient;
      canvasCtx.lineWidth = 4;
      canvasCtx.lineJoin = "round";
      canvasCtx.lineCap = "round";
      canvasCtx.stroke();
    
      // NEW LOGIC: Stop AI audio if user starts speaking
      if (maxAmplitude > 0.15) { // You can tweak 0.15 to a smaller/larger value based on sensitivity
        stopAIPlayback();
      }
    };
    

    draw();

    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;
    source.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const pcm = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        pcm[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff;
      }
      const uint8Array = new Uint8Array(pcm.buffer);
      const base64 = btoa(String.fromCharCode(...uint8Array));
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ user_audio_chunk: base64 }));
      }
    };
  };

 // Play decoded PCM buffer (reliable and supported everywhere)
 const playNextAudio = () => {
  if (isPlayingRef.current || audioQueueRef.current.length === 0) return;

  const buffer = audioQueueRef.current.shift();
  const source = audioContextRef.current.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContextRef.current.destination);

  currentSourceRef.current = source; // ADD THIS LINE to track the playing source

  isPlayingRef.current = true;

  source.onended = () => {
    isPlayingRef.current = false;
    currentSourceRef.current = null; // Clear reference after done
    playNextAudio();
  };

  source.start();
};


const startWebSocket = () => {
  const socket = new WebSocket(`wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`);
  socketRef.current = socket;

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "conversation_initiation_client_data",
        conversation_config_override: {
          agent: {
            agent_id: agentId
          }
        }
      })
    );
  };

  socket.onmessage = async (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "audio" && data.audio_event?.audio_base_64) {
      try {
        const raw = atob(data.audio_event.audio_base_64);
        const buffer = new ArrayBuffer(raw.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < raw.length; i++) {
          view[i] = raw.charCodeAt(i);
        }

        // Decode to PCM (not mp3) — guaranteed to work
        const dataView = new DataView(buffer);
        const pcm = new Float32Array(buffer.byteLength / 2);
        for (let i = 0; i < pcm.length; i++) {
          const val = dataView.getInt16(i * 2, true);
          pcm[i] = val / 32768;
        }

        const audioBuffer = audioContextRef.current.createBuffer(1, pcm.length, 16000);
        audioBuffer.copyToChannel(pcm, 0);
        audioQueueRef.current.push(audioBuffer);
        playNextAudio();
      } catch (err) {
        console.error("🎧 Failed to decode incoming audio:", err);
      }
    }
  };

  socket.onerror = (err) => console.error("WebSocket Error:", err);
  socket.onclose = () => console.log("WebSocket closed");
};

  

  const stopWebSocket = () => {
    if (processorRef.current) processorRef.current.disconnect();
    if (socketRef.current) socketRef.current.close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h3 className="text-2xl font-bold text-amber-700 mb-4">
          {recording ? "Talking to Agent..." : "Talk to Your AI Agent"}
        </h3>
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg mb-4"
        />
        {!recording ? (
          <button
            onClick={startTalking}
            disabled={!agentId}
            className={`font-semibold px-6 py-2 rounded-full transition ${
              agentId 
                ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-md' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {agentId ? 'Start Talking' : 'No Agent Available'}
          </button>
        ) : (
          <button
            onClick={() => setRecording(false)}
            className="bg-amber-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-amber-700 shadow-md transition"
          >
            Stop
          </button>
        )}
        <p className="text-xs text-gray-600 mt-3">You’re chatting live with Agent</p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-amber-600 underline hover:text-amber-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}