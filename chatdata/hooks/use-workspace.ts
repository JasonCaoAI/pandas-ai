import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  WorkspaceService, 
  DatasetService,
  WorkspaceCreateRequestModel, 
  DatasetUpdateRequestModel 
} from '@/lib/api';

export function useWorkspace(workspaceId?: string) {
  const queryClient = useQueryClient();

  // Workspace listing and management
  const workspacesQuery = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => WorkspaceService.getUserWorkspacesV1WorkspaceListGet(),
  });

  const workspaceDetailsQuery = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => workspaceId 
      ? Promise.all([
          WorkspaceService.getWorkspaceDetailsV1WorkspaceWorkspaceIdDetailsGet({ workspaceId }),
          WorkspaceService.getWorkspaceUsersV1WorkspaceWorkspaceIdUsersGet({ workspaceId }),
          WorkspaceService.getWorkspaceDatasetsV1WorkspaceWorkspaceIdDatasetsGet({ workspaceId }),
        ])
      : null,
    enabled: !!workspaceId,
  });

  // Workspace mutations
  const createWorkspaceMutation = useMutation({
    mutationFn: (data: WorkspaceCreateRequestModel) => 
      WorkspaceService.addWorkspaceV1WorkspaceAddPost({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });

  const editWorkspaceMutation = useMutation({
    mutationFn: (data: WorkspaceCreateRequestModel) => workspaceId
      ? WorkspaceService.editWorkspaceV1WorkspaceWorkspaceIdEditPut({
          workspaceId,
          requestBody: data,
        })
      : Promise.reject('No workspace ID'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] });
    },
  });

  const deleteWorkspaceMutation = useMutation({
    mutationFn: (id: string) => 
      WorkspaceService.deleteWorkspaceV1WorkspaceWorkspaceIdDelete({ workspaceId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });

  return {
    // Workspace data
    workspaces: workspacesQuery.data,
    currentWorkspace: workspaceDetailsQuery.data?.[0],
    workspaceUsers: workspaceDetailsQuery.data?.[1]?.users || [],
    workspaceDatasets: workspaceDetailsQuery.data?.[2]?.datasets || [],
    isLoading: workspacesQuery.isLoading || workspaceDetailsQuery.isLoading,

    // Workspace operations
    createWorkspace: createWorkspaceMutation.mutate,
    editWorkspace: editWorkspaceMutation.mutate,
    deleteWorkspace: deleteWorkspaceMutation.mutate,
    isModifying: createWorkspaceMutation.isPending || 
                 editWorkspaceMutation.isPending || 
                 deleteWorkspaceMutation.isPending,
  };
} 