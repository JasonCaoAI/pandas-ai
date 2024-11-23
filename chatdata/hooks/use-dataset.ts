import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatasetService, DatasetUpdateRequestModel } from '@/lib/api';

export function useDataset(datasetId?: string) {
  const queryClient = useQueryClient();

  // Dataset queries
  const datasetsQuery = useQuery({
    queryKey: ['datasets'],
    queryFn: () => DatasetService.getAllDatasetsV1DatasetsGet(),
  });

  const datasetDetailsQuery = useQuery({
    queryKey: ['dataset', datasetId],
    queryFn: () => datasetId 
      ? DatasetService.getDatasetV1DatasetsDatasetIdGet({ datasetId })
      : null,
    enabled: !!datasetId,
  });

  // Dataset mutations
  const updateDatasetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DatasetUpdateRequestModel }) =>
      DatasetService.updateDatasetsV1DatasetsDatasetIdPut({
        datasetId: id,
        requestBody: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
      if (datasetId) {
        queryClient.invalidateQueries({ queryKey: ['dataset', datasetId] });
      }
    },
  });

  const deleteDatasetMutation = useMutation({
    mutationFn: (id: string) =>
      DatasetService.deleteDatasetsV1DatasetsDatasetIdDelete({ datasetId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });

  const downloadDatasetMutation = useMutation({
    mutationFn: (id: string) =>
      DatasetService.downloadDatasetV1DatasetsDownloadDatasetIdGet({ datasetId: id }),
  });

  return {
    // Dataset listings
    datasets: datasetsQuery.data?.datasets || [],
    isLoadingDatasets: datasetsQuery.isLoading,
    
    // Single dataset details
    dataset: datasetDetailsQuery.data?.dataset,
    isLoadingDataset: datasetDetailsQuery.isLoading,
    
    // Dataset operations
    updateDataset: updateDatasetMutation.mutate,
    deleteDataset: deleteDatasetMutation.mutate,
    downloadDataset: downloadDatasetMutation.mutate,
    isModifying: updateDatasetMutation.isPending || 
                 deleteDatasetMutation.isPending || 
                 downloadDatasetMutation.isPending,
  };
} 