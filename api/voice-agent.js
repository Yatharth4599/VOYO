import formidable from "formidable";
import fs from "fs";
import axios from "axios";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(500).json({ error: "Failed to receive audio" });
    }

    const audioFile = files.audio?.[0];
    if (!audioFile) {
      console.error("❌ No audio file found in upload.");
      return res.status(400).json({ error: "No audio uploaded" });
    }

    console.log("📥 Received audio file:", audioFile.originalFilename || audioFile.newFilename);

    try {
      const audioBuffer = fs.readFileSync(audioFile.filepath);
      console.log("📤 Sending audio to ElevenLabs agent...");

      const response = await axios.post(
        "https://api.elevenlabs.io/v1/agents/fmbVD2UvN89DSPzYqZaG/audio-input",
        audioBuffer,
        {
          headers: {
            "xi-api-key": process.env.ELEVEN_LABS_KEY,
            "Content-Type": "audio/webm",
          },
          responseType: "arraybuffer",
        }
      );

      console.log("✅ Received response from ElevenLabs — streaming back...");
      res.setHeader("Content-Type", "audio/mpeg");
      res.status(200).send(Buffer.from(response.data));
    } catch (error) {
      const errMsg = error.response?.data || error.message;
      console.error("❌ ElevenLabs Agent Error:", errMsg);
      return res.status(500).json({ error: "Agent failed to respond", details: errMsg });
    }
  });
}
