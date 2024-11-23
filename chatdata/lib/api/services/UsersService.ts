/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserRequest } from '../models/LoginUserRequest';
import type { Token } from '../models/Token';
import type { UserInfo } from '../models/UserInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Login User
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginUserV1UsersLoginPost({
        requestBody,
    }: {
        requestBody: LoginUserRequest,
    }): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User
     * @returns UserInfo Successful Response
     * @throws ApiError
     */
    public static getUserV1UsersMeGet(): CancelablePromise<UserInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/me',
        });
    }
    /**
     * Update User Routes
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateUserRoutesV1UsersUpdateFeaturesPatch({
        requestBody,
    }: {
        requestBody: Record<string, any>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/users/update_features',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
