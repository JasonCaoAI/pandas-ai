import { useQuery } from '@tanstack/react-query';
import { LogsService } from '@/lib/api';

export function useLogs(skip = 0, limit = 10) {
  const logsQuery = useQuery({
    queryKey: ['logs', skip, limit],
    queryFn: () => LogsService.getLogsV1LogsGet({ skip, limit }),
  });

  const logDetailsQuery = useQuery({
    queryKey: ['log-details', skip, limit],
    queryFn: () => LogsService.getLogV1LogsLogIdGet({ logId: '' }),
    enabled: false, // Only enable when needed
  });

  return {
    logs: logsQuery.data?.logs || [],
    totalCount: logsQuery.data?.logs_count || 0,
    isLoading: logsQuery.isLoading,
    error: logsQuery.error,
  };
} 