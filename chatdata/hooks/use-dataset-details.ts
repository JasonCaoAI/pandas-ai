import { useMutation, useQuery } from '@tanstack/react-query';
import { DatasetService } from '@/lib/api';

export function useDatasetDetails(datasetId: string) {
  const datasetQuery = useQuery({
    queryKey: ['dataset', datasetId],
    queryFn: () => DatasetService.getDatasetV1DatasetsDatasetIdGet({ datasetId }),
    enabled: !!datasetId,
  });

  const downloadDatasetMutation = useMutation({
    mutationFn: (datasetId: string) =>
      DatasetService.downloadDatasetV1DatasetsDownloadDatasetIdGet({ datasetId }),
  });

  return {
    dataset: datasetQuery.data?.dataset,
    isLoading: datasetQuery.isLoading,
    error: datasetQuery.error,
    downloadDataset: downloadDatasetMutation.mutate,
  };
} 