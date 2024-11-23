import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatService, ConversationsService, ChatRequest } from '@/lib/api';

export function useChat(conversationId?: string) {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: (data: ChatRequest) => 
      ChatService.chatV1ChatPost({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (conversationId) {
        queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] });
      }
    },
  });

  const conversationsQuery = useQuery({
    queryKey: ['conversations'],
    queryFn: () => ConversationsService.conversationsV1ConversationsGet({ skip: 0, limit: 10 }),
  });

  const conversationMessagesQuery = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => conversationId 
      ? ConversationsService.conversationMessagesV1ConversationsConvIdMessagesGet({
          convId: conversationId,
          skip: 0,
          limit: 50,
        })
      : null,
    enabled: !!conversationId,
  });

  return {
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
    conversations: conversationsQuery.data,
    isLoadingConversations: conversationsQuery.isLoading,
    messages: conversationMessagesQuery.data,
    isLoadingMessages: conversationMessagesQuery.isLoading,
  };
} 