import { useQuery } from '@tanstack/react-query';
import { LogsService } from '@/lib/api';

export function useLogDetails(logId: string) {
  const logQuery = useQuery({
    queryKey: ['log', logId],
    queryFn: () => LogsService.getLogV1LogsLogIdGet({ logId }),
    enabled: !!logId,
  });

  return {
    log: logQuery.data,
    isLoading: logQuery.isLoading,
    error: logQuery.error,
  };
} 