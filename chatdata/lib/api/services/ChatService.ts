/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIResponse } from '../models/APIResponse';
import type { ChatRequest } from '../models/ChatRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * Chat
     * @returns APIResponse Successful Response
     * @throws ApiError
     */
    public static chatV1ChatPost({
        requestBody,
    }: {
        requestBody: ChatRequest,
    }): CancelablePromise<APIResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/chat/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
