import { useMutation, useQuery } from '@tanstack/react-query';
import { ConversationsService } from '@/lib/api';

export function useConversations(skip = 0, limit = 10) {
  const conversationsQuery = useQuery({
    queryKey: ['conversations', skip, limit],
    queryFn: () => ConversationsService.conversationsV1ConversationsGet({ skip, limit }),
  });

  const conversationMessagesMutation = useMutation({
    mutationFn: ({ convId, skip = 0, limit = 10 }: { convId: string; skip?: number; limit?: number }) =>
      ConversationsService.conversationMessagesV1ConversationsConvIdMessagesGet({ convId, skip, limit }),
  });

  const deleteConversationMutation = useMutation({
    mutationFn: (convId: string) =>
      ConversationsService.deleteConversationV1ConversationsConvIdDelete({ convId }),
  });

  return {
    conversations: conversationsQuery.data,
    isLoading: conversationsQuery.isLoading,
    error: conversationsQuery.error,
    getMessages: conversationMessagesMutation.mutate,
    deleteConversation: deleteConversationMutation.mutate,
  };
} 