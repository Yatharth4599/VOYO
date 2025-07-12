# VOYO - AI Agent Marketplace Platform

VOYO is a comprehensive AI agent marketplace platform that allows users to build, deploy, and monetize AI agents. The platform provides a unified API for accessing all agents and a no-code builder for creating custom workflows.

## 🚀 Features

### Core Platform
- **Unified API**: Single endpoint to access all AI agents
- **No-Code Agent Builder**: Drag-and-drop workflow builder with ReactFlow
- **Agent Marketplace**: Public marketplace for discovering and using agents
- **User Role System**: Separate experiences for companies and agent creators
- **Real-time Analytics**: Track agent usage and performance

### Agent Builder
- **Visual Workflow Editor**: Drag-and-drop interface for building agent logic
- **Multiple Node Types**: Input, LLM, API calls, memory, conditions, output
- **Node Configuration**: Detailed settings for each node type
- **Workflow Testing**: Built-in testing and preview functionality
- **Version Control**: Save and version agent workflows

### Marketplace
- **Agent Discovery**: Browse and search public agents
- **Category Filtering**: Filter by use case (Sales, Marketing, Support, etc.)
- **Agent Testing**: Test agents before using them
- **Usage Analytics**: Track agent performance and popularity

### Integrations (Phase 2)
- **Slack Integration**: Deploy agents as Slack bots
- **WhatsApp Integration**: Connect via Twilio or Meta API
- **Web Widget**: Embed agents in websites
- **API Access**: RESTful API for programmatic access

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Workflow Engine**: Custom execution engine
- **State Management**: Zustand
- **UI Components**: Custom components with Lucide icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VOYO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/voyo_db"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Open Prisma Studio
   npx prisma studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
VOYO/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── agent/                # Agent execution API
│   │   └── agents/               # Agent management API
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # User dashboard
│   ├── marketplace/              # Agent marketplace
│   └── agent-builder/            # Agent builder interface
├── components/                   # React components
│   ├── agent-builder/            # Agent builder components
│   ├── auth/                     # Authentication components
│   └── landingV2/                # Landing page components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Database connection
│   └── stores/                   # Zustand stores
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema file
└── public/                       # Static assets
```

## 🔧 API Usage

### Unified Agent API

Execute any agent with a single API call:

```bash
POST /api/agent/{agent_id}/run
Content-Type: application/json

{
  "user_id": "user123",
  "input": "Hello, can you help me with customer support?"
}
```

Response:
```json
{
  "success": true,
  "output": "I'd be happy to help with customer support!",
  "duration": 1250,
  "agent": {
    "id": "agent123",
    "name": "Customer Support Bot",
    "description": "Handles customer inquiries"
  }
}
```

### Agent Management API

```bash
# Get marketplace agents
GET /api/agents/marketplace

# Get user's agents
GET /api/agents/my-agents

# Create new agent
POST /api/agents
{
  "name": "My Agent",
  "description": "Agent description",
  "logicJson": {...},
  "visibility": "PRIVATE"
}
```

## 🎨 Agent Builder

The agent builder provides a visual interface for creating AI workflows:

### Node Types
- **Input Node**: Collect user input
- **LLM Node**: Process with AI language models
- **API Node**: Make external API calls
- **Memory Node**: Store and retrieve data
- **Condition Node**: Add conditional logic
- **Output Node**: Send final response

### Workflow Example
```
User Input → LLM Processing → API Call → Condition Check → Response
```

## 🔐 Authentication

The platform supports multiple authentication methods:
- Email/Password (credentials)
- Google OAuth
- Custom OAuth providers

User types:
- **Company**: Use agents for business automation
- **Agent Creator**: Build and monetize agents

## 📊 Database Schema

### Core Models
- **User**: User accounts with role-based access
- **Agent**: Agent definitions with workflow logic
- **AgentRun**: Execution logs and analytics
- **Tool**: Available tools and integrations
- **Integration**: User's connected services

### Key Relationships
- Users can own multiple agents
- Agents can be public or private
- Agent runs track usage and performance
- Integrations enable external connections

## 🚀 Deployment

### Prerequisites
- PostgreSQL database
- OpenAI API key
- NextAuth configuration

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform

### Recommended Platforms
- Vercel (recommended for Next.js)
- Railway
- DigitalOcean App Platform
- AWS/GCP with custom setup

## 🔮 Future Features

### Phase 2
- **Vector Database**: Advanced memory and context
- **Agent Versioning**: Version control for agents
- **Stripe Integration**: Monetization and billing
- **Advanced Analytics**: Detailed performance metrics
- **Team Collaboration**: Multi-user agent development

### Phase 3
- **Agent Templates**: Pre-built agent templates
- **Advanced Integrations**: More third-party services
- **Mobile App**: Native mobile experience
- **Enterprise Features**: SSO, advanced security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**VOYO** - Build your AI team. Plug & play.
