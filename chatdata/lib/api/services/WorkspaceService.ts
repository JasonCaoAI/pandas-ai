/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkspaceCreateRequestModel } from '../models/WorkspaceCreateRequestModel';
import type { WorkspaceDatasetsResponseModel } from '../models/WorkspaceDatasetsResponseModel';
import type { WorkspaceUsersResponse } from '../models/WorkspaceUsersResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkspaceService {
    /**
     * Get User Workspaces
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getUserWorkspacesV1WorkspaceListGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workspace/list',
        });
    }
    /**
     * Get Workspace Users
     * @returns WorkspaceUsersResponse Successful Response
     * @throws ApiError
     */
    public static getWorkspaceUsersV1WorkspaceWorkspaceIdUsersGet({
        workspaceId,
    }: {
        /**
         * ID of the workspace
         */
        workspaceId: string,
    }): CancelablePromise<WorkspaceUsersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workspace/{workspace_id}/users',
            path: {
                'workspace_id': workspaceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Workspace Datasets
     * @returns WorkspaceDatasetsResponseModel Successful Response
     * @throws ApiError
     */
    public static getWorkspaceDatasetsV1WorkspaceWorkspaceIdDatasetsGet({
        workspaceId,
    }: {
        /**
         * ID of the workspace
         */
        workspaceId: string,
    }): CancelablePromise<WorkspaceDatasetsResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workspace/{workspace_id}/datasets',
            path: {
                'workspace_id': workspaceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Workspace Details
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getWorkspaceDetailsV1WorkspaceWorkspaceIdDetailsGet({
        workspaceId,
    }: {
        /**
         * ID of the workspace
         */
        workspaceId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workspace/{workspace_id}/details',
            path: {
                'workspace_id': workspaceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Workspace
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteWorkspaceV1WorkspaceWorkspaceIdDelete({
        workspaceId,
    }: {
        /**
         * ID of the workspace
         */
        workspaceId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/workspace/{workspace_id}',
            path: {
                'workspace_id': workspaceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Workspace
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addWorkspaceV1WorkspaceAddPost({
        requestBody,
    }: {
        requestBody: WorkspaceCreateRequestModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/workspace/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Edit Workspace
     * @returns any Successful Response
     * @throws ApiError
     */
    public static editWorkspaceV1WorkspaceWorkspaceIdEditPut({
        workspaceId,
        requestBody,
    }: {
        /**
         * ID of the workspace
         */
        workspaceId: string,
        requestBody: WorkspaceCreateRequestModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/workspace/{workspace_id}/edit',
            path: {
                'workspace_id': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
