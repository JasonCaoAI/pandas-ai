import { useQuery } from '@tanstack/react-query';
import { HealthService } from '@/lib/api';

export function useHealth() {
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: () => HealthService.healthV1MonitoringHealthGet(),
  });

  return {
    health: healthQuery.data,
    isLoading: healthQuery.isLoading,
    error: healthQuery.error,
  };
} 