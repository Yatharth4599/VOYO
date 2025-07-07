import { createApiUrl } from './config';

// Types for API responses
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LanguagesResponse {
  languages: Language[];
  total: number;
}

export interface Voice {
  voice_id: string;
  name: string;
  description: string;
  preview_url: string;
  labels: {
    accent: string;
    descriptive: string;
    age: string;
    gender: string;
    language: string;
    use_case: string;
  };
  verified_languages: Array<{
    language: string;
    model_id: string;
    accent: string;
    locale: string;
    preview_url: string;
  }>;
}

export interface VoicesResponse {
  voices: {
    voices: Voice[];
  };
}

// API functions
export const fetchLanguages = async (): Promise<Language[]> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/languages'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch languages: ${response.statusText}`);
  }

  const data: LanguagesResponse = await response.json();
  
  // Hardcode English and Hindi at the beginning
  const hardcodedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];
  
  // Filter out English and Hindi from API data if they exist, then combine
  const apiLanguages = data.languages.filter(lang => 
    lang.code !== 'en' && lang.code !== 'hi'
  );
  
  return [...hardcodedLanguages, ...apiLanguages];
};

export const fetchVoices = async (): Promise<Voice[]> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/voices'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch voices: ${response.statusText}`);
  }

  const data: VoicesResponse = await response.json();
  return data.voices.voices;
};

// Agent-related types and functions
export interface AgentDetails {
  agent_id: string;
  name: string;
  conversation_config: {
    asr: {
      quality: string;
      provider: string;
      user_input_audio_format: string;
      keywords: string[];
    };
    turn: {
      turn_timeout: number;
      silence_end_call_timeout: number;
      mode: string;
    };
    tts: {
      model_id: string;
      voice_id: string;
      supported_voices: string[];
      agent_output_audio_format: string;
      optimize_streaming_latency: number;
      stability: number;
      speed: number;
      similarity_boost: number;
      pronunciation_dictionary_locators: string[];
    };
    conversation: {
      text_only: boolean;
      max_duration_seconds: number;
      client_events: string[];
    };
    language_presets: Record<string, unknown>;
    agent: {
      first_message: string;
      language: string;
      dynamic_variables: {
        dynamic_variable_placeholders: Record<string, unknown>;
      };
      prompt: {
        prompt: string;
        llm: string;
        temperature: number;
        max_tokens: number;
        tools: unknown[];
        mcp_server_ids: string[];
        native_mcp_server_ids: string[];
        knowledge_base: unknown[];
        custom_llm: unknown;
        ignore_default_personality: boolean;
        rag: {
          enabled: boolean;
          embedding_model: string;
          max_vector_distance: number;
          max_documents_length: number;
          max_retrieved_rag_chunks_count: number;
        };
      };
    };
  };
  platform_settings: {
    auth: {
      enable_auth: boolean;
      allowlist: string[];
      shareable_token: string | null;
    };
    evaluation: {
      criteria: unknown[];
    };
    widget: {
      variant: string;
      placement: string;
      expandable: string;
      avatar: {
        type: string;
        color_1: string;
        color_2: string;
      };
      feedback_mode: string;
      bg_color: string;
      text_color: string;
      btn_color: string;
      btn_text_color: string;
      border_color: string;
      focus_color: string;
      border_radius: string | null;
      btn_radius: string | null;
      action_text: string | null;
      start_call_text: string | null;
      end_call_text: string | null;
      expand_text: string | null;
      listening_text: string | null;
      speaking_text: string | null;
      shareable_page_text: string | null;
      shareable_page_show_terms: boolean;
      terms_text: string | null;
      terms_html: string | null;
      terms_key: string | null;
      show_avatar_when_collapsed: boolean;
      disable_banner: boolean;
      override_link: string | null;
      mic_muting_enabled: boolean;
      transcript_enabled: boolean;
      text_input_enabled: boolean;
      text_contents: Record<string, unknown>;
      styles: Record<string, unknown>;
      language_selector: boolean;
      supports_text_only: boolean;
      custom_avatar_path: string | null;
      language_presets: Record<string, unknown>;
    };
    data_collection: Record<string, unknown>;
    overrides: {
      conversation_config_override: {
        tts: {
          voice_id: boolean;
        };
        conversation: {
          text_only: boolean;
        };
        agent: {
          first_message: boolean;
          language: boolean;
          prompt: {
            prompt: boolean;
          };
        };
      };
      custom_llm_extra_body: boolean;
      enable_conversation_initiation_client_data_from_webhook: boolean;
    };
    call_limits: {
      agent_concurrency_limit: number;
      daily_limit: number;
    };
    privacy: {
      record_voice: boolean;
      retention_days: number;
      delete_transcript_and_pii: boolean;
      delete_audio: boolean;
      apply_to_existing_conversations: boolean;
      zero_retention_mode: boolean;
    };
    workspace_overrides: {
      conversation_initiation_client_data_webhook: string | null;
      webhooks: {
        post_call_webhook_id: string | null;
      };
    };
    safety: {
      is_blocked_ivc: boolean;
      is_blocked_non_ivc: boolean;
      ignore_safety_evaluation: boolean;
    };
  };
  tags: string[];
}

