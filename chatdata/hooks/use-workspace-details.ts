import { useMutation, useQuery } from '@tanstack/react-query';
import { WorkspaceService, WorkspaceCreateRequestModel } from '@/lib/api';

export function useWorkspaceDetails(workspaceId: string) {
  const workspaceQuery = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceDetailsV1WorkspaceWorkspaceIdDetailsGet({ workspaceId }),
    enabled: !!workspaceId,
  });

  const workspaceUsersQuery = useQuery({
    queryKey: ['workspace-users', workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceUsersV1WorkspaceWorkspaceIdUsersGet({ workspaceId }),
    enabled: !!workspaceId,
  });

  const workspaceDatasetsQuery = useQuery({
    queryKey: ['workspace-datasets', workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceDatasetsV1WorkspaceWorkspaceIdDatasetsGet({ workspaceId }),
    enabled: !!workspaceId,
  });

  const editWorkspaceMutation = useMutation({
    mutationFn: (data: WorkspaceCreateRequestModel) =>
      WorkspaceService.editWorkspaceV1WorkspaceWorkspaceIdEditPut({
        workspaceId,
        requestBody: data,
      }),
  });

  return {
    workspace: workspaceQuery.data,
    users: workspaceUsersQuery.data?.users || [],
    datasets: workspaceDatasetsQuery.data?.datasets || [],
    isLoading: workspaceQuery.isLoading || workspaceUsersQuery.isLoading || workspaceDatasetsQuery.isLoading,
    editWorkspace: editWorkspaceMutation.mutate,
  };
} 