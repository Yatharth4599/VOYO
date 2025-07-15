import AgentBuilder from '@/components/agent-builder/AgentBuilder';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/landingV2/ThemeToggle';

export default function AgentBuilderPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-[#f5f1e8] dark:bg-gray-900">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <AgentBuilder />
      </div>
    </ThemeProvider>
  );
} 