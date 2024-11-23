import { useQuery } from '@tanstack/react-query';
import { HealthService, LogsService } from '@/lib/api';

export function useMonitoring(logId?: string) {
  // Health check
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: () => HealthService.healthV1MonitoringHealthGet(),
  });

  // Logs management
  const logsQuery = useQuery({
    queryKey: ['logs'],
    queryFn: () => LogsService.getLogsV1LogsGet({ skip: 0, limit: 10 }),
  });

  const logDetailsQuery = useQuery({
    queryKey: ['log', logId],
    queryFn: () => logId 
      ? LogsService.getLogV1LogsLogIdGet({ logId })
      : null,
    enabled: !!logId,
  });

  return {
    // Health status
    health: healthQuery.data,
    isHealthy: healthQuery.data?.status === 'OK',
    isCheckingHealth: healthQuery.isLoading,
    
    // Logs
    logs: logsQuery.data?.logs || [],
    totalLogs: logsQuery.data?.logs_count || 0,
    isLoadingLogs: logsQuery.isLoading,
    
    // Single log details
    currentLog: logDetailsQuery.data,
    isLoadingLog: logDetailsQuery.isLoading,
  };
} 