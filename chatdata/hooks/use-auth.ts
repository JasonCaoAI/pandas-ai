import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersService, LoginUserRequest } from '@/lib/api';

export function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginUserRequest) => 
      UsersService.loginUserV1UsersLoginPost({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => UsersService.getUserV1UsersMeGet(),
  });

  const updateFeaturesMutation = useMutation({
    mutationFn: (features: Record<string, any>) =>
      UsersService.updateUserRoutesV1UsersUpdateFeaturesPatch({ requestBody: features }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    user: meQuery.data,
    isLoadingUser: meQuery.isLoading,
    userError: meQuery.error,
    updateFeatures: updateFeaturesMutation.mutate,
    isUpdatingFeatures: updateFeaturesMutation.isPending,
  };
} 