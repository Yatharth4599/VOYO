"use client";

import React, { useEffect, useRef, useState } from "react";

export default function VoiceRecorderModal({ onClose }) {
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

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 128.0;
        const y = middle + (v - 1.0) * middle * 0.75; // compress height a bit

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#1A3A6C");
      gradient.addColorStop(0.5, "#57A0D3");
      gradient.addColorStop(1, "#F59F24");
      canvasCtx.strokeStyle = gradient;
      canvasCtx.lineWidth = 4;
      canvasCtx.lineJoin = "round";
      canvasCtx.lineCap = "round";
      canvasCtx.stroke();
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

  const playNextAudio = () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;
    const buffer = audioQueueRef.current.shift();
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    isPlayingRef.current = true;
    source.onended = () => {
      isPlayingRef.current = false;
      playNextAudio();
    };
    source.start();
  };

  const startWebSocket = () => {
    const socket = new WebSocket("wss://api.elevenlabs.io/v1/convai/conversation?agent_id=fmbVD2UvN89DSPzYqZaG");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "conversation_initiation_client_data"
        })
      );
    };

    socket.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "audio" && data.audio_event?.audio_base_64) {
        const raw = atob(data.audio_event.audio_base_64);
        const buffer = new ArrayBuffer(raw.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < raw.length; i++) {
          view[i] = raw.charCodeAt(i);
        }

        const dataView = new DataView(buffer);
        const pcm = new Float32Array(buffer.byteLength / 2);
        for (let i = 0; i < pcm.length; i++) {
          const val = dataView.getInt16(i * 2, true); // little-endian
          pcm[i] = val / 32768;
        }

        const audioBuffer = audioContextRef.current.createBuffer(1, pcm.length, 16000);
        audioBuffer.copyToChannel(pcm, 0);
        audioQueueRef.current.push(audioBuffer);
        playNextAudio();
      }
    };

    socket.onerror = (err) => console.error("WebSocket Error:", err);
    socket.onclose = () => console.log("WebSocket closed");
  };

  const stopWebSocket = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const base64ToBlob = (base64, type = "application/octet-stream") => {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h3 className="text-2xl font-bold text-[#1A3A6C] mb-4">
          {recording ? "Talking to Urvashi..." : "Talk to Urvashi"}
        </h3>
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="mx-auto bg-gray-100 rounded-lg mb-4"
        />
        {!recording && (
          <button
            onClick={startTalking}
            className="bg-[#F59F24] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#e08a00] transition"
          >
            Start Talking
          </button>
        )}
        {recording && (
          <button
            onClick={() => setRecording(false)}
            className="bg-[#e08a00] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#c46c00] transition"
          >
            Stop
          </button>
        )}
        <p className="text-xs text-[#666] mt-3">You’re chatting live with Urvashi</p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-[#1A3A6C] underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
