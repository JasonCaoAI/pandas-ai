/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Health } from '../models/Health';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Health
     * @returns Health Successful Response
     * @throws ApiError
     */
    public static healthV1MonitoringHealthGet(): CancelablePromise<Health> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/monitoring/health/',
        });
    }
}