export const fetchAgentDetails = async (agentId: string): Promise<AgentDetails> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl(`/users/agents/${agentId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch agent details: ${response.statusText}`);
  }

  return response.json();
};

export const updateAgent = async (agentId: string, agentData: Omit<AgentDetails, 'agent_id'>): Promise<AgentDetails> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl(`/users/agents/${agentId}`), {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agentData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update agent: ${response.statusText}`);
  }

  return response.json();
};

// Knowledge Base types and functions
export interface KnowledgeDocument {
  id: string;
  name: string;
  created_at_unix: number;
  description?: string;
  metadata?: unknown;
  type: 'file' | 'url' | 'text';
  supported_usages?: string[];
  access_info?: unknown;
}

export interface KnowledgeBaseResponse {
  documents: KnowledgeDocument[];
  has_more: boolean;
  next_cursor?: string;
}

export const fetchUserKnowledgeBase = async (): Promise<KnowledgeDocument[]> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/user/knowledge-base'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch knowledge base: ${response.statusText}`);
  }

  const data: KnowledgeBaseResponse = await response.json();
  return data.documents;
};

// Metrics and Agents types and functions for Dashboard
export interface MetricsResponse {
  total_calls: number;
  active_calls: number;
  average_duration: number;
  most_agents_called: Array<{
    agent_id: string;
    count: number;
  }>;
}

export interface Agent {
  agent_id: string;
  name: string;
  tags: string[];
  created_at_unix_secs: number;
  access_info: {
    is_creator: boolean;
    creator_name: string;
    creator_email: string;
    role: string;
  };
}

export interface AgentsResponse {
  agents: Agent[];
}

export const fetchUserMetrics = async (): Promise<MetricsResponse> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/users/metrics'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user metrics: ${response.statusText}`);
  }

  return response.json();
};

export const fetchUserAgents = async (): Promise<Agent[]> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/users/agents'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user agents: ${response.statusText}`);
  }

  const data: AgentsResponse = await response.json();
  return data.agents;
};

// Daily metrics types and functions
export interface DailyMetric {
  date: string;
  total_calls: number;
  success_rate: number;
}

export interface DailyMetricsResponse {
  daily: DailyMetric[];
}

export const fetchDailyMetrics = async (startDate?: string, endDate?: string, agentId?: string): Promise<DailyMetric[]> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  let url = '/metrics/daily';
  const params = new URLSearchParams();
  
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  if (agentId) params.append('agent_id', agentId);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(createApiUrl(url), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch daily metrics: ${response.statusText}`);
  }

  const data: DailyMetricsResponse = await response.json();
  return data.daily;
};

// User profile types and functions
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export const fetchCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('jwtToken');
  if (!token) throw new Error('Authentication required');

  const response = await fetch(createApiUrl('/me'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.statusText}`);
  }

  return response.json();
};

export { createApiUrl };
