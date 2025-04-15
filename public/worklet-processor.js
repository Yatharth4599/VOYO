class PCMProcessor extends AudioWorkletProcessor {
    process(inputs) {
      const input = inputs[0][0];
      if (!input) return true;
  
      const pcm = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        pcm[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff;
      }
  
      const uint8Array = new Uint8Array(pcm.buffer);
      const base64 = btoa(String.fromCharCode(...uint8Array));
      this.port.postMessage({ base64 });
  
      return true;
    }
  }
  
  registerProcessor("pcm-processor", PCMProcessor);
  