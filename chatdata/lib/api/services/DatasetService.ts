/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_dataset_v1_datasets__post } from '../models/Body_create_dataset_v1_datasets__post';
import type { DatasetsDetailsResponseModel } from '../models/DatasetsDetailsResponseModel';
import type { DatasetUpdateRequestModel } from '../models/DatasetUpdateRequestModel';
import type { WorkspaceDatasetsResponseModel } from '../models/WorkspaceDatasetsResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DatasetService {
    /**
     * Get All Datasets
     * @returns WorkspaceDatasetsResponseModel Successful Response
     * @throws ApiError
     */
    public static getAllDatasetsV1DatasetsGet(): CancelablePromise<WorkspaceDatasetsResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/datasets/',
        });
    }
    /**
     * Create Dataset
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createDatasetV1DatasetsPost({
        formData,
    }: {
        formData: Body_create_dataset_v1_datasets__post,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/datasets/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Dataset
     * @returns DatasetsDetailsResponseModel Successful Response
     * @throws ApiError
     */
    public static getDatasetV1DatasetsDatasetIdGet({
        datasetId,
    }: {
        /**
         * ID of the dataset
         */
        datasetId: string,
    }): CancelablePromise<DatasetsDetailsResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Datasets
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateDatasetsV1DatasetsDatasetIdPut({
        datasetId,
        requestBody,
    }: {
        /**
         * ID of the dataset
         */
        datasetId: string,
        requestBody: DatasetUpdateRequestModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Datasets
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDatasetsV1DatasetsDatasetIdDelete({
        datasetId,
    }: {
        /**
         * ID of the dataset
         */
        datasetId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Download Dataset
     * @returns any Successful Response
     * @throws ApiError
     */
    public static downloadDatasetV1DatasetsDownloadDatasetIdGet({
        datasetId,
    }: {
        /**
         * ID of the dataset
         */
        datasetId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/datasets/download/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
