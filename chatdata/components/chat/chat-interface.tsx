'use client';

import { useAuth } from '@/hooks/use-auth';
import { useChat } from '@/hooks/use-chat';

export function ChatInterface() {
  const { user } = useAuth();
  const { sendMessage, isSending, conversations } = useChat();

  const handleSendMessage = async (message: string) => {
    if (!user?.space?.id) return;

    await sendMessage({
      workspace_id: user.space.id,
      query: message,
    });
  };

  return (
    <div>
      {/* Chat UI implementation */}
    </div>
  );
} 