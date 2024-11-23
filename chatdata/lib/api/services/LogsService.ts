/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogsResponseModel } from '../models/LogsResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LogsService {
    /**
     * Get Logs
     * @returns LogsResponseModel Successful Response
     * @throws ApiError
     */
    public static getLogsV1LogsGet({
        skip,
        limit = 10,
    }: {
        /**
         * Number of logs to skip
         */
        skip?: number,
        /**
         * Max number of logs to return
         */
        limit?: number,
    }): CancelablePromise<LogsResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/logs/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Log
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getLogV1LogsLogIdGet({
        logId,
    }: {
        /**
         * ID of the log
         */
        logId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/logs/{log_id}',
            path: {
                'log_id': logId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
