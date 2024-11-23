/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIResponse } from '../models/APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConversationsService {
    /**
     * Conversations
     * @returns APIResponse Successful Response
     * @throws ApiError
     */
    public static conversationsV1ConversationsGet({
        skip,
        limit = 10,
    }: {
        /**
         * Number of items to skip
         */
        skip?: number,
        /**
         * Number of items to retrieve
         */
        limit?: number,
    }): CancelablePromise<APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/conversations/',
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
     * Conversation Messages
     * @returns APIResponse Successful Response
     * @throws ApiError
     */
    public static conversationMessagesV1ConversationsConvIdMessagesGet({
        convId,
        skip,
        limit = 10,
    }: {
        /**
         * ID of the conversation
         */
        convId: string,
        /**
         * Number of items to skip
         */
        skip?: number,
        /**
         * Number of items to retrieve
         */
        limit?: number,
    }): CancelablePromise<APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/conversations/{conv_id}/messages',
            path: {
                'conv_id': convId,
            },
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
     * Delete Conversation
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteConversationV1ConversationsConvIdDelete({
        convId,
    }: {
        /**
         * ID of the conversation
         */
        convId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/conversations/{conv_id}',
            path: {
                'conv_id': convId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
