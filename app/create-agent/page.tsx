'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBars, FaMicrophone, FaPaperPlane, FaCheckCircle, FaUserAlt, FaTimes, FaPlay, FaPause, FaSave, FaStop } from 'react-icons/fa';
import VoiceRecorderModal from '@/components/VoiceRecorderModal';
import Image from 'next/image';
import { createApiUrl } from '@/lib/config';
import { fetchLanguages, fetchVoices, fetchAgentDetails, updateAgent, fetchUserKnowledgeBase, Language, Voice, AgentDetails, KnowledgeDocument } from '@/lib/api';

export default function CreateAgentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get('id');
  const isEditMode = !!agentId;

  const [form, setForm] = useState({
    name: '',
    language: 'hi',
    firstMessage: '',
    speed: 0.7, // Default to fast speed (minimum allowed)
    voiceId: 'vghiSqG5ezdhd8F3tKAD', // Default voice ID
    promptText: '',
    knowledgeFile: null as File | null,
    selectedKnowledgeId: '', // For existing knowledge base documents
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedKnowledgeId, setUploadedKnowledgeId] = useState<string | null>(null);
  const [uploadedKnowledgeName, setUploadedKnowledgeName] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [loadingAgent, setLoadingAgent] = useState(false);
  const [originalAgentData, setOriginalAgentData] = useState<AgentDetails | null>(null);
  const [knowledgeDocuments, setKnowledgeDocuments] = useState<KnowledgeDocument[]>([]);
  const [loadingKnowledge, setLoadingKnowledge] = useState(false);
  const [existingKnowledgeBase, setExistingKnowledgeBase] = useState<any[]>([]);
  const [createdAgentId, setCreatedAgentId] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      setForm((prev) => ({ ...prev, [name]: target.files?.[0] ?? null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: target.value }));
      
      // Filter voices when language changes
      if (name === 'language') {
        filterVoicesByLanguage(target.value);
        // Reset voice selection when language changes
        setForm((prev) => ({ ...prev, voiceId: '' }));
      }
    }
  };

  // Load languages, voices, and agent data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingLanguages(true);
        const languagesData = await fetchLanguages();
        setLanguages(Array.isArray(languagesData) ? languagesData : []);
      } catch (error) {
        console.error('Failed to load languages:', error);
        setLanguages([]); // Fallback to empty array
      } finally {
        setLoadingLanguages(false);
      }

      try {
        setLoadingVoices(true);
        const voicesData = await fetchVoices();
        setVoices(Array.isArray(voicesData) ? voicesData : []);
        filterVoicesByLanguage(form.language, Array.isArray(voicesData) ? voicesData : []);
      } catch (error) {
        console.error('Failed to load voices:', error);
        setVoices([]); // Fallback to empty array
      } finally {
        setLoadingVoices(false);
      }

      // Load user's knowledge base documents
      try {
        setLoadingKnowledge(true);
        const knowledgeData = await fetchUserKnowledgeBase();
        setKnowledgeDocuments(Array.isArray(knowledgeData) ? knowledgeData : []);
      } catch (error) {
        console.error('Failed to load knowledge base:', error);
        setKnowledgeDocuments([]);
      } finally {
        setLoadingKnowledge(false);
      }

      // Load agent data if in edit mode
      if (isEditMode && agentId) {
        try {
          setLoadingAgent(true);
          const agentData = await fetchAgentDetails(agentId);
          setOriginalAgentData(agentData);
          
          // Store existing knowledge base
          setExistingKnowledgeBase(agentData.conversation_config.agent.prompt.knowledge_base || []);
          
          // Set the agent ID for conversation
          setCreatedAgentId(agentId);
          
          // Populate form with agent data
          setForm({
            name: agentData.name,
            language: agentData.conversation_config.agent.language,
            firstMessage: agentData.conversation_config.agent.first_message,
            speed: agentData.conversation_config.tts.speed,
            voiceId: agentData.conversation_config.tts.voice_id,
            promptText: agentData.conversation_config.agent.prompt.prompt,
            knowledgeFile: null, // Can't restore file, only show existing knowledge
            selectedKnowledgeId: '', // Reset selection
          });
          
          // Filter voices based on loaded language
          filterVoicesByLanguage(agentData.conversation_config.agent.language, Array.isArray(voicesData) ? voicesData : []);
        } catch (error) {
          console.error('Failed to load agent data:', error);
          setError('Failed to load agent data');
        } finally {
          setLoadingAgent(false);
        }
      }
    };

    loadData();
  }, [isEditMode, agentId]);


  // Filter voices by selected language
  const filterVoicesByLanguage = (selectedLanguage: string, voicesList: Voice[] = voices) => {
    const filtered = voicesList.filter(voice => 
      voice.verified_languages.some(lang => lang.language === selectedLanguage)
    );
    setFilteredVoices(filtered);
  };


  // Handle voice preview play/pause
  const handleVoicePreview = (voiceId: string, previewUrl: string) => {
    if (playingVoice === voiceId) {
      // Stop current audio
      if (audioElements[voiceId]) {
        audioElements[voiceId].pause();
        audioElements[voiceId].currentTime = 0;
      }
      setPlayingVoice(null);
    } else {
      // Stop any currently playing audio
      Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      
      // Play new audio
      let audio = audioElements[voiceId];
      if (!audio) {
        audio = new Audio(previewUrl);
        audio.onended = () => setPlayingVoice(null);
        setAudioElements(prev => ({ ...prev, [voiceId]: audio }));
      }
      
      audio.play();
      setPlayingVoice(voiceId);
    }
  };


  // Upload knowledge base file
  const uploadKnowledgeFile = async (): Promise<{ id: string; name: string } | null> => {
    if (!form.knowledgeFile) return null;

    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('Authentication required');

    const formData = new FormData();
    formData.append('file', form.knowledgeFile);

    const res = await fetch(createApiUrl('/user/knowledge-base/file'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`File upload failed: ${errorText || res.statusText}`);
    }

    return await res.json();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validation
      if (!form.name.trim()) {
        setError('Agent name is required');
        return;
      }
      
      if (!form.voiceId) {
        setError('Please select a voice');
        return;
      }

      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      if (isEditMode) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('Authentication required');

      // Step 1: Build knowledge base array
      let knowledgeBase: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
      
      // Add selected existing document if any
      if (form.selectedKnowledgeId) {
        const selectedDoc = knowledgeDocuments.find(doc => doc.documentation_id === form.selectedKnowledgeId);
        if (selectedDoc) {
          knowledgeBase.push({
            type: "text",
            name: selectedDoc.name,
            id: selectedDoc.documentation_id,
            usage_mode: "auto"
          });
        }
      }
      
      // Upload new file if provided
      if (form.knowledgeFile) {
        const uploadResult = await uploadKnowledgeFile();
        if (uploadResult) {
          knowledgeBase.push({
            type: "text",
            name: uploadResult.name,
            id: uploadResult.id,
            usage_mode: "auto"
          });
          setUploadedKnowledgeId(uploadResult.id);
          setUploadedKnowledgeName(uploadResult.name);
        }
      }

      // Step 2: Create the agent with the complete payload structure
      const payload = {
        name: form.name,
        conversation_config: {
          asr: {
            quality: "high",
            provider: "elevenlabs",
            user_input_audio_format: "pcm_16000",
            keywords: []
          },
          turn: {
            turn_timeout: 7,
            silence_end_call_timeout: -1,
            mode: "turn"
          },
          tts: {
            model_id: "eleven_flash_v2_5",
            voice_id: form.voiceId,
            supported_voices: [],
            agent_output_audio_format: "pcm_16000",
            optimize_streaming_latency: 3,
            stability: 0.5,
            speed: parseFloat(form.speed.toString()),
            similarity_boost: 0.8,
            pronunciation_dictionary_locators: []
          },
          conversation: {
            text_only: false,
            max_duration_seconds: 300,
            client_events: [
              "audio",
              "interruption",
              "user_transcript",
              "agent_response",
              "agent_response_correction"
            ]
          },
          language_presets: {},
          agent: {
            first_message: form.firstMessage,
            language: form.language,
            dynamic_variables: {
              dynamic_variable_placeholders: {}
            },
            prompt: {
              prompt: form.promptText,
              llm: "gpt-4o",
              temperature: 0.5,
              max_tokens: -1,
              tools: [
                {
                  id: "pGa1HnYGPglmSrnbSnUa",
                  name: "Stop",
                  description: "Stop when user starts to say something",
                  response_timeout_secs: 20,
                  type: "client",
                  parameters: null,
                  expects_response: false,
                  dynamic_variables: {
                    dynamic_variable_placeholders: {}
                  }
                },
                {
                  id: "6NaWCAa9jwrECZJISecs",
                  name: "end_call",
                  description: "",
                  response_timeout_secs: 20,
                  type: "system",
                  params: {
                    system_tool_type: "end_call"
                  }
                }
              ],
              tool_ids: [
                "pGa1HnYGPglmSrnbSnUa",
                "6NaWCAa9jwrECZJISecs"
              ],
              mcp_server_ids: [],
              native_mcp_server_ids: [],
              knowledge_base: knowledgeBase,
              custom_llm: null,
              ignore_default_personality: false,
              rag: {
                enabled: true,
                embedding_model: "multilingual_e5_large_instruct",
                max_vector_distance: 0.6,
                max_documents_length: 50000,
                max_retrieved_rag_chunks_count: 20
              }
            }
          }
        },
        platform_settings: {
          auth: {
            enable_auth: false,
            allowlist: [],
            shareable_token: null
          },
          evaluation: {
            criteria: []
          },
          widget: {
            variant: "compact",
            placement: "bottom-right",
            expandable: "never",
            avatar: {
              type: "orb",
              color_1: "#2792DC",
              color_2: "#9CE6E6"
            },
            feedback_mode: "during",
            bg_color: "#ffffff",
            text_color: "#000000",
            btn_color: "#000000",
            btn_text_color: "#ffffff",
            border_color: "#e1e1e1",
            focus_color: "#000000",
            border_radius: null,
            btn_radius: null,
            action_text: null,
            start_call_text: null,
            end_call_text: null,
            expand_text: null,
            listening_text: null,
            speaking_text: null,
            shareable_page_text: null,
            shareable_page_show_terms: true,
            terms_text: null,
            terms_html: null,
            terms_key: null,
            show_avatar_when_collapsed: true,
            disable_banner: false,
            override_link: null,
            mic_muting_enabled: false,
            transcript_enabled: false,
            text_input_enabled: true,
            text_contents: {},
            styles: {},
            language_selector: false,
            supports_text_only: true,
            custom_avatar_path: null,
            language_presets: {}
          },
          data_collection: {},
          overrides: {
            conversation_config_override: {
              tts: {
                voice_id: false
              },
              conversation: {
                text_only: false
              },
              agent: {
                first_message: false,
                language: true,
                prompt: {
                  prompt: false
                }
              }
            },
            custom_llm_extra_body: false,
            enable_conversation_initiation_client_data_from_webhook: false
          },
          call_limits: {
            agent_concurrency_limit: -1,
            daily_limit: 100000
          },
          privacy: {
            record_voice: true,
            retention_days: 730,
            delete_transcript_and_pii: true,
            delete_audio: true,
            apply_to_existing_conversations: false,
            zero_retention_mode: false
          },
          workspace_overrides: {
            conversation_initiation_client_data_webhook: null,
            webhooks: {
              post_call_webhook_id: null
            }
          },
          safety: {
            is_blocked_ivc: false,
            is_blocked_non_ivc: false,
            ignore_safety_evaluation: false
          }
        },
        tags: []
      };

      const res = await fetch(createApiUrl('/agents'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create agent: ${errorText || res.statusText}`);
      }

      const result = await res.json();
      setSuccess(`Agent created successfully! Agent ID: ${result.agent_id}`);
      
      // Store the created agent ID for potential conversation
      setCreatedAgentId(result.agent_id);
      
      // Don't reset form or redirect - keep user on the page
      // They can continue editing or start talking to the agent
  };

  const handleUpdate = async () => {
    if (!originalAgentData || !agentId) {
      throw new Error('Agent data not loaded');
    }

    // Step 1: Build knowledge base array
    let knowledgeBase: any[] = [...originalAgentData.conversation_config.agent.prompt.knowledge_base]; // Start with existing knowledge base
    
    // Add selected existing document if any (avoid duplicates)
    if (form.selectedKnowledgeId) {
      const selectedDoc = knowledgeDocuments.find(doc => doc.documentation_id === form.selectedKnowledgeId);
      const alreadyExists = knowledgeBase.some(doc => doc.id === form.selectedKnowledgeId);
      
      if (selectedDoc && !alreadyExists) {
        knowledgeBase.push({
          type: "text",
          name: selectedDoc.name,
          id: selectedDoc.documentation_id,
          usage_mode: "auto"
        });
      }
    }
    
    // Upload new file if provided
    if (form.knowledgeFile) {
      const uploadResult = await uploadKnowledgeFile();
      if (uploadResult) {
        knowledgeBase.push({
          type: "text",
          name: uploadResult.name,
          id: uploadResult.id,
          usage_mode: "auto"
        });
        setUploadedKnowledgeId(uploadResult.id);
        setUploadedKnowledgeName(uploadResult.name);
      }
    }

    // Step 2: Update the agent with modified data while preserving structure
    const updatedAgentData = {
      ...originalAgentData,
      name: form.name,
      conversation_config: {
        ...originalAgentData.conversation_config,
        tts: {
          ...originalAgentData.conversation_config.tts,
          voice_id: form.voiceId,
          speed: parseFloat(form.speed.toString()),
        },
        agent: {
          ...originalAgentData.conversation_config.agent,
          first_message: form.firstMessage,
          language: form.language,
          prompt: {
            ...originalAgentData.conversation_config.agent.prompt,
            prompt: form.promptText,
            knowledge_base: knowledgeBase,
          }
        }
      }
    };

    // Remove agent_id from the payload as it's in the URL
    const { agent_id, ...updatePayload } = updatedAgentData;

    await updateAgent(agentId, updatePayload);
    setSuccess(`Agent updated successfully!`);
    
    // Store the updated agent ID for potential conversation
    setCreatedAgentId(agentId);
    
    // Don't reset form or redirect - keep user on the page
    // They can continue editing or start talking to the agent
  };

  // Show loading state while agent data is being fetched in edit mode
  if (isEditMode && loadingAgent) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[#0F1117] to-[#070A0F] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading agent data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-gradient-to-tr from-[#FAF8F3] to-[#F5F2EA] text-gray-800 px-6 md:px-16 py-12 w-full flex gap-12 relative overflow-hidden">
      {/* Background Stars */}
      <Image src="/stars-bg.svg" alt="background" fill className="absolute opacity-10 object-cover" />

      {/* Collapsible Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 z-50 p-6 shadow-2xl space-y-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-600">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-gray-700 cursor-pointer">
              <FaTimes size={20} />
            </button>
          </div>
          <ul className="space-y-4">
            <li><a href="/dashboard" className="block text-lg text-gray-700 hover:text-amber-600 transition-colors">Dashboard</a></li>
            <li><a href="/agents" className="block text-lg text-gray-700 hover:text-amber-600 transition-colors">Agents</a></li>
            <li><a href="/knowledge-base" className="block text-lg text-gray-700 hover:text-amber-600 transition-colors">Knowledge Base</a></li>
          </ul>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-10 z-10">
        <div className="flex items-center gap-3">
          <button className="text-gray-700 hover:text-amber-600 cursor-pointer transition-colors" onClick={() => setMenuOpen(true)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-4xl font-bold text-amber-700 tracking-tight flex items-center gap-2">
            <FaUserAlt className="text-amber-600" /> {isEditMode ? 'Edit Your AI Agent' : 'Create Your AI Agent'}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">Agent Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Aisha Assistant" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all" />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">Language</label>
            <select 
              name="language" 
              value={form.language} 
              onChange={handleChange} 
              disabled={loadingLanguages}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all disabled:opacity-50"
            >
              {loadingLanguages ? (
                <option>Loading languages...</option>
              ) : languages.length > 0 ? (
                languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.flag} {language.name}
                  </option>
                ))
              ) : (
                <option>No languages available</option>
              )}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">First Message</label>
            <input name="firstMessage" value={form.firstMessage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all" />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">Voice</label>
            <div className="space-y-2">
              <select 
                name="voiceId" 
                value={form.voiceId} 
                onChange={handleChange} 
                disabled={loadingVoices || filteredVoices.length === 0}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all disabled:opacity-50"
              >
                <option value="">Select a voice...</option>
                {loadingVoices ? (
                  <option>Loading voices...</option>
                ) : (
                  filteredVoices.map((voice) => (
                    <option key={voice.voice_id} value={voice.voice_id}>
                      {voice.name} - {voice.labels.descriptive} ({voice.labels.gender}, {voice.labels.age})
                    </option>
                  ))
                )}
              </select>
              
              {/* Voice Preview */}
              {form.voiceId && (
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                  {(() => {
                    const selectedVoice = filteredVoices.find(v => v.voice_id === form.voiceId);
                    if (!selectedVoice) return null;
                    
                    const languageMatch = selectedVoice.verified_languages.find(vl => vl.language === form.language);
                    const previewUrl = languageMatch?.preview_url || selectedVoice.preview_url;
                    
                    return (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{selectedVoice.name}</p>
                          <p className="text-xs text-gray-600">{selectedVoice.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleVoicePreview(selectedVoice.voice_id, previewUrl)}
                          className="flex items-center gap-2 px-3 py-1 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                        >
                          {playingVoice === selectedVoice.voice_id ? (
                            <><FaPause size={12} /> Stop</>
                          ) : (
                            <><FaPlay size={12} /> Preview</>
                          )}
                        </button>
                      </div>
                    );
                  })()} 
                </div>
              )}
              
              {filteredVoices.length === 0 && !loadingVoices && (
                <p className="text-sm text-gray-400">No voices available for selected language</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">Voice Speed</label>
            <select 
              name="speed" 
              value={form.speed} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all"
            >
              <option value={0.2}>Slow</option>
              <option value={0.5}>Medium</option>
              <option value={0.7}>Fast</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1 font-medium">System Prompt</label>
          <textarea name="promptText" value={form.promptText} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all resize-none" />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1 font-medium">Knowledge Base Documents</label>
          
          {/* Show existing knowledge base documents in edit mode */}
          {isEditMode && existingKnowledgeBase.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-amber-600 mb-2">Currently Attached Documents:</h4>
              <div className="space-y-2">
                {existingKnowledgeBase.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border border-gray-100 p-2 rounded">
                    <div>
                      <p className="text-sm text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-600">ID: {doc.id}</p>
                    </div>
                    <span className="text-xs text-green-600">✓ Attached</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dropdown for selecting existing knowledge documents */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 block mb-1 font-medium">Select Existing Knowledge Document (Optional)</label>
            <select
              name="selectedKnowledgeId"
              value={form.selectedKnowledgeId}
              onChange={handleChange}
              disabled={loadingKnowledge}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all disabled:opacity-50"
            >
              <option value="">-- Select existing document or upload new --</option>
              {loadingKnowledge ? (
                <option>Loading knowledge documents...</option>
              ) : (
                knowledgeDocuments.map((doc) => (
                  <option key={doc.documentation_id} value={doc.documentation_id}>
                    {doc.name} ({doc.type})
                  </option>
                ))
              )}
            </select>
            {form.selectedKnowledgeId && (
              <p className="text-sm text-amber-600 mt-2">
                ✓ Selected: {knowledgeDocuments.find(doc => doc.documentation_id === form.selectedKnowledgeId)?.name}
              </p>
            )}
          </div>

          {/* File upload section */}
          <div>
            <label className="text-sm text-gray-600 block mb-1 font-medium">Or Upload New Knowledge File</label>
            <input 
              type="file" 
              name="knowledgeFile" 
              accept=".txt"
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-white file:cursor-pointer file:font-medium hover:file:bg-amber-600 file:transition-colors"
            />
            {form.knowledgeFile && (
              <p className="text-sm text-amber-600 mt-2">
                Selected: {form.knowledgeFile.name} ({(form.knowledgeFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
            {uploadedKnowledgeId && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Knowledge file uploaded: {uploadedKnowledgeName} (ID: {uploadedKnowledgeId})
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          {/* Voice Chat Button for Mobile */}
          {createdAgentId && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowVoiceModal(true)}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-lg font-semibold md:hidden shadow-md transition-all"
            >
              <FaMicrophone /> Talk to Agent
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading || loadingAgent}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl text-lg font-semibold cursor-pointer disabled:opacity-50 shadow-md transition-all"
          >
            {isEditMode ? <FaSave /> : <FaPaperPlane />} 
            {loading ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Agent')}
          </motion.button>
        </div>
      </div>

      {/* Right-side Preview Panel */}
      <div className="hidden md:flex flex-col justify-between w-72 p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl z-10">
        <div>
          <h2 className="text-xl font-bold text-amber-700 mb-4">{isEditMode ? 'Agent Chat' : 'Agent Preview'}</h2>
          {/* Voice Chat Interface */}
          {createdAgentId ? (
            <div className="space-y-4">
              <div className="w-full h-40 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => setShowVoiceModal(true)}
                  className="text-6xl text-amber-600 hover:text-amber-700 transition-all duration-300"
                >
                  <FaMicrophone />
                </button>
              </div>
              
              {/* Chat Instructions */}
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Click microphone to start voice chat</p>
                <p>• Speak naturally with your agent</p>
                <p>• Agent will respond with voice</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full h-40 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-5xl text-gray-400">
                <FaMicrophone className="opacity-50" />
              </div>
              <p className="text-sm text-gray-600">Create or save your agent to start voice conversations.</p>
            </div>
          )}
        </div>
        <div className="space-y-2 mt-6 text-sm">
          <div className="flex items-center gap-2 text-amber-600"><FaCheckCircle /> Identity</div>
          <div className="flex items-center gap-2 text-amber-600"><FaCheckCircle /> Behavior</div>
          <div className="flex items-center gap-2 text-amber-600"><FaCheckCircle /> Knowledge</div>
          {createdAgentId && (
            <div className="flex items-center gap-2 text-amber-600"><FaCheckCircle /> Voice Chat Ready</div>
          )}
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Upload Knowledge Base File</h3>
            <input type="file" name="knowledgeFile" onChange={handleChange} className="w-full p-3 rounded bg-gray-50 border border-gray-200 text-gray-800" />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowFileModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-colors">Cancel</button>
              <button onClick={() => setShowFileModal(false)} className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-white transition-colors">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Chat Modal */}
      {showVoiceModal && (
        <VoiceRecorderModal 
          onClose={() => setShowVoiceModal(false)}
          agentId={createdAgentId}
        />
      )}
    </motion.div>
  );
}