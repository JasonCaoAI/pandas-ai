import { useMutation } from '@tanstack/react-query';
import { UsersService } from '@/lib/api';

export function useUserFeatures() {
  const updateFeaturesMutation = useMutation({
    mutationFn: (features: Record<string, any>) =>
      UsersService.updateUserRoutesV1UsersUpdateFeaturesPatch({ requestBody: features }),
  });

  return {
    updateFeatures: updateFeaturesMutation.mutate,
    isUpdating: updateFeaturesMutation.isPending,
    error: updateFeaturesMutation.error,
  };
} 